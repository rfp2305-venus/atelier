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
    <Button onClick={ handleClick } sx={
      // conditionally render according to type
      (type === 'answer') ? ({
        position: 'relative',
        left: '50%',
        top: '-5px',
        transform: 'translateX(-50%)',
        zIndex: 1,
        backgroundColor: 'white'
      }) : ({ marginTop: '15px' })
    }>
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