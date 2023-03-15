import '../styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css';

import React from "react";
import {ToastContainer} from 'react-toastify';
import {Provider} from 'react-redux'
import {PersistGate} from "redux-persist/integration/react"

import {persistor, store} from "../store";

export default function App({Component, pageProps}) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Component {...pageProps} />
                <ToastContainer/>
            </PersistGate>
        </Provider>
    )
}
