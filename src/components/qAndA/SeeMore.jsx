import React from 'react';
import { Button } from '@mui/material';

export default function SeeMore({ type, aLength, length, setLength, isExpanded, setExpanded }) {

  const handleClick = () => {
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
        (type === 'question')
          ? ('More Answered Questions')
          : (!isExpanded)
            ? ('See More Answers')
            : ('Collapse Answers')
      }
    </Button>
  );
}