import Grid from "@mui/material/Grid2";
import { Typography } from "@/ui";
import {
  StyledContainer,
  TestimonialItem,
} from "@/components/testimonials/testimonials.styled";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

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
        <TestimonialItem size={4}>
          <Grid container alignItems="center">
            <Grid>
              <PersonOutlineOutlinedIcon />
            </Grid>
            <Grid>
              <Typography variant="h4">Tal Cohen</Typography>
              <Typography variant="overline" color="secondary.dark">
                Content Strategist
              </Typography>
            </Grid>

            <Grid>
              <Typography variant="overline" color="secondary.dark">
                "Michaella.ai has been a game-changer for our content marketing
                strategy. The ability to quickly and easily extract quizzes from
                our PDF materials has helped us engage our audience like never
                before."
              </Typography>
            </Grid>
          </Grid>
        </TestimonialItem>
        <TestimonialItem size={4}>
          <Grid container alignItems="center">
            <Grid>
              <PersonOutlineOutlinedIcon />
            </Grid>
            <Grid>
              <Typography variant="h4">Sarah Anderson</Typography>
              <Typography variant="overline" color="secondary.dark">
                Content Strategist
              </Typography>
            </Grid>

            <Grid>
              <Typography variant="overline" color="secondary.dark">
                "Michaella.ai has been a game-changer for our content marketing
                strategy. The ability to quickly and easily extract quizzes from
                our PDF materials has helped us engage our audience like never
                before."
              </Typography>
            </Grid>
          </Grid>
        </TestimonialItem>
        <TestimonialItem size={4}>
          <Grid container alignItems="center">
            <Grid>
              <PersonOutlineOutlinedIcon />
            </Grid>
            <Grid>
              <Typography variant="h4">Michael Roberts</Typography>
              <Typography variant="overline" color="secondary.dark">
                eLearning Specialist
              </Typography>
            </Grid>

            <Grid>
              <Typography variant="overline" color="secondary.dark">
                "Michaella.ai has revolutionized the way we create and deliver
                quizzes to our online learners. The platform is intuitive,
                powerful, and has helped us significantly improve engagement and
                knowledge retention."
              </Typography>
            </Grid>
          </Grid>
        </TestimonialItem>
      </Grid>
    </StyledContainer>
  );
};

export default Testimonials;
