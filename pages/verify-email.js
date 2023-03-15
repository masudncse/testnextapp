import React, {useState} from 'react'
import AuthLayout from "../components/Layout/AuthLayout";
import Head from "next/head";
import {login, logout, useAuth} from "../utils/auth";
import axios from "../utils/axios";
import {makeInputErrors, tostify} from "../utils/helpers";
import {toast} from "react-toastify";

export default function VerifyEmailPage() {

    const [status, setStatus] = useState(false);

    const resendEmailVerification = (event) => {
        event.preventDefault();

        setStatus(false);

        axios.get('/sanctum/csrf-cookie')
            .then(() => {
                axios()
                    .post('/api/email/verification-notification')
                    .then((response) => {
                        if (response.data.status) {
                            tostify(toast, 'success', response);
                            setStatus(true);
                        }
                    })
                    .catch((error) => {
                        tostify(toast, 'error', error);
                    });
            })
            .catch((error) => {
                tostify(toast, 'error', error);
            })
    }

    return (
        <AuthLayout>
            <Head>
                <title>Verify Email</title>
            </Head>
            <main className="main-content  mt-0">
                <div className="page-header min-vh-75">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                                <div className="card card-plain mt-8">
                                    <div className="card-header pb-0 text-left bg-transparent">
                                        <h3 className="font-weight-bolder text-info text-gradient">
                                            Verify Email
                                        </h3>
                                        <p className="mb-0">
                                            Thanks for signing up! Before getting started, could you
                                            verify your email address by clicking on the link we just
                                            emailed to you? If you didn't receive the email, we will
                                            gladly send you another.
                                        </p>
                                    </div>
                                    <div className="card-body">
                                        {status && (
                                            <div className="mb-4 font-medium text-sm text-green-600">
                                                A new verification link has been sent to the email
                                                address you provided during registration.
                                            </div>
                                        )}
                                    </div>
                                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                        <button
                                            type="button"
                                            onClick={resendEmailVerification}>
                                            Resend Verification Email
                                        </button>
                                        <p className="text-sm mx-auto">
                                            <button
                                                type="button"
                                                className="underline text-sm text-gray-600 hover:text-gray-900"
                                                onClick={logout}>
                                                Logout
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                                    <div
                                        className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                                        style={{backgroundImage: 'url("/img/curved-images/curved6.jpg")'}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </AuthLayout>
    )
}
