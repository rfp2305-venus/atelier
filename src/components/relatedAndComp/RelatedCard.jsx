const {API_URL, API_KEY} = process.env;

import React from 'react';
import { useEffect, useState } from 'react';
import RelStarRating from './RelStarRating';
import axios from 'axios';

export default function RelatedCard({ productID }) {
  const [ product, setProduct ] = useState({});
  const [ productStyles, setProductStyles ] = useState({});
  const [ productPhoto, setProductPhoto ] = useState('');

  useEffect(()=>{
    axios({
      method: 'get',
      url: `${API_URL}/products/${productID}`,
      headers: {
        Authorization: API_KEY
      }
    }).then(response => {
      setProduct(response.data);
    }).catch(error => {
      console.log('error', error);
    });
  }, []);

  useEffect(() => {
    axios({
      method: 'get',
      url: `${API_URL}/products/${productID}/styles`,
      headers: {
        Authorization: API_KEY
      }
    }).then(response => {
      setProductStyles(response.data);
      setProductPhoto(response.data.results[0].photos[0].thumbnail_url);
    }).catch(error => {
      console.log('error', error);
    });
  }, [product]);

  return (
    <>
      <div className="card">
        <div className="related-product-pic">
          <img src={productPhoto} alt={product.name} className='related-products-thumbnail'/>
        </div>
        <p>{product.category}</p>
        <h4>{product.name}</h4>
        <p>{product.default_price}</p>
        <RelStarRating productID={productID}/>
      </div>
    </>
  );
}