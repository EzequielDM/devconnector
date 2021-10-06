import { combineReducers } from "redux";

import alert from "./alert";
import { auth } from "./auth";

export const rootReducer = combineReducers({
  alert,
  auth,
});

export type RootState = ReturnType<typeof rootReducer>;
