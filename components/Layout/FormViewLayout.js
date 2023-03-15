import React from "react";

export default function FormViewLayout({children}) {
    return (
        <div className="page">

            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">

                <section className="container-fluid py-4">
                    {children}

                </section>
            </main>
        </div>
    );
}
