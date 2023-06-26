import React from 'react';

export default function ReviewTile({ review }) {
  return (
    <div>
      <h4>{review.summary}</h4>
      <p>{review.body}</p>
      {/* Render other review details */}
    </div>
  );
}
