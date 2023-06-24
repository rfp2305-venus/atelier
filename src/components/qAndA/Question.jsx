import React from 'react';
import ReactDOM from 'react-dom';

import AnswersList from './AnswersList';

/*
accepts { question } obj
  > id
  > body
  > number of votes
  > user
*/
export default function Question(q) {
  // expanding & collapsing accordion

  const { id, body, votes, user } = q;

  return (
    <>
      <strong>Q:</strong> { body }
      <br />

      {/* Yes button */}
      Helpful? <Upvote />

      {/* render answers below */}
      <AnswersList />
    </>
  );
}