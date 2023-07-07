import React from 'react';
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge';
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useSelector} from "react-redux";


export default function Nav({products, selectedProduct, onSelectProduct} ) {
  const cart = useSelector(state => state.cart);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [cartAnchorEl, setCartAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCartMenu = (event) => {
    setCartAnchorEl(event.currentTarget);
  }

  const handleCloseCart = () => {
    setCartAnchorEl(null);
  }

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

        <div>
            <IconButton
              onClick={handleCartMenu}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Badge badgeContent={cart.products.length} color="success">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <Menu
              data-testid="cart-menu"
              id="cart-appbar"
              anchorEl={cartAnchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(cartAnchorEl)}
              onClose={handleCloseCart}
            >
              {cart.products.map((product) => (
                <MenuItem
                  data-testid="cart-menu-item"
                  key={`cart-item-${product.id}`}
                  /*onClick={() => {
                    handleClose();
                    onSelectProduct(product.id);
                  }}*/
                >{product.name}</MenuItem>
              ))}
            </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}