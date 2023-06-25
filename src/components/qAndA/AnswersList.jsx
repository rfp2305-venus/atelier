import React from 'react';
import ReactDOM from 'react-dom';

import { useSelector } from 'react-redux';

import Answer from './Answer';

export default function AnswersList({ answers }) {

  // answers.forEach(({ body }) => console.log('answer:', body));

  return (
    <table>
      <tbody>
        {answers
          .sort((a, b) => {
            b.helpfulness - a.helpfulness;
          })
          .map(({ id, body, date, answerer_name, helpfulness, photos }) => (
            // if answer isn't blank
            (body.length > 0) ?
              <Answer
                key={ id }
                body={ body }
                date={ date }
                user={ answerer_name }
                votes={ helpfulness }
                photos={ photos }
              /> : null
          ))
        }
      </tbody>
    </table>
  );
}