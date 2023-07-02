const { API_URL, API_KEY } = process.env;
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Button, Typography, TextField } from '@mui/material';
import axios from 'axios';

export default function SubmitPost({ id, body, type }) {

  const { product } = useSelector(({ productDetail }) => productDetail);

  // user inputs
  const [ user, setUser ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ post, setPost ] = useState('');
  const [ photos, setPhotos ] = useState([]);

  const [ open, setOpen ] = useState(false);

  const reset = () => {
    // reset to initial states
    setUser('');
    setEmail('');
    setPost('');
    setPhotos([]);
    setOpen(false);
  };

  const uploadPhotos = (e) => {
    // convert files to array & limit to (5)
    const files = Array.from(e.target.files)
      .slice(0, 5 - photos.length);

    // console.log(`photos: ${[ ...photos ]}`);

    // set photos for POST req
    setPhotos((prev) => [ ...prev, ...files ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let endpoint;

    if (type === 'question') {
      // url for submitting new questions
      endpoint = `${ API_URL }/qa/${ type }s`;
    } else {
      // url for submitting new answers
      endpoint = `${ API_URL }/qa/questions/${ id }/${ type }s`;
    }

    // only exec if all input fields filled correctly
    if (user !== '' && email !== '' && post !== '') {
      // ^ technically superfluous since 'required' prop used below

      /*
      // instantiate FormData obj
      const formData = new FormData();

      // append all pertinent data
      formData.append('name', user);
      formData.append('email', email);
      formData.append('body', post);

      if (type === 'question') {
        formData.append('product_id', product.id);

      } else {
        // formData.append('photos', photos);
        photos.forEach((photo, i) => {
          formData.append(`photos[${ i }]`, photo);
        });
        console.log(`${ user } uploaded ${ photos.length } photos`);
      }

      // console.log(`formData: ${ formData }`);
      */

      // POST req w/ formData
      axios({
        method: 'post',
        url: endpoint,
        headers: {
          'Authorization': API_KEY,
          // 'Content-Type': 'multipart/form-data'
        },
        data: /* formData */ {
          name: user,
          email: email,
          body: post,
          // photos: photos
        }
      })
        .then(() => {
          console.log(`${ user } posted ${ type }: ${ post }`);
          reset();
        })
        .catch((err) => {
          console.error(`Error posting post: ${ err }`);
        });
      // */

    } else {
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

      <Dialog open={ open } onClose={ () => setOpen(false) }>
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
              type="email" // enforces email format validation
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
                  ? ('What\'s the deal with airline food?')
                  : ('Here\'s the deal with airline food...')
              }
              value={ post }
              onChange={ (e) => setPost(e.target.value) }
              fullWidth
              required
              inputProps={{ maxLength: 1000 }}
            />
          </form>

          { (type === 'answer') && (
            <Box sx={{ marginTop: '35px', marginBottom: '35px' }}>
              <Typography variant="body1" sx={{ marginBottom: '15px' }}>
                <strong>Your photos:</strong>
              </Typography>

              { (type === 'answer') && (photos.length < 5) && (
                <input
                  type="file"
                  multiple
                  onChange={ uploadPhotos }
                />
              ) }

              { photos.map((photo, i) => (
                <img
                  key={ i }
                  src={ URL.createObjectURL(photo) }
                  style={{
                    maxHeight: '100px',
                    maxWidth: 'auto',
                    margin: '5px'
                  }}
                />
              )) }
            </Box>
          ) }
        </DialogContent>

        <DialogActions>
          <Button onClick={ reset }>
            Cancel
          </Button>

          {/* <Button onClick={ (e) => setPhotos(e.target.files) }>
            Upload Photos
          </Button> */}

          <Button type="submit" onClick={ handleSubmit }>
            Submit { type }
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}