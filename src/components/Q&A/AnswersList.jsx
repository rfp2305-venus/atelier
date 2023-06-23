import React from 'react';
import ReactDOM from 'react-dom';

export default function AnswersList() {

  // refactor to Redux pattern
  const [ answers, setAnswers ] = useState([]);

  return (
    <table>
      <tbody>
        { answers.map((a) => <Answer a={ a } />) }
      </tbody>
    </table>
  );
}