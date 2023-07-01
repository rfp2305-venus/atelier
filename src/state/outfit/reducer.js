export default function outfitReducer(state = [], action) {
  //every time an action is passed, all the reducers get called and each of their switch statements will get called to see if their switch statements
  //has switch statement that match up action.type and return state
  // console.log('action', action);

  switch (action.type) {
    case 'ADD_ARTICLE':
      state = state.slice();
      state.push(action.article);
      return state;
      break;
    // case: 'REMOVE_ARTICLE':
      //REFERENCE FOLLOWING CODE, EXCEPT SPLICE ARTICLE AT THE CORRECT INDEX
      //state = state.slice();
      //state.push(action.article);
      //return state;
    default:
      return {
        ...state
      }
  }
}