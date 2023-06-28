const { API_URL, API_KEY } = process.env;

import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import { useState, useEffect } from 'react'; // tech debt
import { useSelector } from 'react-redux';

import Question from './Question';
import Search from './Search';

import getDate from './util/getDate';

export default function QuestionsList() {

  const { product } = useSelector(({ productDetail }) => productDetail);

  const [ questions, setQuestions ] = useState([]);
  const [ length, setLength ] = useState(4);
  const [ isExpanded, setExpanded ] = useState(false);

  const [ search, setSearch ] = useState('');

  const fetchQuestions = (page = 1, count = 50 /* placeholder values */) => {

    axios
      .get(`${ API_URL }/qa/questions`, {
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

  return (
    <div>
      <h1>Q&A:</h1>
      <Search
        questions={ questions }
        setQuestions={ setQuestions }
        search={ search }
        setSearch={ setSearch }
      />

      { questions
        // set length of array based on current state
        .slice(0, length)
        .map(({ question_id, question_body, question_date, asker_name, question_helpfulness, reported }) => (

          (question_body.length > 0 && !reported) ?
            (<Question key={ question_id }
              id={ question_id }
              body={ question_body }
              date={ getDate(question_date) }
              user={ asker_name }
              helpfulness={ question_helpfulness }
              reported={ reported } // <— (?)
            />) : (null)
        )) }
      <br />

      {/* TODO: shouldn't appear if fewer than (2) questions */}
      {/* consider dedicated component */}
      <button onClick={(e) => {
        e.preventDefault();

        if (!isExpanded) {
          setLength(length + 2);
          setExpanded(true);
        } else {
          setLength(4);
          setExpanded(false);
        }
      }}>
        { (isExpanded) ? ('Less Answered Questions') : ('More Answered Questions') }
      </button>
    </div>
  );
}