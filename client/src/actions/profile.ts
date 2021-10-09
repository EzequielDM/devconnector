import { Dispatch } from "redux";

import api from "../utils/api";
import { setAlert } from "./alert";
import ActionTypes from "./types";

// get current user profile
export const getCurrentProfile = () => async (dispatch: Dispatch) => {
  try {
    const res = await api.get("/profile/me");

    dispatch({ type: ActionTypes.GET_PROFILE, payload: res.data });
  } catch (err: any) {
    dispatch({
      type: ActionTypes.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const updateProfile = (formData: any) => async (dispatch: Dispatch) => {
  try {
    const res = await api.put("/profile", formData);

    dispatch({ type: ActionTypes.GET_PROFILE, payload: res.data });
    dispatch(setAlert("Profile updated", "success", 2000) as any);
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
