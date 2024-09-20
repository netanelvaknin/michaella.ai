"use client";

import {
  createTheme,
  responsiveFontSizes,
  ThemeOptions,
} from "@mui/material/styles";
import { palette } from "./palette/constants";
import { typography } from "./typography/constants";
import {
  muiButtonOverrides,
  muiCheckboxOverrides,
  muiSnackbarContentOverrides,
  muiInputBaseOverrides,
  muiToggleButtonGroupOverrides,
  muiCssBaselineOverrides,
  muiFormHelperText,
} from "./components-overrides";

let theme = createTheme({
  typography,
  palette,
  spacing: 4,
  components: {
    MuiCssBaseline: muiCssBaselineOverrides,
    MuiButton: muiButtonOverrides,
    MuiToggleButtonGroup: muiToggleButtonGroupOverrides,
    MuiCheckbox: muiCheckboxOverrides,
    MuiInputBase: muiInputBaseOverrides,
    MuiSnackbarContent: muiSnackbarContentOverrides,
    MuiFormHelperText: muiFormHelperText,
  },
} as ThemeOptions);

theme = responsiveFontSizes(theme);
export { theme };
