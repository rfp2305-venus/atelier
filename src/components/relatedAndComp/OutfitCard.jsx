/* eslint-disable func-style */
import react from 'react';
import { useEffect, useState } from 'react';
import { IconButton, Card, CardMedia, CardContent, Typography } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { useDispatch } from 'react-redux';
import { removeArticle } from '../../state/outfit/actions';
import RelStarRating from './RelStarRating';


export default function OutfitCard(props) {
  let item = props;
  const dispatch = useDispatch();

  function handleRemove() {
    dispatch(removeArticle(item));
  }

  return (
    <div data-testid='OutfitCard'>
      <Card className="card" sx={{width: 150, height: 200}}>
        <div className="card-first-row">
          <CardMedia
            className='related-products-thumbnail'
            component='img'
            alt={`image of ${props.article.article.name}`}
            image={props.article.article.styles[0].photos[0].thumbnail_url}
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
          <RelStarRating productID={item.article.article.id}/>
        </CardContent>
      </Card>
    </div>

  );
}
