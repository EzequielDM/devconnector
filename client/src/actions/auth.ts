import { Dispatch } from "redux";

import api from "../utils/api";
import { setAlert } from "./alert";
import ActionTypes, { IUser } from "./types";

// SECTION Load user information
export const loadUser = () => async (dispatch: Dispatch) => {
  try {
    const res = await api.get("/auth");

    dispatch({
      type: ActionTypes.USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.AUTH_ERROR,
    });
  }
};

// SECTION Register
export const register = (formData: IUser) => async (dispatch: Dispatch) => {
  try {
    const res = await api.post("/users", formData);

    dispatch({
      type: ActionTypes.REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert("User registered successfully!", "success") as any);
  } catch (err: any) {
    if (typeof err.response.data === "string")
      return dispatch(setAlert(err.response.data, "danger") as any);

    const errors = err.response.data.errors;
    if (!errors) return dispatch(setAlert("Server error", "danger") as any);
    let errorMessages: string[] = [];

    const getKeys = Object.keys(errors) as unknown as string[];

    getKeys.forEach((element) => {
      errors[element].forEach((element: string) => errorMessages.push(element));
    });

    errorMessages.forEach((error) =>
      dispatch(setAlert(error, "danger") as any)
    );
  }
};
// !SECTION
