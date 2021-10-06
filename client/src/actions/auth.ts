import { Dispatch } from "redux";
import { setAlert } from "./alert";

import ActionTypes, { IUser } from "./types";

import api from "../utils/api";

// Register
export const register = (formData: IUser) => async (dispatch: Dispatch) => {
    try {
        const res = await api.post("/users", formData);

        dispatch({
            type: ActionTypes.REGISTER_SUCCESS,
            payload: res.data,
        });

        dispatch<any>(setAlert("User registered successfully!", "success"));
    } catch (err: any) {
        if (typeof err.response.data === "string")
            return dispatch<any>(setAlert(err.response.data, "danger"));

        const errors = err.response.data.errors;
        if (!errors) return dispatch<any>(setAlert("Server error", "danger"));
        let errorMessages: string[] = [];

        const getKeys = Object.keys(errors) as unknown as string[];

        getKeys.forEach((element) => {
            errors[element].forEach((element: string) =>
                errorMessages.push(element)
            );
        });

        errorMessages.forEach((error) =>
            dispatch<any>(setAlert(error, "danger"))
        );
    }
};
