/* eslint-disable func-style */
const {API_URL, API_KEY} = process.env;

import React from 'react';
import { useEffect, useState } from 'react';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';
import './relatedStyles.css';
import axios from 'axios';
//REDUX
import { useSelector } from 'react-redux';


export default function RelatedComp() {
  const { product } = useSelector(({ productDetail }) => productDetail);

  const [ relatedProducts, setRelatedProducts ] = useState([]);
  let productId;
  let endpoint;

  useEffect(() => {
    if (product !== null) {
      productId = product.id;
      axios({
        method: 'get',
        url: `${API_URL}/products/${productId}/related`,
        headers: {
          Authorization: API_KEY
        }
      }).then((response) => {
        setRelatedProducts(response.data);
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [product]);

  return (
    <>
      <div id="related-and-comp" data-testid='related-comp-test'>
        <div>
          <RelatedProducts relatedProducts={relatedProducts}/>
        </div>
        <div>
          <YourOutfit />
        </div>
      </div>
    </>
  );
}