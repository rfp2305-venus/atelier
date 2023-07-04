const { API_URL, API_KEY } = process.env;

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';

import Report from '../Report';

jest.mock('axios');

describe('Report', () => {

  test('toggles reported status & disables appropriately on click', async() => {

    // simulate successful res from axios.put
    const res = { status: 200 };

    // instruct mock func to return res (as resolved promise) when called
    axios.put.mockResolvedValue(res);

    // render Report component w/ necessary props
    render(<Report id={ 1 } type="question" reported={ false }/>);

    // query DOM elem by given text
    const reportButton = screen.getByText('Report');

    // trigger click event
    fireEvent.click(reportButton);

    // wait for axios req before assertions
    await waitFor(() => {

      // verify expected behaviors
      expect(axios.put).toHaveBeenCalledTimes(1);

      expect(axios.put).toHaveBeenCalledWith(
        `${ API_URL }/qa/${ 'question' }s/${ 1 }/report`,
        { reported: true },
        { headers: { Authorization: API_KEY } }
      );

      expect(screen.getByText('Reported')).toBeInTheDocument();
    });
  });
});