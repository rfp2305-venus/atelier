import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AppReducer from './app/reducer.js';
import ProductDetailReducer from './productDetail/reducer.js';
import relatedReducer from './related/reducer.js';
import ProductsReducer from "./Products/reducer.js";

const rootReducer = combineReducers({
  app: AppReducer,
  productDetail: ProductDetailReducer,
  products: ProductsReducer,
  modalStatus: relatedReducer
});

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export function getStoreWithState(preloadedState = {}) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk)
  );
}
