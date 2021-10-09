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
    case ActionTypes.GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case ActionTypes.PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};
