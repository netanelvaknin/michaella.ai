import { isProdEnv } from "@/services/app-config";

const base = isProdEnv()
  ? "https://api-m.paypal.com"
  : "https://api-m.sandbox.paypal.com";

const generateAccessToken = async () => {
  try {
    if (
      !process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ||
      !process.env.PAYPAL_CLIENT_SECRET
    ) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID +
        ":" +
        process.env.PAYPAL_CLIENT_SECRET
    ).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();

    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};

async function handleResponse(response: any) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

const captureOrder = async (orderID: string) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
  });

  return handleResponse(response);
};

export async function POST(request: Request) {
  try {
    const { orderID } = await request.json();
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
    return Response.json(
      { message: jsonResponse },
      {
        status: httpStatusCode,
      }
    );
  } catch (e) {
    console.error(e);
  }
}
