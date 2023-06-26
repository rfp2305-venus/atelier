import React from 'react';
import ReactDOM from 'react-dom';

import Upvote from './Upvote';
import Report from './Report';

export default function Answer({ id, body, date, user, helpfulness, photos, reported }) {

  // console.log('answer:', body);

  return (
    <>
      <tr>
        <th>
          ———( ANSWERS HERE )———
        </th>
      </tr>
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
          Helpful? <Upvote id={ id } type={ 'answer' } helpfulness={ helpfulness } />
        </td>

        <td>
          {/* NOTE: no 'reported' prop on obj */}
          <Report id={ id } type={ 'answer' } reported={ (reported) ? (reported) : (false) } />
        </td>
      </tr>
    </>
  );
}