import React from 'react';
import RelatedProducts from '../RelatedProducts';
import { RELATED } from '../../../util/test-related.js';

describe('RelatedProducts', () => {
  it('renders something that isn\'t null', () => {
    expect(RelatedProducts).not.toBe(null);
  });
});
