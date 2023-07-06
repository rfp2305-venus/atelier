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
          data-testid="product-select"
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
              data-testid="product-select-option"
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
}