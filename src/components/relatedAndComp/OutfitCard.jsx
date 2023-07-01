import react from 'react';
import { useEffect, useState } from 'react';
import { IconButton, Card, CardMedia, CardContent, Typography } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';


export default function OutfitCard() {
  return (

    <Card className="card" sx={{width: 150, height: 200}}>
      <div className="card-first-row">
        <CardMedia
          className='related-products-thumbnail'
          component='img'
          alt="lizzy the lizard"
          image='https://images.pexels.com/photos/735174/pexels-photo-735174.jpeg?cs=srgb&dl=pexels-sameera-madusanka-735174.jpg&fm=jpg'
        />
        <span>
          <IconButton>
            <HighlightOffOutlinedIcon />
          </IconButton>
        </span>
      </div>
      <CardContent>
        <Typography component='p'>category</Typography>
        <Typography component='p'>product name</Typography>
        <Typography component='p'>$123</Typography>
      </CardContent>
    </Card>
  );
}
