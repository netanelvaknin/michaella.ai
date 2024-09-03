import { palette } from "../palette/constants";

const commonButtonStyles = {
  borderRadius: "6px",
  textTransform: "unset",
  padding: "8px 16px",
  height: "40px",
  fontSize: "14px",
  fontWeight: "500",
};

export const muiButtonOverrides = {
  defaultProps: {
    variant: "primary",
  },
  styleOverrides: {
    root: {
      "&.MuiButton-root": {
        ...commonButtonStyles,
        minWidth: "130px",
      },
      "&.MuiButton-text": {
        ...commonButtonStyles,
        minWidth: "auto",
        padding: "2px 4px",
        "&:hover": {
          background: "none",
        },
      },
      "&.MuiButton-outlined": {
        background: palette.secondary.main,
        border: 0,
        ...commonButtonStyles,
      },
    },
  },
};
