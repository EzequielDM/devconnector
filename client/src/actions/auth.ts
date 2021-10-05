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
    } catch (err: any) {
        const errors = err.response.data.errors;
        let errorMessages: string[] = [];

        const getKeys = Object.keys(errors) as unknown as string[];

        getKeys.forEach((element) => {
            errors[element].forEach((element: string) =>
                errorMessages.push(element)
            );
        });

        console.log(`errorMessages`, errorMessages);

        errorMessages.forEach((error) =>
            dispatch<any>(setAlert(error, "danger"))
        );
    }
};
