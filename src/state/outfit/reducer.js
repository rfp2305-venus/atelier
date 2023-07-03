
let lastID = 0;

export default function outfitReducer(state = [], action) {

  switch (action.type) {
  case 'ADD_ARTICLE':
    return [
      ...state,
      {
        id: ++lastID,
        article: action.article
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