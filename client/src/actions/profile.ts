import api from "../utils/api";
import { setAlert } from "./alert";
import ActionTypes from "./types";
import { Dispatch } from "redux";

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
