/* eslint-disable func-style */
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardMedia, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import CheckIcon from '@mui/icons-material/Check';
//REDUX
import { useSelector, useDispatch } from 'react-redux';
import {handleFetchComparisonProduct} from '../../state/related/actions';

export default function ComparisonModal({open, onClose, productID, comparisonExists, setComparisonExists}) {

  const dispatch = useDispatch();

  const product = useSelector((state) => state.productDetail.product);
  const comparison = useSelector((state) => state.comparisonDetail.comparisonDetail);

  useEffect(() => {
    AssignComparisonProduct(productID);
  }, [open, dispatch]);

  function AssignComparisonProduct(productID) {
    dispatch(handleFetchComparisonProduct(productID));
  }

  return (comparison ?
    (<>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby='comparison-modal-title' aria-describedby='comparison-dialog-description'
      >
        <DialogTitle id='comparison-modal-title'>COMPARING</DialogTitle>
        <DialogContent>
          <TableContainer >
            <Table
              size='small' aria-label='a-dense-table'>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>{product.name}</TableCell>
                  <TableCell align='center'></TableCell>
                  <TableCell align='center'>{comparison.name}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align='center'>{(product.styles.length > 1) ? <CheckIcon /> : null}</TableCell>
                  <TableCell align='center'>multiple styles</TableCell>
                  <TableCell align='center'>{(comparison.styles.length > 1) ? <CheckIcon /> : null}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='center'>{(Object.keys(product.styles[0].skus).length > 1 ? <CheckIcon /> : null)}</TableCell>
                  <TableCell align='center'>multiple sizes</TableCell>
                  <TableCell align='center'>{(Object.keys(comparison.styles[0].skus).length > 1 ? <CheckIcon /> : null)}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align='center'>{(Object.values(product.rating.ratings).indexOf(null) === -1 ? <CheckIcon /> : null)}</TableCell>
                  <TableCell align='center'>reviewed</TableCell>
                  <TableCell align='center'>{(Object.values(comparison.rating.ratings).indexOf(null) === -1 ? <CheckIcon /> : null)}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align='center'>{Number(product.rating.recommended.false) < Number(product.rating.recommended.true) ? <CheckIcon /> : null}</TableCell>
                  <TableCell align='center'>recommended</TableCell>
                  <TableCell align='center'>{Number(comparison.rating.recommended.false) < Number(comparison.rating.recommended.true) ? <CheckIcon /> : null}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align='center'>{(product.features.length > 1) ? <CheckIcon /> : null}</TableCell>
                  <TableCell align='center'>multiple features</TableCell>
                  <TableCell align='center'>{(comparison.features.length > 1) ? <CheckIcon /> : null}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={onClose}>
            <HighlightOffOutlinedIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>) : null);

}
//(currentProduct.product.styles.length > 1) ? 'x' : null