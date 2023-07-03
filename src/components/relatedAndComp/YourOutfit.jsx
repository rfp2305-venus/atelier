/* eslint-disable func-style */
const {API_URL, API_KEY} = process.env;

import react from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

import OutfitCard from './OutfitCard';
import AddToOutfit from './AddToOutfit';
import { Box, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from 'react-material-ui-carousel';

export default function YourOutfit() {

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log('state:', state);
  }, []);

  const outfit = useSelector((state) => state.article);

  let outfitList = outfit.map((article) => <OutfitCard article={article} key={article.id}/>);

  return outfitList ? (
    <>
      <Typography component='p' className="title">YOUR OUTFIT</Typography>
      <Carousel id="your-outfit" width='800px'>
        <AddToOutfit />
        {outfitList}
      </Carousel>
    </>) :
    (<>
      <Typography component='p' className="title">YOUR OUTFIT</Typography>
      <Box className="carousel" id="your-outfit" width='800px'>
        <AddToOutfit />
      </Box>
    </>);
}