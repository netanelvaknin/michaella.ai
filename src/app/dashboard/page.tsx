import { Container, Typography } from "@mui/material";
import { FileUpload } from "@/components";

const Dashboard = () => {
  return (
    <Container>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <Typography variant="h3" sx={{ mb: 4 }}>
        Let's generate your quiz, upload your PDF file:
      </Typography>
      <FileUpload />
    </Container>
  );
};

export default Dashboard;
