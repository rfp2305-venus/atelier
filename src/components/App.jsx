import React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ProductOverview from './ProductOverview/ProductOverview.jsx';
import RelatedComp from './relatedAndComp/RelatedComp.jsx';
import {handleFetchProducts} from "../state/Products/actions";
import Loading from '../lib/Loading';

import QuestionsList from './qAndA/QuestionsList';

export default function App() {
  const dispatch = useDispatch();
  const { loading, products, productDetail } = useSelector(
    ({ app, products, productDetail }) => ({...app, products, productDetail})
  );

  useEffect(() => {
    dispatch(handleFetchProducts())
  }, [dispatch]);

  return (
    <>
      <div id="app">
        {loading ? <Loading /> : null}
        <ProductOverview />
        <RelatedComp />

        <QuestionsList />

      </div>
    </>
  );
}