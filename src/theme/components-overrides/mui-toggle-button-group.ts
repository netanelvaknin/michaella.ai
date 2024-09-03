import { palette } from "../palette/constants";

export const muiToggleButtonGroupOverrides = {
  styleOverrides: {
    root: {
      borderRadius: "6px",
      height: "32px",
      padding: "2px",
    },
    grouped: {
      textTransform: "none",
      fontSize: "14px",
      background: "transparent",
      border: 0,
      svg: {
        width: "20px",
        height: "20px",
      },
      "& .MuiButton-root": {
        background: "transparent",
      },
      "&:hover": {},
      "&.Mui-selected": {
        borderRadius: "4px",
        "&:hover": {},
      },
    },
  },
};
