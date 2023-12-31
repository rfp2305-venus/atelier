const { API_URL, API_KEY } = process.env;
import axios from 'axios';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Box, useTheme } from '@mui/material';

import Search from './Search';
import QuestionsList from './QuestionsList';
import SeeMore from './SeeMore';
import SubmitPost from './SubmitPost';

export default function WrapQA() {

  const { product } = useSelector(({ productDetail }) => productDetail);

  const [ questions, setQuestions ] = useState([]);
  const [ length, setLength ] = useState(4);

  const fetchQuestions = (page = 1, count = 20) => {

    return axios
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
        console.error(`Error fetching questions: ${ err }`);
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

  const [ search, setSearch ] = useState('');

  let searchResults = questions;

  if (search.length >= 3) {
    searchResults = questions.filter((q) => {
      return q.question_body
        .toLowerCase().includes(search.toLowerCase());
    });
  }

  return (
    <Box sx={{ width: '800px', margin: '150px auto 150px auto' }}>
      <Typography
        variant="h3"
        sx={{ fontFamily: 'Roboto', fontWeight: 'bold' }}
      >
        FAQ: { product.name }
      </Typography>

      <Search search={ search } setSearch={ setSearch } />

      <QuestionsList questions={ searchResults } length={ length } />

      {/* disappears when:
        > (2) questions or fewer
        > all questions displayed */}
      { (searchResults.length > 2) && (length < searchResults.length) && (
        <SeeMore type="question" length={ length } setLength={ setLength } />
      ) }

      {/* button to add questions */}
      { product && <SubmitPost type="question" /> }
    </Box>
  );
}