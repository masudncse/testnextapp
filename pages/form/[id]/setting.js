import React, {useEffect, useState} from "react";
import Head from "next/head";
import FormLayout from "../../../components/Layout/FormLayout";
import FormSettingTab from "../../../components/Form/Setting/FormSettingTab";
import ThankYouPageTab from "../../../components/Form/Setting/ThankYouPageTab";
import MiniHeader from "../../../components/Form/MiniHeader";
import {SET_BREADCRUMB} from "../../../store/slices/themeSlice";
import {useDispatch} from "react-redux";
import {useEffectOnce} from "../../../utils/hooks/useEffectOnce";
import {fetchForm} from "../../../services/FormServices";
import {useRouter} from "next/router";

const FormSettingPage = () => {
    const dispatch = useDispatch();

    const router = useRouter();
    const {id: formId} = router.query;

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

    // Tabs
    useEffect(() => {
        if (activeTab) {
            sessionStorage.setItem('settingPageActiveTab', activeTab);
        } else {
            if (sessionStorage.getItem('settingPageActiveTab')) {
                setActiveTab(sessionStorage.getItem('settingPageActiveTab'))
            } else {
                setActiveTab('FormSettingTab')
            }
        }
    }, [activeTab]);

    // Breadcrumb
    useEffectOnce(() => {
        dispatch(SET_BREADCRUMB({
            parentPage: {
                pageTitle: "Forms",
                pageLink: '/form/list'
            },
            currentPage: "Form Setting",
            pageTitle: "Form Settings"
        }))
    });

    // Fetch form data
    useEffect(() => {
        if (!_.isUndefined(formId)) {
            fetchForm(formId).then((response) => {
                if (response?.data) {
                    setForm({...response.data})
                }
            });
        }
    }, [formId]);

    return (
        <FormLayout>
            <Head>
                <title>Setting</title>
            </Head>
            <div className="form">
                <div className="setting">
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
                                            className={`list-group-item list-group-item-action shadow rounded-3 py-3 mb-3 ${activeTab === 'FormSettingTab' ? ' active' : ''}`}
                                            onClick={() => setActiveTab('FormSettingTab')}>
                                        <div className="d-flex w-100 align-items-center justify-content-between">
                                            <strong className="mb-1">Form Setting</strong>
                                        </div>
                                        <div className="col-10 mb-1 small">Update form properties</div>
                                    </button>

                                    <button type="button"
                                            className={`list-group-item list-group-item-action shadow rounded-3 py-3 mb-3 ${activeTab === 'ThankYouPageTab' ? ' active' : ''}`}
                                            onClick={() => setActiveTab('ThankYouPageTab')}>
                                        <div className="d-flex w-100 align-items-center justify-content-between">
                                            <strong className="mb-1">Thank You Page</strong>
                                        </div>
                                        <div className="col-10 mb-1 small">Design thank you page.</div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/*Tab Content*/}
                        <div className="col-md-10 mb-4">
                            <div className="card">
                                <div className="card-body p-3">
                                    {/*FormSettingTab*/}
                                    <FormSettingTab
                                        form={form}
                                        setForm={setForm}
                                        active={activeTab === 'FormSettingTab'}
                                    />

                                    {/*ThankYouPageTab*/}
                                    <ThankYouPageTab
                                        form={form}
                                        setForm={setForm}
                                        active={activeTab === 'ThankYouPageTab'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FormLayout>
    )
}

export default FormSettingPage;