import React, {useState} from "react";
import Link from "next/link";
import Head from "next/head";
import AuthLayout from "../components/Layout/AuthLayout";
import InputError from "../components/Common/InputError";
import {tostify} from "../utils/helpers";
import {toast} from "react-toastify";
import {forgotPasswordClient} from "../services/AuthServices";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors({});

        forgotPasswordClient({
            email: email
        }, setErrors).then((response) => {
            if (response?.data?.status) {
                tostify(toast, 'success', response);
            }
        });
    }

    return (
        <AuthLayout>
            <Head>
                <title>Forgot Password</title>
            </Head>
            <main className="main-content  mt-0">
                <div className="page-header min-vh-75">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                                <div className="card card-plain mt-8">
                                    <div className="card-header pb-0 text-left bg-transparent">
                                        <h3 className="font-weight-bolder text-info text-gradient">
                                            Forgot Password
                                        </h3>
                                        <p className="mb-0">
                                            Forgot your password? No problem. Just let us know your
                                            email address and we will email you a password reset link
                                            that will allow you to choose a new one.
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
                                            <div className="text-center">
                                                <button type="submit"
                                                        className="btn bg-gradient-info w-100 mt-4 mb-0">
                                                    Email Password Reset Link
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                        <p className="mb-1 text-sm mx-auto">
                                            Have an account?
                                            <Link href={"/login"}
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
    );
}
