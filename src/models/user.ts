import mongoose from "mongoose";

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  acceptedTerms: boolean;
}

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    acceptedTerms: {
      type: Boolean,
      required: true,
    },
  },
  { collection: "users" }
);

export const User: mongoose.Model<IUser> =
  mongoose.models["UserSchema"] || mongoose.model("UserSchema", UserSchema);
