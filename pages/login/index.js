import React, {useEffect, useState} from "react";
import Link from "next/link";
import Head from "next/head";
import AuthLayout from "../../components/Layout/AuthLayout";
import http from "../../lib/utils/http";
import {toast} from "react-toastify";
import {logIn} from "../../lib/auth";
import {makeInputErrors, tostify} from "../../lib/helpers";
import {useDispatch} from 'react-redux';
import {SET_AUTH_DATA} from '../../store/slices/authSlice';

export default function LoginPage() {
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();

        setIsLoading(true);

        http().get('/sanctum/csrf-cookie')
            .then(() => {
                http().post('/api/login', {
                    email: email,
                    password: password,
                    remember: remember,
                },).then((response) => {
                    setIsLoading(false);

                    if (response.data.status && response.data.data.access_token) {
                        dispatch(SET_AUTH_DATA(response.data.data.user));

                        logIn(response.data.data.access_token);
                    }
                }).catch((error) => {
                    setIsLoading(false);
                    tostify(toast, 'error', error)
                    makeInputErrors(error, (errors) => {
                        setErrors(errors);
                    })
                });
            }).catch((error) => {
            setIsLoading(false);
            toast.error(error?.message)
        })
    }

    return (
        <>
            <AuthLayout>
                <Head>
                    <title>Login - Online Form Builder</title>
                </Head>
                <main className="main-content  mt-0">
                    <div className="page-header min-vh-75">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                                    <div className="card card-plain mt-8">
                                        <div className="card-header pb-0 text-left bg-transparent">
                                            <h3 className="font-weight-bolder text-info text-gradient">
                                                Welcome back
                                            </h3>
                                            <p className="mb-0">
                                                Enter your email and password to sign in
                                            </p>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={handleSubmit}>
                                                <label htmlFor="email">Email</label>
                                                <div className="mb-3">
                                                    <input type="email"
                                                           value={email} onChange={(e) => setEmail(e.target.value)}
                                                           className={"form-control " + (errors?.email ? "is-invalid" : null)}
                                                           id="email"
                                                           placeholder="Email"
                                                    />
                                                    {errors?.email ? <div className="invalid-feedback">
                                                        {errors?.email?.[0]}
                                                    </div> : null}
                                                </div>

                                                <label htmlFor="password">Password</label>
                                                <div className="mb-3">
                                                    <input type="password" value={password}
                                                           onChange={(e) => setPassword(e.target.value)}
                                                           className={"form-control " + (errors?.password ? "is-invalid" : null)}
                                                           id="password"
                                                           placeholder="Password"
                                                    />
                                                    {errors?.password ? <div className="invalid-feedback">
                                                        {errors?.password?.[0]}
                                                    </div> : null}
                                                </div>
                                                <div className="form-check form-switch">
                                                    <input type="checkbox" defaultChecked={remember}
                                                           onChange={(e) => setRemember(e.target.checked)}
                                                           className="form-check-input" id="remember"
                                                    />
                                                    <label className="form-check-label" htmlFor="remember">
                                                        Remember me
                                                    </label>
                                                </div>
                                                <div className="text-center">
                                                    <button type="submit"
                                                            className="btn bg-gradient-info w-100 mt-4 mb-0">
                                                        Sign In
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                            <p className="mb-4 text-sm mx-auto">
                                                Don't have an account?
                                                <Link href="/register"
                                                   className="text-info text-gradient font-weight-bold ms-2">
                                                    Sign up
                                                </Link>
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
        </>
    );
}
