import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export default function SelectWrapper({label, name, options, value, onChange}) {


  return (
    <FormControl sx={{m: 1, minWidth: '150px'}}>
      <InputLabel id={name}>
        {name}
      </InputLabel>
      <Select label={label}
              name={name}
              id={`${name}-select`}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              data-testid={`${name}-select`}
      >
        {options.map((op, indx) => (
          <MenuItem
            key={`${name}-${indx}`}
            value={op.value}
            data-testid={`${name}-option`}
          >
            {op.display}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}