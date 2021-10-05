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
        let errors: any = error.response.data.errors;

        if (errors) {
            Object.keys(errors).forEach(
                (error: any) => (dispatch: Dispatch) =>
                    setAlert(error[Object.keys(error)[0]], "danger")
            );
        }
    }
};
