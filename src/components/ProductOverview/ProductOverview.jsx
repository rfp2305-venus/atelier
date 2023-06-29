import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductForm from './ProductForm.jsx';
import ProductGallery from "./ProductGallery";
import useResize from "../../lib/useResize";
import StarRating from "../../lib/StarRating";
import ProductStyles from "./ProductStyles";
import SizeSelector from "../../lib/SizeSelector";
import {Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography} from "@mui/material";


export default function ProductOverview() {
  const productDetail = useSelector((state) => state.productDetail);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const windowWidth = useResize();

  function handleSelectStyle(styleId) {
    for(let i = 0; i < productDetail.product.styles.length; i++) {
      if(styleId === productDetail.product.styles[i].style_id) {
        setSelectedStyle(productDetail.product.styles[i]);
        setSize(null);
        setQuantity(null);
        return;
      }
    }
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


  function createQuantityItems( size) {
    const items = [];
    for(let x = 0; x < size; x++) {
      items.push(
        <MenuItem key={x} value={x + 1} >
          {x + 1}
        </MenuItem>
      )
    }
    return items;
  }

  return (
    <Container>
      <Grid container spacing={2} sx={{maxWidth: '1200px'}}>
        <Grid item xs={12} sm={8} style={{maxWidth: '100%'}}>
          { selectedStyle && <ProductGallery product={selectedStyle} />}
        </Grid>

        <Grid item sm={4}>
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
                  onSelect={(x) => setSize(x) }
                />

                {size && (

                  <FormControl sx={{m: 1, minWidth: '150px'}}>
                    <InputLabel id="quantity">
                      Quantity
                    </InputLabel>
                    <Select label="quantity"
                            name="quantity"
                            id="quantity-select"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                    >
                      {createQuantityItems(selectedStyle.skus[size].quantity)}
                    </Select>
                  </FormControl>
                )}
              </div>

            </div>
          )}
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={2}>
            <div className="row test-layout" id="product-info"></div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
