/* eslint-disable func-style */
import react from 'react';
import { useEffect, useState } from 'react';
import { Button, Card, CardMedia, CardContent, Typography } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { wearArticle } from '../../state/outfit/actions';
import { useSelector, useDispatch } from 'react-redux';

export default function AddToOutfit() {
  const { product } = useSelector(({ productDetail }) => productDetail);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  function handleID() {
    dispatch(wearArticle(product.id));
  }

  return (
    <Card className="card" id='add-to-outfit'>
      <Button variant='contained' onClick={()=> handleID()}>Add to Outfit</Button>
    </Card>
  );
}