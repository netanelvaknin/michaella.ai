import { palette } from "../palette/constants";
import { typography } from "../typography/constants";

export const muiSnackbarContentOverrides = {
  styleOverrides: {
    root: {
      borderRadius: "7px",
      width: "240px",
      height: "56px",
      paddingRight: "24px",
    },
    message: {
      display: "flex",
      alignItems: "center",
      ...typography.h3,
      "& svg": {
        marginRight: "6px",
      },
    },
  },
};
