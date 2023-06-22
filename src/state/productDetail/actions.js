export const HANDLE_SET_PRODUCT = 'HANDLE_SET_PRODUCT';

export function handleFetchProduct(productId) {
  return (dispatch) => {
    // TODO:
    // fetch product from api
    // dispatch(handleSetProduct(result))
  }
}
export function handleSetProduct(product) {
  return {
    type: HANDLE_SET_PRODUCT,
    product
  }
}