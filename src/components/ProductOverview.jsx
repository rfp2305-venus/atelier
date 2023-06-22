import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleFetchProduct } from '../state/productDetail/actions.js';

const HARDCODEDPRODUCTID = 40344;

export default function ProductOverview() {
  const state = useSelector(({ productDetail }) => productDetail)
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(handleFetchProduct(HARDCODEDPRODUCTID))
  }, [dispatch]);

  console.log(state);

  return (
    <div className="container flex-center">
      <div className="container view">
        <div className="container test-layout" id="product-gallery" ></div>

        <div className="container test-layout" id="product-form"></div>

        <div className="row test-layout" id="product-info"></div>
      </div>
    </div>
  )
}