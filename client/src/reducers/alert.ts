import ActionTypes from "../actions/types";

interface IAlert {
    id: number;
    msg?: string;
    alertType?: string;
}

interface Action {
    type: string;
    payload: IAlert;
}

const initialState: IAlert[] = [];

const alert = (state: IAlert[] = initialState, action: Action): IAlert[] => {
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
