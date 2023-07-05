import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import WrapQA from '../WrapQA';

describe('WrapQA', () => {

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
        <WrapQA />
      </Provider>
    );
  });

  test('renders component w/ product name in FAQ header', () => {

    expect(screen.getByText('FAQ: Test Product')).toBeInTheDocument();
  });
});