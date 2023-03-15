import React from "react";
import AdminFooter from "./Footer/AdminFooter";
import AdminNavbar from "./Navbar/AdminNavbar";

export default function FormLayout({children}) {
    return (
        <div className="page">

            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                <AdminNavbar/>

                <section className="container-fluid py-4">
                    {children}

                    <AdminFooter/>
                </section>
            </main>
        </div>
    );
}
