import React, {useEffect, useState} from "react";
import Head from "next/head";
import AdminLayout from "../../components/Layout/AdminLayout";
import axios from "../../utils/axios";
import {tostify} from "../../utils/helpers";
import {toast} from "react-toastify";
import {useEffectOnce} from "../../utils/hooks/useEffectOnce";
import {SET_BREADCRUMB} from "../../store/slices/themeSlice";
import {useDispatch} from "react-redux";

const PackagePage = () => {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [packages, setPackages] = useState([])

    // Breadcrumb
    useEffectOnce(() => {
        dispatch(SET_BREADCRUMB({
            currentPage: "Package",
            pageTitle: "Select your package"
        }))
    });

    useEffect(() => {
        if (_.isEmpty(packages)) {
            axios.get('/sanctum/csrf-cookie')
                .then(() => {
                    axios.get('/api/packages').then(async (response) => {
                        if (response.data.status) {
                            setPackages(response.data.data.data);
                        }

                        setIsLoading(false);
                    }).catch((error) => {
                        setIsLoading(false);
                        tostify(toast, 'error', error);
                    });
                }).catch((error) => {
                setIsLoading(false);
                tostify(toast, 'error', error);
            });
        }
    }, [packages]);

    return (
        <AdminLayout>
            <Head>
                <title>Package - Online Form Builder</title>
            </Head>
            <div className="package">
                <div className="row">
                    <div className="col-md-12 mb-4">
                        <div className="card">
                            <div className="card-body p-3">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="package__hero">
                                            <h2>Package</h2>
                                            <h3>Chose the right plan for you.</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 mb-4">
                        <div className="package__pricing">
                            <div className="row">
                                {packages.map((item, key) => <div
                                    className="col-md-3" key={key}>
                                    <div className="package__pricing__item">
                                        <div className="card">
                                            <div className="card-body p-3">
                                                <ul>
                                                    <li>
                                                        <h3 className="name">
                                                            {item.name}
                                                        </h3>
                                                    </li>
                                                    <li>
                                                        <h3 className="price">
                                                            {item.price} <span>/ Month</span>
                                                        </h3>
                                                        <p className="description">
                                                            {item.description}
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <h3>{item.form_limit} Forms</h3>
                                                        <p>Form Limit</p>
                                                    </li>
                                                    <li>
                                                        <h3>{item.submission_limit}</h3>
                                                        <p>Monthly Submissions</p>
                                                    </li>
                                                    <li>
                                                        <a href="/" className="btn btn-success btn-lg btn-get-started">
                                                            Get Started
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default PackagePage;