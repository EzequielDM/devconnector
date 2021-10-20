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

    dispatch(setAlert("User registered successfully!", "success", 1000) as any);
    dispatch<any>(loadUser());
  } catch (err: any) {
    if (typeof err.response.data === "string") return dispatch(setAlert(err.response.data, "danger") as any);

    const errors = err.response.data.errors;
    if (!errors) return dispatch(setAlert("Server error", "danger") as any);
    let errorMessages: string[] = [];

    const getKeys = Object.keys(errors) as unknown as string[];

    getKeys.forEach((element) => {
      errors[element].forEach((element: string) => errorMessages.push(element));
    });

    errorMessages.forEach((error) => dispatch(setAlert(error, "danger") as any));
  }
};
// !SECTION

// SECTION Login
export const login = (formData: IUser) => async (dispatch: Dispatch) => {
  try {
    const res = await api.post("/auth", formData);

    dispatch({
      type: ActionTypes.LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert("Logged in successfully!", "success", 1000) as any);
    dispatch<any>(loadUser());
  } catch (err: any) {
    if (!err.response) return dispatch(setAlert("Server error", "danger") as any);
    if (typeof err.response.data === "string") return dispatch(setAlert(err.response.data, "danger") as any);

    const errors = err.response.data.errors;
    if (!errors) return dispatch(setAlert("Server error", "danger") as any);
    let errorMessages: string[] = [];

    const getKeys = Object.keys(errors) as unknown as string[];

    getKeys.forEach((element) => {
      errors[element].forEach((element: string) => errorMessages.push(element));
    });

    errorMessages.forEach((error) => dispatch(setAlert(error, "danger") as any));
  }
};
// !SECTION

// SECTION Logout/Clear Profile
export const logout = () => ({ type: ActionTypes.LOGOUT });
// !SECTION
