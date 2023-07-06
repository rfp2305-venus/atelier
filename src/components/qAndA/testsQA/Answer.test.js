import React from 'react';
import { render, screen } from '@testing-library/react';

import Answer from '../Answer';

describe('Answer', () => {

  beforeEach(() => {
    const mockAnswer = {
      id: 1,
      body: 'love selling',
      date: 'June 09, 1969',
      user: 'Seller',
      isSeller: true,
      helpfulness: 0,
      photos: [{ id: 1, url: 'https://test-image.com/mock' }],
      reported: false
    };
    render(<Answer { ...mockAnswer } />);
  });

  test('answer details appear on page', () => {

    const body = screen.queryByText('love selling', { exact: false });
    const date = screen.queryByText('June 09, 1969', { exact: false });

    expect(body).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  test('renders username as bold when "Seller"', () => {

    const seller = screen.queryByText('By Seller', { exact: false });

    if (seller) {
      const styles = window.getComputedStyle(seller);
      expect(styles.fontWeight).toBe('700');

    } else {
      expect(seller).toBeNull();
    }
  });
});