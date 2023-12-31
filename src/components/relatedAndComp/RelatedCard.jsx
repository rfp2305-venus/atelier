/* eslint-disable func-style */
const {API_URL, API_KEY} = process.env;

import React from 'react';
import { useEffect, useState } from 'react';
import RelStarRating from './RelStarRating';
import axios from 'axios';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Card, CardMedia, CardContent, IconButton, Typography} from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import ComparisonModal from './ComparisonModal';
//redux
import { useSelector, useDispatch } from 'react-redux';
// import aSimpleAction from '../../state/related/actions.js';
import {handleFetchProduct} from '../../state/productDetail/actions';

export default function RelatedCard({ productID }) {

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  // useEffect(()=>{
  //   console.log('state:', state);
  // }, []);

  const [ product, setProduct ] = useState({});
  const [ productStyles, setProductStyles ] = useState({});
  const [ productPhoto, setProductPhoto ] = useState('');
  const [ open, setOpen ] = useState(false);

  function handleSelectProduct(id) {
    dispatch(handleFetchProduct(id));
  }

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

  // eslint-disable-next-line func-style
  function handleIcon(event) {
    setOpen(true);
  }
  function handleClose(value) {
    setOpen(false);
  }

  return (
    <div data-testid='related-card'>
      <Card className="card" sx={{width: 150, height: 200}} data-testid={`related-card-container-${productID}`}>
        <div className="card-first-row">
          <CardMedia
            className='related-products-thumbnail'
            component='img'
            alt={product.name}
            image={productPhoto}
          />
          <span>
            <IconButton id={product.id} onClick={event => handleIcon(event)}>
              <StarBorderOutlinedIcon id={product.id} />
            </IconButton>
            <ComparisonModal open={open} onClose={handleClose} productID={productID} data-testid='comparison-modal'/>
          </span>
        </div>
        <CardContent onClick={(event) => handleSelectProduct(productID)}>
          <Typography component='p'>{product.category}</Typography>
          <Typography component='p'>{product.name}</Typography>
          <Typography component='p'>{product.default_price}</Typography>
          <RelStarRating productID={productID}/>
        </CardContent>
      </Card>
    </div>

  );
}
