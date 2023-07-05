import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import SubmitPost from '../SubmitPost';

describe('SubmitPost', () => {

  beforeAll(() => {

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

    render(
      <Provider store={ store }>
        <SubmitPost type="question" />
      </Provider>
    );
  });

  test('render component w/ appropriate labels', () => {

    expect(screen.getByText('Add question')).toBeInTheDocument();
  });
});