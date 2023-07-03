const { API_URL, API_KEY, UNSPLASH_URL, UNSPLASH_KEY } = process.env;
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Button, Typography, TextField } from '@mui/material';
import axios from 'axios';

export default function SubmitPost({ id, body, type }) {

  const { product } = useSelector(({ productDetail }) => productDetail);

  const [ open, setOpen ] = useState(false);

  // user inputs & validation
  const [ user, setUser ] = useState('');
  const [ userFilled, setUserFilled ] = useState(true);

  const [ email, setEmail ] = useState('');
  const [ emailFilled, setEmailFilled ] = useState(true);

  const [ post, setPost ] = useState('');
  const [ postFilled, setPostFilled ] = useState(true);

  const [ photos, setPhotos ] = useState([]);

  const reset = () => {
    // reset to initial states
    setUser('');
    setEmail('');
    setPost('');
    setUserFilled(true);
    setEmailFilled(true);
    setPostFilled(true);
    setPhotos([]);
    setOpen(false);
  };

  const validateInputs = () => {
    if (user.trim() !== '') {
      setUserFilled(true);
    } else {
      setUserFilled(false);
    }

    if (email.trim() !== '') {
      setEmailFilled(true);
    } else {
      setEmailFilled(false);
    }

    if (post.trim() !== '') {
      setPostFilled(true);
    } else {
      setPostFilled(false);
    }

    return userFilled && emailFilled && postFilled;
  };

  const inputPhotos = (e) => {
    // convert files to array & limit to (5)
    const files = Array.from(e.target.files)
      .slice(0, 5 - photos.length);

    // (bonus): add to existing photo set
    setPhotos((prev) => [ ...prev, ...files ]);
  };

  /*
  // uploads each photo to Unsplash API
  const unsplashUpload = (photo) => {
    return axios({
      method: 'post',
      url: UNSPLASH_URL,
      headers: { Authorization: `Client-ID ${ UNSPLASH_KEY }` },
      data: { photo: photo }
    })
      .then((res) => {
        // extract url for photo
        const photoURL = res.data.urls.regular;
        console.log(`Uploaded photo to Unsplash: ${ photoURL }`);

        return photoURL;
      })
      .catch((err) => {
        console.error(`Error uploading to Unsplash: ${ err }`);

        return null;
      });
  };
  */

  const handleSubmit = (e) => {
    e.preventDefault();

    // form validation
    const isValid = validateInputs();

    if (isValid) {
      /*
      // upload all photos to Unsplash
      Promise.all(
        photos.map((photo) => unsplashUpload(photo))
      )
        .then((photoURLs) => {
          // attach generated URLs to req data
          const postData = {
            product_id: product.id,
            name: user,
            email: email,
            body: post,
            photos: photoURLs
          };

          // define endpoint according to post type
          let endpoint;

          if (type === 'question') {
            // url for submitting new questions
            endpoint = `${ API_URL }/qa/${ type }s`;
          } else {
            // url for submitting new answers
            endpoint = `${ API_URL }/qa/questions/${ id }/${ type }s`;
          }

          // send POST req to Atelier API
          axios({
            method: 'post',
            url: endpoint,
            headers: { Authorization: API_KEY },
            data: postData
          })
            .then(() => {
              console.log(`${ user } posted ${ type }: ${ post }`);

              // reset input fields
              reset();
            })
            .catch((err) => {
              console.error(`Error posting to Atelier: ${ err }`);
            });
        })
        .catch((err) => {
          console.error(`Error posting to Unsplash: ${ err }`);
        });
      */

      let endpoint;

      if (type === 'question') {
        // url for submitting new questions
        endpoint = `${ API_URL }/qa/${ type }s`;
      } else {
        // url for submitting new answers
        endpoint = `${ API_URL }/qa/questions/${ id }/${ type }s`;
      }

      // POST req w/ formData
      axios({
        method: 'post',
        url: endpoint,
        headers: {
          'Authorization': API_KEY,
          // 'Content-Type': 'multipart/form-data'
        },
        data: /* postData */ {
          product_id: product.id,
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
          console.error(`Error posting: ${ err }`);
        });

    } else { // otherwise alert user
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
              error={ !userFilled }
              helperText={ (!userFilled) ? ('Name, please.') : (null) }
              // required
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
              error={ !emailFilled }
              helperText={ (!emailFilled) ? ('Promise not to spam you.') : (null) }
              type="email" // enforces email format validation
              // required
              fullWidth
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
              multiline
              fullWidth
              error={ !postFilled }
              helperText={ (!postFilled)
                ? (`Do you have ${ (type === 'question')
                  ? ('a question')
                  : ('an answer') }?`)
                : (null) }
              // required
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
                  onChange={ inputPhotos }
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

          {/* <Button onClick={ uploadPhotos }>
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