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
import { StyledContainer } from "@/app/auth/register/_register.styled";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  acceptedTerms: boolean;
}

export default function Register() {
  const router = useRouter();
  const [snackbarValue, setSnackbarValue] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      acceptedTerms: false,
    },
  });

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarValue("");
  };

  const onSubmit = async (data: FormValues) => {
    try {
      fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.ok) {
          setSnackbarValue(
            "Registered successfully, Redirecting to dashboard..."
          );
          setTimeout(() => {
            router.push("/dashboard");
          }, 3000);
        }
      });
    } catch (e: any) {}
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
      <form onSubmit={handleSubmit(onSubmit)}>
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
            <Controller
              name="fullName"
              control={control}
              rules={{
                required: "Full name is required",
                minLength: { value: 3, message: "Not valid full name value" },
              }}
              render={({ field }) => (
                <TextField
                  label="Full Name"
                  error={!!errors.fullName}
                  helperText={
                    errors.fullName ? errors.fullName.message : undefined
                  }
                  {...field}
                />
              )}
            />
          </Grid>

          <Grid>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Not a valid email address",
                },
              }}
              render={({ field }) => (
                <TextField
                  type="email"
                  label="Email Address"
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : undefined}
                  {...field}
                />
              )}
            />
          </Grid>

          <Grid>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*\d).{6,12}$/,
                  message:
                    "At least one letter and one number, 6-12 characters in total",
                },
              }}
              render={({ field }) => (
                <TextField
                  type="password"
                  label="Password"
                  error={!!errors.password}
                  helperText={
                    errors.password ? errors.password.message : undefined
                  }
                  {...field}
                />
              )}
            />
          </Grid>

          <Grid>
            <Controller
              name="acceptedTerms"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <FormControlLabel
                    sx={{
                      color: errors.acceptedTerms ? "error.main" : "initial",
                    }}
                    control={<Checkbox {...field} />}
                    label="I accept the terms and agreement"
                  />
                  {errors.acceptedTerms && (
                    <FormHelperText sx={{ color: "error.main" }}>
                      Required field
                    </FormHelperText>
                  )}
                </>
              )}
            />
          </Grid>

          <Grid>
            <Button type="submit" variant="contained" color="primary">
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
      </form>
    </StyledContainer>
  );
}
