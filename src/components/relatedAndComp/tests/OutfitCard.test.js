import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import OutfitCard from '../OutfitCard';
import { MOCKARTICLE, renderWithContext, MOCKPRODUCT } from '../../../util/test-related.js';

describe('OutfitCard component', () => {
  beforeEach(()=> {
    const mockArticle = {
      article: {
        article: {
          article: MOCKPRODUCT,
          productID: MOCKPRODUCT.id
        }
      }
    };
    renderWithContext(<OutfitCard {...mockArticle}/>);
  });

  afterEach(cleanup);

  it('does not render outfit card on initial load', () => {
    expect(screen.queryByTestId('add-to-outfit')).ToBeFalsy;
  });

});