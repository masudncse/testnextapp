import React, {useEffect, useState} from "react";
import Head from "next/head";

import AuthLayout from "../../components/Layout/AuthLayout";
import InputError from "../../components/Common/InputError";
import {useRouter} from "next/router";
import axios from "../../utils/axios";
import {makeInputErrors, tostify} from "../../utils/helpers";
import {toast} from "react-toastify";

export default function ResetPasswordPage() {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const [errors, setErrors] = useState([])

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.get('/sanctum/csrf-cookie')
            .then(() => {
                axios.post('/api/reset-password', {
                    token: router.query.token,
                    email: email,
                    password: password,
                    password_confirmation: passwordConfirmation,
                },).then((response) => {
                    if (response.data.status) {
                        tostify(toast, 'success', response);
                        router.push('/login');
                    }
                }).catch((error) => {
                    tostify(toast, 'error', error)
                    makeInputErrors(error, setErrors);
                });
            })
            .catch((error) => {
                tostify(toast, 'error', error);
            })
    }

    useEffect(() => {
        setEmail(router.query.email || '')
    }, [router.query.email])

    return (
        <AuthLayout>
            <Head>
                <title>Reset Password</title>
            </Head>
            <main className="main-content  mt-0">
                <div className="page-header min-vh-75">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                                <div className="card card-plain mt-8">
                                    <div className="card-header pb-0 text-left bg-transparent">
                                        <h3 className="font-weight-bolder text-info text-gradient">
                                            Reset Password
                                        </h3>
                                        <p className="mb-0">
                                            Reset your password with strongly
                                        </p>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="email">Email</label>
                                                <input type="email"
                                                       value={email} onChange={(event) => setEmail(event.target.value)}
                                                       className={'form-control ' + (errors?.email ? 'is-invalid' : '')}
                                                       id="email"
                                                       placeholder="Email"
                                                />
                                                <InputError messages={errors?.email}/>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="password">Password</label>
                                                <input type="password" value={password}
                                                       onChange={(event) => setPassword(event.target.value)}
                                                       className={'form-control ' + (errors?.password ? 'is-invalid' : '')}
                                                       id="password"
                                                       placeholder="Password"
                                                       autoFocus={true}
                                                />
                                                <InputError messages={errors?.password}/>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="passwordConfirmation">
                                                    Confirm Password
                                                </label>
                                                <div className="mb-3">
                                                    <input
                                                        type="password"
                                                        value={passwordConfirmation}
                                                        onChange={(event) => setPasswordConfirmation(event.target.value)}
                                                        className={"form-control " + (errors?.password_confirmation ? "is-invalid" : "")}
                                                        id="passwordConfirmation"
                                                        placeholder="Confirm Password"
                                                    />
                                                    <InputError messages={errors?.password_confirmation}/>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <button type="submit"
                                                        className="btn bg-gradient-info w-100 mt-4 mb-0">
                                                    Reset Password
                                                </button>
                                            </div>
                                        </form>
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
    );
}
