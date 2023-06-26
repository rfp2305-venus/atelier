import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReviewsList from './ReviewsList.js';
import RatingBreakdown from './RatingBreakdown.js';
import SortOptions from './SortOptions.js';
import WriteReviewForm from './WriteReviewForm.js';

export default function RatingsAndReviews() {
  const { productId } = useSelector((state) => state.productDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReviews(productId));
    dispatch(fetchProductRating(productId));
  }, [dispatch, productId]);

  return (
    <div>
      <div className="">
        <RatingBreakdown />
      </div>
      <div className="">
        <SortOptions />
        <ReviewsList />
      </div>

      <WriteReviewForm />
    </div>
  );
}
