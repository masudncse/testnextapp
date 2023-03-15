import React from "react";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {SET_TOGGLE_SIDENAV_STATUS} from "../../../store/slices/themeSlice";
import {createForm} from "../../../services/FormServices";
import {swalConfirmPopup, tostify} from "../../../utils/helpers";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import ActiveLink from "../../../utils/lib/ActiveLink";

export default function AdminSidebar({user}) {
    const router = useRouter()
    const dispatch = useDispatch();

    const {toggleSideNav} = useSelector((state) => state.theme);
    const {auth} = useSelector((state) => state.auth);

    const handleCreateNewForm = () => {
        swalConfirmPopup((isConfirm) => {
            if (isConfirm) {
                createForm().then((response) => {
                    if (response?.data?.status) {
                        tostify(toast, 'success', {
                            message: "Form created successfully."
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
        <aside
            className={`admin-sidebar sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start nice-scroll ms-3 ${toggleSideNav ? 'bg-white' : 'bg-transparent'}`}
            id="sidenav-main"
        >
            <div className="sidenav-header">
                <i
                    className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-xl-none"
                    onClick={
                        (event) => {
                            event.preventDefault();
                            dispatch(SET_TOGGLE_SIDENAV_STATUS());
                        }
                    } id="iconSidenav"/>
                <Link href="/" className="navbar-brand m-0">
                    <img src={"/img/logo.png"} className="navbar-brand-img h-100" alt="logo"/>
                    {auth?.name && (<p>{auth?.name}</p>)}
                </Link>
            </div>
            <hr className="horizontal dark mt-0 mb-0"/>
            <div
                className="collapse navbar-collapse w-auto nice-scroll"
                id="sidenav-collapse-main"
            >
                <ul className="navbar-nav">
                    <li>
                        <button
                            type="button"
                            className="btn bg-gradient-primary btn-create-form mt-3 mb-4 w-100"
                            onClick={handleCreateNewForm}
                        >
                            Create Form
                        </button>
                    </li>
                    <li className="nav-item">
                        <ActiveLink href="/" className="nav-link">
                            <div
                                className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                <img src="https://icon-library.com/images/dashboard-icon/dashboard-icon-16.jpg"
                                     alt="icon"/>
                            </div>
                            <span className="nav-link-text ms-1">Dashboard</span>
                        </ActiveLink>
                    </li>
                    <li className="nav-item">
                        <ActiveLink href={"/form/list"} className="nav-link">
                            <div
                                className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                <img src="https://icon-library.com/images/forms-icon-png/forms-icon-png-17.jpg"
                                     alt="icon"/>
                            </div>
                            <span className="nav-link-text ms-1">All Forms</span>
                        </ActiveLink>
                    </li>
                    <li className="nav-item">
                        <ActiveLink className="nav-link" href={"/form/trash-list"}>
                            <div
                                className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                <img src="https://icons.veryicon.com/png/o/miscellaneous/dx-meeh/delete-trash-3.png"
                                     alt="icon"/>
                            </div>
                            <span className="nav-link-text ms-1">Trash</span>
                        </ActiveLink>
                    </li>
                    <li className="nav-item mt-4">
                        <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">
                            Account pages
                        </h6>
                    </li>
                    <li className="nav-item">
                        <ActiveLink href={"/profile"} className="nav-link">
                            <div
                                className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                <img src="https://pixlok.com/wp-content/uploads/2021/10/Profile_Icon-mc42.png"
                                     alt="icon"/>
                            </div>
                            <span className="nav-link-text ms-1">Profile</span>
                        </ActiveLink>
                    </li>
                </ul>
            </div>
            <div className="sidenav-footer mx-3 ">
                <div
                    className="card card-background shadow-none card-background-mask-secondary"
                    id="sidenavCard"
                >
                    <div
                        className="full-background"
                        style={{
                            backgroundImage:
                                'url("/img/curved-images/white-curved.jpg")'
                        }}
                    />
                    <div className="card-body text-start p-3 w-100">
                        <div
                            className="icon icon-shape icon-sm bg-white shadow text-center mb-3 d-flex align-items-center justify-content-center border-radius-md">
                            <i
                                className="ni ni-diamond text-dark text-gradient text-lg top-0"
                                aria-hidden="true"
                                id="sidenavCardIcon"
                            />
                        </div>
                        <div className="docs-info">
                            <h6 className="text-white up mb-0">Need help?</h6>
                            <p className="text-xs font-weight-bold">Please check our docs</p>
                            <Link href={"/help"} className="btn btn-white btn-sm w-100 mb-0">
                                Documentation
                            </Link>
                        </div>
                    </div>
                </div>
                <Link href={"/package"} className="btn bg-gradient-primary mt-3 w-100">
                    Upgrade to pro
                </Link>
            </div>
        </aside>
    )
}
