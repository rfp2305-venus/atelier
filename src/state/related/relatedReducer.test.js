import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import relatedReducer from './reducer';
import {handleFetchComparisonProduct, COMPARISON} from './actions';
import { fetchProduct } from '../../util/api.js';

import handleSetComparisonProduct from './actions';

const comparisonDetail = {id: 1};

const mockStore = configureStore([thunk]);

jest.mock('../../util/api.js', () => {
  return {
    async handleFetchComparisonProduct() {
      return comparisonDetail;
    },
  }
});

describe('related Reducer', () => {
 it('should return initial state when passed empty action', () => {
  const initialState = undefined;
  const action = {type: ''};
  const result = relatedReducer(initialState, action);
  expect(result).toEqual({});
 });

  it('should add a product received to state', () => {
    const initialState = undefined;
    const action = handleSetComparisonProduct({id: 1});
    const result = relatedReducer(initialState, action);
    expect(result).toBeTruthy();
  });

  it('should fetch comparison product', async () => {
    const store = mockStore ({comparisonDetail: {}});
    const action = await handleFetchComparisonProduct(1);
    expect(action).toHaveLength(1);
  });
});