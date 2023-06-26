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

  const fetchQuestions = (page, count) => {

    return axios.get(`${ API_URL }/qa/questions`, {
      headers: { Authorization: API_KEY },
      params: {
        product_id: product.id,
        page: page,
        count: count
        // still not entirely sure how to manipulate
      }
    })
      .then((res) => {
        const { results } = res.data;

        results.forEach((result) => {
          const { answers } = result;

          // add sorted answers to obj
          result.sortedAnswers = Object.values(answers).sort((a, b) => {
            return b.helpfulness - a.helpfulness;
          });
        });

        setQuestions(results);
      })
      .catch((err) => {
        console.error(`Error fetching questions: ${ err }`);
      });
  };

  useEffect(() => {
    if (product) {
      fetchQuestions(1, 5);
    }
  }, [ product ]);

  // test if questions fetched correctly
  questions.forEach((q, i) => {
    console.log(`question ${ i }: ${ JSON.stringify(q) }`);
  });

  return (
    <div>
      <h1>Q&A:</h1>

      {questions
        .sort((a, b) => {
          return b.helpfulness - a.helpfulness;
        })
        .map(({ question_id, question_body, question_date, asker_name, question_helpfulness, reported, /* sortedAnswers */}) => (
        /*
        if question hasn't been reported
          > business req. implies reportable answers
          > obj returned by API —> 'reported' === question prop (??)
        */
          (!reported) ?
            <Question key={ question_id }
              id={ question_id }
              body={ question_body }
              date={new Date(question_date).toLocaleDateString('en-US', {
                month: 'long',
                day: '2-digit',
                year: 'numeric'
              })}
              user={ asker_name }
              votes={ question_helpfulness }
              reported={ reported }
              // convert answers obj into sorted array
              // answers={ sortedAnswers.slice(0, 2) }
            /> : null
        ))
      }
    </div>
  );
}

/*
  const fetchQuestions = async() => {
    try {
      const res = await axios.get(`${ API_URL }/qa/questions`, {
        headers: { Authorization: API_KEY },
        params: {
          product_id: product.id,
          page: 1, // which results page
          count: 4 // how many results per page

          // not entirely sure what inputs needed

          // should load <= 4 Q's by default
        }
      });

      const { results } = res.data;

      results.forEach((result) => {
        const { answers } = result;

        // convert each 'answers' obj into sorted array
        result.sortedAnswers = Object.values(answers).sort((a, b) => b.helpfulness - a.helpfulness);
      });

      setQuestions(results);

    } catch(err) {
      console.error(`Error fetching questions: ${ err }`);
    }
  };
  */