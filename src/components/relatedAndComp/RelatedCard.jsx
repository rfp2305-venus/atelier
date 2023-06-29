/* eslint-disable func-style */
const {API_URL, API_KEY} = process.env;

import React from 'react';
import { useEffect, useState } from 'react';
import RelStarRating from './RelStarRating';
import axios from 'axios';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Card, CardMedia, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton, Typography } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import ComparisonModal from './ComparisonModal';
//redux
import { useSelector, useDispatch } from 'react-redux';
import handleModal from '../../state/related/actions.js';
import aSimpleAction from '../../state/related/actions.js';

export default function RelatedCard({ productID }) {
  const modalStatus = useSelector((state) => state.modalStatus);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [ product, setProduct ] = useState({});
  const [ productStyles, setProductStyles ] = useState({});
  const [ productPhoto, setProductPhoto ] = useState('');
  const [ open, setOpen ] = useState(false);

  useEffect(()=>{
    dispatch(handleModal(true));
    // console.log('modalStatus:', modalStatus);
    console.log('state:', state);
  }, [open]);

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
    // alert(`that tickled! my id is ${event.target.id}`);
    setOpen(true);
  }
  function handleClose(value) {
    setOpen(false);
  }

  return (
    <>
      <Card className="card">
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
            <ComparisonModal open={open} onClose={handleClose} productID={productID}/>
          </span>
        </div>
        <CardContent>
          <Typography component='p'>{product.category}</Typography>
          <Typography component='p'>{product.name}</Typography>
          <Typography component='p'>{product.default_price}</Typography>
          <RelStarRating productID={productID}/>
        </CardContent>
      </Card>
    </>
  );
}

/*

<div className="card">
        <div className="card-first-row">
          <img src={productPhoto} alt={product.name} className='related-products-thumbnail'/>
          <span>
            <IconButton id={product.id} onClick={event => handleIcon(event)}>
              <StarBorderOutlinedIcon id={product.id} />
            </IconButton>
          </span>
        </div>
        <p>{product.category}</p>
        <h4>{product.name}</h4>
        <p>{product.default_price}</p>
        <RelStarRating productID={productID}/>
      </div>


*/
