import React from 'react';
import ReactDOM from 'react-dom';

import { Button } from '@mui/material';

export default function SeeMore({ type, aLength, length, setLength, isExpanded, setExpanded }) {
  const handleClick = (e) => {
    e.preventDefault();

    if (type === 'question') {
      setLength(length + 2);

    } else {

      if (isExpanded) {
        setLength(2);
        setExpanded(false);

      } else {
        setLength(aLength);
        setExpanded(true);
      }
    }
  };

  return (
    <Button onClick={ handleClick }>
      {
        (type === 'question') ? ('More Answered Questions') : (!isExpanded) ? ('See More Answers') : ('Collapse Answers')
      }
    </Button>
  );
}