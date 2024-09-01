"use client";

import { Box, Button, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import Question from "@/components/question/question";

interface QuestionData {
  question: string;
  answers: string[];
  correct: string;
}

export const FileUpload = () => {
  const [response, setResponse] = useState<QuestionData[]>([]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const handleFileSubmit = async () => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    const res = await fetch("/api/upload-file", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResponse(JSON.parse(data.res)?.data);
  };

  return (
    <Box>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <Typography>
          גררו קובץ לימודי לכאן או לחצו כדי להעלות אותו מהמחשב
        </Typography>
      </div>
      <ul>{files}</ul>

      {files && files?.length !== 0 && (
        <Button variant="contained" onClick={handleFileSubmit}>
          העלאת מסמך
        </Button>
      )}

      <div>
        {response?.map((questionData: QuestionData, index: number) => {
          return (
            <Question
              key={index}
              question={questionData.question}
              answers={questionData.answers}
              correct={questionData.correct}
            />
          );
        })}
      </div>
    </Box>
  );
};

export default FileUpload;
