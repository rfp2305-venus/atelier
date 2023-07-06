import React from 'react';
import RelatedProducts from '../RelatedProducts';
import { RELATED } from '../../../util/test-related.js';
import {render, screen, fireEvent, waitFor, act, cleanup} from '@testing-library/react';

describe('RelatedProducts', () => {

  it('renders something that isn\'t null', () => {
    expect(RelatedProducts).not.toBe(null);
  });

  it('renders the related products component', () => {
    render(<RelatedProducts {...RELATED} />);
    expect(screen.queryByTestId('related-products')).toBeTruthy();
  });

});
