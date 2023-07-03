/* eslint-disable func-style */
import react from 'react';
import { useEffect, useState } from 'react';
import { IconButton, Card, CardMedia, CardContent, Typography } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { removeArticle } from '../../state/outfit/actions';


export default function OutfitCard(props) {
  let item = props;
  const dispatch = useDispatch();

  function handleRemove() {
    dispatch(removeArticle(item));
  }

  return (

    <Card className="card" sx={{width: 150, height: 200}}>
      <div className="card-first-row">
        <CardMedia
          className='related-products-thumbnail'
          component='img'
          alt={`image of ${item.article.article.name}`}
          image={item.article.article.styles[0].photos[0].thumbnail_url}
        />
        <span>
          <IconButton onClick={handleRemove}>
            <HighlightOffOutlinedIcon />
          </IconButton>
        </span>
      </div>
      <CardContent>
        <Typography component='p'>{item.article.article.category}</Typography>
        <Typography component='p'>{item.article.article.name}</Typography>
        <Typography component='p'>{item.article.article.default_price}</Typography>
      </CardContent>
    </Card>
  );
}
