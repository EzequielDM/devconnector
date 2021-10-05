import ActionTypes, { Action, IAuth } from "../actions/types";

const initialState: IAuth = {
    token: localStorage.getItem("token") || "",
    isAuthenticated: false,
    isLoading: true,
    user: "",
};

export const auth = (state = initialState, action: Action) => {
    const { type, payload } = action;

    switch (type) {
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
