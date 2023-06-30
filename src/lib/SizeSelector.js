import React from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export default function SizeSelector({skus, selectedSize, onSelect}) {

  return (
    <FormControl sx={{m: 1, minWidth: '150px'}}>
      <InputLabel id="Size">Size</InputLabel>
      <Select
        label="Select a Size"
        name="sizes"
        id="skus-select"
        value={selectedSize} onChange={(e) => onSelect(e.target.value)}
        data-testid='size-select'
      >
        {Object.keys(skus).map((key) => (
          <MenuItem
            role='option'
            key={key}
            value={key}
            className={
              skus[key].quantity >= 1
                ? 'sku sku-in-stock'
                : 'sku sku-out-of-skock'
            }
            data-testid={`size-option-${key}`}
          >
            {skus[key].size}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}