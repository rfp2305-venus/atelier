import React from 'react';
import ReactDOM from 'react-dom';

import Upvote from './Upvote';
import Report from './Report';
import AnswersList from './AnswersList';

export default function Question({ id, body, date, user, helpfulness, reported }) {

  return (
    // consider converting to table & answers to div for formatting
    <>
      <h3>Q: { body }</h3>
      By { user } — { date }
      <br /><br />

      <strong>Helpful?</strong>
      <Upvote id={ id } type="question" helpfulness={ helpfulness } />
      <Report id={ id } type="question" reported={ reported } />
      <br /><br />

      <AnswersList questionID={ id } />
    </>
  );
}