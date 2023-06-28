/**
 * @jest-environment jsdom
 */

const { API_URL, API_KEY } = process.env;

import React from 'react';
import { render, fireEvent, waitFor, /* screen */} from '@testing-library/react';
import axios from 'axios';

import Upvote from '../Upvote';

jest.mock('axios');

describe('Upvote component', () => {

  test('increments helpfulness & disables appropriately on click', async() => {

    const res = { status: 200 };
    axios.put.mockResolvedValue(res);

    const { getByText } = render(
      <Upvote
        id={ 1 }
        type="question"
        helpfulness={ 0 }
      />
    );

    const upvoteButton = getByText('Yes (0)');

    fireEvent.click(upvoteButton);

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledTimes(1);
      expect(axios.put).toHaveBeenCalledWith(
        `${ API_URL }/qa/questions/1/helpful`,
        { helpfulness: 1 },
        { headers: { Authorization: API_KEY } }
      );
    });
  });
});
