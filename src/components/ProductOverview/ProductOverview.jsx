import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleFetchProduct } from '../../state/productDetail/actions.js';
import ProductForm from './ProductForm.jsx';
import {handleFetchProducts} from "../../state/Products/actions.js";
import Nav from "../../lib/Nav";
import ProductGallery from "./ProductGallery";
import useResize from "../../lib/useResize";


export default function ProductOverview() {
  const dispatch = useDispatch();
  const {products, productDetail} = useSelector(({ products, productDetail }) => ({productDetail, products}));
  const [selectedStyle, setSelectedStyle] = useState(null);
  const windowWidth = useResize();

  function handleSelectStyle(styleId) {

    for(let i = 0; i < productDetail.product.styles.length; i++) {
      if(styleId === productDetail.product.styles[i].style_id) {
        setSelectedStyle(productDetail.product.styles[i]);
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


  return (
    <>
      <section className="container view">
        {selectedStyle &&
          <ProductGallery product={selectedStyle} />
        }

        {productDetail.product &&
          <ProductForm
            product={productDetail.product}
            selectedStyle={selectedStyle}
            onSelectStyle={handleSelectStyle}
          />
        }

        <div className="row test-layout" id="product-info"></div>
      </section>
    </>
  )
}