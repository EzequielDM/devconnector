import api from "./api";

const setAuthToken = (token: string) => {
    if (token) {
        api.defaults.headers.common["x-auth-token"] = token;
        localStorage.setItem("token", token);
    }
};

export default setAuthToken;
