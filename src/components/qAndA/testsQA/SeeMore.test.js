import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import SeeMore from '../SeeMore';

describe('SeeMore', () => {

  const mockSetLength = jest.fn();
  const mockSetExpanded = jest.fn();

  test('renders component for question type', () => {

    render(
      <SeeMore
        type="question"
        length={ 4 }
        setLength={ mockSetLength }
      />
    );
    expect(screen.getByText('More Answered Questions')).toBeInTheDocument();
  });

  beforeEach(() => {

    render(
      <SeeMore
        type="answer"
        aLength={ 10 }
        length={ 4 }
        setLength={ mockSetLength }
        isExpanded={ false }
        setExpanded={ mockSetExpanded }
      />
    );
  });

  test('renders component for answer type', () => {

    expect(screen.getByText('See More Answers')).toBeInTheDocument();
  });

  test('calls setLength & setExpanded on click', () => {

    const seeMoreButton = screen.getByText('See More Answers');
    fireEvent.click(seeMoreButton);

    expect(mockSetLength).toHaveBeenCalledTimes(1);
    expect(mockSetLength).toHaveBeenCalledWith(10);

    expect(mockSetExpanded).toHaveBeenCalledTimes(1);
    expect(mockSetExpanded).toHaveBeenCalledWith(true);
  });

  test('text renders appropriately when expanded for answer type', () => {

    render(
      <SeeMore
        type="answer"
        aLength={ 10 }
        length={ 4 }
        setLength={ mockSetLength }
        isExpanded={ true } // <— **
        setExpanded={ mockSetExpanded }
      />
    );
    expect(screen.getByText('Collapse Answers')).toBeInTheDocument();
  });
});