import React, {useState} from "react";
import Link from "next/link";
import Head from "next/head";
import AuthLayout from "../components/Layout/AuthLayout";
import {login} from "../utils/auth";
import InputError from "../components/Common/InputError";
import {registerClient} from "../services/AuthServices";
import {SET_AUTH_DATA} from "../store/slices/authSlice";
import {useDispatch} from "react-redux";

export default function RegisterPage() {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [accept, setAccept] = useState(false);

    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors({});

        registerClient({
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
            accept: accept,
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
                    <title>Register</title>
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
                                                    <input
                                                        type="name"
                                                        value={name}
                                                        onChange={(event) => setName(event.target.value)}
                                                        className={"form-control " + (errors?.name ? "is-invalid" : '')}
                                                        id="name"
                                                        placeholder="Name"
                                                        autoFocus={true}
                                                    />
                                                    <InputError messages={errors?.name}/>
                                                </div>

                                                <label htmlFor="email">Email</label>
                                                <div className="mb-3">
                                                    <input
                                                        type="email"
                                                        value={email}
                                                        onChange={(event) => setEmail(event.target.value)}
                                                        className={"form-control " + (errors?.email ? "is-invalid" : '')}
                                                        id="email"
                                                        placeholder="Email"
                                                    />
                                                    <InputError messages={errors?.email}/>
                                                </div>

                                                <label htmlFor="passwordConfirmation">Password</label>
                                                <div className="mb-3">
                                                    <input type="password" value={passwordConfirmation}
                                                           onChange={(event) => setPasswordConfirmation(event.target.value)}
                                                           className={"form-control " + (errors?.password_confirmation ? "is-invalid" : '')}
                                                           id="passwordConfirmation"
                                                           placeholder="Confirm Password"
                                                    />
                                                    <InputError messages={errors?.password}/>
                                                </div>

                                                <label htmlFor="password">Confirm Password</label>
                                                <div className="mb-3">
                                                    <input type="password" value={password}
                                                           onChange={(event) => setPassword(event.target.value)}
                                                           className={"form-control " + (errors?.password ? "is-invalid" : '')}
                                                           id="password"
                                                           placeholder="Confirm Password"
                                                    />
                                                    <InputError messages={errors?.password_confirmation}/>
                                                </div>

                                                <div className="">
                                                    <div className="form-check form-switch">
                                                        <input
                                                            type="checkbox"
                                                            defaultChecked={accept}
                                                            onChange={(event) => setAccept(event.target.checked)}
                                                            className="form-check-input"
                                                            id="agree"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="accept">
                                                            I agree the <a href="/" className="fw-bolder">
                                                            Terms and Conditions</a>
                                                        </label>
                                                    </div>
                                                    <InputError messages={errors?.accept} className={'d-block'}/>
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
