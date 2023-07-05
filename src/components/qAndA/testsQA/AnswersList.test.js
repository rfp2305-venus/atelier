import React from 'react';
import { render, screen } from '@testing-library/react';

import AnswersList from '../AnswersList';

describe('AnswersList', () => {

  beforeEach(() => {

    const mockAnswers = [
      {
        answer_id: 1,
        body: 'test answer 1',
        date: 'June 09, 1969',
        answerer_name: 'test_user',
        helpfulness: 5,
        photos: [],
        reported: false
      },
      {
        answer_id: 2,
        body: 'test answer 2',
        date: 'June 09, 1969',
        answerer_name: 'Seller',
        helpfulness: 10,
        photos: [],
        reported: false
      }
    ];

    render(
      <AnswersList
        answers={ mockAnswers }
        length={ 2 }
        setLength={ jest.fn() }
        isExpanded={ false }
        setExpanded={ jest.fn() }
      />
    );
  });

  test('renders answers on page', () => {

    expect(screen.getByText('test answer 1')).toBeInTheDocument();
    expect(screen.getByText('test answer 2')).toBeInTheDocument();
  });

  test('should not render SeeMore component if less than (2) answers', () => {

    expect(screen.queryByText('See More Answers')).toBeNull();
  });

  test('should not render reported answers', () => {

    const moreMockAnswers = [
      {
        answer_id: 5,
        body: 'another test 1',
        date: 'September 02, 1994',
        answerer_name: 'test_user01',
        helpfulness: 2,
        photos: [],
        reported: true
      },
      {
        answer_id: 6,
        body: 'another test 2',
        date: 'July 13, 1989',
        answerer_name: 'test_user02',
        helpfulness: 15,
        photos: [],
        reported: false
      },
      {
        answer_id: 7,
        body: 'another test 3',
        date: 'December 24, 1995',
        answerer_name: 'test_user03',
        helpfulness: 8,
        photos: [],
        reported: false
      }
    ];

    render(
      <AnswersList
        answers={ moreMockAnswers }
        length={ 3 }
        setLength={ jest.fn() }
        isExpanded={ false }
        setExpanded={ jest.fn() }
      />
    );
    expect(screen.queryByText('another test 1')).toBeNull();
  });
});