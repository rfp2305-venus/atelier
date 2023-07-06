import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import ImageModal from '../ImageModal';

describe('ImageModal', () => {

  const handleClose = jest.fn();

  beforeEach(() => {

    render(
      <ImageModal
        open={ true }
        handleClose={ handleClose }
        imageURL={ 'test-image.jpg' }
      />
    );
  });

  test('renders component w/ provided imageURL', () => {

    const img = screen.getByRole('img', { src: 'test-image.jpg' });
    expect(img).toBeInTheDocument();
  });

  test('calls handleClose when close button clicked', () => {

    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  /*
  test('calls handleClose when close button clicked', () => {

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalled();
  });
  */
});