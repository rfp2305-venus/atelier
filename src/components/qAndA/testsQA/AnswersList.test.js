import React from 'react';
import { render, screen } from '@testing-library/react';

import AnswersList from '../AnswersList';

describe('AnswersList', () => {

  const mockAnswers = [
    {
      answer_id: 1,
      body: 'test answer 1',
      date: 'November 11, 1995',
      answerer_name: 'test_user01',
      helpfulness: 5,
      photos: [],
      reported: false
    },
    {
      answer_id: 2,
      body: 'test answer 2',
      date: 'September 02, 1994',
      answerer_name: 'test_user02',
      helpfulness: 7,
      photos: [{ id: 1, url: 'https://test-image.com/mock' }],
      reported: false
    },
    {
      answer_id: 3,
      body: 'test answer 3',
      date: 'December 24, 1967',
      answerer_name: 'test_user03',
      helpfulness: 10,
      photos: [],
      reported: false
    },
    {
      answer_id: 4,
      body: 'LOVE SELLING SO MUCH',
      date: 'June 09, 1969',
      answerer_name: 'Seller',
      helpfulness: 15,
      photos: [],
      reported: false
    }
  ];

  beforeEach(() => {
    render(
      <AnswersList
        answers={ mockAnswers }
        length={ 4 }
        setLength={ jest.fn() }
        isExpanded={ true }
        setExpanded={ jest.fn() }
      />
    );
  });

  test('can render all answers on page', () => {

    expect(screen.getByText('test answer 1')).toBeInTheDocument();
    expect(screen.getByText('test answer 2')).toBeInTheDocument();
    expect(screen.getByText('test answer 3')).toBeInTheDocument();

    const sellerAnswer = screen.queryByText('LOVE SELLING SO MUCH', { exact: false });
    expect(sellerAnswer).toBeInTheDocument();
  });

  /*
  test('answers by "Seller" sorted to top of list', () => {

    // query for all rendered answers
    const answers = screen.queryAllByTestId('answer');

    // find index of 1st non-seller
    const indexFirstNonSeller = answers.findIndex((answer) => {
      const { textContent } = answer;

      return !textContent.includes('LOVE SELLING SO MUCH');
    });

    // check all answers before 1st non-seller === seller
    for (let i = 0; i < indexFirstNonSeller; i++) {
      expect(answers[i].textContent).toContain('LOVE SELLING SO MUCH');
    }
  });
  */

  test('should not render SeeMore component if less than (2) answers', () => {

    const mockAnswers = [
      {
        answer_id: 69,
        body: 'lonely',
        date: 'September 02, 1994',
        answerer_name: 'alex',
        helpfulness: 69,
        photos: [],
        reported: false
      }
    ];

    render(
      <AnswersList
        answers={ mockAnswers }
        length={ 1 }
        setLength={ jest.fn() }
        isExpanded={ false }
        setExpanded={ jest.fn() }
      />
    );

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