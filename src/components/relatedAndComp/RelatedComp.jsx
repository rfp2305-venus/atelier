import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';
import './relatedStyles.css';
import aSimpleAction from '../../state/related/actions.js';
import executeRequest from '../../util/api.js';
import axios from 'axios';

const baseURL = process.env.API_URL;
const apiKey = process.env.API_KEY;

export default function RelatedComp() {
  // const state = useSelector((state) => state);
  // const dispatch = useDispatch();
  // console.log('state', state);
  // useEffect(()=>{
  //   dispatch(aSimpleAction());
  // }, []);
  const { product } = useSelector(({ productDetail }) => productDetail);
  // console.log('product', product);
  let productId, endpoint, relatedProducts;

  useEffect(() => {
    if (product !== null) {
      // console.log('product.id', product.id);
      productId = product.id;
      axios({
        method: 'get',
        url: `${baseURL}/products/${productId}/related`,
        headers: {
          Authorization: apiKey
        }
      }).then((response) => {
        relatedProducts = response.data;
        // console.log('relatedProducts', relatedProducts);
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