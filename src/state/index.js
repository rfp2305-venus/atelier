import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AppReducer from './app/reducer.js';
import ProductDetailReducer from './productDetail/reducer.js';
import relatedReducer from './related/reducer.js';

const rootReducer = combineReducers({
  app: AppReducer,
  productDetail: ProductDetailReducer,
  related: relatedReducer
});

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
