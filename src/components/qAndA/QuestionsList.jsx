const { API_URL, API_KEY } = process.env;

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';

import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import getDate from './util/getDate';

import Question from './Question';
import Search from './Search';
import SeeMore from './SeeMore';
import SubmitPost from './SubmitPost';

import axios from 'axios';

export default function QuestionsList() {

  const [ questions, setQuestions ] = useState([]);
  const [ length, setLength ] = useState(4);

  const [ search, setSearch ] = useState('');

  // redux
  const { product } = useSelector(({ productDetail }) => productDetail);
  // console.log(`product: ${ JSON.stringify(product) }`);

  const fetchQuestions = (page = 1, count = 50 /* placeholder values */) => {

    axios
      .get(`${API_URL}/qa/questions`, {
        headers: { Authorization: API_KEY },
        params: {
          product_id: product.id,
          page: page,
          count: count
        }
      })
      .then((res) => {
        const { results } = res.data;

        // sort questions by helpfulness
        results.sort((a, b) => {
          return b.helpfulness - a.helpfulness;
        });

        setQuestions(results);
      })
      .catch((err) => {
        console.error(`Error fetching questions: ${err}`);
      });
  };

  useEffect(() => {
    if (product) {
      fetchQuestions();
    }
  }, [ product ]);

  /*
  // check if questions fetched correctly
  questions.forEach((q, i) => {
    console.log(`question ${ i }: ${ JSON.stringify(q) }`);
  });
  */

  return (
    <Box width="800px" margin="auto">
      <Typography variant="h3" sx={{ marginTop: '5px' }}>Q&A:</Typography>
      <Search
        questions={ questions }
        setQuestions={ setQuestions }
        search={ search }
        setSearch={ setSearch }
      />

      { (questions.length > 0) ? (
        questions
          .slice(0, length)
          .map(({ question_id, question_body, question_date, asker_name, question_helpfulness, reported }) => (
            // if question is not blank or reported
            (question_body.length > 0 && !reported) ? (
              <Accordion key={ question_id }>
                <AccordionSummary expandIcon={ <ExpandMoreIcon /> }>
                  <Typography variant="h5">{ question_body }</Typography>
                  <SubmitPost
                    id={ question_id }
                    body={ question_body }
                    type="answer"
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <Question
                    id={ question_id }
                    body={ question_body }
                    date={ getDate(question_date) }
                    user={ asker_name }
                    helpfulness={ question_helpfulness }
                    reported={ reported }
                  />
                </AccordionDetails>
              </Accordion>
            ) : (null)
          ))
      ) : (
        <Typography>No questions yet!</Typography>
      )}
      <br />

      {/* disappears when:
        > (2) questions or fewer
        > all questions displayed */}
      { (questions.length > 2) && (length < questions.length) &&
        <SeeMore type="question" length={ length } setLength={ setLength } /> }

      { product && <SubmitPost type="question" /> }
    </Box>
  );
}