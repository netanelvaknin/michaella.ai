import connect from "@/db/connect-mongo";
import { cookies } from "next/headers";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const cookieStore = cookies();
    await connect();

    const { paid, planType, purchaseDate, quizzesAmount } = body;
    const token = cookieStore.get("token");
    console.log(token);

    return Response.json(
      { message: "successful" },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error(e);
    return Response.json({
      message: "An error occurred on our end. Please try again later.",
      status: 400,
    });
  }
}
