const { API_URL, API_KEY } = process.env;

import React from 'react';
import ReactDOM from 'react-dom';

import Answer from './Answer';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios';

export default function AnswersList({ questionID }) {

  const { product } = useSelector(({ productDetail }) => productDetail);

  const [ answers, setAnswers ] = useState([]);

  const fetchAnswers = (page = 1, count = 5 /* placeholder values */) => {
    return axios
      .get(`${ API_URL }/qa/questions/${ questionID }/answers`, {
        headers: { Authorization: API_KEY },
        params: {
          page: page,
          count: count
        }
      })
      .then((res) => {
        // console.log('Answers successfully fetched!');

        const { results } = res.data;

        // sort answers by helpfulness
        const defaultA = results.sort((a, b) => {
          return b.helpfulness - a.helpfulness;

        }).slice(0, 2); // dedicated component later

        setAnswers(defaultA);
      })
      .catch((err) => {
        console.error(`Error fetching answers: ${ err }`);
      });
  };

  useEffect(() => {
    fetchAnswers();
  }, [ product /* questionID */]);
  // does not seem to resolve multiple API calls —> backlog

  // check if answers fetched correctly
  answers.forEach((a, i) => {
    console.log(`answer ${ i }: ${ JSON.stringify(a) }`);
  });

  return (
    <table>
      <tbody>
        {answers
          // probably superfluous since sorted at top
          .sort((a, b) => {
            b.helpfulness - a.helpfulness;
          })
          .map(({ answer_id, body, date, answerer_name, helpfulness, photos }) => (
            // if answer isn't blank
            (body.length > 0) ?
              (<Answer key={ answer_id }
                id={ answer_id }
                body={ body }
                // converts date to ideal format
                date={new Date(date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: '2-digit',
                  year: 'numeric'
                })}
                user={ answerer_name }
                helpfulness={ helpfulness }
                photos={ photos }
              />) : (null)
          ))
        }
        <tr>
          <th>—————( delete later )—————</th>
        </tr>
      </tbody>
    </table>
  );
}