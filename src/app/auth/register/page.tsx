"use client";

import { useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function Register() {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
    termsAccepted: false,
  });

  const handleChange = (e: any) => {
    const { name, value, checked, type } = e.target;
    setValues((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (values.termsAccepted) {
      console.log("Form Submitted", values);
    } else {
      alert("You must accept the terms and agreement to register");
    }
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
          <FormControlLabel
            control={
              <Checkbox
                name="termsAccepted"
                checked={values.termsAccepted}
                onChange={handleChange}
              />
            }
            label="I accept the terms and agreement"
          />
        </Grid>

        <Grid>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Register
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
