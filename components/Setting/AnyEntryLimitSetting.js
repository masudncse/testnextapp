import React, {useState} from "react";
import InputError from "../Common/InputError";

export default function AnyEntryLimitSetting({qid, properties, fieldLabel, fieldSubLabel, onChangeProperty, setSyncData}) {

    const [errors, setErrors] = useState({});

    let minLength = properties?.minLength ? parseInt(properties?.minLength) : '';
    let maxLength = properties?.maxLength ? parseInt(properties?.maxLength) : '';

    const handleChange = (event, key, value) => {
        event.preventDefault();
        setErrors({});

        value = parseInt(value);

        onChangeProperty(qid, key, value);
    }

    const handleOnBlur = (event) => {
        event.preventDefault();

        if (_.isEmpty(errors)) {
            setSyncData({
                subject: fieldLabel + " Change"
            });
        }
    }

    return (
        <div className="property-setting-item">
            <div className="row">
                <div className="col-12">
                    <label htmlFor="minLength" className="form-label">
                        {fieldLabel}
                    </label>
                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col-md-6">
                            <input type="number"
                                   value={minLength}
                                   id="minLength"
                                   className={`form-control ${errors.length > 0 ? 'is-invalid' : ''}`}
                                   onChange={(event) => handleChange(event, 'minLength', event.target.value)}
                                   onBlur={(event) => handleOnBlur(event)}
                            />
                            <label htmlFor="minLength" className="form-label">Minimum</label>
                            <InputError messages={errors?.minLength}/>
                        </div>
                        <div className="col-md-6">
                            <input
                                type="number"
                                value={maxLength}
                                id="maxLength"
                                className={`form-control ${errors.length > 0 ? 'is-invalid' : ''}`}
                                onChange={(event) => handleChange(event, 'maxLength', event.target.value)}
                                onBlur={(event) => handleOnBlur(event)}
                            />
                            <label htmlFor="maxLength" className="form-label">Maximum</label>
                            <InputError messages={errors?.maxLength}/>
                        </div>

                        {fieldSubLabel && (<small className="text-xs text-muted">
                            <div className="col-12">
                                {fieldSubLabel}
                            </div>
                        </small>)}
                    </div>
                </div>
            </div>
        </div>
    );
}