const { API_URL, API_KEY } = process.env;

import React from 'react';
import ReactDOM from 'react-dom';

import { useState } from 'react';

import axios from 'axios';

export default function Upvote({ id, votes }) {

  const [ score, setScore ] = useState(votes);
  const [ voted, setVoted ] = useState(false);

  return (
    <button disabled={ voted } onClick={(e) => {
      e.preventDefault();

      const oldScore = score;

      // increment score on click
      setScore(score + 1);

      const newScore = score;

      // send PUT req to update score
      axios
        .put(`${ API_URL }/qa/questions/${ id }/helpful`, {
          headers: { Authorization: API_KEY },
        })
        .then(() => {
          console.log('Helpfulness updated!');

          console.log('oldScore:', oldScore);
          console.log('newScore:', newScore);
        })
        .catch((err) => {
          console.error(`Error updating helpfulness: ${ err }`);
        });

      // disable thereafter
      setVoted(true);
    }}>
      Yes ({ score })
    </button>
  );
}