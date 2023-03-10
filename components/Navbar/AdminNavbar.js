import React from "react";
import AuthHeader from "../Header/AuthHeader";
import AuthFooter from "../Footer/AuthFooter";
import {logOut} from "../../lib/auth";
import Link from "next/link";

export default function AuthNavbar() {

    const handleLogOut = async (event) => {
        event.preventDefault();
        await logOut();
    }

    return (
        <>
            <nav
                className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
                id="navbarBlur"
                navbar-scroll="true"
            >
                <div className="container-fluid py-1 px-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                            <li className="breadcrumb-item text-sm">
                                <a className="opacity-5 text-dark" href="/">
                                    Pages
                                </a>
                            </li>
                            <li
                                className="breadcrumb-item text-sm text-dark active"
                                aria-current="page"
                            >
                                Dashboard
                            </li>
                        </ol>
                        <h6 className="font-weight-bolder mb-0">Dashboard</h6>
                    </nav>
                    <div
                        className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
                        id="navbar"
                    >
                        <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                            <div className="input-group">
              <span className="input-group-text text-body">
                <i className="fas fa-search" aria-hidden="true"/>
              </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Type here..."
                                />
                            </div>
                        </div>
                        <ul className="navbar-nav  justify-content-end">
                            <li className="nav-item d-flex align-items-center">
                                <Link
                                    className="btn btn-outline-primary btn-sm mb-0 me-3"
                                    target="_blank"
                                    href="/forms/create"
                                >
                                    Create Form
                                </Link>
                            </li>
                            <li className="nav-item d-flex align-items-center">
                                <a href="/" className="nav-link text-body font-weight-bold px-0" onClick={handleLogOut}
                                >
                                    <i className="fa fa-user me-sm-1"/>
                                    <span className="d-sm-inline d-none">Sign Out</span>
                                </a>
                            </li>
                            <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                                <a
                                    href="/"
                                    className="nav-link text-body p-0"
                                    id="iconNavbarSidenav"
                                >
                                    <div className="sidenav-toggler-inner">
                                        <i className="sidenav-toggler-line"/>
                                        <i className="sidenav-toggler-line"/>
                                        <i className="sidenav-toggler-line"/>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
