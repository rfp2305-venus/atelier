const { API_URL, API_KEY } = process.env;

import React from 'react';
import ReactDOM from 'react-dom';

import Answer from './Answer';

import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';

import axios from 'axios';

export default function AnswersList({ questionID } /* { answers } */) {

  // provided separate endpoint for fetching answers, even tho they were fetched w/ questions (??)

  const [ answers, setAnswers ] = useState([]);

  const fetchAnswers = (page = 1, count = 5) => {
    return axios
      .get(`${ API_URL }/qa/questions/${ questionID }/answers`, {
        headers: { Authorization: API_KEY },
        params: {
          page: page,
          count: count
          // still unsure what numbers to input
        }
      })
      .then((res) => {
        console.log('Answers successfully fetched!');

        const { results } = res.data;

        const defaultAnswers = results.sort((a, b) => {
          return b.helpfulness - a.helpfulness;

        }).slice(0, 2);

        setAnswers(defaultAnswers);
      })
      .catch((err) => {
        console.error(`Error fetching answers: ${ err }`);
      });
  };

  useEffect(() => {
    fetchAnswers();
  }, [ questionID ]);

  answers.forEach((a) => console.log('answer:', a));

  return (
    <table>
      <tbody>
        {answers
          .sort((a, b) => {
            b.helpfulness - a.helpfulness;
          })
          .map(({ answer_id, body, date, answerer_name, helpfulness, photos }) => (
            // if answer isn't blank
            (body.length > 0) ?
              <Answer key={ answer_id }
                id={ answer_id }
                body={ body }
                // converts date to ideal format
                date={new Date(date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: '2-digit',
                  year: 'numeric'
                })}
                user={ answerer_name }
                votes={ helpfulness }
                photos={ photos }
              /> : null
          ))
        }
        <tr>
          <th>—————( delete later )—————</th>
        </tr>
      </tbody>
    </table>
  );
}