import React from "react";
import Head from "next/head";
import AdminLayout from "../components/Layout/AdminLayout";
import {SET_BREADCRUMB} from "../store/slices/themeSlice";
import {useDispatch} from "react-redux";
import {useEffectOnce} from "../utils/hooks/useEffectOnce";

const HelpPage = () => {
    const dispatch = useDispatch();

    useEffectOnce(() => {
        dispatch(SET_BREADCRUMB({
            currentPage: "Help",
            pageTitle: "Need help?"
        }))
    });

    return (
        <AdminLayout>
            <Head>
                <title>Contact Us</title>
            </Head>
            <div className="row">
                <div className="col-12 text-center my-10">
                    <h1>Help</h1>
                </div>
            </div>
        </AdminLayout>
    )
}

export default HelpPage;