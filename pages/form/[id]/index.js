import React, {useEffect, useState} from "react";
import Head from "next/head";
import FormViewLayout from "../../../components/Layout/FormViewLayout";
import RenderSingleForm from "../../../components/Form/RenderSingleForm";
import {fetchGuestForm} from "../../../services/FormServices";
import {useRouter} from "next/router";
import FormThankYouContent from "../../../components/Form/FormThankYouContent";
import FormDisabledContent from "../../../components/Form/FormDisabledContent";
import {
    FORM_DISABLED,
    FORM_DISABLED_ON_DATE,
    FORM_DISABLED_ON_SUBMISSION_LIMIT,
    getApiImagePath
} from "../../../utils/helpers";

const SingleFormPage = () => {
    const router = useRouter();
    const {id: formId} = router.query;

    const [form, setForm] = useState({});
    const [content, setContent] = useState('');
    const [confirmStatus, setConfirmStatus] = useState(false);

    // Fetch Form Data
    useEffect(() => {
        if (formId) {
            fetchGuestForm(formId).then((response) => {
                if (response?.data) {
                    setForm(response.data);
                }
            });
        }
    }, [formId]);

    // Conditional Contents
    useEffect(() => {
        if (form?.status == FORM_DISABLED) {
            setContent(
                <FormDisabledContent
                    warningMessage={form?.warning_message}
                />
            );
        } else if (form?.status == FORM_DISABLED_ON_DATE) {
            setContent(
                <FormDisabledContent
                    warningMessage={form?.warning_message}
                    expiryDate={form?.expiry_date}
                    expiryTime={form?.expiry_time}
                />
            );
        } else if (form?.status == FORM_DISABLED_ON_SUBMISSION_LIMIT &&
            form?.submissions_count >= form?.submission_limit) {
            setContent(
                <FormDisabledContent
                    warningMessage={form?.warning_message}
                    submissionLimit={form?.submission_limit}
                />
            );
        } else if (confirmStatus) {
            setContent(
                <FormThankYouContent
                    content={form?.thank_you_page_content}
                />
            );
        } else {
            setContent(
                <RenderSingleForm
                    form={form}
                    setConfirmStatus={setConfirmStatus}
                />
            );
        }
    }, [form, confirmStatus]);

    return (
        <FormViewLayout>
            <Head>
                <title>{form?.title ?? 'Form'}</title>
            </Head>

            {form?.stylesheet_link && (
                <link rel="stylesheet" href={form?.stylesheet_link}/>
            )}

            <div className="form">
                <div className="render-form">
                    {/*Contents*/}
                    <div className="row justify-content-center">
                        <div className="col-sm-12 col-md-12 col-lg-8 col-xl-7 col-xxl-6 mb-4">

                            {/*Logo*/}
                            <div className="row">
                                <div className="col-12">
                                    <div className="logo mb-2" style={{textAlign: form?.logo?.alignment || 'center'}}>
                                        <div className="logo-inner">
                                            <img src={getApiImagePath(form?.logo?.path)}
                                                 width={form?.logo?.size ? form.logo.size + 'px' : '120px'} alt="logo"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {content}

                        </div>
                    </div>
                </div>
            </div>
        </FormViewLayout>
    )
}

export default SingleFormPage;
