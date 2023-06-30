import React from 'react';
import ReviewsList from './ReviewsList';
import Rating from '@mui/material/Rating';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

export default function ReviewTile({review}) {

  const dateFormat = () => {
    const date = new Date(review.date).toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric'
    });
    return `${date}`;
  };

  let recommendText = 'I recommend this product';
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
      </div>
    </>
  );
}

