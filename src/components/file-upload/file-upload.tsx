"use client";

import { Box } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useState } from "react";

export const FileUpload = () => {
  const [response, setResponse] = useState(null);
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
    var formdata = new FormData();
    formdata.append("files", acceptedFiles[0]);

    const res = await fetch("/api/upload-file", {
      method: "POST",
      body: formdata,
    });

    const data = await res.json();
    setResponse(data);
  };

  return (
    <Box>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <ul>{files}</ul>

      {files && files?.length !== 0 && (
        <button onClick={handleFileSubmit}>העלאת מסמך</button>
      )}

      {response && <div>{JSON.stringify(response)}</div>}
    </Box>
  );
};

export default FileUpload;
