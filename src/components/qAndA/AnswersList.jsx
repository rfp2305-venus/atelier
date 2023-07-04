import React from 'react';
import { Box } from '@mui/material';
import getDate from './util/getDate';
import Answer from './Answer';
import SeeMore from './SeeMore';

export default function AnswersList({ answers, length, setLength, isExpanded, setExpanded }) {

  return (
    // max height === 50% of viewport
    <Box sx={{ maxHeight: '50vh', overflowY: 'auto' }}>
      { answers
        .slice(0, length)
        .map(({ answer_id, body, date, answerer_name, helpfulness, photos, reported }) => (
          // if answer isn't blank or reported
          (body.length > 0 && !reported) ?
            (<Answer key={ answer_id }
              id={ answer_id }
              body={ body }
              date={ getDate(date) }
              user={ answerer_name }
              // "seller check" for boldening
              isSeller={ answerer_name === 'Seller' }
              helpfulness={ helpfulness }
              photos={ photos }
            />) : (null)
        )) }

      ———{ (answers.length > 2) ?
        (<SeeMore
          type="answer" aLength={ answers.length }
          length={ length } setLength={ setLength }
          isExpanded={ isExpanded } setExpanded={ setExpanded }
        />) : (null) }———
      <br /><br />
    </Box>
  );
}