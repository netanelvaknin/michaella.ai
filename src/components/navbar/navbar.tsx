import Grid from "@mui/material/Grid2";
import { Button, Typography } from "@/ui";
import { StyledNavbar } from "@/components/navbar/navbar.styled";

export const Navbar = () => {
  return (
    <header>
      <StyledNavbar>
        <Grid
          container
          justifyContent="space-around"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Grid>
            <Button variant="text" href="/" sx={{ minWidth: "auto", p: 0 }}>
              <Typography variant="body1" sx={{ fontWeight: "700" }}>
                Michaella
              </Typography>
            </Button>
          </Grid>

          <Grid>
            <Button variant="text" href="/about" sx={{ mr: 5 }}>
              About
            </Button>
            <Button variant="text" href="/auth/register">
              Try it now
            </Button>
          </Grid>
        </Grid>
      </StyledNavbar>
    </header>
  );
};

export default Navbar;
