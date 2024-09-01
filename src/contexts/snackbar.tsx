"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";

const SnackbarContext = createContext({
  openSnackbar: (message: string) => {},
  closeSnackbar: () => {},
});

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const openSnackbar = (msg: string) => {
    setMessage(msg);
    setOpen(true);
  };

  const closeSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        message={message}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </SnackbarContext.Provider>
  );
};

// Custom hook to use the Snackbar context
export const useSnackbar = () => {
  return useContext(SnackbarContext);
};
