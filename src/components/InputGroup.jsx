import { FormControl, TextField } from "@mui/material";
import React from "react";

const InputGroup = ({ type, other, value, onChange, label }) => {
  return (
    <FormControl fullWidth className="mb-4">
      <TextField
        type={type}
        name={other}
        id={other}
        label={label}
        value={value}
        onChange={onChange}
      />
    </FormControl>
  );
};

export default InputGroup;
