export default function CartReducer(state = {products: []}, action) {
  switch(action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [
          ...state.products,
          action.payload
        ]
      }
      break;
    case 'REMOVE_PRODUCT':
      return {
        ...state,
        products: state.products.filter((product) =>
          product.id !== action.payload
        )
      }
      break;

    default:
      return {
        ...state
      }

  }
}