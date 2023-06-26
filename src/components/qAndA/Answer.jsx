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
export default function Answer({ id, body, date, user, votes, photos }) {

  // console.log('answer:', body);

  return (
    <>
      <tr>
        <th>
          <strong>A:</strong> { body }
        </th>
      </tr>

      <tr>
        <td>
          {/* only bold if user === 'Seller' */}
          By { user } — { date }
        </td>
      </tr>

      <tr>
        <td>
          Helpful? <Upvote /* id={ id } */ votes={ votes } />
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