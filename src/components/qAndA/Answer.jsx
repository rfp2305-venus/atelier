import React from 'react';
import ReactDOM from 'react-dom';

import Upvote from './Upvote';
import Report from './Report';

/*
accepts { answer } obj
  > id
  > body
  > number of votes
  > user
  > isReported (boolean flag)
*/
export default function Answer({ id, questionID, body, date, user, votes, photos }) {

  // console.log('answer:', body);

  return (
    <>
      <tr>
        <td>
          <strong>A:</strong> { body }
        </td>
      </tr>

      <tr>
        <td>
          {/* if (user === 'Seller') —> BOLD */}
          By { user /* (user === 'Seller') ? <strong>{ user }</strong> : { user } */} — { date }
        </td>
      </tr>

      <tr>
        <td>
          <strong>Helpful?</strong>
          <Upvote id={ id } type={ 'answer' } votes={ votes } />
        </td>

        <td>
          <Report />
        </td>
      </tr>

      <tr></tr>
      <tr></tr>
    </>
  );
}