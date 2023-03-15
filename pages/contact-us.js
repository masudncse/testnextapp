import React from "react";
import Head from "next/head";
import AdminLayout from "../components/Layout/AdminLayout";
import {SET_BREADCRUMB} from "../store/slices/themeSlice";
import {useDispatch} from "react-redux";
import {useEffectOnce} from "../utils/hooks/useEffectOnce";

const ContactUsPage = () => {
    const dispatch = useDispatch();

    useEffectOnce(() => {
        dispatch(SET_BREADCRUMB({
            currentPage: "Contact Us",
            pageTitle: "Connect with us"
        }))
    });

    return (
        <AdminLayout>
            <Head>
                <title>Contact Us</title>
            </Head>
            <div className="row">
                <div className="col-12 text-center my-10">
                    <h1>Contact Us</h1>
                </div>
            </div>
        </AdminLayout>
    )
}

export default ContactUsPage;