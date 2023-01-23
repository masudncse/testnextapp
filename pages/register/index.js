import React, {useState} from "react";
import Link from "next/link";
import Head from "next/head";
import AuthLayout from "../../components/Layout/AuthLayout";
import http from "../../lib/utils/http";
import {logIn} from "../../lib/auth";
import {toast} from "react-toastify";
import {makeInputErrors, tostify} from "../../lib/helpers";


export default function RegisterPage() {
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [accept, setAccept] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        setIsLoading(true);

        http().get('/sanctum/csrf-cookie')
            .then(() => {
                http().post('/api/register', {
                    name: name,
                    email: email,
                    password: password,
                    accept: accept,
                },).then((response) => {

                    setIsLoading(false);

                    if (response.data.status && response.data.data.access_token) {
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
                    <title>Register - Online Form Builder</title>
                </Head>
                <main className="main-content  mt-0">
                    <div className="page-header min-vh-75">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                                    <div className="card card-plain mt-8">
                                        <div className="card-header pb-0 text-left bg-transparent">
                                            <h3 className="font-weight-bolder text-info text-gradient">
                                                Register with
                                            </h3>
                                            <p className="mb-0">
                                                Create an account to forward
                                            </p>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={handleSubmit} method="POST">
                                                <label htmlFor="name">Name</label>
                                                <div className="mb-3">
                                                    <input type="name"
                                                           value={name} onChange={(e) => setName(e.target.value)}
                                                           className={"form-control " + (errors?.name ? "is-invalid" : null)}
                                                           id="name"
                                                           placeholder="Name"
                                                    />
                                                    {errors?.name ? <div className="invalid-feedback">
                                                        {errors?.name?.[0]}
                                                    </div> : null}
                                                </div>

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
                                                    <input type="checkbox" defaultChecked={accept}
                                                           onChange={(e) => setAccept(e.target.checked)}
                                                           className="form-check-input" id="agree"
                                                    />
                                                    <label
                                                        className={"form-check-label " + (errors?.accept ? 'text-danger' : null)}
                                                        htmlFor="accept">
                                                        I agree the <a href="/" className="fw-bolder">
                                                        Terms and Conditions</a>
                                                    </label>
                                                </div>
                                                <div className="text-center">
                                                    <button type="submit"
                                                            className="btn bg-gradient-info w-100 mt-4 mb-0">
                                                        Sign Up
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                            <p className="mb-4 text-sm mx-auto">
                                                Already have an account?
                                                <Link href="/login"
                                                      className="text-info text-gradient font-weight-bold ms-2">
                                                    Sign in
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
