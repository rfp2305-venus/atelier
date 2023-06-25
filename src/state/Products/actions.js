import {fetchProducts} from "../../util/api";
import {handleFetchProduct} from "../productDetail/actions";
export const HANDLE_RECEIVE_PRODUCTS = 'HANDLE_RECEIVE_PRODUCTS';

export function handleFetchProducts() {
  return (dispatch) => {
    fetchProducts()
      .then((products) => {
        dispatch(handleReceiveProducts(products));
        dispatch(handleFetchProduct(products[0].id))
      })
  }
}

function handleReceiveProducts(products) {
  return {
    type: HANDLE_RECEIVE_PRODUCTS,
    products
  }
}