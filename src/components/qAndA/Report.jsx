const { API_URL, API_KEY } = process.env;

import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';

import axios from 'axios';

export default function Report({ id, type, reported }) {

  const [ isReported, setReported ] = useState(reported);

  return (
    <Button disabled={ isReported } onClick={ () => {
      axios
        .put(`${ API_URL }/qa/${ type }s/${ id }/report`,
          // updates report status
          { reported: true },
          { headers: { Authorization: API_KEY } }
        )
        .then(() => {
          console.log('Report request sent!');
          setReported(true);
        })
        .catch((err) => {
          console.error(`Error updating report status: ${ err }`);
        });
    }}>
      { (isReported) ? ('Reported') : ('Report') }
    </Button>
  );
}