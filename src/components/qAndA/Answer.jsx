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
export default function Answer({ body, date, user, votes, photos }) {

  console.log('answer:', body);

  return (
    <>
      <tr>
        <td>
          <strong>A: { body }</strong>
        </td>
      </tr>

      <tr>
        <td>
          Helpful? <Upvote />
        </td>

        <td>
          <Report />
        </td>
      </tr>
    </>
  );
}