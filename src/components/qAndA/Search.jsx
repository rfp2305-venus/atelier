import React from 'react';
import ReactDOM from 'react-dom';

export default function Search({ questions, setQuestions, search, setSearch }) {

  const handleSearch = (e) => {
    const input = e.target.value;

    setSearch(input);

    // only once input >= 3 chars
    if (input.length >= 3) {
      const filtered = questions.filter((q) => {
        return q.question_body
          .toLowerCase().includes(input.toLowerCase());
      });
      setQuestions(filtered);
    }

    if (input.length < 3) {
      setQuestions(questions);
    }
  };

  return (
    <form>
      <input
        placeholder="Search questions..."
        value={ search }
        onChange={ handleSearch }
      />
    </form>
  );
}