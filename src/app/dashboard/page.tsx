import { Box, Container, Divider, Typography } from "@mui/material";
import { FileUpload } from "@/components";
import { cookies } from "next/headers";

const getUser = async (token: string) => {
  try {
    const res = await fetch("http://localhost:3000/api/me", {
      method: "POST",
      body: JSON.stringify({ token }),
      next: {
        tags: ["accountInformation"],
      },
    });

    return await res.json();
  } catch (e) {
    console.error(e);
  }
};

const Dashboard = async () => {
  const token: any = cookies().get("token");
  const { value: user } = await getUser(token.value);

  return (
    <Container>
      <Box sx={{ mb: 8 }}>
        <Typography variant="body1">
          You have{" "}
          <Typography component="span" sx={{ fontWeight: "bold" }}>
            {user?.accountInformation?.quizzesAmount}
          </Typography>{" "}
          quizzes left to generate
        </Typography>
      </Box>

      <Divider sx={{ mb: 8 }} />

      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <Typography variant="h3" sx={{ mb: 4 }}>
        Upload your PDF file
      </Typography>
      <FileUpload quizzesAmount={user?.accountInformation?.quizzesAmount} />
    </Container>
  );
};

export default Dashboard;
