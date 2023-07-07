import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductForm from './ProductForm.jsx';
import ProductGallery from "./ProductGallery";
import useResize from "../../lib/useResize";
import StarRating from "../../lib/StarRating";
import ProductStyles from "./ProductStyles";
import SizeSelector from "../../lib/SizeSelector";

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import QuantitySelector from "../../lib/QuantitySelector";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Check from '@mui/icons-material/Check';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import {handleAddProductToCart} from "../../state/Cart/actions";


export default function ProductOverview() {
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const windowWidth = useResize();

  function handleAddToCart() {
    const product = {
      product_id: productDetail.product.id,
      name: productDetail.product.name,
      style_id: selectedStyle,
      size: size,
      quantity: quantity
    };
    dispatch(handleAddProductToCart(product));
  }

  function handleSelectStyle(styleId) {
    for(let i = 0; i < productDetail.product.styles.length; i++) {
      if(styleId === productDetail.product.styles[i].style_id) {
        setSelectedStyle(productDetail.product.styles[i]);
        setSize('');
        setQuantity('');
        return;
      }
    }
  }

  function handleSetSize(size) {
    setSize(size);
    setQuantity(1);
  }

  useEffect(() => {
    if(productDetail.product) {
      for(let i = 0; i < productDetail.product.styles.length; i++) {
        if(productDetail.product.styles[i]['default?']) {
          setSelectedStyle(productDetail.product.styles[i]);
          setSize('');
          return;
        }
      }
    }
  }, [productDetail]);

  useEffect(() => {
    if(size) {
      setQuantity(selectedStyle.skus[size].quantity);
    } else {
      setQuantity('');
    }
  }, [size])

  return (
    <Grid container spacing={1} sx={{padding: 0, maxWidth: '1200px'}}>
      <Grid item xs={12} md={9} style={{maxWidth: '100%', minHeight: '50vh'}}>
        { selectedStyle && <ProductGallery product={selectedStyle} />}
      </Grid>

      <Grid item xs={12} md={3}>
        {productDetail.product && selectedStyle && (
          <div className="product-form">
            <StarRating />

            <Typography>
              {productDetail.product.category}
            </Typography>
            <Typography variant='h4'>
              {productDetail.product.name}
            </Typography>
            <Typography sx={{color: selectedStyle.sale_price ? 'green' : 'initial'}}>
              {
                selectedStyle.sale_price
                  ? selectedStyle.sale_price
                  : productDetail.product.default_price
              }
            </Typography>

            <Stack className="form-inputs" spacing={2}>
              <ProductStyles
                styles={productDetail.product.styles}
                onSelectStyle={handleSelectStyle}
                selectedStyle={selectedStyle}
              />

              <div className="form-row">
                <SizeSelector
                  skus={selectedStyle.skus}
                  selectedSize={size}
                  onSelect={handleSetSize}
                />

                <QuantitySelector
                  quantity={
                    selectedStyle && size
                      ? selectedStyle.skus[size].quantity
                      : 1
                  }
                  selected={quantity}
                  onSelect={setQuantity}
                />
              </div>
            </Stack>

            <Stack className="actions" direction={'row'}>
              <Button
                variant="outlined"
                sx={{flexGrow: 1}}
                onClick={handleAddToCart}
              >
                Add To Cart
              </Button>

              <IconButton
                aria-label="favorite"
                size="large"
                onClick={() => setFavorite(!favorite)}
              >
                {
                  favorite
                    ? <Favorite fontSize="inherit" />
                    : <FavoriteBorder fontSize="inherit" />
                }
              </IconButton>
            </Stack>

          </div>
        )}
      </Grid>

      <Grid item xs={12}>
        <Container
          sx={{
            maxWidth: '800px',
            margin: '50px auto'
          }}
        >

          <Stack direction='row' spacing={2}>
            <Box>
              <Typography variant='h6'>
                {productDetail.product.slogan}
              </Typography>

              <Typography>
                {productDetail.product.description}
              </Typography>
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem />
            <List>
              {productDetail.product.features.filter((feat) => (
                !!feat.value
              )).map((feat) => (
                <ListItem key={'productFeature' + feat.feature}>
                  <ListItemIcon>
                    <Check />
                  </ListItemIcon>
                  <ListItemText>
                    {feat.value}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Stack>
        </Container>
      </Grid>
    </Grid>
  )
}
