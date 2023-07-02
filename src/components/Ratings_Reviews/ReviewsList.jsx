const { API_URL, API_KEY } = process.env;

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ReviewTile from './ReviewTile';
import SortOptions from './SortOptions.jsx';
import RatingsBreakdown from './RatingsBreakdown';
import './RatingsReviews.css';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';



export default function ReviewsList({currentProductId, reviewSort, handleSortSelect}) {

  const { product } = useSelector(({ productDetail }) => productDetail);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(100);
  const [sortby, setSortby] = useState('relevant');
  const [results, setResults] = useState([]);
  const [reviewsQuantity, setReviewsQuantity] = useState(2);
  const [filteredReviewsList, setFilteredReviewsList] = useState([]);

  const fetchReviews = () => {
    return axios
      .get(`${API_URL}/reviews`, {
        headers: { Authorization: API_KEY },
        params: {
          product_id: product.id,
          page: page,
          count: count,
          sort: sortby,
        },
      })
      .then((res) => {
        const { results } = res.data;
        setReviews((prevReviews) => prevReviews.concat(results));
      })
      .catch((err) => {
        console.error(`Error fetching reviews: ${err}`);
      });
  };

  useEffect(() => {
    if (product) {
      fetchReviews();
    }
  }, [product, page, sortby, count]);

  const handleMoreReviews = () => {
    if (filteredReviewsList.length > 0) {
      if (filteredReviewsList.length > reviewsQuantity) {
        setReviewsQuantity((prevQuantity) => prevQuantity + 2);
      }
    } else {
      if (reviews.length > reviewsQuantity) {
        setReviewsQuantity((prevQuantity) => prevQuantity + 2);
      }
    }
  };

  const handleFilteredRatings = (star) => {
    const filteredReviews = reviews.filter((review) => review.rating === Number(star));
    setFilteredReviewsList(filteredReviews);
    setReviewsQuantity(2);
  };

  const handleLessReviews = () => {
    setReviewsQuantity(2);
  };

  let showMoreReviewsButton = (
    <button className="reviewsButton" onClick={handleMoreReviews}>
      More Reviews +
    </button>
  );
  let showLessReviewsButton = (
    <button className="reviewsButton" onClick={handleLessReviews}>
      Less Reviews
    </button>
  );

  if (filteredReviewsList.length > 0 && (filteredReviewsList.length < 2 || filteredReviewsList.length <= reviewsQuantity)) {
    showMoreReviewsButton = null;
  } else if (reviews.length < 2 || reviews.length <= reviewsQuantity) {
    showMoreReviewsButton = null;
  }

  let renderedReviewsList = [];
  for (let i = 0; i < reviewsQuantity; i++) {
    if (filteredReviewsList.length > 0) {
      if (filteredReviewsList[i] !== undefined) {
        renderedReviewsList.push(filteredReviewsList[i]);
      }
    } else {
      if (reviews[i] !== undefined) {
        renderedReviewsList.push(reviews[i]);
      }
    }
  }
  console.log('renderedReviewsList', renderedReviewsList);
  console.log('REVIEWS', reviews);

  return (

    <Grid container spacing={1}>
      <Grid item xs={3}>
        <div>
          <RatingsBreakdown reviews={reviews}
            productID={product.id} setReviews={setReviews} handleFilteredRatings={handleFilteredRatings}
          />
        </div>
      </Grid>
      <Grid item xs={9}>
        <div>
          <SortOptions setReviews={setReviews} setSortby={setSortby}/>
          {renderedReviewsList.map((review) => (
            <ReviewTile key={review.review_id} review={review} id={review.review_id}/>
          ))}
          {/* <div><button className='showMoreButton' onClick={showMore}>More Reviews</button></div> */}
        </div>
        {showMoreReviewsButton}
        {showLessReviewsButton}
      </Grid>
    </Grid>
  );
}
