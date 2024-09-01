import { Typography } from "@mui/material";
import { FileUpload } from "@/components";

const Dashboard = () => {
  return (
    <div>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <Typography variant="h3">Let's generate your quiz</Typography>
      <FileUpload />
    </div>
  );
};

export default Dashboard;
