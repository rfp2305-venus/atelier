/* eslint-disable func-style */
import react from 'react';
import { useEffect, useState } from 'react';
import { Button, Card, CardMedia, CardContent, Typography } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { useSelector, useDispatch } from 'react-redux';


export default function OutfitCard({ wearArticle }) {
  const { product } = useSelector(({ productDetail }) => productDetail);

  function handleID() {
    console.log('product.id', product.id);
    wearArticle(product.id);
  }

  return (

    <Card className="card" id='add-to-outfit'>
      <Button variant='contained' onClick={()=>{handleID()}}>Add to Outfit</Button>
    </Card>
  );
}