import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio as MuiRadio,
  RadioGroup,
  RadioProps as MuiRadioProps,
} from "@mui/material";

interface RadioProps extends MuiRadioProps {
  error?: boolean;
  disabled?: boolean;
  label: string;
  name: string;
  options: any[];
  value: string;
  onChange: () => void;
}

export const Radio = ({
  error,
  label,
  value,
  name,
  options,
  onChange,
  disabled,
}: RadioProps) => {
  return (
    <FormControl error={error} disabled={disabled}>
      <FormLabel id={label}>{label}</FormLabel>
      <RadioGroup
        aria-labelledby={label}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((option: string, index: number) => (
          <FormControlLabel
            key={index}
            value={option}
            control={<MuiRadio />}
            label={option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
