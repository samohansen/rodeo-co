import { TextField, Checkbox, Select, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";
import React from "react";
import {FormControl, InputLabel} from "@mui/material";
import type { RegisterOptions, Control, } from "react-hook-form";
import type { TextFieldProps } from "@mui/material";

type Props = {
  name: string;
  label: string
  control: Control | any;
  rules?: RegisterOptions;
}

type TextInputProps = Props & {
  textFieldProps?: TextFieldProps; // MUI TextField props like multiline, etc
}

export const TextInput: React.FC<TextInputProps> = ({
  name, 
  control, 
  label, 
  rules, 
  textFieldProps,
}) => {
  return(
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({field, fieldState}) => (
        <TextField 
          {...field} 
          {...textFieldProps} // MUI TextField props like multiline, etc
          label={label}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  )
}

type SelectInputProps = Props & {
  menuItems: {
    label: string;
    value: any;
    [rest:string]: any;
  }[]
  style?: any; 
}

export const SelectInput: React.FC<SelectInputProps> = ({
  name, 
  control, 
  label, 
  rules,
  menuItems, 
  style,
}) => {
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field }) => (
        <FormControl style={style}>
          <InputLabel id={label}>{label}</InputLabel>
          <Select {...field} labelId={label} label={label}>
            {menuItems.map(menuItem => (
              <MenuItem key={menuItem.value} value={menuItem.value} {...menuItem.rest}>
                {menuItem.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  )
}
