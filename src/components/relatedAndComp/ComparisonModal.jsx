import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardMedia, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton, Typography } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
//REDUX
import { useSelector, useDispatch } from 'react-redux';


export default function ComparisonModal({open, onClose, productID}) {

  const { currentProduct } = useSelector(({ productDetail }) => productDetail);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='comparison-modal-title' aria-describedby='comparison-dialog-description'
    >
      <DialogTitle id='comparison-modal-title'>COMPARING</DialogTitle>
      <DialogContent>
        <DialogContentText id='comparison-dialog-description'>
          {productID}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <IconButton onClick={onClose}>
          <HighlightOffOutlinedIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}