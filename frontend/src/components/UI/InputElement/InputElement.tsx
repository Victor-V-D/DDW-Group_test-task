import { TextField } from "@mui/material";
import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

interface Props {
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  name: string;
  error?: string;
  type?: HTMLInputTypeAttribute;
  multiline?: boolean;
  rows?: string | number;
  autoFocus?: boolean;
  required?: boolean;
}

const InputElement = ({
  label,
  name,
  onChange,
  value,
  error,
  multiline,
  rows,
  type,
  autoFocus,
  required,
}: Props) => {
  return (
    <TextField
      margin="normal"
      fullWidth
      id={name}
      label={label}
      name={name}
      autoComplete={name}
      autoFocus={autoFocus}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error}
      type={type}
      multiline={multiline}
      rows={rows}
      required={required}
    />
  );
};

export default InputElement;