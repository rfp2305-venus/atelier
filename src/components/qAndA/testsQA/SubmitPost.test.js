const { API_URL, API_KEY } = process.env;
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';

import SubmitPost from '../SubmitPost';

jest.mock('axios');

describe('SubmitPost', () => {

  // let mockStore;

  beforeAll(() => {
    // mockStore = configureMockStore([]);

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

  /*
  beforeEach(() => {
    // reset mock func & mock implem for each test
    axios.mockReset();

    // mock sucessful res
    axios.mockImplementation(() => Promise.resolve());
  });
  */

  test('render component w/ appropriate labels', () => {

    expect(screen.getByText('Add question')).toBeInTheDocument();
  });

  test('submit question w/ valid inputs', () => {

    // query necessary elems
    const user = screen.getByLabelText('Your nickname: **');
    const email = screen.getByLabelText('Your email: **');
    const post = screen.getByLabelText('Your question: **');

    const submitButton = screen.getByText('Submit question');

    // change input values
    fireEvent.change(user, { target: { value: 'Alex' } });
    fireEvent.change(email, { target: { value: 'alex@coolguy.com' } });
    fireEvent.change(post, { target: { value: 'yo it\'s your boy, alex' } });

    // click button
    fireEvent.click(submitButton);

    // verify details in API call
    expect(axios).toHaveBeenCalledWith({
      method: 'post',
      url: `${ API_URL }/qa/questions`,
      headers: { Authorization: API_KEY },
      data: {
        product_id: 123, // selected product
        name: 'Alex',
        email: 'alex@coolguy.com',
        body: 'yo it\'s your boy, alex'
      }
    });

    // verify form reset after submission
    expect(user.value).toBe('');
    expect(email.value).toBe('');
    expect(post.value).toBe('');
  });
});