import React, {useState} from "react";
import InputError from "../Common/InputError";

const DropdownOptionSetting = ({qid, properties, onChangeProperty, setSyncData, isRequired}) => {

    const [errors, setErrors] = useState([]);

    const handleChange = (event, key, value) => {
        event.preventDefault();
        setErrors([]);

        value = value.split('\n');
        onChangeProperty(qid, key, value);

        if (isRequired &&
            _.isArray(value) &&
            _.isEmpty(value[0])) {
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
                subject: "Change Options"
            });
        }
    }

    return (
        <div className="property-setting-item">
            <div className="row">
                <div className="col-12">
                    <label
                        htmlFor="options"
                        className="form-label">
                        Options {isRequired && (<span className="text-danger">*</span>)}
                    </label>
                </div>
                <div className="col-8">
                    <textarea
                        className={`form-control ${errors.length > 0 ? 'is-invalid' : ''}`}
                        id="options"
                        rows="5"
                        placeholder="Write some options"
                        value={properties?.options.join('\r\n')}
                        onChange={(event) => handleChange(event, 'options', event.target.value)}
                        onBlur={(event) => handleOnBlur(event)}
                    />
                    <small className="text-xs text-muted">
                        Enter each option on a new line.
                    </small>
                    <InputError messages={errors}/>
                </div>
            </div>
        </div>
    );
}

export default DropdownOptionSetting;
