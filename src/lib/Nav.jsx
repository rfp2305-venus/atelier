import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export default function Nav({products, selectedProduct, onClick} ) {

  return (
    <FormControl sx={{m: 1, minWidth: '150px'}}>
      <InputLabel id="product-select">
        Select Product
      </InputLabel>
      <Select
        label="product-select"
        name="product-select"
        onChange={(x) => {onClick(x.target.value)}}
        value={selectedProduct}
      >
        {products.map((product) => (
          <MenuItem key={product.id} value={product.id}>
            {product.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}