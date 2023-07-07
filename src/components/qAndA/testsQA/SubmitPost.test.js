const { API_URL, API_KEY } = process.env;
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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


  test('submits question w/ valid inputs', () => {

    fireEvent.click(screen.getByText('Add question'));

    // const user = screen.getByLabelText('Your nickname:');
    // const email = screen.getByLabelText('Your email:');
    // const post = screen.getByLabelText('Your question:');

  //vicky's experimentation
    // const user = screen.queryByTestId('your-nickname');
    // expect(screen.queryByTestId('your-nickname')).toBeTruthy();
    // const email = screen.queryByTestId('your-email');
    // expect(screen.queryByTestId('your-email')).toBeTruthy();
    // const post = screen.queryByTestId('your-question');
    // expect(screen.queryByTestId('your-question')).toBeTruthy();


    // const user = screen.getByRole('textbox', { name: /inputUser/ });
    // const email = screen.getByRole('textbox', { name: /Your email/ });
    // const post = screen.getByRole('textbox', { name: /Your question/ });

    // const user = screen.getPlaceholderText('jackson00!');
    // const email = screen.getPlaceholderText('spongebob69@snailmail.io');
    // const post = screen.getPlaceholderText('What\'s the deal with airline food?');

    const submitButton = screen.getByText('Submit question');
    expect(submitButton).toBeInTheDocument();

    // change input values
    // fireEvent.change(user, { target: { value: 'Alex' } });
    // fireEvent.change(email, { target: { value: 'alex@coolguy.com' } });
    // fireEvent.change(post, { target: { value: 'yo, you up?' } });

    // submit
    // fireEvent.click(submitButton);

    // expect(screen.getByText('Alex posted question: yo, you up?')).toBeInTheDocument();
  });


});