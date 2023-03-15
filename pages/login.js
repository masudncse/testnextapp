import React, {useEffect, useState} from "react";
import Link from "next/link";
import Head from "next/head";
import AuthLayout from "../components/Layout/AuthLayout";
import {isLoggedIn, login} from "../utils/auth";
import {useDispatch} from 'react-redux';
import {SET_AUTH_DATA} from '../store/slices/authSlice';
import InputError from "../components/Common/InputError";
import {useRouter} from "next/router";
import {loginClient} from "../services/AuthServices";
import {useEffectOnce} from "../utils/hooks/useEffectOnce";

export default function LoginPage() {
    const dispatch = useDispatch();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const [errors, setErrors] = useState({});

    useEffectOnce(() => {
        /*if (isLoggedIn()) {
            router.push('/');
        }*/
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors({});

        loginClient({
            email: email,
            password: password,
            remember: remember,
        }, setErrors).then((response) => {
            if (response?.data?.status) {
                if (response?.data?.data?.user) {
                    dispatch(SET_AUTH_DATA(response.data.data.user));
                }

                if (response?.data?.data?.access_token) {
                    login(response.data.data.access_token);
                }
            }
        });
    }

    return (
        <AuthLayout>
            <Head>
                <title>Login</title>
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
                                            <div className="mb-3">
                                                <label htmlFor="email">Email</label>
                                                <input
                                                    type="email"
                                                    value={email} onChange={(event) => setEmail(event.target.value)}
                                                    className={"form-control " + (errors?.email ? "is-invalid" : "")}
                                                    id="email"
                                                    placeholder="Email"
                                                    autoFocus={true}
                                                />
                                                <InputError messages={errors?.email}/>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="password">Password</label>
                                                <input
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className={"form-control " + (errors?.password ? "is-invalid" : "")}
                                                    id="password"
                                                    placeholder="Password"
                                                />
                                                <InputError messages={errors?.password}/>
                                            </div>
                                            <div className="form-check form-switch">
                                                <input
                                                    type="checkbox"
                                                    defaultChecked={remember}
                                                    onChange={(event) => setRemember(event.target.checked)}
                                                    className="form-check-input"
                                                    id="remember"
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
                                            <Link href={"/register"}
                                                  className="text-info text-gradient font-weight-bold ms-2">
                                                Sign up
                                            </Link>
                                        </p>
                                        <p className="text-sm mx-auto">
                                            <Link href={"/forgot-password"}>
                                                Forget Password?
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
    );
}
