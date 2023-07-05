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

  test('renders question details', () => {

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

    const body = screen.queryByText('test question', { exact: false });
    const handle = screen.queryByText('By test_user — June 09, 1969', { exact: false });

    expect(body).toBeInTheDocument();
    expect(handle).toBeInTheDocument();
    expect(screen.getByText('Helpful?')).toBeInTheDocument();
  });
});