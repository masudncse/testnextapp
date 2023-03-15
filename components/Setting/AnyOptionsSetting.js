import React, {useState} from "react";
import InputError from "../Common/InputError";

const AnyOptionsSetting = ({show, qid, properties, fieldLabel, fieldSubLabel, keyName, onChangeProperty, setSyncData, isRequired}) => {

    const [errors, setErrors] = useState([]);

    const handleChange = (event, key, value) => {
        event.preventDefault();
        setErrors([]);

        value = value.split('\n');
        onChangeProperty(qid, key, value);

        if (isRequired && _.isArray(value) && _.isEmpty(value[0])) {
            setErrors([
                ...errors,
                "This field is required."
            ]);
        }
    }

    const handleOnBlur = (event) => {
        event.preventDefault();

        if (_.isEmpty(errors)) {
            setSyncData({
                subject: fieldLabel + " Options"
            });
        }
    }

    if (!show) {
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
                <div className="col-12">
                    <textarea
                        className={`form-control ${errors.length > 0 ? 'is-invalid' : ''}`}
                        id={keyName}
                        rows="5"
                        placeholder="Write some options"
                        value={properties?.[keyName].join('\r\n')}
                        onChange={(event) => handleChange(event, keyName, event.target.value)}
                        onBlur={(event) => handleOnBlur(event)}
                    />

                    {fieldSubLabel && (<small className="text-xs text-muted">
                        {fieldSubLabel}
                    </small>)}

                    <InputError messages={errors}/>
                </div>
            </div>
        </div>
    );
}

export default AnyOptionsSetting;
