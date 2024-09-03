import Grid from "@mui/material/Grid2";
import { Typography } from "@/ui";
import {
  StyledContainer,
  TestimonialItem,
} from "@/components/testimonials/testimonials.styled";

const Testimonials = () => {
  return (
    <StyledContainer>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ mb: 10 }}
      >
        <Typography variant="h2" align="center">
          What Our Customers Say
        </Typography>
        <Typography
          color="secondary.dark"
          variant="body1"
          align="center"
          sx={{ maxWidth: "680px" }}
        >
          Hear from real users who have transformed their content with us
        </Typography>
      </Grid>

      <Grid container justifyContent="center" spacing={4}>
        <TestimonialItem size={4}></TestimonialItem>
        <TestimonialItem size={4}></TestimonialItem>
        <TestimonialItem size={4}></TestimonialItem>
      </Grid>
    </StyledContainer>
  );
};

export default Testimonials;
