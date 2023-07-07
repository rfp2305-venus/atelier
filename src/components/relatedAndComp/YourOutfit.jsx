/* eslint-disable func-style */
const {API_URL, API_KEY} = process.env;

import react from 'react';
import axios from 'axios';

import OutfitCard from './OutfitCard';
import AddToOutfit from './AddToOutfit';
import { Box, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from 'react-material-ui-carousel';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';

export default function YourOutfit() {

  const outfit = useSelector((state) => state.article);
  let outfitList = outfit.map((article) => <OutfitCard article={article} key={article.id}/>);

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

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return outfit[0] ? (
    <div>
      <Typography component='p' className="title">YOUR OUTFIT</Typography>
      <Carousel responsive={responsive} className='carousel'>
        <AddToOutfit />
        {outfitList}
      </Carousel>
    </>) :
    (<>
      <Typography component='p' className="title">YOUR OUTFIT</Typography>
      <Box sx={{width: 800}}>
        <AddToOutfit />
      </Box>
    </>);
}

*/