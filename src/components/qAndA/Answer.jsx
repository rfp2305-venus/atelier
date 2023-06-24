import React from 'react';
import ReactDOM from 'react-dom';

/*
accepts { answer } obj
  > id
  > body
  > number of votes
  > user
  > isReported (boolean flag)
*/
export default function Answer(a) {

  // const { id, body, votes, user, isReported } = a;


  // can JSX fragment be child of table (?)
  return (
    <>
      <tr>
        <th>
          <strong>A:</strong>
          {/* ANSWER HERE */ a }
        </th>
      </tr>

      <tr>
        <td>
          <strong>Helpful?</strong>
          {/* Yes button */}
          <Upvote />
        </td>

        <td>
          {/* Report button */}
          <Report />
        </td>
      </tr>
    </>
  );
}