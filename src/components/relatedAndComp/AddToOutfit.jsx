/* eslint-disable func-style */
import react from 'react';
import { useEffect, useState } from 'react';
import { Button, Card, CardMedia, CardContent, Typography } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { wearArticle } from '../../state/outfit/actions';
import { useSelector, useDispatch } from 'react-redux';

export default function AddToOutfit() {
  const { product } = useSelector(({ productDetail }) => productDetail);
  const outfit = useSelector((state) => state.article);
  const dispatch = useDispatch();

  function handleID() {
    const found = outfit.some((article) => article.productID === product.id);
    if (!found) {
      dispatch(wearArticle(product.id));
    } else {
      alert('you already have this item in your outfit!');
    }
  }

  return (
    <div data-testid='add-to-outfit'>
      <Card className="card" id='add-to-outfit' >
        <Button variant='contained' onClick={()=> handleID()} data-testid='add-to-outfit-button'>Add to Outfit</Button>
      </Card>
    </div>
  );
}