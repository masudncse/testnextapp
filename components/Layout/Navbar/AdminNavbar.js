import React, {useEffect, useState} from "react";
import {logout} from "../../../utils/auth";
import {SET_TOGGLE_SIDENAV_STATUS} from "../../../store/slices/themeSlice";
import {useDispatch, useSelector} from "react-redux";
import CustomBreadcrumb from "../../Common/CustomBreadcrumb";
import {createForm} from "../../../services/FormServices";
import {swalConfirmPopup, tostify} from "../../../utils/helpers";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

export default function AdminNavbar() {
    const dispatch = useDispatch();
    const router = useRouter();

    const {toggleSideNav} = useSelector((state) => state.theme);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        if (toggleSideNav) {
            document.querySelector("body").classList.add("g-sidenav-pinned")
        } else {
            document.querySelector("body").classList.remove("g-sidenav-pinned")
        }
    }, [toggleSideNav])

    const handleLogOut = async (event) => {
        event.preventDefault();

        localStorage.setItem('redirectTo', '');

        await logout();
    }

    const handleCreateNewForm = () => {
        swalConfirmPopup((isConfirm) => {
            if (isConfirm) {
                createForm().then((response) => {
                    if (response?.data?.status) {
                        tostify(toast, 'success', {
                            message: "Form created successfully"
                        });

                        if (response?.data?.data?.id) {
                            router.push(`/form/${response.data.data.id}/build`);
                        }
                    }
                })
            }
        })
    }

    return (
        <nav
            className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur"
            navbar-scroll="true"
        >
            <div className="container-fluid py-1 px-3">
                <CustomBreadcrumb/>
                <div
                    className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
                    id="navbar"
                >
                    <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                        <form action={"/form/list"} method="get">
                            <div className="input-group">
                              <span className="input-group-text text-body">
                                <i className="fas fa-search" aria-hidden="true"/>
                              </span>
                                <input
                                    type="search" name="keyword" value={keyword}
                                    onChange={(event) => setKeyword(event.target.value)}
                                    className="form-control"
                                    placeholder="Type here..."
                                />
                            </div>
                        </form>
                    </div>
                    <ul className="navbar-nav  justify-content-end">
                        <li className="nav-item d-flex align-items-center">
                            <button
                                type="button"
                                className="btn btn-outline-primary btn-sm mb-0 me-3"
                                onClick={handleCreateNewForm}
                            >
                                Create Form
                            </button>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <a href="/" className="nav-link text-body font-weight-bold px-0" onClick={handleLogOut}
                            >
                                <i className="fa fa-user me-sm-1"/>
                                <span className="d-sm-inline d-none ms-1">Sign Out</span>
                            </a>
                        </li>
                        <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                            <a className="nav-link text-body p-0" onClick={(event) => {
                                event.preventDefault();
                                dispatch(SET_TOGGLE_SIDENAV_STATUS());
                            }} id="iconNavbarSidenav">
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
    );
}
