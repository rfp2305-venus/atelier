import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import Upvote from './Upvote';
import Report from './Report';
import AnswersList from './AnswersList';
import SubmitPost from './SubmitPost';

export default function Question({ id, body, date, user, helpfulness, reported }) {

  const { product } = useSelector(({ productDetail }) => productDetail);

  return (
    <Box>
      <Typography variant="h6" component="h3">
        <strong>Q:</strong> { body }
      </Typography>

      <Typography variant="body2">
        By { (user === 'Seller') ? (<strong>Seller</strong>) : (user) } — { date }
      </Typography>

      <Typography variant="body2" sx={{ marginBottom: '25px' }}>
        Helpful? <Upvote id={ id } type="question" helpfulness={ helpfulness } />
        <Report id={ id } type="question" reported={ reported } />
      </Typography>

      <AnswersList questionID={ id } />
      <SubmitPost id={ id } body={ body } type="answer" />
    </Box>
  );
}