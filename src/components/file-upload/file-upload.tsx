"use client";

import { Box, Button, Divider, Link, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import Question from "@/components/question/question";
import { useSnackbar } from "@/contexts/snackbar";
import revalidateTag from "@/actions";

interface QuestionData {
  question: string;
  answers: string[];
  correct: string;
}

export const FileUpload = ({ quizzesAmount }: { quizzesAmount: number }) => {
  const [response, setResponse] = useState<QuestionData[]>([]);
  const [loading, setLoading] = useState(false);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "application/pdf": [".pdf"],
    },
    onFileDialogOpen: () => {},
  });
  const { openSnackbar } = useSnackbar();

  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const handleFileSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    const res = await fetch("/api/upload-file", {
      method: "POST",
      body: formData,
    });

    if (res.status === 400) {
      const data = await res.json();
      setLoading(false);
      return openSnackbar(data.res);
    }

    const data = await res.json();
    setResponse(JSON.parse(data.res)?.data);
    setLoading(false);

    await fetch("/api/plan/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quizzesAmount: quizzesAmount - 1,
      }),
    });

    await revalidateTag("accountInformation");
  };

  return (
    <Box>
      {!loading ? (
        <>
          <Box
            {...getRootProps({ className: "dropzone" })}
            sx={{
              p: "20px",
              borderColor: "#eeeeee",
              borderStyle: "dashed",
              backgroundColor: "#fafafa",
              color: "#bdbdbd",
            }}
          >
            <input {...getInputProps()} />
            <Typography>
              Drag and drop some files here, or click to select files
            </Typography>
          </Box>
          <ul>{files}</ul>

          {files && files?.length !== 0 && (
            <>
              <Button
                variant="contained"
                onClick={handleFileSubmit}
                sx={{ mb: 8 }}
                disabled={quizzesAmount === 0}
              >
                Upload File
              </Button>

              {quizzesAmount === 0 && (
                <Box sx={{ display: "inline" }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Unfortunately, You don't have quizzes generations left.
                    Please,{" "}
                    <Link
                      sx={{ fontWeight: "bold" }}
                      variant="body1"
                      href="/payment"
                    >
                      Upgrade your plan
                    </Link>
                  </Typography>
                </Box>
              )}
            </>
          )}
        </>
      ) : (
        <Typography>Preparing your quiz...</Typography>
      )}

      <div>
        {!loading && (
          <>
            {response?.length !== 0 && (
              <Typography variant="h4" sx={{ mb: 8 }}>
                Here's your questions, Good luck!
              </Typography>
            )}
            {response?.map((questionData: QuestionData, index: number) => {
              return (
                <Box key={index}>
                  <Divider sx={{ mb: 8 }} />
                  <Question
                    question={questionData.question}
                    answers={questionData.answers}
                    correct={questionData.correct}
                  />
                </Box>
              );
            })}
          </>
        )}
      </div>
    </Box>
  );
};

export default FileUpload;
