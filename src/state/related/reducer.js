export default function relatedReducer(state, action) {
  //every time an action is passed, all the reducers get called and each of their switch statements will get called to see if their switch statements
  //has switch statement that match up action.type and return state
  // console.log('action', action);

  switch (action.type) {
  case 'a specific type':
    return {
      ...state,
      data: action.data
    }
    break;
  case 'comparison modal':
    return {
      ...state,
      modalStatus: action.modalStatus
    }
    break;
  default:
    return {
      ...state
    }
 }
}