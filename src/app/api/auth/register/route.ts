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

export async function POST(request: Request, response: Response) {
  try {
    const body = await request.json();
    const cookieStore = cookies();
    await connect();

    const { fullName, email, password, acceptedTerms } = body;

    if (!validator.isEmail(email)) {
      // return response.status(400).json(API_ERRORS.invalidEmailError);
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      // return response.status(400).json(API_ERRORS.registrationEmailExistsError);
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      acceptedTerms,
    });

    if (!newUser) {
      // return res.status(400).json(API_ERRORS.registrationError);
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
      { res: "successful" },
      {
        status: 200,
        headers: { "Set-Cookie": `token=${cookieStore.get("token")}` },
      }
    );
  } catch (e) {
    console.error(e);
    return Response.json({
      res: "An error occurred on our end. Please try again later.",
      status: 400,
    });
  }
}
