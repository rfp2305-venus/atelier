const { API_URL, API_KEY } = process.env;

import React from 'react';
import ReactDOM from 'react-dom';

import getDate from './util/getDate';

import Answer from './Answer';
import SeeMore from './SeeMore';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios';

export default function AnswersList({ questionID }) {

  const { product } = useSelector(({ productDetail }) => productDetail);

  const [ answers, setAnswers ] = useState([]);
  const [ length, setLength ] = useState(2);
  const [ isExpanded, setExpanded ] = useState(false);

  const fetchAnswers = (page = 1, count = 50 /* placeholder values */) => {

    axios
      .get(`${ API_URL }/qa/questions/${ questionID }/answers`, {
        headers: { Authorization: API_KEY },
        params: {
          page: page,
          count: count
        }
      })
      .then((res) => {
        const { results } = res.data;

        results
          // sort answers by helpfulness
          .sort((a, b) => {
            return b.helpfulness - a.helpfulness;
          })
          // (bonus): for incoming answers w/ no 'reported' prop
          .forEach((answer) => {
            answer.reported ||= false;
          });

        setAnswers(results);
      })
      .catch((err) => {
        console.error(`Error fetching answers: ${ err }`);
      });
  };

  useEffect(() => {
    fetchAnswers();
  }, [ product /* questionID */]);
  // does not seem to resolve multiple API calls —> backlog

  /*
  // check if answers fetched correctly
  answers.forEach((a, i) => {
    console.log(`answer ${ i }: ${ JSON.stringify(a) }`);
  });
  */

  return (
    <>
      <table>
        <tbody>
          { answers
            .slice(0, length)
            .map(({ answer_id, body, date, answerer_name, helpfulness, photos, reported }) => (
              // if answer isn't blank
              (body.length > 0 && !reported) ?
                (<Answer key={ answer_id }
                  id={ answer_id }
                  body={ body }
                  date={ getDate(date) }
                  user={ answerer_name }
                  helpfulness={ helpfulness }
                  photos={ photos }
                />) : (null)
            )) }

          <tr>
            <th>
              {/* consider dedicated component */}
              ———{ (answers.length > 2) ?
                (<SeeMore
                  type="answer" aLength={ answers.length }
                  length={ length } setLength={ setLength }
                  isExpanded={ isExpanded } setExpanded={ setExpanded }
                />) : (null) }———

              {/* ———<button onClick={(e) => {
                e.preventDefault();

                if (!isExpanded) {
                  setLength(answers.length);
                  setExpanded(true);
                } else {
                  setLength(2);
                  setExpanded(false);
                }
              }}>
                { (isExpanded) ? ('Collapse answers') : ('See more answers') }
              </button>——— */}
            </th>
          </tr>
        </tbody>
      </table>
      <br /><br />
    </>
  );
}