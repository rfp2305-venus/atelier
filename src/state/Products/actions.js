import {fetchProducts} from "../../util/api";
import {handleFetchProduct} from "../productDetail/actions";
import {handleSetLoading} from "../app/actions";
export const HANDLE_RECEIVE_PRODUCTS = 'HANDLE_RECEIVE_PRODUCTS';

export function handleFetchProducts() {
  return (dispatch) => {
    dispatch(handleSetLoading(true))
    fetchProducts()
      .then(async (products) => {
        dispatch(handleReceiveProducts(products));
        dispatch(handleSetLoading(false));
        dispatch(handleFetchProduct(40344));
      })
  }
}

function handleReceiveProducts(products) {
  return {
    type: HANDLE_RECEIVE_PRODUCTS,
    products
  }
}