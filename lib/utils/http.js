import axios from 'axios'
import {getAccessToken, logOut} from "../auth";
import {API_URL} from "../constants";

export default function http() {
    const http = axios.create({
        baseURL: API_URL,
        withCredentials: true
    })

    http.defaults.headers.common['x-access-token'] = getAccessToken();

    http.interceptors.response.use((response) => response, error => {
        if (error.response.status === 401) {
            logOut();

            return Promise.reject()
        }

        return Promise.reject(error)
    })

    return http
}