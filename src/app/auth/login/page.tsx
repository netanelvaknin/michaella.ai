"use client";

import {
  TextField,
  Button,
  Typography,
  Divider,
  Link,
  IconButton,
  Snackbar,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { StyledContainer } from "@/app/auth/login/_login.styled";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { SnackbarCloseReason } from "@mui/material/Snackbar";

interface FormValues {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [snackbarValue, setSnackbarValue] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
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
      fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(async (res) => {
        if (res.ok) {
          setSnackbarValue("Login successful, Redirecting to dashboard...");
          setTimeout(() => {
            router.push("/dashboard");
          }, 3000);
        } else {
          const { message } = await res.json();
          setSnackbarValue(message);
        }
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <StyledContainer
      sx={{
        maxWidth: 400,
        mx: "auto",
        padding: 10,
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
              Login
            </Typography>
          </Grid>

          <Grid>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required field",
              }}
              render={({ field }) => (
                <TextField
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
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 4, mb: 4 }} />

        <Grid container justifyContent="center">
          <Link href="/auth/register">
            <Typography>I don't have account</Typography>
          </Link>
        </Grid>
      </form>

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
