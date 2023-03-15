import React, {useState} from "react";
import InputError from "../Common/InputError";
import {useEffectOnce} from "../../utils/hooks/useEffectOnce";

/**
 *
 * @param qid
 * @param properties
 * @param fieldLabel
 * @param fieldSubLabel
 * @param keyName
 * @param btColumnSize
 * @param onChangeProperty
 * @param setSyncData
 * @param isRequired
 * @return {*}
 * @constructor
 */
export default function AnyTextSetting({active, qid, properties, fieldLabel, fieldSubLabel, keyName, btColumnSize, onChangeProperty, setSyncData, isRequired}) {

    const [initValue, setInitValue] = useState('');
    const [errors, setErrors] = useState([]);

    useEffectOnce(() => {
        setInitValue(properties?.[keyName]);
    });

    const handleChange = (event, key, value) => {
        event.preventDefault();
        setErrors([]);

        onChangeProperty(qid, key, value);

        if (isRequired && _.isEmpty(value)) {
            setErrors([
                ...errors,
                "This field is required."
            ]);
        }
    }

    const handleOnBlur = (event, newValue) => {
        event.preventDefault();

        if ((initValue !== newValue) && _.isEmpty(errors)) {
            setSyncData({
                subject: `${fieldLabel} Change`
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
                    <label
                        htmlFor={keyName}
                        className="form-label">
                        {fieldLabel} {isRequired && (<span className="text-danger">*</span>)}
                    </label>
                </div>
                <div className={`${btColumnSize ?? 'col-8'}`}>
                    <input type="text"
                           value={properties?.[keyName]}
                           id={keyName}
                           className={`form-control ${errors.length > 0 ? 'is-invalid' : ''}`}
                           onChange={(event) => handleChange(event, keyName, event.target.value)}
                           onBlur={(event) => handleOnBlur(event, event.target.value)}
                    />
                </div>
                <div className="col-12">
                    {fieldSubLabel && (
                        <small className="text-xs text-muted">
                            {fieldSubLabel}
                        </small>
                    )}

                    <InputError messages={errors}/>
                </div>
            </div>
        </div>
    );
}
