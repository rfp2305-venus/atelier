const { API_URL, API_KEY } = process.env;

import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import { useState, useEffect } from 'react'; // tech debt
import { useSelector } from 'react-redux';

import Question from './Question';

export default function QuestionsList() {

  const { product } = useSelector(({ productDetail }) => productDetail);
  // console.log('product:', product);

  const [ questions, setQuestions ] = useState([]);

  const fetchQuestions = (page = 1, count = 5 /* placeholder values */) => {

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
        const defaultQ = results.sort((a, b) => {
          return b.helpfulness - a.helpfulness;
        }).slice(0, 4); // dedicated component later

        setQuestions(defaultQ);
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
        // probably superfluous since sorted at top
        .sort((a, b) => {
          return b.helpfulness - a.helpfulness;
        })
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

      <button onClick={(e) => {
        e.preventDefault();
        setQuestions()
      }}>
        See more questions
      </button>
    </div>
  );
}