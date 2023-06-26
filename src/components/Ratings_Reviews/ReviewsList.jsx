import React from 'react';
import { useSelector } from 'react-redux';
import ReviewTile from './ReviewTile';

export default function ReviewsList() {
  const reviews = useSelector(({ reviews }) => reviews);

  return (
    <div>
      {reviews.map((review) => (
        <ReviewTile key={review.id} review={review} />
      ))}
    </div>
  );
}
