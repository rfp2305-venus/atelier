const { API_URL, API_KEY } = process.env;
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Upvote from './Upvote';
import Report from './Report';
import AnswersList from './AnswersList';
import SubmitPost from './SubmitPost';
import axios from 'axios';

export default function Question({ id, body, date, user, helpfulness, reported }) {

  const [ answers, setAnswers ] = useState([]);
  const [ length, setLength ] = useState(2);
  const [ isExpanded, setExpanded ] = useState(false);

  const fetchAnswers = (page = 1, count = 20) => {

    axios
      .get(`${ API_URL }/qa/questions/${ id }/answers`, {
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
  }, [/* product, id */]);
  // does not seem to resolve multiple API calls —> backlog

  /*
  // check if answers fetched correctly
  answers.forEach((a, i) => {
    console.log(`answer ${ i }: ${ JSON.stringify(a) }`);
  });
  */

  return (
    <Box>
      <Typography variant="h6" component="h3">
        <strong>Q:</strong> { body }
      </Typography>

      <Typography variant="body2">
        By { (user === 'Seller') ? (<strong>Seller</strong>) : (user) } — { date }
      </Typography>

      <Typography variant="body2" sx={{ marginBottom: '25px' }}>
        Helpful? <Upvote id={ id } type="question" helpfulness={ helpfulness } />
        <Report id={ id } type="question" reported={ reported } />
      </Typography>

      <AnswersList
        answers={ answers }
        length={ length }
        setLength={ setLength }
        isExpanded={ isExpanded }
        setExpanded={ setExpanded }
      />
      <SubmitPost id={ id } body={ body } type="answer" />
    </Box>
  );
}