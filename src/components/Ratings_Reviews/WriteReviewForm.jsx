const { API_URL, API_KEY } = process.env;
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import HoverRating from './NewReviewStars';
import NewCharInput from './NewCharInput';
import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Button, Typography, TextField } from '@mui/material';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


export default function WriteReviewForm({prodCharacteristics, productID, setReviews}) {

  const { product } = useSelector(({ productDetail }) => productDetail);

  const [characteristics, setCharacteristics] = useState({});
  const [rating, setRating] = useState(5);
  const [recommend, setRecommend] = useState('');
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);
  const [open, setOpen] = React.useState(false);
  //const [review, setReview] = useState([]);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRecommendChange = (e) => {
    e.target.value === 'true' ? setRecommend(true) : setRecommend(false);
  };

  const handleTextChange = (e) => {
    if (e.target.id === 'reviewSummary') {
      setSummary(e.target.value);
    } else if (e.target.id === 'reviewBody') {
      setBody(e.target.value);
    } else if (e.target.id === 'reviewName') {
      setName(e.target.value);
    } else if (e.target.id === 'reviewEmail') {
      setEmail(e.target.value);
    }
  };

  const handleStarChange = (e) => {
    if (e.target.id === 'starRating') {
      setRating(e.target.value);
    }
    console.log(rating);
  };

  const handleSubmitReview = (e) => {
    axios({
      method: 'post',
      url: `${ API_URL }/reviews`,
      headers: { Authorization: API_KEY },
      data: {
        product_id: product.id,
        rating: rating,
        summary: summary,
        body: body,
        recommend: recommend,
        name: name,
        email: email,
        photos: photos,
        characteristics: characteristics
      }
    })
      // .then(() => {
      //   setReviews(product_id);
      // })
      .then((res) => {
        console.log(res);
      }).catch(error => {
        console.log('error', error);
      });
  };

  return (
    <Grid container spacing={1}>

      <Button id='addReview' variant="outlined" onClick={handleClickOpen}>
    Add a Review +
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='md'
      >
        <div id='reviewForm'>
          <div>Write Your Review</div>
          <div>About the Product Here!</div>
          <div >

            <div>
            How would you rate this product?
              <HoverRating id='starRating' value={rating} onChange={handleStarChange} />
            </div>

            <form id='recommendItem'>
              <div className='recommendItem'>
            Do you recommend this product?
              </div>
              <input type='radio' name='recommend' value={true} onChange={handleRecommendChange}/>Yes
              <input type='radio' name='recommend' value={false} onChange={handleRecommendChange}/>No
            </form>

            <form id='reviewComments'>
              <label htmlFor='reviewSummary'>Review Summary</label>
              <textarea id='reviewSummary' onChange={handleTextChange} value={summary} maxLength='60' placeholder='Example: Best purchase ever!'></textarea>

              <label htmlFor='reviewBody'>Review Body</label>
              <textarea id='reviewBody' onChange={handleTextChange} value={body} maxLength='1000' placeholder='Why did you like the product or not?'></textarea>

              <label htmlFor='reviewName'>Nickname</label>
              <input type='text' id='reviewName' onChange={handleTextChange} value={name} maxLength='60' placeholder='Example: H.R.!'></input>

              <div id='nameWarning'>For privacy reasons, do not use your full name or email address.</div>

              <label htmlFor='reviewEmail'>Email Address</label>
              <input type='text' id='reviewEmail' onChange={handleTextChange} value={email} maxLength='60' placeholder='Example: hackreactor@gmail.com'></input>

              <div id='emailWarning'>For authentication reasons, you will not be emailed.</div>
            </form>
          </div>

          <div id='characteristicsInput'>
            {Object.keys(prodCharacteristics).map((char) => (
              <NewCharInput characteristic={char} key={prodCharacteristics[char].id} id={prodCharacteristics[char].id} charValue={prodCharacteristics[char].value}/>
            ))}
          </div>

          <button id='submitButton' onClick={handleSubmitReview}>
          Submit
          </button>
        </div>
      </Dialog>

    </Grid>
  );
}

