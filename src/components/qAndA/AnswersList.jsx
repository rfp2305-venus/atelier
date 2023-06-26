const { API_URL, API_KEY } = process.env;

import React from 'react';
import ReactDOM from 'react-dom';

import Answer from './Answer';

// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';

// import axios from 'axios';

export default function AnswersList(/* { questionID } */ { answers }) {

  // provided separate endpoint for fetching answers, but they were seemingly fetched w/ questions (??)

  /*
  // const [ answers, setAnswers ] = useState([]);

  const fetchAnswers = () => {
    return axios
      .get(`${ API_URL }/qa/questions/${ questionID }/answers`, {
        headers: { Authorization: API_KEY },
        params: {
          page: 1,
          count: 2
          // still unsure what numbers to input
        }
      })
      .then((res) => {
        console.log('Answers successfully fetched!');

        const { results } = res.data;

        results.sort((a, b) => {
          return b.helpfulness - a.helpfulness;
        });

        setAnswers(results.slice(0, 2));
      })
      .catch((err) => {
        console.error(`Error fetching answers: ${ err }`);
      });
  };
  fetchAnswers();

  answers.forEach((a) => console.log('answer:', a));
  */

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
                id={ id }
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
      </tbody>
    </table>
  );
}