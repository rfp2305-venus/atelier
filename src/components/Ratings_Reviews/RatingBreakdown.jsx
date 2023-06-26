import React from 'react';
import { useSelector } from 'react-redux';

export default function RatingBreakdown() {
  const averageRating = useSelector(({ rating }) => rating.average);
  const totalReviews = useSelector(({ reviews }) => reviews.length);

  return (
    <div>
      <h4>Average Rating: {averageRating}</h4>
      <p>Total Reviews: {totalReviews}</p>
      {/* Render breakdown of ratings */}
    </div>
  );
}
