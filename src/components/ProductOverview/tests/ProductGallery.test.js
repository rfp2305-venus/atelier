import React from 'react';
import {expect} from '@jest/globals';
import {screen, fireEvent, render} from '@testing-library/react';
import {PRODUCTS, renderWithContext} from "../../../util/test-util";
import ProductGallery from '../ProductGallery';
import ProductOverview from "../ProductOverview";

describe('Product Gallery', () => {

  it('should display the default image by default', () => {
    const defaultStyle = PRODUCTS[0].styles.filter((st) => {
      return st['default?'];
    })[0];

    render(<ProductGallery product={defaultStyle} />);
    expect(screen.queryByTestId(`gallery-main-0`)).toBeTruthy();
  });

  it('should set the correct image', () => {
    const defaultStyle = PRODUCTS[0].styles.filter((st) => {
      return st['default?'];
    })[0];

    render(<ProductGallery product={defaultStyle} />);

    const thumbnails = screen.queryAllByTestId('img-scroll-img');

    expect(thumbnails).toHaveLength(defaultStyle.photos.length);
    expect(thumbnails[0]).toHaveClass('selected-img');

    fireEvent.click(thumbnails[1]);
    expect(screen.queryByTestId(`gallery-main-1`)).toBeTruthy();
    expect(thumbnails[1]).toHaveClass('selected-img');
  });

  it('should select the next image', () => {
    const defaultStyle = PRODUCTS[0].styles.filter((st) => {
      return st['default?'];
    })[0];

    render(<ProductGallery product={defaultStyle} />);

    const thumbnails = screen.queryAllByTestId('img-scroll-img');
    expect(thumbnails[0]).toHaveClass('selected-img');
    expect(screen.queryByTestId(`gallery-main-0`)).toBeTruthy();

    fireEvent.click(screen.queryByRole('select-next-btn'));
    expect(thumbnails[1]).toHaveClass('selected-img');
    expect(screen.queryByTestId(`gallery-main-1`)).toBeTruthy();
    expect(screen.queryByTestId(`gallery-main-0`)).toBeFalsy();
  });

  it('should select the last image', () => {
    const defaultStyle = PRODUCTS[0].styles.filter((st) => {
      return st['default?'];
    })[0];

    render(<ProductGallery product={defaultStyle} />);

    const thumbnails = screen.queryAllByTestId('img-scroll-img');
    expect(thumbnails[0]).toHaveClass('selected-img');
    expect(screen.queryByTestId(`gallery-main-0`)).toBeTruthy();

    fireEvent.click(screen.queryByRole('select-next-btn'));
    expect(thumbnails[1]).toHaveClass('selected-img');

    fireEvent.click(screen.queryByRole('select-last-btn'));

    expect(screen.queryByTestId(`gallery-main-0`)).toBeTruthy();
    expect(screen.queryByTestId(`gallery-main-1`)).toBeFalsy();
  });

  it('should enter fullscreen mode', () => {
    const defaultStyle = PRODUCTS[0].styles.filter((st) => {
      return st['default?'];
    })[0];

    render(<ProductGallery product={defaultStyle} />);

    fireEvent.click(screen.queryByRole('enter-fullscreen-btn'));

    expect(screen.queryByRole('gallery-wrapper')).toHaveClass('full-screen')
  });
});