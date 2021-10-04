import { v4 as uuid } from "uuid";
import ActionTypes from "./types";
import { Dispatch } from "redux";

export const setAlert =
    (msg: string, alertType: string) => (dispatch: Dispatch) => {
        const id = uuid();
        dispatch({
            type: ActionTypes.SET_ALERT,
            payload: { id, msg, alertType },
        });
    };
