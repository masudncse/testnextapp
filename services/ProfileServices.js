import axios from "../utils/axios";
import {makeInputErrors, tostify} from "../utils/helpers";
import {toast} from "react-toastify";
import csrf from "../utils/csrf";

/**
 *
 * @param data
 * @param setErrors
 * @return {Promise<AxiosResponse<any>>}
 */
export const updatePersonalInfo = async (data, setErrors) => {
    try {
        await csrf();
        return await axios.post('/api/update-personal-info', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (error) {
        tostify(toast, 'error', error);
        makeInputErrors(error, setErrors);
    }
}

/**
 *
 * @return {Promise<void>}
 */
export const updateCompanyInfo = async (data, setErrors) => {
    try {
        await csrf();
        return await axios.put('/api/update-company-info', data);
    } catch (error) {
        tostify(toast, 'error', error);
        makeInputErrors(error, setErrors);
    }
}

/**
 *
 * @return {Promise<void>}
 */
export const getCompanySizes = async () => {
    try {
        await csrf();
        return await axios.get('/api/common/get-company-sizes');
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @return {Promise<void>}
 */
export const changePassword = async (data, setErrors) => {
    try {
        await csrf();
        return await axios.put('/api/change-password', data);
    } catch (error) {
        tostify(toast, 'error', error);
        makeInputErrors(error, setErrors);
    }
}
