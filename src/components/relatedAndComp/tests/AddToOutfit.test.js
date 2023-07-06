import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import AddToOutfit from '../AddToOutfit';
import { MOCKARTICLE, renderWithContext, MOCKPRODUCT } from '../../../util/test-related.js';


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

  it('should add an article to outfit when button is clicked', async () => {
    renderWithContext(<AddToOutfit />, {article: []}, {productDetail: {product: MOCKPRODUCT}});
    const btn = await screen.findByRole('button', {name: 'Add to Outfit'});
    fireEvent.click(btn);
  });

});