/**
 * @jest-environment jsdom
 */

const { API_URL, API_KEY } = process.env;

import React from 'react';
import axios from 'axios';
import RelatedComp from '../RelatedComp';
import { RELATED, MOCKPRODUCT, renderWithContext } from '../../../util/test-related.js';
// Imports the redux-mock-store
import {render, screen, fireEvent, waitFor, act, cleanup} from '@testing-library/react';

jest.mock('axios');

describe('RelatedComp', () => {
  afterEach(cleanup);

  it('should fetch related products', () => {
    const related = RELATED;
    axios.get.mockImplementation(() => Promise.resolve(related));
  });

  it('renders something that isn\'t null', () => {
    expect(RelatedComp).not.toBe(null);
  });

  it('renders the RelatedComp Component', () => {
    renderWithContext(<RelatedComp />, {
      productDetail: {
        product: MOCKPRODUCT
      }
    });
    expect(screen.queryByTestId('related-comp-test')).ToBeTruthy;
  });

});