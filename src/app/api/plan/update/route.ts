import connect from "@/db/connect-mongo";
import { cookies } from "next/headers";
import { User } from "@/models/user";
import jwt from "jsonwebtoken";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const cookieStore = cookies();
    await connect();

    const { paid, planType, purchaseDate, quizzesAmount } = body;
    const token = cookieStore.get("token");

    if (!token) {
      return Response.json(
        { message: "Unable to update user" },
        {
          status: 400,
        }
      );
    }

    const decodedToken: any = jwt.verify(
      token.value,
      process.env.ACCESS_TOKEN_SECRET || ""
    );

    const updatedUser = await User.updateOne(
      { email: decodedToken.email },
      {
        accountInformation: {
          paid,
          planType,
          purchaseDate,
          quizzesAmount,
        },
      }
    );

    if (updatedUser) {
      return Response.json(
        { message: "successful" },
        {
          status: 200,
        }
      );
    } else {
      return Response.json(
        { message: "Unable to update user" },
        {
          status: 400,
        }
      );
    }
  } catch (e) {
    console.error(e);
    return Response.json({
      message: "An error occurred on our end. Please try again later.",
      status: 400,
    });
  }
}
