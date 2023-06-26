import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleFetchProduct } from '../../state/productDetail/actions.js';
import ProductForm from './ProductForm.jsx';
import {handleFetchProducts} from "../../state/Products/actions.js";
import Nav from "../../lib/Nav";
import ProductGallery from "./ProductGallery";


export default function ProductOverview() {
  const dispatch = useDispatch();
  const {products, productDetail} = useSelector(({ products, productDetail }) => ({productDetail, products}));
  const [selectedStyle, setSelectedStyle] = useState(null);

  function handleSelectProduct(id) {
    dispatch(handleFetchProduct(id))
  }

  useEffect(() => {
    dispatch(handleFetchProducts());
  }, [dispatch]);

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



  return (
    <>
      {products.products && <Nav products={products.products}
                                       onClick={(id) => handleSelectProduct(id)}/>
      }
      <div className="container view">
        {selectedStyle && <ProductGallery product={selectedStyle} />}

        {productDetail.product && <ProductForm />}

        <div className="row test-layout" id="product-info"></div>
      </div>
    </>
  )
}