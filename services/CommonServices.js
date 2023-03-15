import axios from "../utils/axios";
import {tostify} from "../utils/helpers";
import {toast} from "react-toastify";
import csrf from "../utils/csrf";

/**
 *
 * @returns {Promise<*>}
 */
export const getEveryCountsByClient = async (clientId) => {
    try {
        await csrf();
        return await axios.get(`/api/common/getEveryCountsByClient/${clientId}`);
    } catch (error) {
        tostify(toast, 'error', error);
    }
}