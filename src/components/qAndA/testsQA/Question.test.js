import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import Question from '../Question';

describe('Question', () => {

  const mockStore = configureMockStore([]);

  const initialState = {
    productDetail: {
      product: {
        id: 123,
        name: 'Test Product'
      }
    }
  };
  const store = mockStore(initialState);

  beforeEach(() => {

    const mockQuestion = {
      id: 1,
      body: 'test question',
      date: 'June 09, 1969',
      user: 'test_user',
      helpfulness: 3,
      reported: false
    };

    render(
      <Provider store={ store }>
        <Question { ...mockQuestion } />
      </Provider>
    );
  });

  test('renders question details', () => {

    const body = screen.queryByText('test question', { exact: false });
    const handle = screen.queryByText('By test_user — June 09, 1969', { exact: false });

    expect(body).toBeInTheDocument();
    expect(handle).toBeInTheDocument();
    expect(screen.getByText('Helpful?')).toBeInTheDocument();
  });

  /*
  test('"Seller" answers sorted first', () => {

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

    axios.get.mockReturnValue(mockAnswers);

    render(
      <Provider store={ store }>
        <Question { ...mockQuestion } />
      </Provider>
    );

    // rest of implementation ...
  });
  */
});