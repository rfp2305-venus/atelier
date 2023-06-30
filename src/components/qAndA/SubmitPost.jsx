const { API_URL, API_KEY } = process.env;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Button, Typography, TextField } from '@mui/material';
// <TextField> analogous to <input>

import axios from 'axios';

export default function SubmitPost({ id, body, type, open, setOpen }) {

  const { product } = useSelector(({ productDetail }) => productDetail);

  // user inputs **
  const [ submission, setSubmission ] = useState('');
  const [ user, setUser ] = useState('');
  const [ email, setEmail ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    let endpoint;

    if (type === 'question') {
      endpoint = `${ API_URL }/qa/${ type }s`;
    } else {
      endpoint = `${ API_URL }/qa/questions/${ id }/${ type }s`;
    }

    // only exec if all input fields filled correctly
    // regex to verify email (boo)
    if (user !== '' && email !== '' && submission !== '') {
      // ^ technically superfluous since 'required' prop used below

      // POST req w/ relevant data
      axios({
        method: 'post',
        url: endpoint,
        headers: { Authorization: API_KEY },
        data: {
          product_id: product.id,
          name: user,
          email: email,
          body: submission
        }
      })
        .then(() => {
          console.log(`${ user } posted ${ type }: ${ submission }`);
          setOpen(false);
        })
        .catch((err) => {
          console.error(`Error posting submission: ${ err }`);
        });

      // close modal after submission **
      setOpen(false);

    } else { // otherwise alert user
      // also superfluous
      alert(`This error will occur if :
      1. Any mandatory fields are blank
      2. The email address provided is not in the correct format
      `);
    }
  };

  return (
    <Box>
      <Button onClick={ () => setOpen(true) }>
        Add { type }
      </Button>

      <Dialog
        open={ open }
        onClose={ () => setOpen(false) }
        aria-labelledby="add-submission"
        aria-describedby="post-submission-for-given-product"
        onClick={ (e) => e.stopPropagation() } // NOTE: prevents event from bubbling up to Accordion
      >
        <DialogTitle>
          { (type === 'question')
            ? ('Ask Your Question')
            : ('Submit Your Answer') }
        </DialogTitle>

        <DialogContent>
          <Typography variant="subtitle1">
            { (type === 'question')
              ? (`About "${ product.name }"`)
              : (`${ product.name }: ${ body }`) }
          </Typography>

          <Typography variant="body2" sx={{ marginTop: '15px', marginBottom: '15px' }}>
            NOTE: Mandatory fields denoted by asterisks
          </Typography>

          <form onSubmit={ handleSubmit }>
            <Typography variant="body1">
              <strong>Your nickname: **</strong>
            </Typography>
            <TextField
              placeholder="jackson69!"
              value={ user }
              onChange={ (e) => setUser(e.target.value) }
              // NOTE: useful props below!
              required
              inputProps={{ maxLength: 60 }}
            />

            <br />
            <Typography variant="body2" sx={{ marginTop: '15px', marginBottom: '15px' }}>
              For privacy reasons, do not use your full name or email address
            </Typography>

            <Typography variant="body1">
              <strong>Your email: **</strong>
            </Typography>
            <TextField
              placeholder="spongebob69@jeemail.gov"
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
              type="email" // enforces email format validation!
              required
              inputProps={{ maxLength: 60 }}
            />

            <br />
            <Typography variant="body2" sx={{ marginTop: '15px', marginBottom: '15px' }}>
              For authentication reasons, you will not be emailed
            </Typography>

            <Typography variant="body1">
              <strong>Your { type }: **</strong>
            </Typography>
            <TextField
              placeholder={
                (type === 'question')
                  ? ('So what\'s the deal with airline food?')
                  : ('So here\'s the deal with airline food...')
              }
              value={ submission }
              onChange={ (e) => setSubmission(e.target.value) }
              fullWidth
              required
              inputProps={{ maxLength: 1000 }}
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={ () => setOpen(false) }>
            Cancel
          </Button>

          <Button type="submit" onClick={ handleSubmit }>
            Submit { type }
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}