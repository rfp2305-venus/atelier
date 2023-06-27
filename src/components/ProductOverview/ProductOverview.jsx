import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductForm from './ProductForm.jsx';
import ProductGallery from "./ProductGallery";
import useResize from "../../lib/useResize";
import StarRating from "../../lib/StarRating";
import ProductStyles from "./ProductStyles";
import SizeSelector from "../../lib/SizeSelector";
import {Paper} from "@mui/material";


export default function ProductOverview() {
  const productDetail = useSelector((state) => state.productDetail);
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

        {productDetail.product && selectedStyle &&
          <ProductForm
            product={productDetail.product}
            selectedStyle={selectedStyle}
            onSelectStyle={handleSelectStyle}
          />
        }

        <Paper elevation={2}>
          <div className="row test-layout" id="product-info"></div>
        </Paper>
      </section>
    </>
  )
}
