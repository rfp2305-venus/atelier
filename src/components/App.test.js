import React from 'react'
import {expect, jest, test} from '@jest/globals';
import {render, screen, fireEvent, waitFor, act} from '@testing-library/react';
import { Provider } from 'react-redux'
import {getStoreWithState} from "../state";
import App from "./App";
import * as api from '../util/api';
import {handleSetLoading} from "../state/app/actions";
import {renderWithContext} from "../../__tests__/util";

const apiSpy = jest.spyOn(api, 'fetchProducts');

const PRODUCTS = [
  {id: 1, name: 'test product'},
  {id: 2, name: 'test product2'},
  {id: 3, name: 'test product 3'},
]

describe('App Component', () => {

  it('Should display loading', async () => {
    const {store, ...util} = renderWithContext(<App />, {products: {products: PRODUCTS}})
    console.log(store.getState());

    act(() => {
      store.dispatch(handleSetLoading(true));
    })
    expect(util.queryByTestId('loading')).toBeTruthy();
    act(() => {
      // store.dispatch(handleSetLoading(true));
      apiSpy.mockResolvedValueOnce(PRODUCTS);
    })
    waitFor(() => {
      expect(screen.queryByTestId('loading')).toBeNull();
    })
  });

  it('Should display a drop down with all products', async () => {
    const {store, ...util} = renderWithContext(<App />, {products: {products: PRODUCTS}});
    act(() => {
      apiSpy.mockResolvedValueOnce(PRODUCTS);
    })
    fireEvent.click(util.getByRole('button'))

    waitFor(() => {
      expect(util.getAllByRole('option')).toHaveLength(PRODUCTS.length);
    })
  });
})

