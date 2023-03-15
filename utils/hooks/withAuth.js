import React from 'react'
import {isLoggedIn, logout} from '../auth'

export default function withAuth(Component) {
    const AuthComponent = (props) => {
        return <Component {...props} />
    }

    if (!isLoggedIn()) {
        /*logout().then(() => {
            if (typeof window !== 'undefined') {
                localStorage.setItem('redirectTo', window.location.href);
            }
        });*/
    }

    return AuthComponent
}
