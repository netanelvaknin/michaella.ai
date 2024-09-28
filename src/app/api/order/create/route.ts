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

const createOrder = async (cart: any) => {
  // use the cart information passed from the front-end to calculate the purchase unit details
  console.log(
    "shopping cart information passed from the frontend createOrder() callback:",
    cart
  );

  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const unit =
    cart[0].id === "basic-plan"
      ? {
          amount: {
            currency_code: "USD",
            value: "9.00",
          },
        }
      : {
          amount: {
            currency_code: "USD",
            value: "19.00",
          },
        };
  const payload = {
    intent: "CAPTURE",
    purchase_units: [unit],
  };

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

export async function POST(request: Request) {
  try {
    const { cart } = await request.json();
    const { jsonResponse, httpStatusCode } = await createOrder(cart);

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
