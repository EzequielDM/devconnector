import ActionTypes, { IProfile } from "../actions/types";
import { Action } from "../actions/types";

interface IProfileState {
  profile?: IProfile;
  profiles: IProfile[];
  repos: string[];
  loading: boolean;
  error: {};
}

const initialState = {
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export const profile = (state: IProfileState = initialState, action: Action): IProfileState => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.PROFILE_UPDATE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        profile: undefined,
        repos: [],
        loading: false,
      };
    case ActionTypes.PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case ActionTypes.GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case ActionTypes.GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case ActionTypes.GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    default:
      return state;
  }
};
