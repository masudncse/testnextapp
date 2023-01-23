import router from 'next/router'
import Cookies from 'js-cookie'
import cookie from 'cookie'
import http from "../utils/http";
import {tostify} from "../helpers";
import {toast} from "react-toastify";

export const isLoggedIn = (reqCookies = null) => {
    // if we don't have request cookies, get the cookie from client
    if (!reqCookies) {
        return !!Cookies.get('access_token')
    }

    // otherwise get cookie from server
    return !!cookie.parse(reqCookies).access_token
}

export const logIn = (token = '') => {
    Cookies.set('access_token', token, {expires: 86400, sameSite: 'lax'});

    router.push('/')
}

export const getAccessToken = () => {
    return Cookies.get('access_token');
}

export const logOut = async () => {
    if (typeof window !== 'undefined') {

        // api server logging out
        await apiLogOut();

        // remove logged in user's cookie and redirect to login page
        Cookies.remove('access_token', {expires: 86400, sameSite: 'lax'})

        router.push('/login')
    }
}

const apiLogOut = () => {
    http().get('/sanctum/csrf-cookie')
        .then(() => {
            http().post('/api/logout').then((response) => {
                if (response.data.status) {
                    // tostify(toast, 'success', response)
                }
            }).catch((error) => {
                tostify(toast, 'error', error)
            });
        }).catch((error) => {
        toast.error(error?.message)
    })
}
