import React from "react";
import MuiToggleButton, {
    ToggleButtonProps as MuiToggleButtonProps,
} from "@mui/material/ToggleButton";
import MuiToggleButtonGroup, {
    ToggleButtonGroupProps,
} from "@mui/material/ToggleButtonGroup";

interface IToggleOption extends MuiToggleButtonProps {
    value: string | number;
    icon?: React.ReactNode;
}

interface IToggleButtonProps extends ToggleButtonGroupProps {
    options: IToggleOption[];
}

export const ToggleButton = (props: IToggleButtonProps) => (
    <MuiToggleButtonGroup
        value={props.value}
        onChange={props.onChange}
        exclusive
    >
        {props.options.map((option) => (
            <MuiToggleButton key={option.value} value={option.value}>
                {option.icon || option.value}
            </MuiToggleButton>
        ))}
    </MuiToggleButtonGroup>
);
