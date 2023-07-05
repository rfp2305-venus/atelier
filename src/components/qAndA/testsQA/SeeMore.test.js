import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import SeeMore from '../SeeMore';

describe('SeeMore', () => {

  test('renders component for question type', () => {

    render(<SeeMore type="question" length={ 4 } setLength={ jest.fn() } />);
    expect(screen.getByText('More Answered Questions')).toBeInTheDocument();
  });

  test('renders component for answer type', () => {

    render(
      <SeeMore
        type="answer"
        aLength={ 10 }
        length={ 4 }
        setLength={ jest.fn() }
        isExpanded={ false }
        setExpanded={ jest.fn() }
      />
    );
    expect(screen.getByText('See More Answers')).toBeInTheDocument();
  });

  test('calls setLength & setExpanded on click', () => {

    const setLength = jest.fn();
    const setExpanded = jest.fn();

    render(
      <SeeMore
        type="answer"
        aLength={ 10 }
        length={ 4 }
        setLength={ setLength }
        isExpanded={ false }
        setExpanded={ setExpanded }
      />
    );

    const seeMoreButton = screen.getByText('See More Answers');

    fireEvent.click(seeMoreButton);

    expect(setLength).toHaveBeenCalledWith(10);
    expect(setExpanded).toHaveBeenCalledWith(true);
  });

  test('text renders appropriately when expanded for answer type', () => {

    render(
      <SeeMore
        type="answer"
        aLength={ 10 }
        length={ 4 }
        setLength={ jest.fn() }
        isExpanded={ true }
        setExpanded={ jest.fn() }
      />
    );
    expect(screen.getByText('Collapse Answers')).toBeInTheDocument();
  });
});