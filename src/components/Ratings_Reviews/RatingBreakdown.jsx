import React from 'react';
import { useState, useEffect } from 'react';

import Rating from '@mui/material/Rating';


export default function RatingBreakdown({reviews}) {

  useEffect(()=>{
    axios({
      method: 'get',
      url: `${API_URL}/reviews/meta?product_id=${productID}`,
      headers: {
        Authorization: API_KEY
      }
    }).then((response) => {
      setRatings(response.data.ratings);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

//   return (
//     <>
//       <div id="ratingBreakdown">
//         <div className="reviewName">{review.reviewer_name}
//           <Rating name="quarter-rating-review" defaultValue={review.rating} precision={0.25} readOnly />
//         </div>
//         <div className="reviewSummary">{review.summary}</div>
//         <div className="reviewBody">{review.body}</div>
//         <div className="reviewDate"> {`${dateFormat(review.date)}`}</div>
//         <div className="reviewRecommended">
//           {review.recommend &&
//         <CheckCircleOutlineOutlinedIcon style={{ color: 'green' }} />
//           } I recommend this product</div>
//         <div>{review.photos.slice(0, 5).map((photo, i) => {
//           return <img className='reviewPhotos' key={photo.id} src={photo.url}></img>;
//         })}</div>
//       </div>
//     </>
//   );
}

