import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import outfitReducer from './reducer.js';
import { ADD_ARTICLE, REMOVE_ARTICLE, wearArticle, removeArticle } from './actions';
import handleAddArticle from './actions';

import { fetchProduct } from '../../util/api';

const article = [{id: 1}, {id: 2}, {id: 3}]

const mockStore = configureStore([thunk]);

jest.mock('../../util/api', () => {
  return {
    async wearArticle() {
      console.log('fetchProduct');
      return article;
    }
  }
});

describe('products reducer', () => {
  it('should return initial state when passed an empty action', () => {
    const initialState = undefined;
    const action = {type: ''};
    const result = outfitReducer(initialState, action);
    expect(result).toEqual([]);
  });

  it('should add products received to state', () => {
    const initialState = undefined;
    const action = handleAddArticle({}, 1);
    const result  = outfitReducer(initialState, action);
    expect(result).toEqual([{"article": {}, "productID": 1}]);
  });

  it('should remove articles when appropriate action is called', () => {
    const initialState = [{article: {}, productID: 1}, {article: {}, productID: 2}, {article: {}, productID: 3}];
    const action = removeArticle({article: {}, productID: 1})
    const result = outfitReducer(initialState, action);
    expect(result).toEqual([])
  });

  it('should fetch article and add it to state', async () => {
    const store = mockStore({article: []});
    const action = await wearArticle(40344);
    expect(action).toHaveLength(1);
  });

});