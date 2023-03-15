import React from "react";
import Head from "next/head";
import AdminLayout from "../components/Layout/AdminLayout";
import {SET_BREADCRUMB} from "../store/slices/themeSlice";
import {useDispatch} from "react-redux";
import {useEffectOnce} from "../utils/hooks/useEffectOnce";

const AboutUsPage = () => {
    const dispatch = useDispatch();

    useEffectOnce(() => {
        dispatch(SET_BREADCRUMB({
            currentPage: "About Us",
            pageTitle: "Learn more about us"
        }))
    });

    return (
        <AdminLayout>
            <Head>
                <title>Contact Us</title>
            </Head>
            <div className="row">
                <div className="col-12 text-center my-10">
                    <h1>About Us</h1>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AboutUsPage;