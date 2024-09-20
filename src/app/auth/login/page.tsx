"use client";

import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Divider,
  Link,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <Box
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
          <TextField
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            required
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
          />
        </Grid>

        <Grid>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
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
    </Box>
  );
}
