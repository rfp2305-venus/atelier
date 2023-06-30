import React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ProductOverview from './ProductOverview/ProductOverview.jsx';
import RelatedComp from './relatedAndComp/RelatedComp.jsx';
import {handleFetchProducts} from "../state/Products/actions";
import Loading from '../lib/Loading';

import QuestionsList from './qAndA/QuestionsList';
import Nav from "../lib/Nav";
import {handleFetchProduct} from "../state/productDetail/actions";
import ReviewsList from './Ratings_Reviews/ReviewsList';
import {Box, Container} from "@mui/material";

export default function App() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.app.loading);
  const products = useSelector(state => state.products);
  const productDetail = useSelector(state => state.productDetail);

  function handleSelectProduct(id) {
    dispatch(handleFetchProduct(id))
  }

  useEffect(() => {
    if(!products.products) {
      dispatch(handleFetchProducts())
    }
  }, [dispatch]);

  return loading ? <Loading /> : (
    <Box id="app">
      {products.products &&
        <Nav
          products={products.products}
          selectedProduct={productDetail.product ? productDetail.product.id : ''}
          onSelectProduct={(id) => handleSelectProduct(id)}
        />
      }

      {productDetail.product && (
        <Container spacing={0} sx={{padding: '0'}}>
          <ProductOverview />
          <RelatedComp />
          <QuestionsList />
          <ReviewsList />
        </Container>
      )}

    </Box>
  );
}
