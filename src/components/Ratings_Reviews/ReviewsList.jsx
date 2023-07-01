const { API_URL, API_KEY } = process.env;

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ReviewTile from './ReviewTile';
import SortOptions from './SortOptions.jsx';
import WriteReviewForm from './WriteReviewForm';
import RatingsBreakdown from './RatingsBreakdown';
import './RatingsReviews.css';



export default function ReviewsList({currentProductId, reviewSort, handleSortSelect}) {

  const { product } = useSelector(({ productDetail }) => productDetail);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(2);
  const [sortby, setSortby] = useState('relevant');

  // const [cntProducts, setCntProducts] = useState(0);
  // const [ratings, setRatings] = useState(null);
  // const [recommended, setRecommended] = useState(null);

  // const [filteredRatings, setFilteredRatings] = useState([]);
  // const [showHideMore, setShowHideMore] = useState(true);

  const showMore = () => {
    setPage(page => page + 1);
  };

  // const setSortby = (sortby) => {
  //   setReviews([]);
  //   setPage(1);
  //   setSort(sortby);
  // }

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

  // console.log('REVIEWS', reviews);

  // useEffect(() => {
  //   if (product) {
  //     fetchReviewMeta();
  //     if (filteredRatings.length > 0) {
  //       fetchAllReviews();
  //     } else {
  //       fetchReviews();
  //     }
  //   }
  // }, [ product, page, sortby, filteredRatings ]);

  // const fetchReviewMeta = () => {
  //   axios.get(`${ API_URL }/reviews/meta`, {
  //     headers: { Authorization: API_KEY },
  //     params: {
  //       product_id: product.id
  //     }
  //   }).then((res) => {
  //     const { ratings } = res.data;
  //     setRatings(ratings);
  //     const { recommended } = res.data;
  //     setRecommended(recommended);

  //     console.log('ratings', ratings);
  //     console.log('recommended', recommended);

  //     var cntProducts = (isNaN(recommended['false']) ? 0 : Number(recommended['false'])) + (isNaN(recommended['true']) ? 0 : Number(recommended['true']));
  //     setCntProducts(cntProducts);

  //     console.log('reviews/cnt', reviews.length + 2, cntProducts);
  //     if (reviews.length + 2 < cntProducts) { setShowHideMore(true); } else { setShowHideMore(false); }
  //   })
  //     .catch((err) => {
  //       console.error(`Error fetching meta: ${ err }`);
  //     });
  // };

  // const fetchAllReviews = () => {
  //   axios.get(`${ API_URL }/reviews`, {
  //     headers: { Authorization: API_KEY },
  //     params: {
  //       product_id: product.id,
  //       page: page,
  //       count: cntProducts,
  //       sort: sortby
  //     }
  //   })
  //     .then((res) => {

  //       const { results } = res.data;
  //       console.log('res.data', res.data);
  //       setReviews(results.filter(r => filteredRatings.indexOf(r.rating) >= 0));

  //     });
  // };

  // const handleFilteredRatings = (rating) => {
  //   const ratings = [...filteredRatings];

  //   if (ratings.indexOf(rating) < 0) {
  //     ratings.push(rating);
  //   } else {
  //     ratings.splice(ratings.indexOf(rating), 1);
  //   }

  //   setFilteredRatings(ratings);
  //   setReviews([]);
  //   setShowHideMore(false);
  // };


  return (

    <div>
      <div>
        <RatingsBreakdown reviews={reviews}/>
      </div>
      <SortOptions setReviews={setReviews} setSortby={setSortby}/>
      <div>
        {reviews.map((review) => (
          <ReviewTile key={review.review_id} review={review} id={review.review_id}/>
        ))}
        <div><button className='showMoreButton' onClick={showMore}>More Reviews</button></div>
        <WriteReviewForm/>
      </div>
    </div>
  );
}

{/* <SortOptions setSortby={setSortby} />
<div onClick={() => handleFilteredRatings(1)}>Rating 1</div>
<div onClick={() => handleFilteredRatings(2)}>Rating 2</div>
<div onClick={() => handleFilteredRatings(3)}>Rating 3</div>
<div onClick={() => handleFilteredRatings(4)}>Rating 4</div>
<div onClick={() => handleFilteredRatings(5)}>Rating 5</div>
<div>{filteredRatings}</div>
 */}
