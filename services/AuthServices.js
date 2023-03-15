import axios from "../utils/axios";
import {makeInputErrors, tostify} from "../utils/helpers";
import {toast} from "react-toastify";
import csrf from "../utils/csrf";

/**
 *
 * @return {Promise<void>}
 */
export const registerClient = async (data, setErrors) => {
    try {
        await csrf();
        return await axios.post('/api/register', data);
    } catch (error) {
        tostify(toast, 'error', error);
        makeInputErrors(error, setErrors);
    }
}

/**
 *
 * @return {Promise<void>}
 */
export const loginClient = async (data, setErrors) => {
    try {
        await csrf();
        return await axios.post('/api/login', data);
    } catch (error) {
        tostify(toast, 'error', error);
        makeInputErrors(error, setErrors);
    }
}

/**
 *
 * @return {Promise<void>}
 */
export const logoutClient = async () => {
    try {
        await csrf();
        await axios.post('/api/logout');
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @return {Promise<void>}
 */
export const forgotPasswordClient = async (data, setErrors) => {
    try {
        await csrf();
        return await axios.post('/api/forgot-password', data);
    } catch (error) {
        tostify(toast, 'error', error);
        makeInputErrors(error, setErrors);
    }
}
