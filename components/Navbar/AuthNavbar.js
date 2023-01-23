import React from "react";
import AuthHeader from "../Header/AuthHeader";
import AuthFooter from "../Footer/AuthFooter";
import Link from "next/link";

export default function AuthNavbar() {
    return (
        <>
            <nav
                className="navbar navbar-expand-lg blur blur-rounded top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
                <div className="container-fluid pe-0">
                    <Link href="/" className="navbar-brand font-weight-bolder ms-lg-0 ms-3 ">
                        Online Form Builder
                    </Link>

                    <div className="collapse navbar-collapse" id="navigation">
                        <ul className="navbar-nav mx-auto ms-xl-auto me-xl-7">
                            <li className="nav-item">
                                <Link href="/" className="nav-link d-flex align-items-center me-2 active">
                                    <i className="fa fa-chart-pie opacity-6 text-dark me-2"/>
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/register" className="nav-link me-2">
                                    <i className="fas fa-user-circle opacity-6 text-dark me-2"/>
                                    Sign Up
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/login" className="nav-link me-2">
                                    <i className="fas fa-key opacity-6 text-dark me-2"/>
                                    Sign In
                                </Link>
                            </li>
                        </ul>
                        <li className="nav-item d-flex align-items-center">
                            <Link href="/forms/create" className="btn btn-round btn-sm mb-0 btn-outline-primary me-2">
                                Create Form
                            </Link>
                        </li>
                    </div>
                </div>
            </nav>
        </>
    );
}
