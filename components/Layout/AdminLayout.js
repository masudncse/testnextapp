import React from "react";
import AdminSidebar from "../Sidebar/AdminSidebar";
import AdminFooter from "../Footer/AdminFooter";
import AdminHeader from "../Header/AdminHeader";
import AdminNavbar from "../Navbar/AdminNavbar";

export default function AdminLayout({children}) {
    return (
        <div className="page">
            <AdminHeader/>
            <AdminSidebar/>

            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                <AdminNavbar />

                <section className="container-fluid py-4">
                    {children}

                    <AdminFooter />
                </section>
            </main>
        </div>
    );
}
