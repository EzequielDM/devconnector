enum ActionTypes {
  SET_ALERT = "SET_ALERT",
  REMOVE_ALERT = "REMOVE_ALERT",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_FAIL = "REGISTER_FAIL",
  USER_LOADED = "USER_LOADED",
  AUTH_ERROR = "AUTH_ERROR",
  LOGOUT = "LOGOUT",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  GET_PROFILE = "GET_PROFILE",
  PROFILE_ERROR = "PROFILE_ERROR",
  PROFILE_UPDATE = "PROFILE_UPDATE",
  ACCOUNT_DELETED = "ACCOUNT_DELETED",
  GET_PROFILES = "GET_PROFILES",
  GET_REPOS = "GET_REPOS",
}

export interface IExperience {
  title: string;
  status: string;
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
  user?: {
    _id: string;
    name: string;
    avatar: string;
  };
}

export interface IUser {
  _id?: string;
  name?: string;
  email: string;
  password: string;
  age?: string;
}

export interface IProfile {
  _id?: string;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
  company?: string;
  website?: string;
  location?: string;
  status?: string;
  skills?: string;
  bio?: string;
  githubusername?: string;
  social?: {
    youtube?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
  experience?: {
    id?: string;
    title: string;
    company: string;
    from: Date;
    current?: boolean;
  }[];
  education?: {
    id?: string;
    school: string;
    degree: string;
    field: string;
    from: Date;
    current?: boolean;
  }[];
  date?: Date;
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
