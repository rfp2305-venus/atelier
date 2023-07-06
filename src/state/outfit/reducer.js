export default function outfitReducer(state = [], action) {

  switch (action.type) {
  case 'ADD_ARTICLE':
    return [
      ...state,
      {
        article: action.article,
        productID: action.productID,
      }
    ];
    break;
  case 'REMOVE_ARTICLE':
    return state.filter((article) => {
      article.article.id !== action.article.article.id;
    });
    break;
  default:
    return state;
  }
}