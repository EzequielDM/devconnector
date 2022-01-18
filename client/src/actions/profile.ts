import { Dispatch } from "redux";

import api from "../utils/api";
import { setAlert } from "./alert";
import ActionTypes, { IEducation } from "./types";
import { IExperience } from "./types";

/**
 * TODO: Implement error handling method for automating error messages using type predicates to find out data types.
 * * fn(err: any, (type: string)="danger", (time: number)=3000): boolean {}
 * ! Need to handle AxiosErrror, ParseError and generalized errors; will create a test environment for this later on.
 */

// get current user profile
export const getCurrentProfile = () => async (dispatch: Dispatch) => {
  try {
    const res = await api.get("/profile/me");

    dispatch({ type: ActionTypes.GET_PROFILE, payload: res.data });
  } catch (err: any) {
    const statusText = err.response.statusText ? err.response.statusText : "Server error";
    const status = err.response.status ? err.response.status : 500;
    dispatch({
      type: ActionTypes.PROFILE_ERROR,
      payload: { msg: statusText, status: status },
    });
  }
};

// Get all user profiles
export const getProfiles = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.CLEAR_PROFILE });

  try {
    const res = await api.get("/profile");

    dispatch({ type: ActionTypes.GET_PROFILES, payload: res.data });
  } catch (err: any) {}
};

// Get user profile by ID
export const getProfileByID = (id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await api.get(`/profile/${id}`);

    dispatch({ type: ActionTypes.GET_PROFILE, payload: res.data });
  } catch (err: any) {
    const statusText =
      err.response && err.response.statusText ? err.response.statusText : "Server error";
    const status = err.response && err.response.status ? err.response.status : 500;

    dispatch(setAlert("Error while trying to load page", "danger", 1500) as any);
    dispatch({ type: ActionTypes.PROFILE_ERROR, payload: { msg: statusText, status: status } });
  }
};

// Get all github repos
export const getGithubRepos = (username: string) => async (dispatch: Dispatch) => {
  if (username === "") return;
  try {
    const res = await api.get(`/profile/github/${username}`);

    dispatch({ type: ActionTypes.GET_REPOS, payload: res.data });
  } catch (err: any) {
    /* Found out that there is no better way to predicate types than checking for error values as any 
        error can occur at any moment so errors can't be type inferred.
        Should've understood this before, don't know why I thought that using any was bad practice.
        Will redo all trycatch blocks to handle responses properly, finally some good error handling.
        Probably will do a helper function for dispatching error messages.
    */

    // Is AxiosError
    if (err.response) {
      // GH User does not exist, server responded successfully
      if (err.response.status === 404 && err.response.data.message === "Not Found") return;
    }

    dispatch(setAlert("Error while trying to get repos", "danger") as any);
  }
};

// update current user profile
export const updateProfile = (formData: any, history: any) => async (dispatch: Dispatch) => {
  try {
    const res = await api.put("/profile", formData);

    dispatch({ type: ActionTypes.GET_PROFILE, payload: res.data });
    dispatch(setAlert("Profile updated", "success", 2000) as any);
    history.push("/dashboard");
  } catch (err: any) {
    if (err.response && typeof err.response.data === "string")
      return dispatch(setAlert(err.response.data, "danger") as any);

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

// clear profile info
export const clearProfile = () => async (dispatch: Dispatch) => {
  dispatch({
    type: ActionTypes.CLEAR_PROFILE,
  });
};

// Add experience to user profile
export const addExperience =
  (formData: IExperience, history: any) => async (dispatch: Dispatch) => {
    try {
      const res = await api.put("/profile/experience", formData);

      dispatch({ type: ActionTypes.PROFILE_UPDATE, payload: res.data });
      dispatch(setAlert("Experience added", "success", 2000) as any);
      history.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      if (typeof err.response.data === "string")
        return dispatch(setAlert(err.response.data, "danger") as any);

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

// Add experience to user profile
export const addEducation = (formData: IEducation, history: any) => async (dispatch: Dispatch) => {
  try {
    const res = await api.put("/profile/education", formData);

    dispatch({ type: ActionTypes.PROFILE_UPDATE, payload: res.data });
    dispatch(setAlert("Education added", "success", 2000) as any);
    history.push("/dashboard");
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

    errorMessages.forEach((error) => dispatch(setAlert(error, "danger") as any));
  }
};

// Edit experience
export const editExperience =
  (formData: IExperience, history: any) => async (dispatch: Dispatch) => {
    try {
      const res = await api.put(`/profile/experience/${formData._id}`, formData);

      dispatch({ type: ActionTypes.PROFILE_UPDATE, payload: res.data });
      dispatch(setAlert("Experience updated", "success", 2000) as any);
      history.push("/dashboard");
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

      errorMessages.forEach((error) => dispatch(setAlert(error, "danger") as any));
    }
  };

// Edit education
export const editEducation = (formData: IEducation, history: any) => async (dispatch: Dispatch) => {
  try {
    const res = await api.put(`/profile/education/${formData._id}`, formData);

    dispatch({ type: ActionTypes.PROFILE_UPDATE, payload: res.data });
    dispatch(setAlert("Education updated", "success", 2000) as any);
    history.push("/dashboard");
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

    errorMessages.forEach((error) => dispatch(setAlert(error, "danger") as any));
  }
};

// Delete experience
export const deleteExperience = (id: any) => async (dispatch: Dispatch) => {
  try {
    const res = await api.delete(`/profile/experience/${id}`);

    dispatch({ type: ActionTypes.PROFILE_UPDATE, payload: res.data });
    dispatch(setAlert("Experience removed", "success", 2000) as any);
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

    errorMessages.forEach((error) => dispatch(setAlert(error, "danger") as any));
  }
};

// Delete education
export const deleteEducation = (id: any) => async (dispatch: Dispatch) => {
  try {
    const res = await api.delete(`/profile/education/${id}`);

    dispatch({ type: ActionTypes.PROFILE_UPDATE, payload: res.data });
    dispatch(setAlert("Education removed", "success", 2000) as any);
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

    errorMessages.forEach((error) => dispatch(setAlert(error, "danger") as any));
  }
};

// Delete account and profile
export const deleteAccount = () => async (dispatch: Dispatch) => {
  if (!window.confirm("Are you sure you want to delete this account?")) return;

  try {
    const res = await api.delete(`/users`);

    dispatch({ type: ActionTypes.ACCOUNT_DELETED, payload: res.data });
    dispatch(setAlert("Account deleted", "warning") as any);
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

    errorMessages.forEach((error) => dispatch(setAlert(error, "danger") as any));
  }
};

// SECTION Admin stuff

// update current user profile
export const updateProfileAdmin =
  (id: string, formData: any, history: any) => async (dispatch: Dispatch) => {
    try {
      const res = await api.put(`/profile/edit/${id}`, formData);

      dispatch({ type: ActionTypes.GET_PROFILE, payload: res.data });
      dispatch(setAlert("Profile updated", "success", 2000) as any);
      history.push(`/profile/${id}`);
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

      errorMessages.forEach((error) => dispatch(setAlert(error, "danger") as any));
    }
  };

// Delete account and profile
export const deleteAccountAdmin = (id: string) => async (dispatch: Dispatch) => {
  if (!window.confirm(`Are you sure you want to delete account ${id}?`)) return;

  try {
    const res = await api.delete(`/profile/${id}`);

    res.data.length > 0 && dispatch(setAlert("Account deleted", "warning") as any);
  } catch (err: any) {
    if (err.response && err.response.status === 401)
      return dispatch(setAlert(err.response.statusText, "danger") as any);
    if (typeof err.response.data === "string")
      return dispatch(setAlert(err.response.data, "danger") as any);

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
