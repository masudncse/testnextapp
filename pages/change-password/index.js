import React, {useState} from "react";
import Head from "next/head";
import AdminLayout from "../../components/Layout/AdminLayout";
import withAuth from "../../lib/hooks/withAuth";

const HomePage = () => {
    return (
        <>
            <AdminLayout>
                <Head>
                    <title>Change Password - Online Form Builder</title>
                </Head>
                <div className="row">
                    <div className="col-md-12 mb-4">
                        <div className="card">
                            <div className="card-body p-3">
                                <div className="row">
                                    <div className="col-12">
                                        <h3>Change Password</h3>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}

export default withAuth(HomePage);