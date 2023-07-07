export function handleAddProductToCart(product) {
  return {
    type: 'ADD_PRODUCT',
    payload: product
  }
}

export function handleRemoveFunction(id) {
  return {
    type: 'REMOVE_PRODUCT',
    payload: id
  }
}