import ActionTypes from "../actions/types";

export interface Alert {
    id: number;
    msg?: string;
    alertType?: string;
}

export interface Action {
    type: string;
    payload: Alert;
}

const initialState: Alert[] = [];

const alert = (state: Alert[] = initialState, action: Action): Alert[] => {
    const { type, payload } = action;

    switch (type) {
        case ActionTypes.SET_ALERT:
            return [...state, payload];
        case ActionTypes.REMOVE_ALERT:
            return state.filter((item) => item.id !== payload.id);
        default:
            return state;
    }
};

export default alert;
