const { API_URL, API_KEY } = process.env;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Button, Typography, TextField } from '@mui/material';
// <TextField> analogous to <input>

import axios from 'axios';

export default function SubmitPost({ id, body, type }) {

  const { product } = useSelector(({ productDetail }) => productDetail);

  const [ open, setOpen ] = useState(false);

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
    // NOTE: possibly more validation for email format
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
        })
        .catch((err) => {
          console.error(`Error posting submission: ${ err }`);
        });

      // close modal after submission **
      setOpen(false);

    } else {
      // otherwise alert user
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
              placeholder={ (type === 'question') ? ('What\'s the deal with airline food?') : ('Here\'s the deal with airline food...') }
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

/*
  const modalContent = (
    <Box sx={{
      width: 500,
      height: 300,
      // display: 'flex',
      // alignItems: 'center',
      // justifyContent: 'center',
      // height: '100%'
    }}>
      <Typography variant="h6" component="h2">
        { (type === 'question') ? ('Ask Your Question') : ('Submit Your Answer') }
      </Typography>

      <Typography variant="subtitle1">
        { (type === 'question')
          ? (`About "${ product.name }"`)
          : (`${ product.name }: ${ body }`) }
      </Typography>

      <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
        NOTE: Mandatory fields denoted by asterisks
      </Typography>

      <form onSubmit={ handleSubmit }>
        <strong>Your nickname: **</strong>
        <TextField
          placeholder="jackson69!"
          value={ user }
          onChange={ (e) => setUser(e.target.value) }
          // NOTE: useful props below!
          required
          inputProps={{ maxLength: 60 }}
        />

        <br />
        <Typography variant="body2">
          For privacy reasons, do not use your full name or email address
        </Typography>

        <strong>Your email: **</strong>
        <TextField
          placeholder="spongebob69@jeemail.gov"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          required
          inputProps={{ maxLength: 60 }}
        />

        <br />
        <Typography variant="body2">
          For authentication reasons, you will not be emailed
        </Typography>

        <strong>Your { type }: **</strong>
        <TextField
          placeholder={ (type === 'question') ? ('What\'s the deal with airline food?') : ('Here\'s the deal with airline food...') }
          value={ submission }
          onChange={ (e) => setSubmission(e.target.value) }
          fullWidth
          required
          inputProps={{ maxLength: 1000 }}
        />

        <Button type="submit">
          Submit { type }
        </Button>
      </form>
    </Box>
  );

  return (
    <>
      <Button onClick={(e) => {
        e.preventDefault();
        // open modal **
        setOpen(true);
      }}>
        Add { type }
      </Button>

      <Modal
        open={ open }
        onClose={() => setOpen(false)}
        aria-labelledby="add-submission"
        aria-describedby="post-submission-for-given-product"
        // inline styling to make modal more visible
        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
      >
        { modalContent }
      </Modal>
    </>
  );
*/