const { API_URL, API_KEY } = process.env;
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';

import Report from '../Report';

jest.mock('axios');

describe('Report', () => {

  beforeEach(() => {

    // jest.resetAllMocks(); // NOTE: ensures clean slate for each test **

    render(
      <Report
        id={ 1 }
        type="question"
        reported={ false }
      />
    );
  });

  test('component renders', () => {

    expect(screen.getByText('Report')).toBeInTheDocument();
  });

  test('toggles reported status', () => {

    axios.put.mockResolvedValue({ status: 200 });

    const reportButton = screen.getByText('Report');
    fireEvent.click(reportButton);

    waitFor(() => {

      expect(axios.put).toHaveBeenCalledTimes(1);

      expect(axios.put).toHaveBeenCalledWith(
        `${ API_URL }/qa/${ 'question' }s/${ 1 }/report`,
        { reported: true },
        { headers: { Authorization: API_KEY } }
      );

      expect(screen.getByText('Reported')).toBeInTheDocument();
    });
  });

  test('disables on click', () => {

    const reportButton = screen.getByText('Report');
    fireEvent.click(reportButton);

    waitFor(() => {

      expect(reportButton).toBeDisabled();
    });
  });

  test('handles error case in axios req', () => {

    axios.put.mockRejectedValue(new Error());

    const consoleErrSpy = jest.spyOn(console, 'error');

    const reportButton = screen.getByText('Report');
    fireEvent.click(reportButton);

    waitFor(() => {

      expect(consoleErrSpy).toHaveBeenCalledTimes(1);

      /*
      expect(axios.put).toHaveBeenCalledTimes(1);

      expect(axios.put).toHaveBeenCalledWith(
        `${ API_URL }/qa/${ 'question' }s/${ 1 }/report`,
        { reported: true },
        { headers: { Authorization: API_KEY } }
      );
      */
    });
  });
});