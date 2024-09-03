"use client";

import { useState } from "react";
import { TextField } from "@mui/material";

export default function Component() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    fullName: "",
    agreeTerms: false,
  });

  const [error, setError] = useState("");

  const handleSignUp = (e: React.FormEvent) => {};

  const handleSignIn = (e: React.FormEvent) => {};

  return (
    <div>
      <form>
        <TextField />
        <TextField />
      </form>
    </div>
  );
}
