
import React from "react";

export default function ProductGallery({product}) {

  console.log(product)
  return (
    <img src={product.photos[0].url} alt="" style={{maxHeight: '50vh'}}/>
  );
}