import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';

export default function Search({ questions, setQuestions, search, setSearch }) {
  const [ original, setOriginal ] = useState([]);

  useEffect(() => {
    setOriginal(questions);
  }, [ questions ]);

  const handleSearch = (e) => {
    const input = e.target.value;
    setSearch(input);

    // only once input >= 3 chars
    if (input.length >= 3) {
      const filtered = original.filter((q) => {
        return q.question_body
          .toLowerCase().includes(input.toLowerCase());
      });
      setQuestions(filtered);
    } else {
      setQuestions(original);
    }
  };

  return (
    <form>
      <TextField
        sx={{ width: 350 }}
        placeholder="Have a question? Search for answers..."
        value={ search }
        onChange={ handleSearch }
      />
    </form>
  );
}


/*
import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';

export default function Search({ questions, setQuestions, search, setSearch }) {

  const [ original, setOriginal ] = useState([]);

  useEffect(() => {
    setOriginal(questions);
  }, [ questions ]);

  const handleSearch = (e) => {
    const input = e.target.value;
    setSearch(input);
  };

  // only once input >= 3 chars
  if (input.length >= 3) {
    const filtered = original.filter((q) => {
      return q.question_body
        .toLowerCase().includes(input.toLowerCase());
      });
      setQuestions(filtered);
    } else {
      setQuestions(original);
    }
  };

  return (
    <form>
      <TextField
        sx={{ width: 350 }}
        placeholder="Have a question? Search for answers..."
        value={ search }
        onChange={ handleSearch }
      />
    </form>
  );
}
*/