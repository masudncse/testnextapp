import React, {useState} from "react";
import ControlSwitcher from "../Controls/ControlSwitcher";
import {useRouter} from "next/router";
import {tostify} from "../../utils/helpers";
import {toast} from "react-toastify";
import {saveGuestSubmission} from "../../services/SubmissionServices";
import {validate} from "../../utils/validate";
import {useEffectOnce} from "../../utils/hooks/useEffectOnce";

const RenderSingleForm = ({form, setConfirmStatus}) => {
    const router = useRouter();
    const {id: formId} = router.query;

    const {questions, properties} = form;

    const [errors, setErrors] = useState({});
    const [submission, setSubmission] = useState({
        properties: {}
    });

    // Reset errors
    useEffectOnce(() => {
        setErrors({});
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        let data = {
            form_id: formId,
            properties: submission?.properties
        }

        let myErrors = {...errors};
        questions.forEach((question) => {
            let qid = question.qid;
            let value = data?.properties?.[qid]?.value ?? '';

            validate(qid, value, properties?.[qid], (newErrors) => {
                myErrors = {...myErrors, ...newErrors}

                if (_.isEmpty(newErrors) && myErrors?.[qid]) {
                    delete myErrors[qid];
                }

                setErrors(myErrors);
            });
        });

        if (!_.isEmpty(myErrors)) {
            tostify(toast, 'error', {
                message: 'Invalid form request.'
            });

            setTimeout(() => {
                let el = document.getElementsByClassName('invalid-feedback');
                if (el.length > 0) {
                    el[0].closest('.render-form-item').scrollIntoView();
                }
            })
        }

        if (!_.isUndefined(data.form_id) &&
            !_.isEmpty(data?.properties) &&
            _.isEmpty(myErrors)) {
            saveGuestSubmission(data).then(response => {
                tostify(toast, 'success', response);
                setSubmission({
                    properties: {}
                })
                setErrors({});

                actionAfterSubmission();
            });
        }
    }

    const actionAfterSubmission = () => {
        const {action_after_submission, redirect_link} = form;

        if (action_after_submission === 'redirect') {
            setTimeout(() => {
                location.href = redirect_link;
            }, 2000);
        }

        if (action_after_submission === 'thank_you_page') {
            setConfirmStatus(true);
        }
    }

    const handleOnError = (qid, newErrors = []) => {
        const myErrors = {...errors, ...newErrors};

        if (_.isEmpty(newErrors) && myErrors?.[qid]) {
            delete myErrors[qid];
        }

        setErrors(myErrors);
    }

    const handleOnChange = (qid, type, value) => {
        const mySubmission = {...submission};
        mySubmission.properties[qid] = {
            type,
            value
        }

        setSubmission(mySubmission);
    }

    return (
        <div className="row">
            <div className="col-12">
                <form onSubmit={(event) => handleSubmit(event)} noValidate={true}>
                    <div className="card">
                        <div className="card-body p-3">
                            <div className="row">
                                <div className="col-12 p-4">

                                    {/*Loop on Questions*/}
                                    {!_.isEmpty(questions) &&
                                    questions.map(function (question, key) {
                                        return (
                                            <div key={key}
                                                 className={`render-form-item control-item ${question?.type}`}>

                                                {/*Control Switcher*/}
                                                <ControlSwitcher
                                                    qid={question.qid}
                                                    type={question.type}
                                                    properties={properties?.[question?.qid]}
                                                    errors={errors}
                                                    submission={submission}
                                                    onChange={handleOnChange}
                                                    onError={handleOnError}
                                                    isEditable={true}
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RenderSingleForm;