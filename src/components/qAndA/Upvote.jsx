import React from 'react';
import ReactDOM from 'react-dom';

import { useState } from 'react';

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