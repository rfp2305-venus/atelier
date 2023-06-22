import { HANDLE_SET_LOADING, HANDLE_SET_THEME } from './actions.js';
import { initialState } from './initialState.js';

export default function AppReducer(state = initialState, action) {
  switch (action.type) {
    case HANDLE_SET_LOADING:
      return {
        ...state,
        loading: action.loading
      }
      break;
    case HANDLE_SET_THEME:
      return {
        ...state,
        theme: action.theme
      }
      break;
    default:
      return {
        ...state
      }
  }
}
