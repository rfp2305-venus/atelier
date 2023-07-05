import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function ImageModal({ open, handleClose, imageURL }) {

  return (
    <Dialog open={ open } onClose={ handleClose }>
      <DialogTitle>
        <IconButton
          edge="end"
          onClick={ handleClose }
          sx={{ position: 'absolute', top: 8, right: 8 }}
          // added for easy ref in test suite
          aria-label="Close"
          role="button"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <img
          src={ imageURL }
          style={{
            display: 'block',
            maxWidth: '100%',
            maxHeight: 'calc(100vh - 150px)',
            margin: '0 auto'
          }}
        />
      </DialogContent>
    </Dialog>
  );
}