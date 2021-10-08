import ActionTypes, { Action, IAuth } from "../actions/types";

const initialState: IAuth = {
  token: localStorage.getItem("token") || "",
  isAuthenticated: false,
  isLoading: true,
  user: "",
};

export const auth = (state: IAuth = initialState, action: Action): IAuth => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: payload,
      };
    case ActionTypes.LOGOUT:
    case ActionTypes.AUTH_ERROR:
      return {
        ...state,
        token: undefined,
        isAuthenticated: false,
        isLoading: false,
        user: undefined,
      };
    case ActionTypes.LOGIN_SUCCESS:
    case ActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isLoading: false,
      };
    default:
      return state;
  }
};
