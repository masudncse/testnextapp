import React from "react";
import AuthHeader from "../Header/AuthHeader";
import AuthFooter from "../Footer/AuthFooter";
import AuthNavbar from "../Navbar/AuthNavbar";

export default function AuthLayout({children}) {
    return (
        <div className="page">
            <AuthHeader/>

            <header className="container position-sticky z-index-sticky top-0">
                <div className="row">
                    <div className="col-12">
                        <AuthNavbar/>
                    </div>
                </div>
            </header>

            {children}

            <AuthFooter/>
        </div>
    );
}
