const { API_URL, API_KEY } = process.env;
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';

import Upvote from '../Upvote';

// mock axios —> custom behavior for API req
jest.mock('axios');

describe('Upvote', () => {

  beforeEach(() => {

    render(
      <Upvote
        id={ 1 }
        type="question"
        helpfulness={ 0 }
      />
    );
  });

  test('component renders', () => {

    expect(screen.getByText('Yes (0)')).toBeInTheDocument();
  });

  test('increments helpfulness', () => {

    axios.put.mockResolvedValue({ status: 200 });
    // axios.put.mockImplementation(() => Promise.resolve());

    const upvoteButton = screen.getByText('Yes (0)');
    fireEvent.click(upvoteButton);

    waitFor(() => {

      expect(axios.put).toHaveBeenCalledTimes(1);

      expect(axios.put).toHaveBeenCalledWith(
        `${ API_URL }/qa/questions/1/helpful`,
        { helpfulness: 1 },
        { headers: { Authorization: API_KEY } }
      );

      expect(screen.getByText('Yes (1)')).toBeInTheDocument();
    });
  });

  test('disables on click', () => {

    const upvoteButton = screen.getByText('Yes (0)');
    fireEvent.click(upvoteButton);

    waitFor(() => {

      expect(reportButton).toBeDisabled();
    });
  });

  test('handles error case in axios req', () => {

    axios.put.mockRejectedValue(new Error());

    const consoleErrSpy = jest.spyOn(console, 'error');

    const upvoteButton = screen.getByText('Yes (0)');
    fireEvent.click(upvoteButton);

    waitFor(() => {

      expect(consoleErrSpy).toHaveBeenCalledTimes(1);
    });
  });
});