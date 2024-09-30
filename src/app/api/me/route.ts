import connect from "@/db/connect-mongo";
import { User } from "@/models/user";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token } = body;
    await connect();

    if (!token) {
      return Response.json(
        { message: "Unable to get user" },
        {
          status: 400,
        }
      );
    }

    const decodedToken: any = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || ""
    );

    const user = await User.findOne({ email: decodedToken.email });

    if (user) {
      return Response.json(
        { message: "successful", value: user },
        {
          status: 200,
        }
      );
    } else {
      return Response.json(
        { message: "Unable to get user" },
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
