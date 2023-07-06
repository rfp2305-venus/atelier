import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Search from '../Search';

describe('Search', () => {

  const mockSetSearch = jest.fn();

  test('renders component w/ input', () => {

    render(
      <Search
        search={ 'test' }
        setSearch={ mockSetSearch }
      />
    );

    const input = screen.getByPlaceholderText('Have a question? Search for answers...');

    expect(input.value).toBe('test');
  });

  test('calls setSearch when input value changes', () => {

    render(
      <Search
        search={ '' }
        setSearch={ mockSetSearch }
      />
    );

    const input = screen.getByPlaceholderText('Have a question? Search for answers...');

    fireEvent.change(input, { target: { value: 'new value' } });

    expect(mockSetSearch).toHaveBeenCalledTimes(1);
    expect(mockSetSearch).toHaveBeenCalledWith('new value');
  });
});