/*
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';

import Answer from '../Answer';

jest.mock('axios');

describe('Answer', () => {
  test('renders username as bold when "Seller"', () => {
    const mockAnswer = {
      answer_id: 1,
      answerer_name: 'Seller',
      isSeller: true,
      body: 'love selling',
      date: '1969-06-09T00:00:00.000Z',
      helpfulness: 0,
      photo: [],
      reported: false
    };

    render(
      <Answer
        answer_id={ 1 }
        answerer_name={ 'Seller' }
        isSeller={ true }
        body={ 'love selling' }
        date={ '1969-06-09T00:00:00.000Z' }
        helpfulness={ 0 }
        photo={ [] }
        reported={ false }
      />
    );

    const seller = screen.getByText('By Seller');
    expect(seller.tagName).toBe('STRONG');
  });

  test('should fetch & display answers', async() => {
    const questionID = 360;

    const mockData = [
      {
        answer_id: 1,
        answerer_name: 'Seller',
        body: 'Answer 1',
        helpfulness: 5,
        reported: false,
      },
      {
        answer_id: 2,
        answerer_name: 'Obama',
        body: 'Answer 2',
        helpfulness: 7,
        reported: false
      }
    ];

    axios.get.mockResolvedValue(mockData);

    render(<AnswersList />);
  });
});
*/