const {API_URL, API_KEY} = process.env;

import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function RelatedCard({ productID }) {
  // console.log('props in RelatedCard', productID); //
  const [product, setProduct] = useState({});
  useEffect(()=>{
    axios({
      method: 'get',
      url: `${API_URL}/products/${productID}`,
      headers: {
        Authorization: API_KEY
      }
    }).then(response => {
      console.log('response', response.data);
      setProduct(response.data);
    }).catch(error => {
      console.log('error', error);
    });
  }, []);

  return (
    <>
      <div className="card related-card">
        <div className="related-product-pic"></div>
        <p>{product.category}</p>
        <h4>{product.name}</h4>
        <p>{product.default_price}</p>
      </div>
    </>
  );

}