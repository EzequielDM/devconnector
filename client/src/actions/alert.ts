import { v4 as uuid } from "uuid";
import ActionTypes from "./types";
import { Dispatch } from "redux";

export const setAlert =
    (msg: string, alertType: string, timeout: number = 5000) =>
    (dispatch: Dispatch) => {
        const id = uuid();
        dispatch({
            type: ActionTypes.SET_ALERT,
            payload: { id, msg, alertType },
        });

        setTimeout(
            () => dispatch({ type: ActionTypes.REMOVE_ALERT, payload: { id } }),
            timeout
        );
    };

export const removeAlert = (id: string) => (dispatch: Dispatch) => {
    dispatch({
        type: ActionTypes.REMOVE_ALERT,
        payload: { id },
    });
};
