import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import AddToOutfit from '../AddToOutfit';
import { MOCKARTICLE, renderWithContext } from '../../../util/test-related.js';

describe('AddToOutfit component', () => {

  afterEach(cleanup);

  it('renders Add to Outfit component', () => {
    renderWithContext(<AddToOutfit />, {article: MOCKARTICLE});
    expect(screen.queryByTestId('add-to-outfit')).ToBeTruthy;
  });

  it('renders Add to Outfit button', () => {
    renderWithContext(<AddToOutfit />, {article: MOCKARTICLE});
    expect(screen.queryByTestId('add-to-outfit-button')).ToBeTruthy;
  });

});