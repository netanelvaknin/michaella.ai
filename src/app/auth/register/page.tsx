"use client";

import { useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Divider,
  Link,
  Snackbar,
  IconButton,
  FormHelperText,
} from "@mui/material";

import Grid from "@mui/material/Grid2";
import { SnackbarCloseReason } from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import validator from "validator";
import { StyledContainer } from "@/app/auth/register/_register.styled";

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  termsAccepted: boolean;
}

export default function Register() {
  const [snackbarValue, setSnackbarValue] = useState("");
  const [values, setValues] = useState<FormValues>({
    fullName: "",
    email: "",
    password: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    termsAccepted?: string;
  }>({});

  const validateField = (name: string, value: string) => {
    let error = "";
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/; // At least 7 characters, with one letter and one number

    switch (name) {
      case "fullName":
        if (!value) {
          error = "Full Name is required";
        }
        break;

      case "email":
        if (!validator.isEmail(values.email)) {
          error = "Please enter a valid email address";
        }
        break;

      case "password":
        if (!value) {
          error = "Password is required";
        } else if (!passwordPattern.test(value)) {
          error =
            "Password must be at least 7 characters long, and include at least one letter and one number";
        }
        break;

      case "termsAccepted":
        if (!value) {
          error = "You must accept the terms and agreement";
        }
        break;

      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleChange = (e: any) => {
    const { name, value, checked, type } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setValues((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));

    validateField(name, fieldValue);
  };

  const validateForm = () => {
    let tempErrors: {
      fullName?: string;
      email?: string;
      password?: string;
      termsAccepted?: string;
    } = {};

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/; // At least 7 characters, with one letter and one number

    // Full Name validation
    if (!values.fullName) {
      tempErrors.fullName = "Full Name is required";
    }

    if (!validator.isEmail(values.email)) {
      tempErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!values.password) {
      tempErrors.password = "Password is required";
    } else if (!passwordPattern.test(values.password)) {
      tempErrors.password =
        "Password must be at least 7 characters long, and include at least one letter and one number";
    }

    if (!values.termsAccepted) {
      tempErrors.termsAccepted = "You must accept the terms and agreement";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form Submitted", values);
      // Add submission logic here (e.g., API call)
    } else {
      console.log("Validation Errors", errors);
    }
  };

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarValue("");
  };

  return (
    <StyledContainer
      sx={{
        maxWidth: 400,
        mx: "auto",
        padding: 7,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        boxShadow: 3,
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        spacing={4}
      >
        <Grid>
          <Typography variant="h2" textAlign="center">
            Register
          </Typography>
        </Grid>

        <Grid>
          <TextField
            label="Full Name"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            required
            error={!!errors.fullName}
            helperText={errors.fullName}
          />
        </Grid>
        <Grid>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            required
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>
        <Grid>
          <TextField
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            required
            error={!!errors.password}
            helperText={errors.password}
          />
        </Grid>

        <Grid>
          <FormControlLabel
            sx={{ color: errors.termsAccepted ? "error.main" : "initial" }}
            control={
              <Checkbox
                name="termsAccepted"
                checked={values.termsAccepted}
                onChange={handleChange}
              />
            }
            label="I accept the terms and agreement"
          />
          {errors.termsAccepted && (
            <FormHelperText sx={{ color: "error.main" }}>
              Required field
            </FormHelperText>
          )}
        </Grid>

        <Grid>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Register
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ mt: 4, mb: 4 }} />

      <Grid container justifyContent="center">
        <Link href="/auth/login">
          <Typography>I already have account</Typography>
        </Link>
      </Grid>

      <Snackbar
        open={!!snackbarValue}
        autoHideDuration={10000}
        onClose={handleCloseSnackbar}
        message={snackbarValue}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </StyledContainer>
  );
}
