import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductForm from './ProductForm.jsx';
import ProductGallery from "./ProductGallery";
import useResize from "../../lib/useResize";
import StarRating from "../../lib/StarRating";
import ProductStyles from "./ProductStyles";
import SizeSelector from "../../lib/SizeSelector";
import {
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography
} from "@mui/material";
import QuantitySelector from "../../lib/QuantitySelector";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";


export default function ProductOverview() {
  const productDetail = useSelector((state) => state.productDetail);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const windowWidth = useResize();

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
      <Grid item xs={12} md={8} style={{maxWidth: '100%'}}>
        { selectedStyle && <ProductGallery product={selectedStyle} />}
      </Grid>

      <Grid item xs={12} md={4}>
        {productDetail.product && selectedStyle && (
          <div className="product-form">
            <StarRating />

            <Typography>
              {productDetail.product.category}
            </Typography>
            <Typography>
              {productDetail.product.name}
            </Typography>
            <Typography>
              {productDetail.product.default_price}
            </Typography>

            <ProductStyles
              styles={productDetail.product.styles}
              onSelectStyle={handleSelectStyle}
              selectedStyle={selectedStyle}
            />

            <div>
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

            <FormControl sx={{m: 1}}>
              <Button
                variant="outlined"
              >
                Add To Cart
              </Button>
            </FormControl>

            <FormControl sx={{m: 1}}>
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
            </FormControl>

          </div>
        )}
      </Grid>

      <Grid item xs={12}>
        <Stack direction='row' spacing={2}>
          <Box>
            <Typography>
              {productDetail.product.slogan}
            </Typography>

            <Typography>
              {productDetail.product.description}
            </Typography>
          </Box>
          <Stack spacing={2}>
            {productDetail.product.features.map((feat) => (
              <Typography>{feat.value}</Typography>
            ))}
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  )
}
