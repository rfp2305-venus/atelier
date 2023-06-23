import React from "react";
import {useSelector} from "react-redux";
import ProductStyle from "./ProductStyle.jsx";

export default function ProductStyles() {
  const {styles} = useSelector(({productDetail}) => productDetail.product);

  return styles.map((style) => (
    <ProductStyle style={style}/>
  ))
}