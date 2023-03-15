import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {tostify} from "../../utils/helpers";
import {fetchFormCssStyles, updateFormCssStyles} from "../../services/FormServices";
import {toast} from "react-toastify";

export default function StyleSetting({fieldLabel, fieldSubLabel, setStyles}) {
    const router = useRouter();
    const {id: formId} = router.query;

    const [myStyles, setMyStyles] = useState('');

    // Style Data
    useEffect(() => {
        if (formId) {
            fetchFormCssStyles(formId).then((response) => {
                if (response?.data) {
                    setMyStyles(response.data);
                }
            })
        }
    }, [formId]);

    const handleChange = (event, styles) => {
        event.preventDefault();

        setMyStyles(styles);
    }

    const handleOnBlur = (event) => {
        event.preventDefault();

        updateFormCssStyles(formId, {
            styles: myStyles,
        }).then((response) => {
            if (response?.data?.data) {
                tostify(toast, 'success', response);
                setStyles(response.data.data);
            }
        });
    }

    return (
        <div className="property-setting-item">
            <div className="row">
                <div className="col-12">
                    <label htmlFor="styles" className="form-label">
                        {fieldLabel}
                    </label>
                </div>
                <div className="col-12">
                    <textarea
                        id="styles"
                        className="form-control"
                        rows="20"
                        value={myStyles ?? ''}
                        onChange={(event) => handleChange(event, event.target.value)}
                        onBlur={(event) => handleOnBlur(event)}
                    />

                    {fieldSubLabel && (<small className="text-xs text-muted">
                        {fieldSubLabel}
                    </small>)}
                </div>
            </div>
        </div>
    );
}
