import React from 'react';
import ReactDOM from 'react-dom';

import Upvote from './Upvote';
import AnswersList from './AnswersList';

/*
accepts { question } obj
  > id
  > body
  > number of votes
  > user
*/
export default function Question({ id, body, date, user, votes, reported, answers }) {
  // expanding & collapsing accordion

  return (
    <>
      <h3>Q: { body }</h3>
      Helpful? <Upvote id={ id } votes={ votes } />
      <br /><br />

      <AnswersList questionID={ id } answers={ answers } />
    </>
  );
}