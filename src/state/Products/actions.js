import {fetchProducts} from "../../util/api";
export const HANDLE_RECEIVE_PRODUCTS = 'HANDLE_RECEIVE_PRODUCTS';

export function handleFetchProducts() {
  return (dispatch) => {
    fetchProducts()
      .then((products) => dispatch(handleReceiveProducts(products)))
  }
}

function handleReceiveProducts(products) {
  return {
    type: HANDLE_RECEIVE_PRODUCTS,
    products
  }
}