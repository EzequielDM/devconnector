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
  CLEAR_REPOS = "CLEAR_REPOS",
  CLEAR_PROFILE = "CLEAR_PROFILE",
  GET_POSTS = "GET_POSTS",
  GET_POST = "GET_POST",
  CLEAR_POST = "CLEAR_POST",
  POST_ERROR = "POST_ERROR",
  UPDATE_LIKES = "UPDATE_LIKES",
  DELETE_POST = "DELETE_POST",
  ADD_POST = "ADD_POST",
  ADD_COMMENT = "ADD_COMMENT",
  DELETE_COMMENT = "DELETE_COMMENT",
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
    role: string;
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
    role: string;
  };
  company?: string;
  website?: string;
  location?: string;
  status?: string;
  skills?: string[];
  bio?: string;
  githubusername?: string;
  social?: {
    youtube?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
  experience?: IExperience[];
  education?: IEducation[];
  date?: Date;
}

export interface IExperience {
  _id: string;
  title: string;
  company: string;
  from: Date;
  location: string;
  current?: boolean;
  to?: Date;
  description?: string;
}

export interface IEducation {
  _id?: string;
  school: string;
  degree: string;
  field?: string;
  from: Date;
  current?: boolean;
  to?: Date;
  description?: string;
}

export interface IRepo {
  id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: {
    login: string;
    url: string;
  };
  html_url: string;
  description: string;
  fork: boolean;
  created_at: Date;
  updated_at: Date;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string;
}

export interface IAPIError {
  message: string;
  stack?: string;
  name: string;
  response: {
    data: {
      errors: unknown;
    };
  };
}

export interface IPost {
  _id: string;
  user: string;
  name: string;
  avatar: string;
  text: string;
  likes: ILike[];
  comments: IComment[];
  date: Date;
}

export interface IComment {
  _id: string;
  user: string;
  name: string;
  avatar: string;
  text: string;
  date: Date;
}

export interface ILike {
  _id: string;
  user: string;
  date: Date;
}

export default ActionTypes;
