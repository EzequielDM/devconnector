enum ActionTypes {
    SET_ALERT = "SET_ALERT",
    REMOVE_ALERT = "REMOVE_ALERT",
    REGISTER_SUCCESS = "REGISTER_SUCCESS",
    REGISTER_FAIL = "REGISTER_FAIL",
}

export interface IAlert {
    id: number;
    msg?: string;
    alertType?: string;
}

export interface Action {
    type: string;
    payload: IAlert;
}

export interface IAuth {
    token?: string;
    isAuthenticated?: boolean;
    isLoading: boolean;
    user?: string;
}

export interface IUser {
    name: string;
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
            errors: Object[] | Array<string>[];
        };
    };
}

export default ActionTypes;
