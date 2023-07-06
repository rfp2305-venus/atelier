import React from 'react';
import {expect, jest, test} from '@jest/globals';
import {render, screen, fireEvent, waitFor, act, cleanup} from '@testing-library/react';
import {MOCKPRODUCT, MOCKCOMPARISON, renderWithContext} from "../../../util/test-related.js";
import ComparisonModal from "../ComparisonModal";

describe('Comparison Modal', () => {
  afterEach(cleanup);

  it('should render the Comparison Modal', () => {
    renderWithContext(<ComparisonModal open onClose productID/>, {
      productDetail: {
        product: MOCKPRODUCT
      },
      comparisonDetail: {comparisonDetail: MOCKCOMPARISON}
    });
    expect(screen.queryByTestId('comparison-modal')).toBeTruthy();
  });

  it('renders button to close modal', () => {
    renderWithContext(<ComparisonModal open onClose productID/>, {
      productDetail: {
        product: MOCKPRODUCT
      },
      comparisonDetail: {comparisonDetail: MOCKCOMPARISON}
    });
    expect(screen.queryByTestId('close-comparison-modal')).ToBeTruthy;
  });
});