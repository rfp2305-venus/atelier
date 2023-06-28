const { API_URL, API_KEY } = process.env;

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ReviewTile from './ReviewTile';
import SortOptions from './SortOptions.jsx';
import WriteReviewForm from './WriteReviewForm';



export default function ReviewsList({currentProductId, reviewSort, handleSortSelect}) {

  const { product } = useSelector(({ productDetail }) => productDetail);
  //const review = useSelector(({ reviews }) => reviews);
  const [reviews, setReviews] = useState([]);
  //const [showMore, setShowMore] = useState(2);
  const [page, setPage] = useState(1);


  // const filteredReviewsList = [];
  // for (let review of reviewsList) {
  //   if (ratingsFilter.hasOwnProperty(review.rating) && ratingsFilter[review.rating] === true) {
  //     filteredReviewsList.push(review);
  //   }
  // }

  const showMore = () => {
    setPage(page => page + 1);
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
        console.log('RESULTS', results);
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
      {/* <span className='reviewsListHeaderText'>{`${filteredReviewsList.length > 0 ? filteredReviewsList.length : reviewsList.length} review${filteredReviewsList.length > 1 || reviewsList.length > 1 ? 's' : ''}, sorted by`}</span>
      <span>
        <SortOptions currentProductId={currentProductId} reviewSort={reviewSort} handleSortSelect={handleSortSelect} />
      </span> */}
      <SortOptions/>
      <div>
        <h3 className='reviews'>Ratings & Reviews</h3>
        {reviews.map((review) => (
          <ReviewTile key={review.review_id} review={review} id={review.review_id}/>
        ))}
        <div><button className='showMoreButton' onClick={showMore}>show more...</button></div>
        <WriteReviewForm/>
      </div>
    </div>
  );
}



