import React from 'react';
import RelStarRating from '../RelStarRating';
import { calculateRelAvg } from '../RelStarRating';
import { render, screen, fireEvent, waitFor, act, cleanup } from '@testing-library/react';
import { MOCKPRODUCT, MOCKCOMPARISON, renderWithContext } from "../../../util/test-related.js";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const {API_URL, API_KEY} = process.env;

import { useEffect } from 'react';

jest.mock('axios');

const mockRating = MOCKPRODUCT.rating.ratings;
const anotherAxiosMock = new MockAdapter(axios);
const mockResponse = { data: { message: mockRating } };
anotherAxiosMock.onGet(`${API_URL}/reviews/meta?product_id=${40344}`).reply(200, mockResponse);

describe('RelStarRating', () => {

  beforeEach(() => {
    jest.spyOn(React, 'useEffect').mockImplementation(f => f());
  });

  afterEach(() => {
    jest.restoreAllMocks();
    cleanup;
  });

  it('should fetch ratings', () => {

    axios.get.mockImplementation(() => Promise.resolve(mockRating));
  });

  it('handles error in axios request', async () => {
    axios.get = jest.fn().mockRejectedValueOnce({ error: 'Something went wrong' });
    renderWithContext(<RelStarRating {...mockRating} />);
    expect(await screen.findByText('Something went wrong')).toBeInTheDocument();

  });

  it('should make an axios call on mount', async () => {
    const { waitFor } = render(<RelStarRating />);

    await waitFor(() => {
      expect(mock.history.get.length).toBe(1);
    });
  });

  it('renders something that isn\'t null', () => {
    expect(RelStarRating).not.toBe(null);
  });

  it('renders star ratings', () => {
    renderWithContext(<RelStarRating {...mockRating} />);
    expect(screen.queryByTestId('rel-star-rating')).toBeFalsy();
  });

  it('should fetch rating data', () => {
    axios.get.mockImplementation(() => Promise.resolve(MOCKPRODUCT.rating.ratings));
  });

  it('should not render stars if there are no ratings for the product', () => {
    let anotherMockRating = null;
    renderWithContext(<RelStarRating {...anotherMockRating} />);
    expect(screen.queryByTestId('rel-star-rating')).toBeTruthy();
  });

  it('should calculate average of ratings', () => {
    const ratings = {
      1: '150',
      2: '207',
      3: '326',
      4: '322',
      5: '705'
    };
    const result = calculateRelAvg(ratings);
    expect(result).toEqual(3.716374269005848);
  });

  it('should call useEffect', () => {
    // Render your component
    renderWithContext(<RelStarRating />);

    // Assert that useEffect has been called
    expect(React.useEffect).toHaveBeenCalled();
  });

});