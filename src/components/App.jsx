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

export default function App() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.app.loading);
  const products = useSelector(state => state.products);
  const productDetail = useSelector(state => state.productDetail);

  function handleSelectProduct(id) {
    dispatch(handleFetchProduct(id))
  }

  useEffect(() => {
    dispatch(handleFetchProducts())
  }, [dispatch]);

  return loading ? <Loading /> : (
    <div id="app">
      {products.products &&
        <Nav
          products={products.products}
          selectedProduct={productDetail.product.id}
          onClick={(id) => handleSelectProduct(id)}
        />
      }

      <ProductOverview />
      <RelatedComp />
      <QuestionsList />

    </div>
  );
}