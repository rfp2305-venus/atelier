import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleFetchProduct } from '../../state/productDetail/actions.js';
import ProductForm from './ProductForm.jsx';
import {handleFetchProducts} from "../../state/Products/actions.js";
import Nav from "../../lib/Nav.jsx";

// const HARDCODEDPRODUCTID = 40344;
// const HARDCODEDPRODUCTID = 40346;40348
const HARDCODEDPRODUCTID = 40348


export default function ProductOverview() {
  const state = useSelector(({ products, productDetail }) => ({
    productDetail,
    products
  }))
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(handleFetchProduct(HARDCODEDPRODUCTID))
    dispatch(handleFetchProducts());
  }, [dispatch]);

  return (
    <div className="container flex-center">
      {state.products.products && <Nav products={state.products.products}/>}
      <div className="container view">
        <div className="container test-layout" id="product-gallery" ></div>

        <div className="container test-layout" id="product-form">
          {state.productDetail.product && <ProductForm />}
        </div>


        <div className="row test-layout" id="product-info"></div>
      </div>
    </div>
  )
}