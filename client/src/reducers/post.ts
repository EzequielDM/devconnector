import ActionTypes, { Action, IPost } from "../actions/types";

export interface IPostState {
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

export const post = (state: IPostState = initialState, action: Action): IPostState => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    case ActionTypes.GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case ActionTypes.CLEAR_POST:
      return {
        ...state,
        post: undefined,
        loading: true,
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
    case ActionTypes.DELETE_POST:
      return {
        ...state,
        posts: state.posts?.filter((post) => post._id !== payload),
        loading: false,
      };

    case ActionTypes.ADD_POST:
      return {
        ...state,
        posts: state.posts && [...state.posts, payload],
        loading: false,
      };
    case ActionTypes.ADD_COMMENT:
      return {
        ...state,
        post: state.post && { ...state.post, comments: [payload.comment, ...state.post.comments] },
        loading: false,
      };
    case ActionTypes.DELETE_COMMENT:
      return {
        ...state,
        post: state.post && {
          ...state.post,
          comments: state.post.comments.filter((comment) => comment._id !== payload),
        },
        loading: false,
      };

    default:
      return state;
  }
};
