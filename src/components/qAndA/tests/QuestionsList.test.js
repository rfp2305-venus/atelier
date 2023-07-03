/**
 * @jest-environment jsdom
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import QuestionsList from '../QuestionsList';
import axios from 'axios';

/*
(mock funcs):
  1. useSelector —> mock product ID
  2. mock axios (GET req) —> mock res data
    (prevents real API calls during testing)
*/

jest.mock('react-redux');
jest.mock('axios');

describe('QuestionsList', () => {
  // simulate product selection prior to testing
  beforeEach(() => {
    useSelector.mockReturnValue({
      productDetail: {
        product: { id: 69 }
      }
    });
  });

  test('renders component correctly', () => {
    render(<QuestionsList />);

    expect(screen.getByText('Q&A:')).toBeInTheDocument();
  });

  test('displays message when no questions', () => {
    render(<QuestionsList />);

    expect(screen.getByText('No questions yet!')).toBeInTheDocument();
  });

  /*
  test('displays list of questions', async() => {
    // simulate retrieval of questions
    const mockQuestions = [
      { question_id: 1, question_body: 'Question 1', question_helpfulness: 15, reported: false },
      { question_id: 2, question_body: 'Question 2', question_helpfulness: 25, reported: false },
    ];

    axios.get.mockResolvedValue({
      data: { results: mockQuestions }
    });

    render(<QuestionsList />);

    await waitFor(() => {
      // check if questions present as expected
      expect(screen.getByText('Question 1').toBeInTheDocument);
      expect(screen.getByText('Question 2').toBeInTheDocument);
    });
  });
  */
});