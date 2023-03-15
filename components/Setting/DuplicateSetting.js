import React from "react";
import {fetchForm} from "../../services/FormServices";
import {useRouter} from "next/router";
import {makeRandomString, tostify} from "../../utils/helpers";
import {toast} from "react-toastify";

export default function DuplicateSetting({qid, fieldLabel, fieldSubLabel, setForm, setSyncData, setControlSettings}) {
    const router = useRouter();
    const {id: formId} = router.query;

    const handleDuplicate = async (event, qid) => {
        event.preventDefault();

        const newQid = makeRandomString();

        let response = await fetchForm(formId);
        let formData = response.data;

        let position = ''
        let copyQuestion = {};
        let copyProperties = {};

        formData.questions.forEach((item, key) => {
            if (item.qid == qid) {
                position = key;
                copyQuestion = item;
            }
        });

        copyProperties = formData.properties[qid];


        let myForm = {...formData};
        myForm.questions = [...myForm.questions, {
            ...copyQuestion,
            qid: newQid
        }];

        myForm.properties[newQid] = copyProperties;

        setForm(myForm);

        setControlSettings({});

        setTimeout(() => {
            setSyncData({
                subject: "Duplication Change"
            });
        }, 1000);

        tostify(toast, 'success', {
            'message': 'Duplicate is successful.'
        });
    }

    return (
        <div className="property-setting-item">
            <div className="row">
                <div className="col-12">
                    <label className="form-label">
                        {fieldLabel}
                    </label>
                </div>
                <div className='col-6'>
                    <button className="btn btn-dark mb-0" onClick={(event) => handleDuplicate(event, qid)}>
                        <i className='fa fa-copy me-2'/> Duplicate
                    </button>
                </div>
                <div className="col-12">
                    {fieldSubLabel && (
                        <small className="text-xs text-muted">
                            {fieldSubLabel}
                        </small>
                    )}
                </div>
            </div>
        </div>
    );
}
