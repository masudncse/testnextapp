import React, {useEffect} from "react";
import {ToastContainer} from 'react-toastify';
import {Provider} from 'react-redux'
import { PersistGate } from "redux-persist/integration/react"
import {store, persistor} from "../store"

import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';

export default function App({Component, pageProps}) {
    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Component {...pageProps} />
                    <ToastContainer/>
                </PersistGate>
            </Provider>
        </>
    )
}
