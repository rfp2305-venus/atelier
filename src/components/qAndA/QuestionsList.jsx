const { API_URL, API_KEY } = process.env;

import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import { useState, useEffect } from 'react'; // tech debt
import { useSelector } from 'react-redux';

import Question from './Question';

export default function QuestionsList() {

  const { product } = useSelector(({ productDetail }) => productDetail);

  const [ questions, setQuestions ] = useState([]);
  const [ length, setLength ] = useState(4);
  const [ isExpanded, setExpanded ] = useState(false);

  const fetchQuestions = (page = 1, count = 20 /* placeholder values */) => {

    return axios.get(`${ API_URL }/qa/questions`, {
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

  // check if questions fetched correctly
  questions.forEach((q, i) => {
    console.log(`question ${ i }: ${ JSON.stringify(q) }`);
  });

  return (
    <div>
      <h1>Q&A:</h1>

      {questions
        // set length of array based on current state
        .slice(0, length)
        .map(({ question_id, question_body, question_date, asker_name, question_helpfulness, reported }) => (
          /*
          if question hasn't been reported
            > business req. implies reportable answers
            > obj returned by API —> 'reported' === QUESTION prop
          */
          (!reported) ?
            (<Question key={ question_id }
              id={ question_id }
              body={ question_body }
              // converts date to ideal format
              date={ new Date(question_date).toLocaleDateString('en-US', {
                month: 'long',
                day: '2-digit',
                year: 'numeric'
              }) }
              user={ asker_name }
              helpfulness={ question_helpfulness }
              reported={ reported } // <— (?)
            />) : (null)
        ))
      }
      <br />

      {/* NOTE: shouldn't appear if fewer than (2) questions */}
      {/* consider dedicated component */}
      <button onClick={(e) => {
        e.preventDefault();

        if (!isExpanded) {
          setLength(questions.length);

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