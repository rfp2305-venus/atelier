import {HANDLE_RECEIVE_REVIEWS} from "./actions";

const initialState = {
  reviews: null
};

export default function ReviewsReducer(state = initialState, action) {
  switch(action.type) {
    case HANDLE_RECEIVE_REVIEWS:
      return {
        ...state,
        reviews: action.reviews
      }
    default:
      return {
        ...state
      }
  }
}
