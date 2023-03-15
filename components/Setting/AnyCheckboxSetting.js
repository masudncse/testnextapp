import React, {useState} from "react";
import InputError from "../Common/InputError";

export default function RequiredSetting({qid, properties, fieldLabel, fieldSubLabel, keyName, onChangeProperty, setSyncData, fnCallback}) {

    const [errors, setErrors] = useState([]);

    const handleChange = (event, key, checked) => {
        setErrors([]);

        const value = checked ? 'Yes' : 'No';

        onChangeProperty(qid, key, value);

        if (_.isEmpty(errors)) {
            setSyncData({
                subject: fieldLabel + " Change"
            });

            if (_.isFunction(fnCallback)) {
                fnCallback(value);
            }
        }
    }

    return (
        <div className="property-setting-item">
            <div className="row">
                <div className="col-12">
                    <label htmlFor={keyName} className="form-label">
                        {fieldLabel}
                    </label>
                </div>
                <div className="col-12">
                    <div className="form-check form-switch">
                        <input type="checkbox"
                               checked={properties?.[keyName] === 'Yes'}
                               className="form-check-input"
                               id={keyName}
                               onChange={(event) => handleChange(event, keyName, event.target.checked)}
                        />

                        <InputError messages={errors} className={'d-block'}/>
                    </div>

                    {fieldSubLabel && (<small className="text-xs text-muted">
                        {fieldSubLabel}
                    </small>)}
                </div>
            </div>
        </div>
    )
}