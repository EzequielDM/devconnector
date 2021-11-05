import ActionTypes from "./types";
import { Dispatch } from "redux";
import api from "../utils/api";

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
