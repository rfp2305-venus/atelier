
let lastID = 0;

export default function outfitReducer(state = [], action) {
  //every time an action is passed, all the reducers get called and each of their switch statements will get called to see if their switch statements
  //has switch statement that match up action.type and return state
  // console.log('action', action);

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
      article.id !== action.payload.id;
    });
    break;
  default:
    return state;
  }
}