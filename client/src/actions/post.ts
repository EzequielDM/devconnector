import ActionTypes from "./types";
import { Dispatch } from "redux";
import api from "../utils/api";
import { setAlert } from "./alert";
import { IPost } from "./types";
import animateScrollTo from "animated-scroll-to";

// Get posts
export const getPosts = () => async (dispatch: Dispatch) => {
  try {
    const res = await api.get("/posts");

    dispatch({
      type: ActionTypes.GET_POSTS,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: ActionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get post by ID
export const getPost = (_id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await api.get(`/posts/${_id}`);

    dispatch({
      type: ActionTypes.GET_POST,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: ActionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Clears the current post
export const clearPost = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: ActionTypes.CLEAR_POST,
      payload: {},
    });
  } catch (err: any) {
    dispatch({
      type: ActionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Like post
export const likePost = (_id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await api.post(`/posts/like/${_id}`);

    dispatch({
      type: ActionTypes.UPDATE_LIKES,
      payload: { _id, likes: res.data.likes },
    });
  } catch (err: any) {
    dispatch({
      type: ActionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Dislike post
export const dislikePost = (_id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await api.put(`/posts/like/${_id}`);

    dispatch({
      type: ActionTypes.UPDATE_LIKES,
      payload: { _id, likes: res.data.likes },
    });
  } catch (err: any) {
    dispatch({
      type: ActionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete post (user)
export const deletePost = (_id: string) => async (dispatch: Dispatch) => {
  try {
    await api.delete(`/posts/${_id}`);

    dispatch(setAlert("Post deleted", "success") as any);

    dispatch({
      type: ActionTypes.DELETE_POST,
      payload: _id,
    });
  } catch (err: any) {
    dispatch({
      type: ActionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create a post
export const addPost = (post: IPost) => async (dispatch: Dispatch) => {
  try {
    const res = await api.post("/posts", post);

    dispatch({
      type: ActionTypes.ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert("Post added", "success", 1500) as any);

    if (document.getElementById(res.data._id)) {
      animateScrollTo(document.getElementById(res.data._id) as any);
    }
  } catch (err: any) {
    if (err.response.data && typeof err.response.data === "string")
      return dispatch(setAlert(err.response.data, "danger") as any);

    const errors = err.response.data.errors;
    if (!errors) return dispatch(setAlert("Server error", "danger") as any);
    const errorMessages: string[] = [];

    const getKeys = Object.keys(errors) as unknown as string[];

    getKeys.forEach((element) => {
      errors[element].forEach((element: string) => errorMessages.push(element));
    });

    errorMessages.forEach((error) => dispatch(setAlert(error, "danger") as any));

    dispatch({
      type: ActionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add comment
export const addComment = (_id: string, text: string) => async (dispatch: Dispatch) => {
  try {
    const res = await api.post(`/posts/comment/${_id}`, { text });

    dispatch({ type: ActionTypes.ADD_COMMENT, payload: { comment: res.data, post: _id } });
  } catch (err: any) {
    if (err.response.data && typeof err.response.data === "string")
      return dispatch(setAlert(err.response.data, "danger") as any);

    const errors = err.response.data.errors;
    if (!errors) return dispatch(setAlert("Server error", "danger") as any);
    const errorMessages: string[] = [];

    const getKeys = Object.keys(errors) as unknown as string[];

    getKeys.forEach((element) => {
      errors[element].forEach((element: string) => errorMessages.push(element));
    });

    errorMessages.forEach((error) => dispatch(setAlert(error, "danger") as any));

    dispatch({
      type: ActionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete comment
export const deleteComment = (_id: string, commentID: string) => async (dispatch: Dispatch) => {
  try {
    await api.delete(`/posts/comment/${_id}/${commentID}`);

    dispatch({ type: ActionTypes.DELETE_COMMENT, payload: commentID });
  } catch (err: any) {
    if (err.response.data && typeof err.response.data === "string")
      return dispatch(setAlert(err.response.data, "danger") as any);

    const errors = err.response.data.errors;
    if (!errors) return dispatch(setAlert("Server error", "danger") as any);
    const errorMessages: string[] = [];

    const getKeys = Object.keys(errors) as unknown as string[];

    getKeys.forEach((element) => {
      errors[element].forEach((element: string) => errorMessages.push(element));
    });

    errorMessages.forEach((error) => dispatch(setAlert(error, "danger") as any));

    dispatch({
      type: ActionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
