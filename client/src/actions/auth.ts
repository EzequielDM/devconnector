import { Dispatch } from "redux";
import { setAlert } from "./alert";

import ActionTypes, { IAPIError, IUser } from "./types";

import api from "../utils/api";

// Register
export const register = (formData: IUser) => async (dispatch: Dispatch) => {
    try {
        const res = await api.post("/users", formData);

        dispatch({
            type: ActionTypes.REGISTER_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        const error: IAPIError = err as IAPIError;
        const errors = error.response.data.errors;

        if (errors.length < 1) {
            [...errors].forEach(
                (error) => (dispatch: Dispatch) =>
                    setAlert((error as any).message, "danger")
            );
        }
    }
};
