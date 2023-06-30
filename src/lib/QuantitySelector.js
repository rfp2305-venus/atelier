import React, {useEffect, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export default function QuantitySelector({quantity, selected, onSelect}) {
  const [value, setValue] = useState('');

  function handleChange(value) {
    setValue(value);
    onSelect(value);
  }

  useEffect(() => {
    setValue('1');
  }, [quantity]);

  function createQuantityItems() {
    const items = [];
    for(let x = 1; x <= quantity; x++) {
      items.push(
        <MenuItem
          key={x}
          value={x}
          data-testid="quantity-option"
        >
          {x}
        </MenuItem>
      )
    }
    return items;
  }


  return (
    <FormControl sx={{m: 1}}>
      <InputLabel id="quantity">
        Quantity
      </InputLabel>
      <Select
        label="quantity"
        name="quantity"
        id="quantity-select"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        data-testid='quantity-select'
      >
        {createQuantityItems(quantity)}
      </Select>
    </FormControl>
  )
}