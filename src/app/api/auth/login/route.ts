import connect from "@/db/connect-mongo";
import jwt from "jsonwebtoken";
import validator from "validator";
import { User } from "@/models/user";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cookieStore = cookies();
    await connect();
    const user = await User.findOne({ email: body.email });

    if (user && validator.isEmail(body.email)) {
      const validPassword = await bcrypt.compare(body.password, user.password);

      if (validPassword) {
        const token = jwt.sign(
          { email: body.email },
          process.env.ACCESS_TOKEN_SECRET || "",
          { expiresIn: "365d" }
        );

        cookieStore.set("token", token, {
          httpOnly: true,
          secure: false,
          maxAge: 60 * 60 * 24 * 365,
          sameSite: "strict",
          path: "/",
        });

        return Response.json(
          { message: "successful" },
          {
            status: 200,
          }
        );
      } else {
        return Response.json(
          { message: "Wrong password or email" },
          {
            status: 400,
          }
        );
      }
    } else {
      return Response.json(
        { message: "Failed to login user" },
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
