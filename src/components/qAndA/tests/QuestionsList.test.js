import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuestionsList from '../QuestionsList';

/*
(mock funcs):
  1. useSelector —> mock product ID
  2. mock axios (GET req) —> mock res data
    (prevents real API calls during testing)
*/

describe('QuestionsList', () => {
  it('renders component correctly', () => {
    render(<QuestionsList />);

    expect(screen.getByText('Q&A:')).toBeInTheDocument();
  });

  it('displays message when no questions', () => {
    render(<QuestionsList />);

    expect(screen.getByText('No questions yet!')).toBeInTheDocument();
  });

  // it('fetches questions when component mounted', () => {
  //   render(<QuestionsList />);
  // });
});