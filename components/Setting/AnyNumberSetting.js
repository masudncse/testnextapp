import React, {useState} from "react";
import InputError from "../Common/InputError";

export default function AnyNumberSetting({active, qid, properties, fieldLabel, fieldSubLabel, keyName, btColumnSize, onChangeProperty, setSyncData}) {

    const [errors, setErrors] = useState([]);

    const handleChange = (event, key, value) => {
        event.preventDefault();
        setErrors([]);

        value = parseInt(value);

        onChangeProperty(qid, key, value);
    }

    const handleOnBlur = (event) => {
        event.preventDefault();

        if (_.isEmpty(errors)) {
            setSyncData({
                subject: keyName + " Change"
            });
        }
    }

    if (!active) {
        return null;
    }

    return (
        <div className="property-setting-item">
            <div className="row">
                <div className="col-12">
                    <label htmlFor={keyName} className="form-label">
                        {fieldLabel}
                    </label>
                </div>
                <div className={`${btColumnSize ?? 'col-10'}`}>
                    <input
                        type="number"
                        value={properties?.[keyName] ? parseInt(properties?.[keyName]) : ''}
                        id={keyName}
                        className={`form-control ${errors.length > 0 ? 'is-invalid' : ''}`}
                        onChange={(event) => handleChange(event, keyName, event.target.value)}
                        onBlur={(event) => handleOnBlur(event)}
                    />
                </div>
                <div className="col-12">
                    {fieldSubLabel && (<small className="text-xs text-muted">
                        {fieldSubLabel}
                    </small>)}

                    <InputError messages={errors}/>
                </div>
            </div>
        </div>
    );
}