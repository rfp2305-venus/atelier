const { API_URL, API_KEY } = process.env;

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ReviewTile from './ReviewTile';
import SortOptions from './SortOptions.jsx';
import WriteReviewForm from './WriteReviewForm';
//import RatingBreakdown from './RatingBreakdown';
import './RatingsReviews.css';



export default function ReviewsList({currentProductId, reviewSort, handleSortSelect}) {

  const { product } = useSelector(({ productDetail }) => productDetail);
  //const review = useSelector(({ reviews }) => reviews);
  const [reviews, setReviews] = useState([]);
  //const [showMore, setShowMore] = useState(2);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(2);
  const [sortby, setSortby] = useState('relevant');


  const showMore = () => {
    setPage(page => page + 1);
  };

  const fetchReviews = () => {
    return axios.get(`${ API_URL }/reviews`, {
      headers: { Authorization: API_KEY },
      params: {
        product_id: product.id,
        page: page,
        count: count,
        sort: sortby
      }
    })
      .then((res) => {

        const { results } = res.data;

        setReviews(reviews.concat(results));

        // setReviews((reviews) => [...reviews, results]);
      })
      .catch((err) => {
        console.error(`Error fetching reviews: ${ err }`);
      });
  };

  useEffect(() => {
    //console.log('before', product && product.id);
    if (product) {
      //console.log('after', product.id);
      fetchReviews();
    }
  }, [ product, page, sortby ]);

  console.log('REVIEWS', reviews);

  return (

    <div>
      <SortOptions setReviews={setReviews} setSortby={setSortby}/>
      <div>
        <h3 className='reviews'>Ratings & Reviews</h3>
        {reviews.map((review) => (
          <ReviewTile key={review.review_id} review={review} id={review.review_id}/>
        ))}
        <div><button className='showMoreButton' onClick={showMore}>More Reviews</button></div>
        <WriteReviewForm/>
      </div>
    </div>
  );
}



