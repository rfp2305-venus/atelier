import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Search from '../Search';

describe('Search', () => {

  const setSearch = jest.fn();

  test('renders component w/ input', () => {

    render(<Search search={ 'test' } setSearch={ setSearch } />);

    const input = screen.getByPlaceholderText('Have a question? Search for answers...');

    expect(input.value).toBe('test');
  });

  test('calls setSearch when input value changes', () => {

    render(<Search search={ '' } setSearch={ setSearch } />);

    const input = screen.getByPlaceholderText('Have a question? Search for answers...');

    fireEvent.change(input, { target: { value: 'new value' } });

    expect(setSearch).toHaveBeenCalledTimes(1);
    expect(setSearch).toHaveBeenCalledWith('new value');
  });
});