const {API_URL, API_KEY} = process.env;

import React from 'react';
import { useEffect, useState } from 'react';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';
import './relatedStyles.css';
import axios from 'axios';
//REDUX
import { useSelector, useDispatch } from 'react-redux';
// import aSimpleAction from '../../state/related/actions.js';

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
  }, []);

  return (
    <>
      <div id="related-and-comp">
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
/*
redux tutorial:
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log('state', state);
  useEffect(()=>{
    dispatch(aSimpleAction());
  }, []);
*/