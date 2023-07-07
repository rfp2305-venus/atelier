import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AppReducer from './app/reducer.js';
import ProductDetailReducer from './productDetail/reducer.js';
import relatedReducer from './related/reducer.js';
import ProductsReducer from './Products/reducer.js';
import ReviewsReducer from './RatingsReviews/reducer.js';
import outfitReducer from './outfit/reducer.js';
import CartReducer from "./Cart/reducer";


const rootReducer = combineReducers({
  app: AppReducer,
  productDetail: ProductDetailReducer,
  products: ProductsReducer,
  comparisonDetail: relatedReducer,
  reviews: ReviewsReducer,
  article: outfitReducer,
  cart: CartReducer
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
