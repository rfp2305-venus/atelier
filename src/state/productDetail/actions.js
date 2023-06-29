
import { fetchProduct } from '../../util/api.js';
import { handleSetLoading } from '../app/actions.js';
export const HANDLE_SET_PRODUCT = 'HANDLE_SET_PRODUCT';

export function handleFetchProduct(productId) {
  return (dispatch) => {
    dispatch(handleSetLoading(true));

    fetchProduct(productId)
      .then((product) => {
        dispatch(handleSetProduct(product))
        console.log(product);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        dispatch(handleSetLoading(false));
      })
  }
}
export function handleSetProduct(product) {
  return {
    type: HANDLE_SET_PRODUCT,
    product
  }
}