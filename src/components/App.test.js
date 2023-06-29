import React from 'react'
import {expect, jest, test} from '@jest/globals';
import {render, screen, fireEvent, waitFor, act} from '@testing-library/react';
import axios from 'axios';
import { Provider } from 'react-redux'
import {getStoreWithState} from "../state";
import App from "./App";
import * as api from '../util/api';
import {handleSetLoading} from "../state/app/actions";
import {PRODUCTS, renderWithContext} from "../util/test-util";

const fetchProductsSpy = jest.spyOn(api, 'fetchProducts');
const fetchProductSpy = jest.spyOn(api, 'fetchProduct');

const axiosMock = jest.spyOn(axios, 'get');



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
      fetchProductsSpy.mockResolvedValueOnce(PRODUCTS);
    })
    waitFor(() => {
      expect(screen.queryByTestId('loading')).toBeNull();
    })
  });

  it('Should display a drop down with all products', async () => {
    const {store, ...util} = renderWithContext(<App />, {products: {products: PRODUCTS}});
    await act(() => fetchProductsSpy.mockResolvedValueOnce(PRODUCTS))
    fireEvent.mouseDown(screen.getByRole('button'));
    expect(screen.getAllByTestId('product-select-option')).toHaveLength(3);
  });

  describe('on load', () => {
    beforeEach(() => {

    })

    it('Should dispatch call to fetch products', () => {
      const {store, ...util} = renderWithContext(<App />, {products: {products: PRODUCTS}});

      waitFor(() => {
        expect(fetchProductsSpy.mock.calls).toEqual(1);
      })
    });
    it('Should dispatch call to set product', async () => {
      const {store, ...util} = renderWithContext(<App />, {products: {products: PRODUCTS}});
      act(() => {
        fetchProductsSpy.mockResolvedValue(PRODUCTS);
        fetchProductSpy.mockResolvedValue(PRODUCTS[0]);
        axiosMock.mockResolvedValue(PRODUCTS[0]);
      })
      fireEvent.mouseDown(screen.getByRole('button'));
      expect(screen.getAllByTestId('product-select-option')).toHaveLength(PRODUCTS.length);

      expect(axiosMock.mock.calls).toHaveLength(0);

      // fireEvent.mouseDown(screen.getAllByTestId('product-select-option')[0]);
      fireEvent.click(screen.getAllByTestId('product-select-option')[0]);

      await waitFor(() => {
        expect(fetchProductSpy.mock.calls).toHaveLength(1);
      })
    });

    it('Should render ProductOverview when Product is selected', async () => {
      const {store, ...util} = renderWithContext(<App />, {products: {products: PRODUCTS}});
      act(() => {
        fetchProductsSpy.mockResolvedValue(PRODUCTS);
        fetchProductSpy.mockResolvedValue(PRODUCTS[0]);
      })
      fireEvent.mouseDown(screen.getByRole('button'));

      act(() => {
        axiosMock.mockResolvedValueOnce(PRODUCTS[0]);
      })
      // fireEvent.mouseDown(screen.getAllByTestId('product-select-option')[0]);
      fireEvent.click(screen.getAllByTestId('product-select-option')[0]);



      await waitFor(() => {
        console.log(screen.queryByTestId('product-overview-component'));
        expect(screen.queryByTestId('product-overview-component')).toBe(null)
      })
    });
  })
})

