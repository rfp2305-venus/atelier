import {getStoreWithState} from "../src/state";
import {render} from "@testing-library/react";
import {Provider} from "react-redux";
import React from "react";

export function renderWithContext(element, state = {}) {
  const store = getStoreWithState(state);
  const utils = render (
    <Provider store={store}>
      {element}
    </Provider>
  )
  return {store, ...utils};
}