const { API_URL, API_KEY } = process.env;

import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import { useState, useEffect } from 'react'; // tech debt
import { useSelector } from 'react-redux';

import Question from './Question.jsx';

export default function QuestionsList() {

  const { product } = useSelector(({ productDetail }) => productDetail);
  // console.log('product:', product);

  // const [ questions, setQuestions ] = useState([]);
  const questions = [];

  useEffect(() => {
    // fetches questions for clicked product
    if (product) {

      axios({
        baseURL: API_URL,
        url: '/qa/questions',
        method: 'get',
        headers: { Authorization: API_KEY },
        params: {
          product_id: product.id,
          page: 1, // page of results (?)
          count: 4 // results per page
        }

      }).then((res) => {
        console.log('res.data:', res.data);

        // push questions into array
        const { results } = res.data;

        // setQuestions(results);
        results.forEach((result) => questions.push(result));

      }).then(() => {
        if (questions.length === 0) {
          console.log('No questions!');
        } else {
          questions.forEach((q, i) => {
            console.log(`question ${ i }: ${ JSON.stringify(q) }`);
          });
        }

      }).catch((err) => {
        console.error(`Error retrieving questions: ${ err }`);
      });
    }
  }, [ product ]);

  return (
    <div>
      {/* <table>
        <tbody>
          { questions.map((q) => <Question key={ id } type="q" q={ q } />) }
        </tbody>
      </table> */}

      {/* still need to handle when no questions */}
      { questions.map(({ question_id, question_body, question_date, asker_name, question_helpfulness, reported, answers }) =>
        // question not rendering anywhere on page
        <Question
          key={ question_id }
          body={ question_body }
          date={ question_date }
          user={ asker_name }
          votes={ question_helpfulness }
          reported={ reported }
          answers={ answers }
        />) }

    </div>
  );
}