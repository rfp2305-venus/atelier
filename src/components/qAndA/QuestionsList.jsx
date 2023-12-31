import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import getDate from './util/getDate';
import Question from './Question';

export default function QuestionsList({ questions, length }) {

  return (
    <Box sx={{
      maxHeight: '100vh',
      // overflowY: 'auto',
      overflow: 'hidden', // hides overflow beyond fixed height
      '&:hover': { overflow: 'auto' } // NOTE: scrollable on hover! **
    }}>
      { (questions.length > 0) ? (
        // fixed border —> bottommost limit
        <Box sx={{ border: '0.5 px solid' }}>
          { questions
            .slice(0, length)
            .map(({ question_id, question_body, question_date, asker_name, question_helpfulness, reported }) => (
              // if question is not blank or reported
              (question_body.length > 0 && !reported) ? (
                <Accordion key={ question_id } sx={{ border: '0.5px solid', marginBottom: '5px' }}>
                  <AccordionSummary expandIcon={ <ExpandMoreIcon /> }>
                    <Typography variant="h5">
                      { question_body }
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Question
                      id={ question_id }
                      body={ question_body }
                      date={ getDate(question_date) }
                      user={ asker_name }
                      helpfulness={ question_helpfulness }
                      reported={ reported }
                    />
                  </AccordionDetails>
                </Accordion>
              ) : (null)
            )) }
        </Box>
      ) : (
        <Typography sx={{ color: 'red' }}>No questions yet!</Typography>
      )}
    </Box>
  );
}