/* eslint-disable func-style */
import react from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

import OutfitCard from './OutfitCard';
import AddToOutfit from './AddToOutfit';
import { Box, Typography } from '@mui/material';

export default function YourOutfit() {
  const [ outfit, setOutfit ] = useState([]);

  //declare add to outfit fn - pass into AddToOutfit prop
  function wearArticle() {

  }
  //declare remove from outfit fn - pass into each OutfitCard
  function removeArticle() {
    
  }

  return (
    <>
      <Typography component='p' className="title">YOUR OUTFIT</Typography>
      <div className="carousel" id="your-outfit">
        <AddToOutfit />
        <OutfitCard />
        <OutfitCard />
        <OutfitCard />
      </div>
    </>
  );
}