import {HANDLE_RECEIVE_PRODUCTS} from "./actions";

export default function ProductsReducer(state={}, action) {
  switch(action.type) {
    case HANDLE_RECEIVE_PRODUCTS:
      return {
        ...state,
        products: action.products
      }
    break;
    default:
      return {
        ...state
      }
    break;
  }
}