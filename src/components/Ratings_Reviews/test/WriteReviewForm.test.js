const { API_URL, API_KEY } = process.env;
import React from 'react';
import {expect, jest, test} from '@jest/globals';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { Provider } from 'react-redux'
import WriteReviewForm from '../WriteReviewForm';

jest.mock('axios');

describe('WriteReviewForm', () => {
  it('should submit the review form', async () => {
    const mockPost = axios.post.mockResolvedValue({ data: {} });

    const { getByLabelText, getByText } = render(<WriteReviewForm />);

    fireEvent.change(getByLabelText('Review Summary'), { target: { value: 'Great product' } });
    fireEvent.change(getByLabelText('Review Body'), { target: { value: 'Lorem ipsum dolor sit amet' } });
    fireEvent.click(getByLabelText('Yes'));
    fireEvent.change(getByLabelText('Nickname'), { target: { value: 'John' } });
    fireEvent.change(getByLabelText('Email Address'), { target: { value: 'john@example.com' } });

    fireEvent.click(getByText('Submit'));

    await waitFor(() => expect(mockPost).toHaveBeenCalledTimes(1));

    expect(mockPost).toHaveBeenCalledWith(expect.stringContaining('/reviews'), {
      headers: { Authorization: API_KEY },
      params: {
        rating: expect.any(Number),
        summary: 'Great product',
        body: 'Lorem ipsum dolor sit amet',
        recommend: true,
        name: 'John',
        email: 'john@example.com',
        photos: expect.any(Array),
        characteristics: expect.any(Object),
      },
    });
  });
});
