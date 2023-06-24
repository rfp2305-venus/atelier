/*
reducers passed state + action

each time action passed
  switch statement: (matching case) —> appropriate state change

reducers all return state
*/
export function ReduceQuestion(state = [], action) {
  const { type } = action;

  switch(type) {
    case GET_QUESTIONS:
    // fetch API or return init val
      return [ ...state ]; // placeholder

    // anticipate more cases **
    case UPVOTE_:
      state.map(({ votes }) => votes + 1);

      default:
        return state;
  }
}

export function ReduceAnswer(state = [], action) {
  switch(action.type) {
    case GET_QUESTIONS:
      // fetch questions from API
      // OR return initial state
      return [ ...state ]; // placeholder **

    case UPVOTE_ANSWER:
      return state.map((answer) => {
        const { id } = answer;
        const { data } = action;

        // find answer w/ matching ID
        if (id === data) {
          // increment vote count
          answer.votes++;
        }

        return answer;
      });

    case REPORT_ANSWER:
      return state.map((answer) => {
        const { id } = answer;
        const { data } = action;

        // find answer w/ matching ID
        if (id === data) {
          // toggle boolean flag
          answer.isReported = true;
        }

        return answer;
      });

    default:
      return state;
  }
}