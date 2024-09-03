import Grid from "@mui/material/Grid2";
import { Typography } from "@/ui";
import { Container } from "@/components/key-features/key-features.styled";

const KeyFeatures = () => {
  return (
    <Container>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ mb: 10 }}
      >
        <Typography variant="h2" align="center">
          Effortless quiz extraction
        </Typography>
        <Typography
          color="secondary.dark"
          variant="body1"
          align="center"
          sx={{ maxWidth: "680px" }}
        >
          We advanced AI to analyze your PDF documents and extract high-quality
          quizzes that you can use to engage your audience.
        </Typography>
      </Grid>

      <Grid
        container
        spacing={8}
        justifyContent="center"
        alignItems="center"
        sx={{ maxWidth: "50%", m: "0 auto" }}
      >
        <Grid size={6}>
          <Typography variant="h3">Automated extraction</Typography>
          <Typography variant="body1" sx={{ maxWidth: "380px" }}>
            Our AI agent analyzes your PDF and extracts a high-quality quiz with
            minimal effort.
          </Typography>
        </Grid>
        <Grid size={6}>
          <Typography variant="h3">Customizable quizzes</Typography>
          <Typography variant="body1" sx={{ maxWidth: "380px" }}>
            Easily modify the quiz questions and answers to fit your needs.
          </Typography>
        </Grid>
        <Grid size={6}>
          <Typography variant="h3">Engaging experience</Typography>
          <Typography variant="body1" sx={{ maxWidth: "380px" }}>
            Provide an interactive and enjoyable learning experience for your
            audience.
          </Typography>
        </Grid>
        <Grid size={6}>
          <Typography variant="h3">Sharing with friends</Typography>
          <Typography variant="body1" sx={{ maxWidth: "380px" }}>
            Easily share your quizzes with your friends and collaborate on
            creating engaging content.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default KeyFeatures;
