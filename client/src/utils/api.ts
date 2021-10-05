import axios from "axios";
import store from "../store";

const api = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;

/**
 * TODO Implement logout on 401 (unauthorized)
 * ! If unauthorized call LOGOUT which will ultimately remove the JWT token from the client localStorage
 */
