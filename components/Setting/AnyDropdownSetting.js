import React, {useState} from "react";
import InputError from "../Common/InputError";
import {useEffectOnce} from "../../utils/hooks/useEffectOnce";

export default function AnyDropdownSetting({qid, properties, options, defaultSelected, fieldLabel, fieldSubLabel, keyName, btColumnSize, onChangeProperty, setSyncData, isRequired}) {

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

    return (
        <div className="property-setting-item">
            <div className="row">
                <div className="col-12">
                    <label htmlFor={keyName} className="form-label">
                        {fieldLabel} {isRequired && (<span className="text-danger">*</span>)}
                    </label>
                </div>
                <div className={btColumnSize ?? 'col-12'}>
                    <select
                        className={`form-select ${errors.length > 0 ? 'is-invalid' : ''}`}
                        value={properties?.[keyName] || defaultSelected}
                        required={properties?.required === 'Yes'}
                        onChange={(event) => handleChange(event, keyName, event.target.value)}
                        onBlur={(event) => handleOnBlur(event, event.target.value)}
                    >
                        <option value="">Select</option>
                        {options && options?.map((option, key) => {
                            return <option key={key} value={option.value}>
                                {option.label}
                            </option>
                        })}
                    </select>
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
