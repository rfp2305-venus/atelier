import React from 'react'
import {expect, jest, test} from '@jest/globals';
import {render, screen, fireEvent, waitFor, act, cleanup, within} from '@testing-library/react';
import {PRODUCTS, renderWithContext} from "../../../util/test-util";
import ProductOverview from "../ProductOverview";

async function clickToOpenSizeSelect() {
  fireEvent.mouseDown(
    screen.getByTestId('size-select')
      .querySelector('#skus-select')
  );
}

async function clickToSelectSizeOption(id) {
  fireEvent.click(screen.getByTestId(`size-option-${id}`));
}

async function clickToOpenQuantitySelect() {
  fireEvent.mouseDown(
    screen.queryByTestId('quantity-select')
      .querySelector('#quantity-select')
  );
}

describe('Product Overview', () => {

  afterEach(cleanup)

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

    const selectedThumbnail = screen.getByTestId(
      `style-thumbnail-${defaultStyle[0].style_id}`
    )
    expect(selectedThumbnail).toHaveClass('selected-style');
  });

  it('should display the corresponding quantity to selected size', async () => {
    const product = PRODUCTS[0];
    renderWithContext(<ProductOverview />, {
      products: {products: PRODUCTS},
      productDetail: {
        product: product
      }
    });

    const defaultStyle = product
      .styles
      .filter((style) => style['default?'])[0];
    const skuKeys = Object.keys(defaultStyle.skus);
    const defaultSku = {id: skuKeys[0], ...defaultStyle.skus[skuKeys[0]]};

    await clickToOpenSizeSelect();

    expect(screen.getAllByRole('option')).toHaveLength(skuKeys.length);


    await clickToSelectSizeOption(defaultSku.id)

    expect(screen.queryByTestId('quantity-select')).toBeTruthy();

    await clickToOpenQuantitySelect();

    expect(screen.queryAllByTestId('quantity-option')).toHaveLength(defaultSku.quantity);
  });

  it('should update the selected style', () => {
    renderWithContext(<ProductOverview />, {
      products: {products: PRODUCTS},
      productDetail: {
        product: PRODUCTS[0]
      }
    });
    const defaultStyle = PRODUCTS[0].styles.filter((style) => style['default?']);
    const selectedThumbnail = screen.getByTestId(
      `style-thumbnail-${defaultStyle[0].style_id}`
    )

    const thumbnails = screen.getAllByRole('style-thumbnail');

    expect(thumbnails).toHaveLength(PRODUCTS[0].styles.length);
    expect(thumbnails[0].classList.contains('selected-style')).toBe(true);
    expect(thumbnails[1].classList.contains('selected-style')).toBe(false);

    expect(screen.queryByText(PRODUCTS[0].styles[0].name)).toBeTruthy();

    fireEvent.click(thumbnails[1]);

    expect(thumbnails[0].classList.contains('selected-style')).toBe(false);
    expect(thumbnails[1].classList.contains('selected-style')).toBe(true);
    expect(screen.queryByText(PRODUCTS[0].styles[1].name)).toBeTruthy();
  });
})