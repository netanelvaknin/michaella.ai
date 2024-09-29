import { Box, Link } from "@mui/material";
import { Button, Typography } from "@/ui";
import Grid from "@mui/material/Grid2";

const ThankYou = () => {
  return (
    <Box sx={{ p: "35px 56px 0" }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid>
          <Typography align="center" variant="h1">
            Thank you so much!
          </Typography>
        </Grid>
        <Grid sx={{ mb: 4 }}>
          <Typography align="center" variant="body1">
            We are hoping that you will enjoy using our system as a quiz maker.
          </Typography>
        </Grid>
        <Grid>
          <Button variant="contained">
            <Link style={{ color: "unset" }} href="/dashboard">
              To quiz maker
            </Link>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ThankYou;
