import Cookies from 'js-cookie'
import cookie from 'cookie'
import {logoutClient} from "../services/AuthServices";

/**
 *
 * @param reqCookies
 * @return {boolean}
 */
export const isLoggedIn = (reqCookies = null) => {
    if (!reqCookies) {
        return !!Cookies.get('access_token')
    }

    return !!cookie.parse(reqCookies).access_token
}

/**
 *
 * @param token
 */
export const login = (token = '') => {
    Cookies.set('access_token', token, {expires: 86400, sameSite: 'lax'});

    if (localStorage.getItem('redirectTo')) {
        location.href = localStorage.getItem('redirectTo');
        localStorage.setItem('redirectTo', '');
    } else {
        location.href = '/';
    }
}

/**
 *
 * @return {Promise<void>}
 */
export const logout = async () => {
    if (typeof window !== 'undefined') {
        await logoutClient();

        Cookies.remove('access_token', {expires: 86400, sameSite: 'lax'});
        location.href = '/login';
    }
}

/**
 *
 * @return {*}
 */
export const token = () => {
    return Cookies.get('access_token');
}
