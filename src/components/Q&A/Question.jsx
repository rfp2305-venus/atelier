import React from 'react';
import ReactDOM from 'react-dom';

import AnswersList from './AnswersList.jsx';

// accepts question
export default function Question({ q }) {

  // can JSX fragment be child of table (?)
  return (
    <>
      <tr>
        <td>
          <strong>Q:</strong>
        </td>
        <td>
          {/* QUESTION HERE */ q }
        </td>
      </tr>

      <tr>
        <td>Helpful? {/* Yes button */}</td>
      </tr>

      {/* answers list below */}
      {/* probably can't embed table in row */}
      <tr>
        <AnswersList />
      </tr>
    </>
  );
}