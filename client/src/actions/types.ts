enum ActionTypes {
  SET_ALERT = "SET_ALERT",
  REMOVE_ALERT = "REMOVE_ALERT",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_FAIL = "REGISTER_FAIL",
  USER_LOADED = "USER_LOADED",
  AUTH_ERROR = "AUTH_ERROR",
  LOGOUT = "LOGOUT",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
}

export interface IAlert {
  id: number;
  msg?: string;
  alertType?: string;
}

export interface Action {
  type?: string;
  payload?: any;
}

export interface IAuth {
  token?: string;
  isAuthenticated?: boolean;
  isLoading: boolean;
  user?: string;
}

export interface IUser {
  name?: string;
  email: string;
  password: string;
  age?: string;
}

export interface IAPIError {
  message: string;
  stack?: string;
  name: string;
  response: {
    data: {
      errors: Object;
    };
  };
}

export default ActionTypes;
