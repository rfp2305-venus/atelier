import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export default function Nav({products, selectedProduct, onSelectProduct} ) {

  return (
    <FormControl sx={{m: 1, minWidth: '150px'}}>
      <InputLabel id="product-select">
        Select Product
      </InputLabel>
      <Select
        data-testid="product-select"
        label="product-select"
        name="product-select"
        onChange={(x) => {onSelectProduct(x.target.value)}}
        value={selectedProduct}
      >
        {products.map((product, i) => (
          <MenuItem
            data-testid="product-select-option"
            key={product.id + '_' + i}
            value={product.id}>
            {product.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}