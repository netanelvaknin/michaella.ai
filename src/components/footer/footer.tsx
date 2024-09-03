import Grid from "@mui/material/Grid2";
import { Button, Typography } from "@/ui";
import { StyledFooter } from "@/components/footer/footer.styled";

export const Footer = () => {
  return (
    <StyledFooter>
      <Grid container justifyContent="space-around" alignItems="center">
        <Grid>
          <Typography variant="body1">
            © 2024 Michaella.ai. All rights reserved.
          </Typography>
        </Grid>

        <Grid>
          <Button variant="text" href="/terms" sx={{ mr: 5 }}>
            Terms of Service
          </Button>
          <Button variant="text" href="/privacy">
            Privacy
          </Button>
        </Grid>
      </Grid>
    </StyledFooter>
  );
};
