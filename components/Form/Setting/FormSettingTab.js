import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {updateForm} from "../../../services/FormServices";
import {
    FORM_DISABLED_ON_DATE,
    FORM_DISABLED_ON_SUBMISSION_LIMIT,
    FORM_ENABLED,
    getFormStatusList,
    tostify
} from "../../../utils/helpers";
import {toast} from "react-toastify";

const FormSettingTab = ({active, form, setForm}) => {
    const router = useRouter();
    const {id: formId} = router.query;

    /*const logoRef = useRef('');*/

    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [warningMessage, setWarningMessage] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [expiryTime, setExpiryTime] = useState('');
    const [submissionLimit, setSubmissionLimit] = useState('');

    // Populate
    useEffect(() => {
        setTitle(form?.title);
        setStatus(form?.status);
        setWarningMessage(form?.warning_message ?? 'This form is currently unavailable!');
        setExpiryDate(form?.expiry_date);
        setExpiryTime(form?.expiry_time);
        setSubmissionLimit(form?.submission_limit ?? 1000);
    }, [form])

    const handleSubmit = (event) => {
        event.preventDefault();

        let formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('title', title);
        formData.append('status', status);
        formData.append('warning_message', '');
        formData.append('expiry_date', '');
        formData.append('expiry_time', '');
        formData.append('submission_limit', '');

        if (status != FORM_ENABLED) {
            formData.append('warning_message', warningMessage);
        }
        if (status == FORM_DISABLED_ON_DATE) {
            formData.append('expiry_date', expiryDate);
            formData.append('expiry_time', expiryTime);
        }
        if (status == FORM_DISABLED_ON_SUBMISSION_LIMIT) {
            formData.append('submission_limit', submissionLimit);
        }

        updateForm(formId, formData).then((response) => {
            if (response?.data) {
                tostify(toast, 'success', response);

                if (response?.data?.data) {
                    setForm(response.data.data);
                }
            }
        })
    }

    if (!active) {
        return null;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                {/*Form Title*/}
                <div className="col-12 mb-4">
                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="formTitle" className="form-label">
                                Form Title
                            </label>
                        </div>
                        <div className="col-md-6">
                            <input type="text" value={title ?? ''} className="form-control" id="formTitle"
                                   onChange={(event) => setTitle(event.target.value)}/>
                        </div>
                        <div className="col-12">
                            <div className="form-text">
                                We'll never share your email with anyone else.
                            </div>
                        </div>
                    </div>
                </div>

                {/*Form FormStatus*/}
                <div className="col-12 mb-4">
                    <div className="row">

                        {/*Form Status*/}
                        <div className="col-12">
                            <div className="row">
                                <div className="col-md-12">
                                    <label htmlFor="" className="form-label">
                                        Form Status
                                    </label>
                                </div>
                                <div className="col-md-2 mb-4">
                                    <select className="form-select" value={status ?? ''}
                                            onChange={(event) => setStatus(event.target.value)}>
                                        {getFormStatusList().map((item, index) => {
                                            return <option key={index} value={item.value}>{item.text}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 ps-5">
                            <div className="row">

                                {/*Warning Message*/}
                                {status != FORM_ENABLED && (
                                    <div className="col-12 mb-4">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <label htmlFor="warningMessage" className="form-label">
                                                    Warning Message
                                                </label>
                                            </div>
                                            <div className="col-md-5">
                                                <input type="text" value={warningMessage ?? ''} className="form-control"
                                                       id="warningMessage"
                                                       onChange={(event) => setWarningMessage(event.target.value)}/>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-text">
                                                    Write an warning message to show client.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/*Expiry Date && Expiry Time*/}
                                {status == FORM_DISABLED_ON_DATE && (
                                    <div className="col-12 mb-4">
                                        <div className="row">
                                            <div className="col-3">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <label htmlFor="expiryDate" className="form-label">
                                                            Expiry Date
                                                        </label>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <input type="date" value={expiryDate ?? ''}
                                                               className="form-control" id="expiryDate"
                                                               onChange={(event) => setExpiryDate(event.target.value)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-2">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <label htmlFor="expiryTime" className="form-label">
                                                            Expiry Time
                                                        </label>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <input type="time" value={expiryTime ?? ''}
                                                               className="form-control" id="expiryTime"
                                                               onChange={(event) => setExpiryTime(event.target.value)}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/*Submission Limit*/}
                                {status == FORM_DISABLED_ON_SUBMISSION_LIMIT && (
                                    <div className="col-12 mb-4">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <label htmlFor="submissionLimit" className="form-label">
                                                    Submission Limit
                                                </label>
                                            </div>
                                            <div className="col-md-3">
                                                <input type="text" value={submissionLimit ?? ''}
                                                       className="form-control" id="submissionLimit"
                                                       onChange={(event) => setSubmissionLimit(event.target.value)}/>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-text">
                                                    Limit the number of total submissions (e.g. 1000)
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </div>
        </form>
    )
}

export default FormSettingTab;