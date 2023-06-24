const { API_URL, API_KEY } = process.env;

import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import { useState, useEffect } from 'react'; // tech debt
import { useSelector } from 'react-redux';

export default function QuestionsList() {
  // const [ questions, setQuestions ] = useState([]);

  const { product } = useSelector(({ productDetail }) => productDetail);
  // console.log('product:', product);

  const questions = []; // stores all questions

  useEffect(() => {

    // if product defined —> fetch questions
    if (product) {

      axios({
        baseURL: API_URL,
        url: '/qa/questions',
        method: 'get',
        headers: { Authorization: API_KEY },
        params: {
          product_id: product.id,
          page: 1,
          count: 4
        }

      }).then((res) => {
        console.log('res.data:', res.data);

        // push questions into array
        const { results } = res.data;
        results.forEach((result) => questions.push(result));

        /*
        const {

          answers,
          asker_name,
          question_body,
          question_date,
          question_helpfulness,
          question_id,
          reported

        } = res.data.results;

        console.log('answers:', answers);
        console.log('asker_name:', asker_name);
        console.log('question_body:', question_body);
        console.log('question_date:', question_date);
        console.log('question_helpfulness:', question_helpfulness);
        console.log('question_id:', question_id);
        console.log('reported:', reported);
        */

      }).then(() => {
        console.log('Questions set!');

        questions.forEach((q, i) => {
          console.log(`question ${ i }: ${ JSON.stringify(q) }`);
        });

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

      {/* { questions.map((q) => <Question key={ id } />) } */}

    </div>
  );
}