import React, { useState } from 'react';

export default function WriteReviewForm() {
  const [overallRating, setOverallRating] = useState(0);
  const [recommendation, setRecommendation] = useState('');
  const [characteristics, setCharacteristics] = useState({});
  const [reviewSummary, setReviewSummary] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [photos, setPhotos] = useState([]);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');


  const handleOverallRating = (rating) => {
    setOverallRating(rating);
  };

  const handleRecommendation = (value) => {
    setRecommendation(value);
  };

  const handleSubmitReview = (event) => {
    event.preventDefault();
    const errors = [];

    if (overallRating === 0) {
      errors.push('Overall rating is mandatory');
    }

    if (recommendation === '') {
      errors.push('Recommendation is mandatory');
    }


    if (reviewBody.length < 50) {
      errors.push('Review body must be at least 50 characters long');
    }

  };

}