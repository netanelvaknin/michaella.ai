import React from "react";
import MuiCheckbox, { CheckboxProps } from "@mui/material/Checkbox";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";

export const Checkbox = (props: CheckboxProps) => (
  <MuiCheckbox
    icon={<CheckBoxOutlineBlankOutlinedIcon />}
    checkedIcon={<CheckBoxOutlinedIcon />}
    indeterminateIcon={<IndeterminateCheckBoxOutlinedIcon />}
    {...props}
  />
);
