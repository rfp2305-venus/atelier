import React from 'react';
import ReviewsList from './ReviewsList';

export default function ReviewTile({review}) {

  const dateFormat = () => {
    const date = new Date(review.date).toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric'
    });
    return `${date}`;
  };


  return (
    <>
      <div className="reviewCard">
        <div className="reviewName">{review.reviewer_name}</div>
        <div className="reviewSummary">{review.summary}</div>
        <div className="reviewBody">{review.body}</div>
        <div className="reviewDate"> {`${dateFormat(review.date)}`}</div>
        <div>{review.photos.slice(0, 5).map((photo, i) => {
          return <img className='reviewPhotos' key={photo.id} src={photo.url}></img>;
        })}</div>
      </div>
    </>
  );
}

