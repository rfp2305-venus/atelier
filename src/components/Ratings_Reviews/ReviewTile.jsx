const { API_URL, API_KEY } = process.env;

import React, { useState } from 'react';
import ReviewsList from './ReviewsList';
import Rating from '@mui/material/Rating';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

export default function ReviewTile({review}) {
  const [reviewHelpful, setReviewHelpful] = useState({helpfulness: review.helpfulness, helpfulStatus: false});
  const [reviewReported, setReviewReported] = useState(false);



  const dateFormat = () => {
    const date = new Date(review.date).toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric'
    });
    return `${date}`;
  };

  let recommendText = 'I recommend this product';

  const helpfulReview = () => {
    return axios
      .put(`${API_URL}/reviews/${review.review_id}/helpful`, {
        headers: { Authorization: API_KEY },
      })
      .then(() => {
        setReviewHelpful({helpfulness: reviewHelpful.helpfulness});
        console.log(reviewHelpful);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const reportedReview = () => {
    return axios
      .put(`${API_URL}/reviews/${review.review_id}/report`, {
        headers: { Authorization: API_KEY },
      })
      .then(() => {
        setReviewReported(true);
        console.log(reviewReported);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      <div className="reviewCard">
        <div className="reviewName">{review.reviewer_name}
          <Rating name="quarter-rating-review" className='reviewStar' defaultValue={review.rating} precision={0.25} readOnly />
        </div>
        <div className="reviewSummary">{review.summary}</div>
        <div className="reviewBody">{review.body}</div>
        <div className="reviewDate"> {`${dateFormat(review.date)}`}</div>
        <div className="reviewRecommended">
          {review.recommend && (
            <span><CheckCircleOutlineOutlinedIcon style={{ color: 'green' }} /> {recommendText}</span>)}
        </div>
        <div>{review.photos.slice(0, 5).map((photo, i) => {
          return <img className='reviewPhotos' key={photo.id} src={photo.url}></img>;
        })}</div>
        <div id='helpfulReported'>
          <span className="reviewHelpful">
        Helpful?{' '}
            <span className='reviewTileFooterHelpfulStatus'
              onClick={() => {
                { helpfulReview; }
                if (reviewHelpful.helpfulStatus === false) {
                  setReviewHelpful({helpfulness: reviewHelpful.helpfulness + 1, helpfulStatus: true});
                }
              }}
            >
              Yes ({reviewHelpful.helpfulness})
            </span>
          </span>
        </div>
        <div>
          <span className="reviewReported">
        Report: {' '}
            <span className='reviewTileFooterHelpfulStatus'
              onClick={() => {
                { reportedReview; }
                if (reviewReported === false) {
                  setReviewReported(true);
                }
              }}
            >
              {reviewReported === false ? 'Report' : 'Reported'}
            </span>
          </span>
        </div>
      </div>
    </>
  );
}

