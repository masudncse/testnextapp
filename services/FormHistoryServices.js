import axios from "../utils/axios";
import {tostify} from "../utils/helpers";
import {toast} from "react-toastify";
import csrf from "../utils/csrf";

/**
 *
 * @returns {Promise<*>}
 */
export const fetchFormHistoriesByFormId = async (formId, params = {}) => {
    try {
        await csrf();
        return await axios.get(`/api/form-histories/forms/${formId}`, {
            params: params
        });
    } catch (error) {
        tostify(toast, 'error', error);
    }
}
