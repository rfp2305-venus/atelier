import React from 'react';
import ReactDOM from 'react-dom';

import { useSelector } from 'react-redux';

export default function AnswersList() {

  // refactor to Redux pattern
  // const [ answers, setAnswers ] = useState([]);

  return (
    <table>
      <tbody>
        { answers.map((a) => <Answer key={ id } />) }
      </tbody>
    </table>
  );
}