const { API_URL, API_KEY } = process.env;

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ReviewTile from './ReviewTile';
import SortOptions from './SortOptions.jsx';
import WriteReviewForm from './WriteReviewForm';



export default function ReviewsList() {

  const { product } = useSelector(({ productDetail }) => productDetail);
  //const review = useSelector(({ reviews }) => reviews);
  const [reviews, setReviews] = useState([]);
  //const [showMore, setShowMore] = useState(2);
  const [page, setPage] = useState(1);
  const reviewList = [];

  const showMore = () => {
    setPage(page => page + 1);
    //fetchReviews(page, 2);
  };

  const fetchReviews = (page = 1, count = 2) => {
    return axios.get(`${ API_URL }/reviews`, {
      headers: { Authorization: API_KEY },
      params: {
        product_id: product.id,
        page: page,
        count: count
      }
    })
      .then((res) => {

        const { results } = res.data;
        // console.log('RESULTS', results);
        setReviews(results);

        // setReviews((reviews) => [...reviews, results]);
      })
      .catch((err) => {
        console.error(`Error fetching reviews: ${ err }`);
      });
  };

  useEffect(() => {
    // console.log('before', product && product.id);
    if (product) {
      // console.log('after', product.id);
      fetchReviews();
    }
  }, [ product ]);


  return (

    <div>
      <h3 className='reviews'>Ratings & Reviews</h3>
      {reviews.map((review) => (
        <ReviewTile key={review.review_id} review={review} id={review.review_id}/>

      ))}
      <div><button className='showMoreButton' onClick={showMore}>show more...</button></div>
      <WriteReviewForm/>
    </div>

  );
}



