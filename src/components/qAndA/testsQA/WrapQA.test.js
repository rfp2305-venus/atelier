import React from 'react';
import { useSelector } from 'react-redux';
import { render, screen } from '@testing-library/react';
import axios from 'axios';

import WrapQA from '../WrapQA';

jest.mock('react-redux');
jest.mock('axios');

describe('WrapQA', () => {

  // simulate product selection & render list prior to testing
  beforeEach(() => {
    useSelector.mockReturnValue({
      productDetail: {
        product: { id: 69 }
      }
    });
    render(<WrapQA />);
  });

  test('renders component correctly', () => {
    expect(screen.getByText('Q&A:')).toBeInTheDocument();
  });

  test('displays message when no questions', () => {
    expect(screen.getByText('No questions yet!')).toBeInTheDocument();
  });
});