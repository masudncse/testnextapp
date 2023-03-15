import React, {useEffect, useState} from "react";
import {
    FORM_DISABLED,
    FORM_DISABLED_ON_DATE,
    FORM_DISABLED_ON_SUBMISSION_LIMIT,
    FORM_ENABLED
} from "../../utils/helpers";

const FormStatus = ({status}) => {
    const [text, setText] = useState('')
    const [cssClass, setCssClass] = useState('')

    useEffect(() => {
        if (status == FORM_ENABLED) {
            setText("Enabled")
            setCssClass("bg-gradient-success")
        } else if (status == FORM_DISABLED) {
            setText("Disabled")
            setCssClass("bg-gradient-danger")
        } else if (status == FORM_DISABLED_ON_DATE) {
            setText("Disable on Date")
            setCssClass("bg-gradient-danger")
        } else if (status == FORM_DISABLED_ON_SUBMISSION_LIMIT) {
            setText("Disable on Submission Limit")
            setCssClass("bg-gradient-danger")
        }
    }, [status]);

    return (
        <span className={`badge badge-sm ${cssClass}`}>{text}</span>
    )
}

export default FormStatus;