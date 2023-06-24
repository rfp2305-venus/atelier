import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleFetchProduct } from '../../state/productDetail/actions.js';
import ProductForm from './ProductForm.jsx';
import {handleFetchProducts} from "../../state/Products/actions.js";
import Nav from "../../lib/Nav";


export default function ProductOverview() {
  const state = useSelector(({ products, productDetail }) => ({productDetail, products}));
  const dispatch = useDispatch();

  function handleSelectProduct(id) {
    dispatch(handleFetchProduct(id))
  }

  React.useEffect(() => {
    dispatch(handleFetchProducts());
  }, [dispatch]);

  return (
    <>
      {state.products.products && <Nav products={state.products.products}
                                       onClick={(id) => handleSelectProduct(id)}/>
      }
      <div className="container flex-center">
        <div className="container view">
          <div className="container test-layout" id="product-gallery" ></div>

          <div className="container test-layout" id="product-form">
            {state.productDetail.product && <ProductForm />}
          </div>

          <div className="row test-layout" id="product-info"></div>
        </div>
      </div>
    </>
  )
}