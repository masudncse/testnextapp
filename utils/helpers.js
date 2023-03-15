import {BACKEND_URL} from "./constants";
import Router from "next/router";
import Swal from "sweetalert2";

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
 * @param setErrors
 */
export const makeInputErrors = (error, setErrors) => {
    let errors = {};

    if (!_.isUndefined(error?.response) && !_.isUndefined(error?.response?.data?.errors)) {
        if (!_.isEmpty(error.response.data.errors) && _.isObject(error.response.data.errors)) {
            errors = error.response.data.errors
        }
    }

    setErrors(errors);
}

/**
 *
 * @param path
 * @returns {string}
 */
export const getApiImagePath = (path) => {
    if (_.isEmpty(path)) {
        return '/img/no-image.png';
    }

    return BACKEND_URL + '/storage/' + path;
}

/**
 *
 * @param path
 * @returns {string}
 */
export const getApiFilePath = (path) => {
    if (_.isEmpty(path)) {
        return '';
    }

    return BACKEND_URL + '/storage/' + path;
}

/**
 *
 * @param limit
 * @returns {string}
 */
export const makeRandomString = (limit = 4) => {
    return (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).slice(-limit).toUpperCase();
}

/**
 *
 * @returns {*[]|*}
 */
export const getControlList = () => {
    try {
        return require('./json/control-list.json');
    } catch (ex) {
        console.log(ex.message())
        return [];
    }
}

/**
 *
 * @returns {*[]|*}
 */
export const getCountryList = () => {
    try {
        return require('./json/country-list.json');
    } catch (ex) {
        console.log(ex.message());
        return [];
    }
}

/**
 *
 * @param destination
 * @param res
 * @param status
 */
export const redirectTo = (destination, {response, status} = {}) => {
    if (response) {
        response.writeHead(status || 302, {Location: destination})
        response.end()
    } else {
        if (destination[0] === '/' && destination[1] !== '/') {
            Router.push(destination)
        } else {
            window.location = destination
        }
    }
}

/**
 *
 * @param callback
 */
export const swalConfirmPopup = (callback) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3f51b5',
        cancelButtonColor: '#ff4081',
        confirmButtonText: 'Yes, Confirm',
        cancelButtonText: "No, Cancel",
    }).then((event) => {
        if (event.value) {
            callback(true);
        } else {
            callback(false);
        }
    });
}

/**
 *
 * @returns {[{text: string, value: string}, {text: string, value: string}, {text: string, value: string}, {text: string, value: string}]}
 */
export const FORM_ENABLED = '1';
export const FORM_DISABLED = '2';
export const FORM_DISABLED_ON_DATE = '3';
export const FORM_DISABLED_ON_SUBMISSION_LIMIT = '4';
export const getFormStatusList = () => {
    return [
        {
            'value': '1',
            'text': 'Enabled'
        },
        {
            'value': '2',
            'text': 'Disabled'
        },
        {
            'value': '3',
            'text': 'Disabled on Date'
        },
        {
            'value': '4',
            'text': 'Disabled on Submission Limit'
        }
    ]
}
