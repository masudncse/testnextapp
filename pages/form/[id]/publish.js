import React, {useEffect, useState} from "react";
import Head from "next/head";
import FormLayout from "../../../components/Layout/FormLayout";
import QuickShareTab from "../../../components/Form/Publish/QuickShareTab";
import EmbedTab from "../../../components/Form/Publish/EmbedTab";
import MiniHeader from "../../../components/Form/MiniHeader";
import {useDispatch} from "react-redux";
import {SET_BREADCRUMB} from "../../../store/slices/themeSlice";
import {useEffectOnce} from "../../../utils/hooks/useEffectOnce";
import {fetchForm} from "../../../services/FormServices";
import {useRouter} from "next/router";

const FormPublishPage = () => {
    const dispatch = useDispatch();

    const router = useRouter();
    const {id: formId} = router.query

    const [form, setForm] = useState({
        id: '',
        client_id: '',
        title: '',
        questions: [],
        properties: {},
        status: '',
        warning_message: '',
        expiry_date: '',
        expiry_time: '',
        action_after_submission: '',
        thank_you_page_content: '',
        redirect_link: '',
        deleted_at: '',
        created_at: '',
        updated_at: '',
    });
    const [activeTab, setActiveTab] = useState('');

    // Tab
    useEffect(() => {
        if (activeTab) {
            sessionStorage.setItem('publishPageActiveTab', activeTab)
        } else {
            if (sessionStorage.getItem('publishPageActiveTab')) {
                setActiveTab(sessionStorage.getItem('publishPageActiveTab'))
            } else {
                setActiveTab('QuickShareTab')
            }
        }
    }, [activeTab])

    // Breadcrumb
    useEffectOnce(() => {
        dispatch(SET_BREADCRUMB({
            parentPage: {
                pageTitle: "Forms",
                pageLink: '/form/list'
            },
            currentPage: "Publish",
            pageTitle: "Form Publish"
        }))
    });

    // Fetch Form
    useEffect(() => {
        if (!_.isUndefined(formId)) {
            fetchForm(formId).then((response) => {
                if (response?.data) {
                    setForm(response.data);
                }
            });
        }
    }, [formId]);

    return (
        <FormLayout>
            <Head>
                <title>Publish</title>
            </Head>
            <div className="form">
                <div className="publish">
                    <div className="row">
                        <div className="col-12 px-4 mb-4">
                            <MiniHeader
                                form={form}
                                setForm={setForm}
                            />
                        </div>

                        {/*Tab Nav*/}
                        <div className="col-md-2 px-4 mb-4">
                            <div className="d-flex flex-column align-items-stretch flex-shrink-0">
                                <div className="list-group list-group-flush nice-scroll">
                                    <button type="button"
                                            className={`list-group-item list-group-item-action shadow rounded-3 py-3 mb-3 ${activeTab === 'QuickShareTab' ? ' active' : ''}`}
                                            onClick={() => setActiveTab('QuickShareTab')}>
                                        <div className="d-flex w-100 align-items-center justify-content-between">
                                            <strong className="mb-0 text-uppercase">Quick Share</strong>
                                        </div>
                                        <div className="col-10 mb-1 small">Direct form link & social share</div>
                                    </button>

                                    <button type="button"
                                            className={`list-group-item list-group-item-action shadow rounded-3 py-3 mb-3 ${activeTab === 'EmbedTab' ? ' active' : ''}`}
                                            onClick={() => setActiveTab('EmbedTab')}>
                                        <div className="d-flex w-100 align-items-center justify-content-between">
                                            <strong className="mb-0 text-uppercase">Embed</strong>
                                        </div>
                                        <div className="col-10 mb-1 small">Various web page embed option</div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/*Tab Content*/}
                        <div className="col-md-10 mb-4">
                            {/*Quick Share*/}
                            <QuickShareTab
                                form={form}
                                setForm={setForm}
                                active={activeTab === 'QuickShareTab'}
                            />

                            {/*Embed Link*/}
                            <EmbedTab
                                form={form}
                                setForm={setForm}
                                active={activeTab === 'EmbedTab'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </FormLayout>
    )
}

export default FormPublishPage;