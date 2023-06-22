import { initialState } from './initialState.js';
import { HANDLE_SET_PRODUCT } from './actions.js';

export default function ProductDetail(state = initialState, action) {
  switch (action.type) {
    case HANDLE_SET_PRODUCT:
      return {
        ...state,
        product: action.product
      }
      break;
  }
}