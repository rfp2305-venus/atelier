import React from 'react'
import {expect, jest, test} from '@jest/globals';
import {render, screen, fireEvent, waitFor, act} from '@testing-library/react';
import {PRODUCTS, renderWithContext} from "../../../util/test-util";
import ProductOverview from "../ProductOverview";

describe('Product Overview', () => {

  it('should display the Component when provided productDetail', () => {
    renderWithContext(<ProductOverview />, {
      products: {products: PRODUCTS},
      productDetail: {
        product: PRODUCTS[0]
      }
    });
    expect(screen.queryByTestId('star-rating')).toBeTruthy();
  });

  it('should display the default style when rendered with product', () => {
    renderWithContext(<ProductOverview />, {
      products: {products: PRODUCTS},
      productDetail: {
        product: PRODUCTS[0]
      }
    });
    screen.getByText(PRODUCTS[0].name)
    screen.getByText(PRODUCTS[0].category)
    screen.getByText(PRODUCTS[0].default_price)
    const defaultStyle = PRODUCTS[0].styles.filter((style) => {
      return style['default?'];
    });

    const selectedThumbnail = screen.getByTestId(`style-thumbnail-${defaultStyle[0].style_id}`)
    expect(selectedThumbnail).toHaveClass('selected-style')
  });
})