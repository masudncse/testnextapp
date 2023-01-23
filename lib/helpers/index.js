const _ = require("lodash");
const moment = require("moment");

export const tostify = (toast, type, error) => {
    let message = "";
    if (!_.isUndefined(error?.data) && !_.isUndefined(error?.data?.message)) {
        // Success Message
        message = error?.data?.message;
    } else if (!_.isUndefined(error?.response) && !_.isUndefined(error?.response?.data)) {
        // Error Message
        message = error?.response?.data?.message;
    } else {
        // Error Message
        message = error?.message;
    }

    if (type === 'success') {
        return toast.success(message);
    } else if (type === 'info') {
        return toast.info(message);
    } else if (type === 'warning') {
        return toast.warn(message);
    } else if (type === 'error') {
        return toast.error(message);
    }
}


/**
 * Making input errors
 * While user submit a form, then form validation error occurred
 * Here JOI or Sequelize errors return
 *
 * @param error
 * @param callback
 */
export const makeInputErrors = (error, callback) => {
    let errors = {};

    if (!_.isUndefined(error?.response) && !_.isUndefined(error?.response?.data?.errors)) {
        if (!_.isEmpty(error.response.data.errors) && _.isObject(error.response.data.errors)) {
            errors = error.response.data.errors
        }
    }

    callback(errors);
}
