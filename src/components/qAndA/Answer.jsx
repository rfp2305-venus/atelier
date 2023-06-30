import React from 'react';
import ReactDOM from 'react-dom';

import { Box, Typography } from '@mui/material';

import Upvote from './Upvote';
import Report from './Report';

export default function Answer({ id, body, date, user, isSeller, helpfulness, photos, reported }) {

  return (
    <Box sx={{ marginTop: '20px' }}>
      <Typography variant="subtitle1">
        <strong>A:</strong> { body }
      </Typography>

      <Typography variant="body2">
        By { (isSeller) ? (<strong>Seller</strong>) : (user) } — { date }
      </Typography>

      <Typography variant="body2" sx={{ marginBottom: '30px' }}>
        Helpful?
        <Upvote id={ id } type="answer" helpfulness={ helpfulness } />
        <Report id={ id } type="answer" reported={ reported } />
      </Typography>
    </Box>
  );
}