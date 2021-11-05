import ActionTypes, { Action, IPost } from "../actions/types";

interface IPostState {
  posts?: IPost[];
  post?: IPost;
  loading: boolean;
  error: {};
}

const initialState = {
  posts: [],
  loading: true,
  error: {},
};

const post = (state: IPostState = initialState, action: Action): IPostState => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    case ActionTypes.POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case ActionTypes.UPDATE_LIKES:
      return {
        ...state,
        posts:
          state &&
          state.posts &&
          state.posts.map((post) =>
            post._id === payload._id ? { ...post, likes: payload.likes } : post
          ),
        loading: false,
      };

    default:
      return state;
  }
};

export default post;
