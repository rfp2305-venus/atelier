import React from 'react';
import ReactDOM from 'react-dom';

export default function Upvote() {
  // state —> number of votes
  const [ votes, setVotes ] = useState(0);

  return (
    <button onClick={(e) => {
      e.preventDefault();
      votes++;
    }}>
      Yes ({ votes })
    </button>
  );
}