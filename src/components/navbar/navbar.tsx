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
            <Button href="/">
              <Typography variant="body1">Michaella</Typography>
            </Button>
          </Grid>

          <Grid>
            <Button variant="text" href="/about" sx={{ mr: 5 }}>
              About
            </Button>
            <Button variant="text" href="/auth">
              Register / Sign in
            </Button>
          </Grid>
        </Grid>
      </StyledNavbar>
    </header>
  );
};

export default Navbar;
