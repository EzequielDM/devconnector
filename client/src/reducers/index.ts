import { combineReducers } from "redux";

import alert from "./alert";
import { auth } from "./auth";
import { profile } from "./profile";

export const rootReducer = combineReducers({
  alert,
  auth,
  profile,
});

export type RootState = ReturnType<typeof rootReducer>;
