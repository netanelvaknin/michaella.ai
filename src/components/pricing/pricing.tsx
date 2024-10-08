"use client";

import { Button, Typography } from "@/ui";
import Grid from "@mui/material/Grid2";
import {
  PricingCard,
  StyledPricingContainer,
} from "@/components/pricing/pricing.styled";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";

const Pricing = () => {
  const router = useRouter();

  return (
    <StyledPricingContainer>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ mb: 10 }}
      >
        <Typography variant="h2" align="center">
          Affordable Pricing
        </Typography>
        <Typography
          color="secondary.dark"
          variant="body1"
          align="center"
          sx={{ maxWidth: "470px" }}
        >
          We offer generation-based plans. <br /> Choose the plan that works
          best for you.
        </Typography>
      </Grid>

      <Grid container justifyContent="center" spacing={4}>
        <PricingCard sx={{ width: "350px", background: "white" }}>
          <Typography variant="h4" align="center">
            Exploring
          </Typography>
          <Typography variant="h2" align="center" sx={{ m: 4 }}>
            FREE
          </Typography>

          <Grid container direction="column" sx={{ mt: 5 }} spacing={2}>
            <Grid container alignItems="center">
              <CheckOutlinedIcon sx={{ color: "secondary.dark" }} />
              <Grid>
                <Typography color="secondary.dark" variant="body1">
                  3 Auto generated quizzes
                </Typography>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              sx={{ mt: 23 }}
              onClick={() => router.push("/dashboard")}
            >
              Get started
            </Button>
          </Grid>
        </PricingCard>

        <PricingCard sx={{ width: "350px", background: "white" }}>
          <Typography variant="h4" align="center">
            Advanced
          </Typography>
          <Typography variant="h2" align="center" sx={{ m: 4 }}>
            $9
          </Typography>

          <Grid container direction="column" sx={{ mt: 5 }} spacing={2}>
            <Grid container alignItems="center">
              <CheckOutlinedIcon sx={{ color: "secondary.dark" }} />
              <Grid>
                <Typography color="secondary.dark" variant="body1">
                  50 Quizzes
                </Typography>
              </Grid>
            </Grid>

            <Grid container alignItems="center">
              <CheckOutlinedIcon sx={{ color: "secondary.dark" }} />
              <Grid>
                <Typography color="secondary.dark">
                  Quiz customization
                </Typography>
              </Grid>
            </Grid>

            <Grid container alignItems="center">
              <CheckOutlinedIcon sx={{ color: "secondary.dark" }} />
              <Grid container alignItems="center">
                <Typography
                  color="secondary.dark"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Shareable quizzes
                </Typography>
                <Tooltip title="You can share your quizzes with colleagues to let them take the test as well.">
                  <IconButton sx={{ p: 0 }}>
                    <InfoOutlinedIcon sx={{ fontSize: "18px" }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              sx={{ mt: 5 }}
              onClick={() => router.push("/dashboard")}
            >
              Get started
            </Button>
          </Grid>
        </PricingCard>
      </Grid>
    </StyledPricingContainer>
  );
};

export default Pricing;
