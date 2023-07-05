import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import QuestionsList from '../QuestionsList';

describe('QuestionsList', () => {

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

  test('displays appropriate message if no questions', () => {

    const mockQuestions = [];

    render(
      <Provider store={ store }>
        <QuestionsList
          questions={ mockQuestions }
          length={ 2 }
        />
      </Provider>
    );

    expect(screen.getByText('No questions yet!')).toBeInTheDocument();
  });

  test('properly renders given list of questions', () => {

    const mockQuestions = [
      {
        question_id: 1,
        question_body: 'Question 1',
        reported: false
      },
      {
        question_id: 2,
        question_body: 'Question 2',
        reported: true // <— **
      }
    ];

    render(
      <Provider store={ store }>
        <QuestionsList
          questions={ mockQuestions }
          length={ 2 }
        />
      </Provider>
    );

    const elemsQ1 = screen.queryAllByText('Question 1', { exact: false }); // preferred over regex

    expect(elemsQ1.length).toBeGreaterThan(0); // multiple elems
    expect(screen.queryByText('Question 2')).toBeNull();
  });
});