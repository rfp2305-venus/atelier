import React from 'react';
import {AppBar, FormControl, IconButton, InputLabel, Menu, MenuItem, Select, Toolbar, Typography} from "@mui/material";
import {Menu as MenuIcon} from "@mui/icons-material";


export default function Nav({products, selectedProduct, onSelectProduct} ) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <AppBar position="static" sx={{
      backgroundColor: '#36393b'
    }}>
      <Toolbar>
        <IconButton
          onClick={handleMenu}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {products.products && products.products.map((product) => (
            <MenuItem
              key={`productMenuItem${product.id}`}
              onClick={() => {
                handleClose();
                onSelectProduct(product.id);
              }}>{product.name}</MenuItem>
          ))}
        </Menu>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Atelier
        </Typography>
      </Toolbar>
    </AppBar>
  )


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
        {products.products && products.products.map((product, i) => (
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