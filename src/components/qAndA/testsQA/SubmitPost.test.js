const { API_URL, API_KEY } = process.env;
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';

import SubmitPost from '../SubmitPost';

jest.mock('axios');

describe('SubmitPost', () => {

  const mockStore = configureMockStore([]);

  const initialState = ({
    productDetail: {
      product: {
        id: 123,
        name: 'Test Product'
      }
    }
  });
  const store = mockStore(initialState);

  beforeEach(() => {

    render(
      <Provider store={ store }>
        <SubmitPost
          id={ 123 }
          body={ 'sample body' }
          type="question"
        />
      </Provider>
    );
  });

  test('component renders for questions', () => {

    expect(screen.getByText('Add question')).toBeInTheDocument();
  });

  beforeEach(() => {

    fireEvent.click(screen.getByText('Add question'));
  });

  test('dialog renders upon clicking "Add question" button', () => {

    const inputFields = screen.getAllByRole('textbox');
    expect(inputFields.length).toBe(3);
  });

  test('displays validation errors for empty fields', () => {

    axios.mockResolvedValue({ status: 201 });

    fireEvent.click(screen.getByText('Submit question'));

    waitFor(() => {

      expect(axios).not.toHaveBeenCalled();

      expect(screen.getByText('Name, please.')).toBeInTheDocument();
      expect(screen.getByText('Promise not to spam you.')).toBeInTheDocument();
      expect(screen.getByText('Do you have a question?')).toBeInTheDocument();
    });
  });

  test('submits question w/ valid inputs', () => {

    axios.mockResolvedValue({ status: 201 });

    const user = screen.getByTestId('name-input');
    const email = screen.getByTestId('email-input');
    const post = screen.getByTestId('post-input');

    /*
    user.dispatchEvent(
      new Event('input', { target: { value: 'Alex' } })
    );
    user.dispatchEvent(
      new Event('input', { target: { value: 'alex@coolguy.com' } })
    );
    user.dispatchEvent(
      new Event('input', { target: { value: 'yo, you up?' } })
    );
    */

    user.value = 'Alex';
    email.value = 'alex@coolguy.com';
    post.value = 'yo, you up?';

    fireEvent.input(user);
    fireEvent.input(email);
    fireEvent.input(post);

    fireEvent.click(screen.getByText('Submit question'));

    waitFor(() => {

      expect(axios).toHaveBeenCalledTimes(1);

      expect(axios).toHaveBeenCalledWith({
        method: 'post',
        url: `${ API_URL }/qa/questions`,
        headers: { Authorization: API_KEY },
        data: {
          product_id: 123,
          name: 'Alex',
          email: 'alex@coolguy.com',
          body: 'yo, you up?'
        }
      });
    });
  });

  test('"Cancel" button resets input fields', () => {

    axios.mockResolvedValue({ status: 201 });

    const user = screen.getByTestId('name-input');
    const email = screen.getByTestId('email-input');
    const post = screen.getByTestId('post-input');

    user.value = 'Alex';
    email.value = 'alex@coolguy.com';
    post.value = 'yo, you up?';

    fireEvent.input(user);
    fireEvent.input(email);
    fireEvent.input(post);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    const inputFields = screen.getAllByRole('textbox');
    inputFields.forEach(({ value }) => expect(value).toBe(''));
  });

  test('component renders for answers', () => {

    render(
      <Provider store={ store }>
        <SubmitPost
          id={ 123 }
          body={ 'sample body' }
          type="answer"
        />
      </Provider>
    );
    expect(screen.getByText('Add answer')).toBeInTheDocument();
  });
});