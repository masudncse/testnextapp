import axios from "../utils/axios";
import {tostify} from "../utils/helpers";
import {toast} from "react-toastify";
import csrf from "../utils/csrf";

/**
 *
 * @returns {Promise<*>}
 */
export const fetchForms = async (params = {}) => {
    try {
        await csrf();
        return await axios.get(`/api/forms`, {
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
export const fetchTrashedForms = async (params = {}) => {
    try {
        await csrf();
        return await axios.get(`/api/forms/trash-list`, {
            params: params
        });
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
export const fetchForm = async (id) => {
    try {
        await csrf();
        return await axios.get(`/api/forms/${id}`);
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
export const fetchGuestForm = async (id) => {
    try {
        await csrf();
        return await axios.get(`/api/forms/${id}/guest`);
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @returns {Promise<AxiosResponse<any>|void>}
 */
export const createForm = async () => {
    try {
        await csrf();
        return await axios.post(`/api/forms`);
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @returns {Promise<AxiosResponse<any>|void>}
 */
export const editForm = async (id) => {
    try {
        await csrf();
        return await axios.get(`/api/forms/${id}/edit`);
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @param id
 * @param data
 * @returns {Promise<AxiosResponse<any>|void>}
 */
export const updateForm = async (id, data = {}) => {
    try {
        await csrf();
        return await axios.put(`/api/forms/${id}`, data);
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @param id
 * @returns {Promise<AxiosResponse<any>|void>}
 */
export const trashForm = async (id) => {
    try {
        await csrf();
        return await axios.put(`/api/forms/${id}/trash`);
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @param id
 * @returns {Promise<AxiosResponse<any>|void>}
 */
export const restoreForm = async (id) => {
    try {
        await csrf();
        return await axios.put(`/api/forms/${id}/restore`);
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @param id
 * @returns {Promise<*>}
 */
export const deleteForm = async (id) => {
    try {
        await csrf();
        return await axios.delete(`/api/forms/${id}/delete`);
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @param id
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const syncForm = async (id, data = {}) => {
    try {
        await csrf();
        return await axios.put(`/api/forms/${id}/sync`, data);
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const batchTrashForm = async (data = {}) => {
    try {
        await csrf();
        return await axios.put(`/api/forms/update/batch-trash`, data);
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const batchRestoreForm = async (data = {}) => {
    try {
        await csrf();
        return await axios.put(`/api/forms/update/batch-restore`, data);
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const batchDeleteForm = async (data = {}) => {
    try {
        await csrf();
        return await axios.put(`/api/forms/update/batch-delete`, data);
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const uploadImageForm = async (data = {}) => {
    try {
        await csrf();
        return await axios.post(`/api/forms/upload/image`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const uploadFormImage = async (data = {}) => {
    try {
        await csrf();
        return await axios.post(`/api/forms/upload/form-image`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const deleteFormImage = async (data = {}) => {
    try {
        await csrf();
        return await axios.post(`/api/forms/delete/form-image`, data);
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const fetchFormImagePaths = async (data = {}) => {
    try {
        await csrf();
        return await axios.get(`/api/forms/fetch/form-image-paths`);
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
export const fetchFormCssStyles = async (id) => {
    try {
        await csrf();
        return await axios.get(`/api/forms/${id}/styles`);
    } catch (error) {
        tostify(toast, 'error', error);
    }
}

/**
 *
 * @param id
 * @param data
 * @return {Promise<AxiosResponse<any>>}
 */
export const updateFormCssStyles = async (id, data = {}) => {
    try {
        await csrf();
        return await axios.put(`/api/forms/${id}/styles`, data);
    } catch (error) {
        tostify(toast, 'error', error);
    }
}