import React from "react";
import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";

interface IToastProps extends SnackbarProps {
    vertical?: "top" | "bottom";
    horizontal?: "left" | "right" | "center";
}

export const Toast = (props: IToastProps) => (
    <Snackbar
        anchorOrigin={{
            vertical: props.vertical || "bottom",
            horizontal: props.horizontal || "right",
        }}
        {...props}
    />
);
