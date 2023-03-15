import React from "react";
import moment from "moment";
import Link from "next/link";

export default function AdminFooter() {
    return (
        <footer className="footer pt-3  ">
            <div className="container-fluid">
                <div className="row align-items-center justify-content-lg-between">
                    <div className="col-lg-6 mb-lg-0 mb-4">
                        <div className="copyright text-center text-sm text-muted text-lg-start">
                            {moment(new Date()).format('YYYY')} © , Developed by &nbsp;
                            <a href="https://www.glossyit.com/" className="font-weight-bold" target="_blank">
                                Glossy IT
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                            <li className="nav-item">
                                <Link href={"/about-us"} className="nav-link text-muted">
                                    About Us
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href={"/help"} className="nav-link text-muted">
                                    Help
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href={"/contact-us"} className="nav-link pe-0 text-muted">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}