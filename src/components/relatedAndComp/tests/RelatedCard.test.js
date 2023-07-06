import React from 'react';
import RelatedCard from '../RelatedCard';
import {render, screen, fireEvent, waitFor, act, cleanup} from '@testing-library/react';
import {MOCKPRODUCT, MOCKCOMPARISON, renderWithContext} from "../../../util/test-related.js";
import axios from 'axios';

jest.mock('axios');

describe('RelatedCard', () => {

  it('renders something that isn\'t null', () => {
    expect(RelatedCard).not.toBe(null);
  });

  it('renders the cards if there is a related product', () => {
    const mockProductID = 40345;
    renderWithContext(<RelatedCard {...mockProductID} />);
    expect(screen.queryByTestId('related-card')).toBeTruthy();
  });

  it('should fetch the related product', () => {
    axios.get.mockImplementation(() => Promise.resolve(MOCKPRODUCT));
  });

  it('should fetch the related product\'s styles', () => {
    axios.get.mockImplementation(() => Promise.resolve(MOCKPRODUCT.styles));
  });

  it('renders')
});