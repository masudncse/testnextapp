import React from 'react'
import {isLoggedIn, logout} from '../auth'

/*export default function withAuth(Component) {
    const AuthComponent = (props) => {
        return <Component {...props} />
    }

    if (!isLoggedIn()) {
        logout(true);
    }

    return AuthComponent
}*/

export default function withAuth(Component) {
    if (!isLoggedIn()) {
        logout(true).then(r => r);
    }

    return (props) => <Component {...props} />
}
