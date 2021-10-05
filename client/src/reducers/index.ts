import { combineReducers } from "redux";
import alert from "./alert";

export const rootReducer = combineReducers({
    alert,
});

export type RootState = ReturnType<typeof rootReducer>;
