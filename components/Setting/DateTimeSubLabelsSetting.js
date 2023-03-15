import React, {useEffect, useState} from "react";
import InputError from "../Common/InputError";

export default function DateTimeSubLabelsSetting({qid, properties, fieldLabel, fieldSubLabel, keyName, onChangeProperty, setSyncData, isRequired}) {

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (properties?.[keyName]) {
            return setValues(properties?.[keyName]);
        }
    }, [properties?.[keyName]]);

    const handleChange = (event, key, value) => {
        event.preventDefault();
        setErrors([]);

        const newValues = {...values};
        newValues[key] = value;

        setValues(newValues)

        onChangeProperty(qid, keyName, newValues);

        if (isRequired) {
            for (let value of Object.values(newValues)) {
                if (_.isEmpty(value)) {
                    setErrors([
                        "The fields are required."
                    ]);
                    break;
                }
            }
        }
    }

    const handleOnBlur = (event, newValue) => {
        event.preventDefault();

        if (_.isEmpty(errors)) {
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
                <div className="col-12">
                    <table className="table mb-0">
                        <tbody>
                        {(properties?.showPickerType === 'Date' || properties?.showPickerType === 'Both') && (
                            <tr>
                                <td className="align-middle form-label">
                                    Date
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        value={properties?.[keyName]['date'] ?? ''}
                                        onChange={(event) => handleChange(event, 'date', event.target.value)}
                                        onBlur={(event) => handleOnBlur(event, event.target.value)}
                                    />
                                </td>
                            </tr>
                        )}
                        {(properties?.showPickerType === 'Time' || properties?.showPickerType === 'Both') && (
                            <tr>
                                <td className="align-middle form-label">
                                    Time
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        value={properties?.[keyName]['time'] ?? ''}
                                        onChange={(event) => handleChange(event, 'time', event.target.value)}
                                        onBlur={(event) => handleOnBlur(event, event.target.value)}
                                    />
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>

                    {fieldSubLabel && (
                        <small className="text-xs text-muted">
                            {fieldSubLabel}
                        </small>
                    )}

                    <InputError messages={errors} className="d-block"/>
                </div>
            </div>
        </div>
    );
}
