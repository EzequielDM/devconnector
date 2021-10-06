import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { rootReducer } from "./reducers";
import setAuthToken from "./utils/setAuthToken";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

/**
 * ! Set up a storage subscription listener
 * * This is used because according to redux guidelines, every reducer should be pure and do only one thing.
 * * On the original implementation, Brad didn't use this, so the reducers had the function of setting axios headers and checking for auth
 * * this is not supposed to happen and discouraged according to the redux rules.
 */

/**
 * -- Why is this here?
 * * This is here because if we don't initialize the current state from the redux store, the value will be undefined, which will return an error
 */
let currentState = store.getState();

store.subscribe(() => {
  // Save the value from our previous state before updating to check if there are differences
  let previousState = currentState;
  currentState = store.getState();

  if (previousState.auth.token !== currentState.auth.token) {
    const token: string = currentState.auth.token || "";
    setAuthToken(token);
  }
});

export default store;
