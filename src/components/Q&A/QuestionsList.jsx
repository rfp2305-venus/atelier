import React from 'react';
import ReactDOM from 'react-dom';

export default function QuestionsList(props) {
  // refactor to Redux pattern
  const [ questions, setQuestions ] = useState([]);

  // retrieve questions from DB (?)

  return (
    <div>
      <table>
        <tbody>
          { questions.map((q) => <Question q={ q } />) }
        </tbody>
      </table>
    </div>
  );
}