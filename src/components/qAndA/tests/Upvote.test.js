/**
 * @jest-environment jsdom
 */

const { API_URL, API_KEY } = process.env;

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';

import Upvote from '../Upvote';

// mock axios —> custom behavior for API req
jest.mock('axios');

describe('Upvote component', () => {

  test('increments helpfulness & disables appropriately on click', async() => {

    // simulate successful res from axios.put
    const res = { status: 200 };

    // instruct mock func to return res (as resolved promise) when called
    axios.put.mockResolvedValue(res);

    // render Upvote component w/ necessary props
    const { getByText } = render(
      <Upvote
        id={ 1 }
        type="question"
        helpfulness={ 0 }
      />
    );

    // query DOM elem by given text
    const upvoteButton = getByText('Yes (0)');

    // trigger click event
    fireEvent.click(upvoteButton);

    // wait for axios req before assertions
    await waitFor(() => {

      // verify expected behaviors
      expect(axios.put).toHaveBeenCalledTimes(1);

      expect(axios.put).toHaveBeenCalledWith(
        `${ API_URL }/qa/questions/1/helpful`,
        { helpfulness: 1 },
        { headers: { Authorization: API_KEY } }
      );
    });
  });
});
