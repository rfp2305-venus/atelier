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

  const outfit = useSelector((state) => state.article);
  // let outfitList = outfit.map((article) => <OutfitCard article={article} key={article.id}/>);

  const sliderItems = outfit.length > 4 ? 4 : outfit.length;
  const items = [];
  for (let i = 0; i < outfit.length; i += sliderItems) {
    if ( i % sliderItems === 0) {
      items.push(
        outfit.slice(i, i + sliderItems).map((article, index) => {
          return <OutfitCard article={article} key={article.id}/>;
        })
      );
    }
  }

  return outfit[0] ? (
    <>
      <Typography component='p' className="title">YOUR OUTFIT</Typography>
      <Carousel component='span' id="your-outfit" width='800px' autoplay={false} interval={null}>
        <span className='carousel'>
          <AddToOutfit />
          {items}
        </span>
      </Carousel>
    </>) :
    (<>
      <Typography component='p' className="title">YOUR OUTFIT</Typography>
      <Box sx={{width: 800}}>
        <AddToOutfit />
      </Box>
    </>);
}