const { API_URL, API_KEY } = process.env;

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import * as React from 'react';
import Characteristics from './Characteristics';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';


export default function RatingsBreakdown({reviews}) {

  const { product } = useSelector(({ productDetail }) => productDetail);
  const [ratings, setRatings] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [characteristics, setCharacteristics] = useState([]);

  // const [reviews, setReviews] = useState({});
  // const [page, setPage] = useState(1);
  // const [count, setCount] = useState(50);
  // const [sortby, setSortby] = useState('relevant');
  //const [totalReviews, setTotalReviews] = useState();
  //const [averageRating, setAverageRating] = useState();




  const fetchRatings = () => {
    return axios.get(`${ API_URL }/reviews/meta?product_id=${product.id}`, {
      headers: { Authorization: API_KEY },
      // params: {
      //   product_id: product.id,
      // }
    })
      .then((res) => {
        const {ratings} = res.data;
        setRatings(ratings);
        const {recommended} = res.data;
        setRecommended(recommended);
        const {characteristics} = res.data;
        setCharacteristics(characteristics);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (product) {
      fetchRatings();
    }
  }, [ product ]);

  console.log('RATINGS', ratings);
  console.log('RECOMMENDED', recommended);
  console.log('CHARACTERISTICS', characteristics);



  const calculateRecommended = (recommended) => {
    if (Object.keys(recommended).length === 0) {
      return 0;
    }
    const recommendedTrue = Number(recommended[true]);
    const totalRecommended = recommendedTrue + Number(recommended[false]);
    return isNaN(totalRecommended) ? 0 : Math.floor(recommendedTrue / totalRecommended * 100);
  };

  let starBreakdown = {};
  let starPercentages = {};

  let averageRating = 0;
  let totalReviews = 0;
  let starsText = ' stars';


  const calculateRating = (ratings) => {
    if (Object.keys(ratings).length === 0) {
      return 0;
    }
    let totalRating = 0;
    for (let star in ratings) {
      let numberReviews = Number(ratings[star]);
      starBreakdown[star] = numberReviews;
      totalRating += Number(star) * numberReviews;
      totalReviews += numberReviews;
    }
    for (let star in starBreakdown) {
      starPercentages[star] = starBreakdown[star] / totalReviews * 100;
    }
    averageRating = Number((totalRating / totalReviews).toFixed(1));
    return `${averageRating}`;
  };


  console.log('TOTALREVIEWS', totalReviews);



  return (
    <>
      <div id="ratingsReviews">
        <h3 className='reviews'>Ratings & Reviews</h3>
        <div id='reviewRating'>
          <Typography variant="h6" gutterBottom>
            {`${calculateRating(ratings)}`}
          </Typography>

        </div>

        <div>
          <Rating name="quarter-rating-review" className='productRatingStar' value={averageRating} precision={0.25} size='large' readOnly />
        </div>
        <div id='productRecommended'>
          {`${calculateRecommended(recommended)}% of reviews recommend this product`}
        </div>
        <div id='starsBreakdown'>
          {Object.entries(starPercentages).reverse().map(([key, value]) => (
            <div key={key} >
              <Box ml={3} sx={{ width: 300 }}>
                <span><Link href="#" underline="always">{key + ' stars' }</Link></span>
                <span><LinearProgress variant="determinate" value={value} sx={{
                }}/></span>
                <span>{Math.round(value * totalReviews / 100)}</span>
              </Box>
            </div>
          ))}
        </div>
        <div id='characteristics'>
          {Object.keys(characteristics).map((char) => (
            <Characteristics characteristic={char} id={characteristics[char].id} charValue={characteristics[char].value}/>
          ))}
        </div>
        <button id='addReview'
        >
          Add a Review +
        </button>
      </div>
    </>
  );
}

// const fetchReviews = () => {
//   return axios.get(`${ API_URL }/reviews`, {
//     headers: { Authorization: API_KEY },
//     params: {
//       product_id: product.id,
//       page: page,
//       count: count,
//       sort: sortby
//     }
//   })
//     .then((res) => {
//       setReviews(res.data);
//     })
//     .catch((err) => {
//       console.error(error);
//     });
// };

// useEffect(() => {
//   if (product) {
//     fetchReviews();
//   }
// }, [ product, page, sortby ]);
