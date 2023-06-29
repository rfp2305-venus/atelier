import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ProductsReducer from "./reducer";
import {HANDLE_RECEIVE_PRODUCTS, handleFetchProducts} from "./actions";
import {fetchProduct, fetchProductRatings, fetchProducts} from "../../util/api";
import {HANDLE_SET_PRODUCT} from "../productDetail/actions";
import {HANDLE_SET_LOADING} from "../app/actions";

const products = [{id: 1}, {id: 2}, {id: 3}];

const mockStore = configureStore([thunk]);

/*jest.mock('../productDetail/actions', () => {
  return {
    handleFetchProduct(productId) {
      return {
        type: 'MOCK'
      }
    }
  }
})*/

jest.mock('../../util/api', () => {
  return {
    async fetchProductRatings() {
      return []
    },
    async fetchProduct() {
      console.log('fetchProduct');
      return products[0]
    },
    async fetchProducts() {
      return products
    },
  }
})

describe('products reducer', () => {
  it('should return initial state when passed empty action', () => {
    const initialState = undefined;
    const action = {type: ''};
    const result = ProductsReducer(initialState, action);
    expect(result).toEqual({});
  })

  it('should add products received to state', () => {
    const initialState = undefined;
    const action = {
      type: HANDLE_RECEIVE_PRODUCTS,
      products
    };
    const result = ProductsReducer(initialState, action);
    expect(result).toEqual({products: [{id: 1}, {id: 2}, {id: 3}]});
    products.forEach((product, i) => {
      expect(result.products[i]).toEqual(products[i])
    })
  });

  it('should fetch Products and set state', async () => {
    const store = mockStore({products: {}});
    await store.dispatch(handleFetchProducts());
    const actions = store.getActions();
    expect(actions).toHaveLength(3);
    expect(actions[0].type).toEqual(HANDLE_SET_LOADING);
    expect(actions[1].type).toEqual(HANDLE_RECEIVE_PRODUCTS);
    expect(actions[2].type).toEqual(HANDLE_SET_LOADING);
  })
})