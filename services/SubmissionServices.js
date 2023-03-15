import axios from "../utils/axios";
import {tostify} from "../utils/helpers";
import {toast} from "react-toastify";
import csrf from "../utils/csrf";

/**
 *
 * @returns {Promise<*>}
 */
export const fetchSubmissionsByFormId = async (formId, params = {}) => {
    try {
        await csrf();
        return await axios.get(`/api/submissions/forms/${formId}`, {
            params: params
        });
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @returns {Promise<*>}
 */
export const fetchTrashedSubmissionsByFormId = async (formId, params = {}) => {
    try {
        await csrf();
        return await axios.get(`/api/submissions/forms/${formId}/trashed`, {
            params: params
        });
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @returns {Promise<*>}
 */
export const saveSubmission = async (data = {}) => {
    try {
        await csrf();
        return await axios.post(`/api/submissions`, data);
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @returns {Promise<*>}
 */
export const saveGuestSubmission = async (data = {}) => {
    try {
        await csrf();
        return await axios.post(`/api/submissions/guest`, data);
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @param id
 * @returns {Promise<AxiosResponse<any>|void>}
 */
export const trashSubmission = async (id) => {
    try {
        await csrf();
        return await axios.put(`/api/submissions/${id}/trash`);
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @param id
 * @returns {Promise<AxiosResponse<any>|void>}
 */
export const restoreSubmission = async (id) => {
    try {
        await csrf();
        return await axios.put(`/api/submissions/${id}/restore`);
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @param id
 * @returns {Promise<*>}
 */
export const deleteSubmission = async (id) => {
    try {
        await csrf();
        return await axios.delete(`/api/submissions/${id}/delete`);
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @param id
 * @returns {Promise<AxiosResponse<any>|void>}
 */
export const readSubmission = async (id) => {
    try {
        await csrf();
        return await axios.put(`/api/submissions/${id}/read`);
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @param id
 * @returns {Promise<AxiosResponse<any>|void>}
 */
export const favouriteSubmission = async (id) => {
    try {
        await csrf();
        return await axios.put(`/api/submissions/${id}/favourite`);
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @param data
 * @return {Promise<AxiosResponse<any>>}
 */
export const batchFavouriteSubmission = async (data = {}) => {
    try {
        await csrf();
        return await axios.put(`/api/submissions/batch-favourite`, data);
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @param data
 * @return {Promise<AxiosResponse<any>>}
 */
export const batchReadSubmission = async (data = {}) => {
    try {
        await csrf();
        return await axios.put(`/api/submissions/batch-read`, data);
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @param data
 * @return {Promise<AxiosResponse<any>>}
 */
export const batchTrashSubmission = async (data = {}) => {
    try {
        await csrf();
        return await axios.put(`/api/submissions/batch-trash`, data);
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @param data
 * @return {Promise<AxiosResponse<any>>}
 */
export const batchDeleteSubmission = async (data = {}) => {
    try {
        await csrf();
        return await axios.put(`/api/submissions/batch-delete`, data);
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @param data
 * @return {Promise<AxiosResponse<any>>}
 */
export const batchRestoreSubmission = async (data = {}) => {
    try {
        await csrf();
        return await axios.put(`/api/submissions/batch-restore`, data);
    } catch (error) {
        tostify(toast, 'error', error);
    }
}