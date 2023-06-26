const { API_URL, API_KEY } = process.env;

import React from 'react';
import ReactDOM from 'react-dom';

import { useState } from 'react';

import axios from 'axios';

export default function Upvote({ id, type, votes }) {

  // refactor to Redux
  const [ score, setScore ] = useState(votes);
  const [ hasVoted, setVoted ] = useState(false);

  return (
    <button disabled={ hasVoted } onClick={(e) => {
      e.preventDefault();

      // send PUT req to update score
      axios // NOTE: 401 Error resolved (needed null)
        .put(`${ API_URL }/qa/${ type }s/${ id }/helpful`, null, {
          headers: { Authorization: API_KEY }
        })
        .then(() => {
          // increment score on click
          setScore(score + 1);
          console.log('Helpfulness updated (+1)!');

          // toggle disable thereafter
          setVoted(true);
        })
        .catch((err) => {
          console.error(`Error updating helpfulness: ${ err }`);
        });
    }}>
      Yes ({ score })
    </button>
  );
}