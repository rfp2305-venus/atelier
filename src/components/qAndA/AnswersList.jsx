const { API_URL, API_KEY } = process.env;
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import getDate from './util/getDate';
import Answer from './Answer';
import SeeMore from './SeeMore';
import axios from 'axios';

export default function AnswersList({ questionID }) {

  const { product } = useSelector(({ productDetail }) => productDetail);

  const [ answers, setAnswers ] = useState([]);
  const [ length, setLength ] = useState(2);
  const [ isExpanded, setExpanded ] = useState(false);

  const fetchAnswers = (page = 1, count = 50) => {

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
            // ensure Seller's name always at top
            if (a.answerer_name === 'Seller' && b.answerer_name !== 'Seller') {
              return -1;

            } else if (a.answerer_name !== 'Seller' && b.answerer_name === 'Seller') {
              return 1;

            } else {
              return b.helpfulness - a.helpfulness;
            }
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
  }, [/* product, questionID */]);
  // does not seem to resolve multiple API calls —> backlog

  // /*
  // check if answers fetched correctly
  answers.forEach((a, i) => {
    console.log(`answer ${ i }: ${ JSON.stringify(a) }`);
  });
  // */

  return (
    <Box /* sx={{ width: '50vh', overflow: 'visible' }} */>
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
              // add extra "seller check" for boldening
              isSeller={ answerer_name === 'Seller' }
              helpfulness={ helpfulness }
              photos={ photos }
            />) : (null)
        )) }

      ———{ (answers.length > 2) ?
        (<SeeMore
          type="answer" aLength={ answers.length }
          length={ length } setLength={ setLength }
          isExpanded={ isExpanded } setExpanded={ setExpanded }
        />) : (null) }———
      <br /><br />
    </Box>
  );
}