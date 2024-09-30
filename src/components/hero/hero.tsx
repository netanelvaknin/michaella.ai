"use client";

import { Button, Typography } from "@/ui";
import { Box, Theme, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useRouter } from "next/navigation";

export const Hero = () => {
  const router = useRouter();
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  return (
    <Box sx={{ height: isSmallScreen ? "532px" : "570px" }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        spacing={4}
        sx={{ height: "100%", p: "0 14px" }}
      >
        <Grid>
          <Typography
            variant="h1"
            sx={{ textAlign: "center", maxWidth: "550px" }}
          >
            Unlock the power of AI-driven quizzes
          </Typography>
        </Grid>

        <Grid>
          <Typography variant="body1" sx={{ maxWidth: "580px" }}>
            Michaella is a smart AI agent that helps you extract a quiz from a
            PDF. Simply upload your document, and let our AI do the work. It's
            that easy!
          </Typography>
        </Grid>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Button variant="contained" onClick={() => router.push("/auth")}>
            Try it now
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;
