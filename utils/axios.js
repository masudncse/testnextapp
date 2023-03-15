import axios from 'axios'
import {logout} from "./auth";
import {BACKEND_URL} from "./constants";

const axiosClient = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true
})

// axiosClient.defaults.headers.common['x-access-token'] = token();

axiosClient.interceptors.response.use((response) => response, error => {
    if (error.response.status === 401) {
        logout();

        return Promise.reject()
    }

    return Promise.reject(error)
})

export default axiosClient;