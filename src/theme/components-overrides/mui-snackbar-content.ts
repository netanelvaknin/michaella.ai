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
      ...typography.body1,
      maxWidth: "245px",
      "& svg": {
        marginRight: "6px",
      },
    },
  },
};
