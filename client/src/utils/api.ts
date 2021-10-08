import axios from "axios";
import ActionTypes from "../actions/types";
import store from "../store";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * TODO Implement logout on 401 (unauthorized)
 * ! If unauthorized call LOGOUT which will ultimately remove the JWT token from the client localStorage
 */
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch({ type: ActionTypes.LOGOUT });
    }
    return Promise.reject(err);
  }
);

export default api;
