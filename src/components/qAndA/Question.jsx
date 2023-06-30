import React from 'react';
import ReactDOM from 'react-dom';

import { Box, Typography } from '@mui/material';

import Upvote from './Upvote';
import Report from './Report';
import AnswersList from './AnswersList';

export default function Question({ id, body, date, user, helpfulness, reported }) {

  return (
    <Box>
      <Typography variant="h6" component="h3">
        Q: { body }
      </Typography>

      <Typography variant="body2">
        By { (user === 'Seller') ? (<strong>Seller</strong>) : (user) } — { date }
      </Typography>

      <Typography variant="body2" sx={{ marginBottom: '25px' }}>
        Helpful?
        <Upvote id={ id } type="question" helpfulness={ helpfulness } />
        <Report id={ id } type="question" reported={ reported } />
      </Typography>

      <AnswersList questionID={ id } />
    </Box>
  );
}