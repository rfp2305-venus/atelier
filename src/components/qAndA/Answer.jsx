import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

import Upvote from './Upvote';
import Report from './Report';
import ImageModal from './ImageModal';

export default function Answer({ id, body, date, user, isSeller, helpfulness, photos, reported }) {

  const [ imageOpen, setImageOpen ] = useState(false);
  const [ imageURL, setImageURL ] = useState('');

  const handleClick = (url) => {
    setImageURL(url);
    setImageOpen(true);
  };

  return (
    <Box sx={{ marginTop: '20px' }}>
      <Typography variant="subtitle1">
        <strong>A:</strong> { body }
      </Typography>

      { (photos.length > 0) && (
        photos.map(({ id, url }) => (
          <img
            key={ id }
            src={ url }
            style={{
              maxHeight: '100px',
              maxWidth: 'auto',
              margin: '5px',
              cursor: 'pointer' // indicates clickable
            }}
            onClick={ () => handleClick(url) }
          />)
        )) }

      <Typography variant="body2">
        By { (isSeller) ? (<strong>Seller</strong>) : (user) } — { date }
      </Typography>

      <Typography variant="body2" sx={{ marginBottom: '20px' }}>
        Helpful? <Upvote id={ id } type="answer" helpfulness={ helpfulness } />
        <Report id={ id } type="answer" reported={ reported } />
      </Typography>

      {/* render ImageModal */}
      <ImageModal
        open={ imageOpen }
        handleClose={ () => setImageOpen(false) }
        imageURL={ imageURL }
      />
    </Box>
  );
}