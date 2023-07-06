import React from 'react';
import RelStarRating from '../RelStarRating';
import { calculateRelAvg } from '../RelStarRating';
import { render, screen, fireEvent, waitFor, act, cleanup } from '@testing-library/react';
import { MOCKPRODUCT, MOCKCOMPARISON, renderWithContext } from "../../../util/test-related.js";
import axios from 'axios';

jest.mock('axios');

describe('RelStarRating', () => {
  it('renders something that isn\'t null', () => {
    expect(RelStarRating).not.toBe(null);
  });

  it('renders star ratings', () => {
    const mockRating = MOCKPRODUCT.rating.ratings;
    renderWithContext(<RelStarRating {...mockRating} />);
    expect(screen.queryByTestId('rel-star-rating')).toBeTruthy();
  });

  it('should fetch rating data', () => {
    axios.get.mockImplementation(() => Promise.resolve(MOCKPRODUCT.rating.ratings));
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


});