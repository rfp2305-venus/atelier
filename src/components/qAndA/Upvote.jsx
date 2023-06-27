const { API_URL, API_KEY } = process.env;

import React from 'react';
import ReactDOM from 'react-dom';

import { useState } from 'react';

import axios from 'axios';

export default function Upvote({ id, type, helpfulness }) {

  const [ votes, setVotes ] = useState(helpfulness);
  const [ hasVoted, setVoted ] = useState(false);

  return (
    <button disabled={ hasVoted } onClick={(e) => {
      e.preventDefault();

      // send PUT req to update helpfulness
      axios
        .put(`${ API_URL }/qa/${ type }s/${ id }/helpful`, {
          // NOTE: increments helpfulness
          helpfulness: helpfulness + 1
        }, {
          headers: { Authorization: API_KEY }
        })
        .then(() => {
          // increment helpfulness on click
          setVotes(votes + 1);
          console.log('Helpfulness updated (+1)!');

          // toggle disable thereafter
          setVoted(true);
        })
        .catch((err) => {
          console.error(`Error updating helpfulness: ${ err }`);
        });
    }}>
      Yes ({ votes })
    </button>
  );
}