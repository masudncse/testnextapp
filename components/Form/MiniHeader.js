import React, {useEffect, useState} from "react";
import moment from "moment";
import {useRouter} from "next/router";
import {tostify} from "../../utils/helpers";
import {toast} from "react-toastify";
import {updateForm} from "../../services/FormServices";

const MiniHeader = ({form, setForm}) => {
    const router = useRouter();
    const {id: formId} = router.query

    const [title, setTitle] = useState('');
    const [updatedAt, setUpdatedAt] = useState('');

    useEffect(() => {
        setTitle(form.title);
        setUpdatedAt(form.updated_at);
    }, [form]);

    const handleChangeNewTitle = (event, newTitle) => {
        event.preventDefault();

        newTitle = newTitle.trim();

        if (_.isEmpty(newTitle)) {
            return tostify(toast, 'warning', {
                message: "Title can't be empty."
            });
        }

        if (title !== newTitle) {
            updateForm(formId, {
                title: newTitle,
                subject: "Change Title",
            }).then((response) => {
                if (response?.data?.status) {
                    tostify(toast, 'success', response);

                    if (response?.data?.data) {
                        setForm(response.data.data);
                    }
                }
            });
        }
    }

    return (
        <div className="border rounded-3 py-2 px-3">
            <div className="row align-items-center">
                <div className="col-6">
                    <h5 className="text-lg text-primary mb-0" contentEditable={true}
                        onBlur={(event) => handleChangeNewTitle(event, event.currentTarget.textContent)}
                        suppressContentEditableWarning={true}>
                        {title ?? '-'}
                    </h5>
                    <p className="text-sm mb-0">
                        {updatedAt && moment(updatedAt).format("DD MMM, YYYY hh:mm:ss A")}
                    </p>
                </div>
                <div className="col-6 d-flex justify-content-end align-items-center">
                    <button type="button" className="btn btn-primary btn-sm mb-0 me-2"
                            onClick={() => router.push(`/form/${formId}/build`)}>
                        Builder
                    </button>
                    <button type="button" className="btn btn-warning btn-sm mb-0 me-2"
                            onClick={() => router.push(`/form/${formId}/setting`)}>
                        Setting
                    </button>
                    <button type="button" className="btn btn-success btn-sm mb-0 me-2"
                            onClick={() => router.push(`/form/${formId}/publish`)}>
                        Publish
                    </button>
                    <button type="button" className="btn btn-linkedin btn-sm mb-0"
                            onClick={() => router.push(`/form/${formId}/history`)}>
                        Revision History
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MiniHeader;