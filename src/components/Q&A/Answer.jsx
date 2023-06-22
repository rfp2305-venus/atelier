import React from 'react';
import ReactDOM from 'react-dom';

export default function Answer({ a }) {

  // can JSX fragment be child of table (?)
  return (
    <>
      <tr>
        <td>
          <strong>A:</strong>
        </td>
        <td>
          {/* ANSWER HERE */ a }
        </td>
      </tr>

      <tr>
        {/* BUTTONS HERE */}
        <td>
          Helpful? {/* Yes button */}
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