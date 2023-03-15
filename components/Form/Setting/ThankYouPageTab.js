import React, {useEffect, useState} from "react";
import {Editor} from "@tinymce/tinymce-react";
import {updateForm} from "../../../services/FormServices";
import {tostify} from "../../../utils/helpers";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import {TINYMCE_API_KEY} from "../../../utils/constants";

const ThankYouPageTab = ({active, form, setForm}) => {
    const router = useRouter();
    const {id: formId} = router.query;

    const [actionAfterSubmission, setActionAfterSubmission] = useState('');
    const [thankYouPageContent, setThankYouPageContent] = useState('');
    const [redirectLink, setRedirectLink] = useState('');

    useEffect(() => {
        setActionAfterSubmission(form?.action_after_submission);
        setThankYouPageContent(form?.thank_you_page_content);
        setRedirectLink(form?.redirect_link);
    }, [form]);

    const handleSubmit = (event) => {
        event.preventDefault();

        updateForm(formId, {
            action_after_submission: actionAfterSubmission,
            thank_you_page_content: thankYouPageContent,
            redirect_link: redirectLink,
        }).then((response) => {
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
        <form method="POST" onSubmit={handleSubmit}>
            <div className="row">

                {/*Action After Submission*/}
                <div className="col-12 mb-4">
                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="" className="form-label">
                                Action After Submission
                            </label>
                        </div>
                        <div className="col-md-10">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="thank_you_page"
                                    value="thank_you_page"
                                    checked={(actionAfterSubmission === 'thank_you_page')}
                                    onChange={(event) => setActionAfterSubmission(event.target.value)}
                                />
                                <label className="form-check-label" htmlFor="thank_you_page">
                                    Show "Thank You Page" after submission
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="redirect"
                                    value="redirect"
                                    checked={(actionAfterSubmission === 'redirect')}
                                    onChange={(event) => setActionAfterSubmission(event.target.value)}
                                />
                                <label className="form-check-label" htmlFor="redirect">
                                    Redirect to external link after submission
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/*Thank You Page*/}
                {(actionAfterSubmission === 'thank_you_page') && (
                    <div className="col-12 mb-4">
                        <div className="row">
                            <div className="col-md-12">
                                <label htmlFor="thankYouPageContent" className="form-label">
                                    Thank You Page Content
                                </label>
                            </div>
                            <div className="col-md-10">
                                <Editor
                                    id="thankYouPageContent"
                                    apiKey={TINYMCE_API_KEY}
                                    value={thankYouPageContent}
                                    onEditorChange={(newValue) => setThankYouPageContent(newValue)}
                                    init={{
                                        height: 600,
                                        menubar: true,
                                        plugins: [
                                            'advlist autolink lists link charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar: 'undo redo | formatselect | ' +
                                            'bold italic backcolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                    }}
                                />
                            </div>
                            <div className="col-12">
                                <div className="form-text">
                                    We'll never share your email with anyone else.
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/*Redirect Link*/}
                {(actionAfterSubmission === 'redirect') && (
                    <div className="col-12 mb-4">
                        <div className="row">
                            <div className="col-md-12">
                                <label htmlFor="redirectLink" className="form-label">
                                    Redirect Link
                                </label>
                            </div>
                            <div className="col-md-10">
                                <input type="text" value={redirectLink ?? ''} className="form-control" id="redirectLink"
                                       placeholder="Enter redirect link"
                                       onChange={(event) => setRedirectLink(event.target.value)}/>
                            </div>
                            <div className="col-12">
                                <div className="form-text">
                                    We'll never share your email with anyone else.
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
    )
}

export default ThankYouPageTab;