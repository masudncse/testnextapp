import React, {useState} from "react";
import Head from "next/head";
import AdminLayout from "../components/Layout/AdminLayout";
import {SET_BREADCRUMB} from "../store/slices/themeSlice";
import {useDispatch, useSelector} from "react-redux";
import withAuth from "../utils/hooks/withAuth";
import {useEffectOnce} from "../utils/hooks/useEffectOnce";
import {FaWpforms} from "react-icons/fa";
import {IoCheckboxOutline} from "react-icons/io5";
import {GrDisabledOutline} from "react-icons/gr";
import {BsEnvelope} from "react-icons/bs";
import {getEveryCountsByClient} from "../services/CommonServices";
import {fetchForms} from "../services/FormServices";
import Link from "next/link";
import moment from "moment";
import FormStatus from "../components/Form/FormStatus";
import {fetchSubscriptions} from "../services/SubscriptionServices";

const HomePage = () => {
    const dispatch = useDispatch();

    const auth = useSelector((state) => state.auth);

    const [count, setCount] = useState(0);
    const [forms, setForms] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);

    // Breadcrumb
    useEffectOnce(() => {
        dispatch(SET_BREADCRUMB({
            currentPage: "Home",
            pageTitle: "Home"
        }))
    });

    // Every Counts
    useEffectOnce(() => {
        getEveryCountsByClient(auth?.id).then((response) => {
            if (response?.data) {
                setCount(response.data);
            }
        });
    });

    // Fetch Forms
    useEffectOnce(() => {
        fetchForms({
            limit: 6
        }).then((response) => {
            if (response?.data?.data) {
                setForms(response.data.data);
            }
        });
    });

    // Fetch Subscripts
    useEffectOnce(() => {
        fetchSubscriptions({
            orderColumn: 'id',
            orderBy: 'DESC',
            limit: 6,
        }).then((response) => {
            if (response?.data?.data) {
                setSubscriptions(response.data.data);
            }
        });
    });

    return (
        <AdminLayout>
            <Head>
                <title>Home</title>
            </Head>
            <div className="dashboard">
                <div className="row">
                    <div className="col-12">
                        {/*Count Status*/}
                        <div className="row status">
                            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                <div className="card">
                                    <div className="card-body p-3">
                                        <div className="row">
                                            <div className="col-8">
                                                <div className="numbers">
                                                    <p className="text-sm mb-0 text-capitalize font-weight-bold">
                                                        Total Forms
                                                    </p>
                                                    <h5 className="font-weight-bolder mb-0">
                                                        {count?.totalForms ?? 0}
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="col-4 text-end">
                                                <div
                                                    className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                                    <FaWpforms className="text-lg opacity-10"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                <div className="card">
                                    <div className="card-body p-3">
                                        <div className="row">
                                            <div className="col-8">
                                                <div className="numbers">
                                                    <p className="text-sm mb-0 text-capitalize font-weight-bold">
                                                        Active Forms
                                                    </p>
                                                    <h5 className="font-weight-bolder mb-0">
                                                        {count?.activeForms ?? 0}
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="col-4 text-end">
                                                <div
                                                    className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                                    <IoCheckboxOutline className="text-lg opacity-10"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                <div className="card">
                                    <div className="card-body p-3">
                                        <div className="row">
                                            <div className="col-8">
                                                <div className="numbers">
                                                    <p className="text-sm mb-0 text-capitalize font-weight-bold">
                                                        Disabled Forms
                                                    </p>
                                                    <h5 className="font-weight-bolder mb-0">
                                                        {count?.disabledForms ?? 0}
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="col-4 text-end">
                                                <div
                                                    className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                                    <GrDisabledOutline className="text-lg opacity-10"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6">
                                <div className="card">
                                    <div className="card-body p-3">
                                        <div className="row">
                                            <div className="col-8">
                                                <div className="numbers">
                                                    <p className="text-sm mb-0 text-capitalize font-weight-bold">
                                                        Total Submissions
                                                    </p>
                                                    <h5 className="font-weight-bolder mb-0">
                                                        {count?.totalSubmissions ?? 0}
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="col-4 text-end">
                                                <div
                                                    className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                                    <BsEnvelope className="text-lg opacity-10"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row my-4">

                            {/*Latest Forms*/}
                            <div className="col-lg-8 col-md-6 mb-md-0 mb-4">
                                <div className="card">
                                    <div className="card-header pb-0">
                                        <div className="row">
                                            <div className="col-12">
                                                <h6>Latest Forms</h6>
                                                <p className="text-sm mb-0">
                                                    <i className="fa fa-table text-info me-2" aria-hidden="true"/>
                                                    <span className="font-weight-bold ms-1">6 forms</span> added
                                                    recently
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body px-0 pb-2">
                                        <div className="table-responsive">
                                            <table className="table align-items-center mb-0">
                                                <thead>
                                                <tr>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                        Title
                                                    </th>
                                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                        Status
                                                    </th>
                                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                        Created
                                                    </th>
                                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                        Actions
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {forms && forms.map((form, index) => {
                                                    return <tr key={index}>
                                                        <td className="px-4">
                                                            <div className="d-flex py-1">
                                                                <div
                                                                    className="d-flex flex-column justify-content-center">
                                                                    <h6 className="mb-0 text-sm">{form.title}</h6>
                                                                    <p className="text-xs text-secondary mb-0 font-weight-bold">
                                                                        <Link
                                                                            href={`/submission/${form.id}/list`}
                                                                            target="_blank">
                                                                            {form.submissions_count} Submissions
                                                                        </Link>,
                                                                        Updated
                                                                        on {moment(form.updated_at).format(
                                                                        "MMM DD, YYYY"
                                                                    )}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="text-center px-4">
                                                            <FormStatus status={form.status}/>
                                                        </td>
                                                        <td className="text-center px-4">
                                                            <span className="text-secondary text-xs font-weight-bold">
                                                                {moment(form.created_at).format("MMM DD, YYYY")}
                                                            </span>
                                                        </td>
                                                        <td className="px-4">
                                                            <div
                                                                className="d-flex justify-content-center align-items-center">
                                                                <Link href={`/form/${form.id}/build`} target="_blank"
                                                                      className="btn btn-link text-dark px-3 mb-0 me-1">
                                                                    <i className="fa fa-pencil me-2"/>
                                                                    Edit
                                                                </Link>
                                                                <Link href={`/submission/${form.id}/list`}
                                                                      target="_blank"
                                                                      className="btn btn-link text-dark px-3 mb-0 me-1">
                                                                    <i className="fa fa-paper-plane me-2"/>
                                                                    Submissions
                                                                </Link>
                                                                <Link href={`/form/${form.id}/publish`} target="_blank"
                                                                      className="btn btn-link text-dark px-3 mb-0">
                                                                    <i className="fa fa-upload me-2"/>
                                                                    Publish
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="card h-100">
                                    <div className="card-header pb-0">
                                        <h6>Orders overview</h6>
                                        <p className="text-sm">
                                            <i className="fa fa-calendar text-success me-2"/>
                                            <span className="font-weight-bold">6 recent order</span>
                                        </p>
                                    </div>
                                    <div className="card-body p-3">
                                        <div className="timeline timeline-one-side">
                                            {subscriptions && subscriptions.map((subscription, index) => {
                                                return (
                                                    <div key={index} className="timeline-block mb-3">
                                                          <span className="timeline-step">
                                                            <i className="fa fa-cart-plus text-primary text-gradient"/>
                                                          </span>
                                                        <div className="timeline-content">
                                                            <h6 className="text-dark text-sm font-weight-bold mb-0">
                                                                {`$${subscription.payment_total ?? '0'}  ${subscription.package_name} Package`}
                                                            </h6>
                                                            <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">
                                                                {moment(subscription.created_at).format('MMM DD, YYYY hh:mm A')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default withAuth(HomePage);