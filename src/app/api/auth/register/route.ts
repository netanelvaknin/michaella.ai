import connect from "@/db/connect-mongo";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { User } from "@/models/user";
import { cookies } from "next/headers";

async function hashPassword(password: string) {
  const saltRounds = 10;

  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cookieStore = cookies();
    await connect();

    const { fullName, email, password, acceptedTerms } = body;

    if (!validator.isEmail(email)) {
      return Response.json(
        { message: "Email address is not valid" },
        {
          status: 400,
        }
      );
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return Response.json(
        { message: "User already exists" },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      acceptedTerms,
      accountInformation: {
        paid: false,
        planType: "free-plan",
        purchaseDate: Date.now(),
        quizzesAmount: 3,
      },
    });

    if (!newUser) {
      return Response.json(
        { message: "There was a issue on our side, please try again" },
        {
          status: 400,
        }
      );
    }

    const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET || "", {
      expiresIn: "365d",
    });

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
  } catch (e) {
    console.error(e);
    return Response.json({
      message: "An error occurred on our end. Please try again later.",
      status: 400,
    });
  }
}
