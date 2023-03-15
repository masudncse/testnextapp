import React, {useEffect, useState} from "react";
import InputError from "../Common/InputError";
import {Collapse} from "react-bootstrap";

export default function FullnameSubLabelsSetting({qid, properties, fieldLabel, fieldSubLabel, keyName, onChangeProperty, setSyncData, isRequired}) {

    const [open, setOpen] = useState(true);
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
                    <label htmlFor={keyName} className="form-label d-block cursor-pointer"
                           onClick={() => setOpen(!open)}>
                        {fieldLabel} {isRequired && (<span className="text-danger">*</span>)}
                        <i className={`fa fa-chevron-${open ? 'up' : 'down'} float-end`}/>
                    </label>
                </div>
                <div className="col-12">
                    <Collapse in={open}>
                        <table className="table mb-0">
                            <tbody>
                            {(properties?.showPrefix === 'Yes') && (
                                <tr>
                                    <td className="align-middle form-label">
                                        Prefix
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            value={properties?.[keyName]['prefix'] ?? ''}
                                            onChange={(event) => handleChange(event, 'prefix', event.target.value)}
                                            onBlur={(event) => handleOnBlur(event, event.target.value)}
                                        />
                                    </td>
                                </tr>
                            )}
                            <tr>
                                <td className="align-middle form-label">
                                    First Name
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        value={properties?.[keyName]['firstName'] ?? ''}
                                        onChange={(event) => handleChange(event, 'firstName', event.target.value)}
                                        onBlur={(event) => handleOnBlur(event, event.target.value)}
                                    />
                                </td>
                            </tr>
                            {(properties?.showMiddleName === 'Yes') && (
                                <tr>
                                    <td className="align-middle form-label">
                                        Middle Name
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            value={properties?.[keyName]['middleName'] ?? ''}
                                            onChange={(event) => handleChange(event, 'middleName', event.target.value)}
                                            onBlur={(event) => handleOnBlur(event, event.target.value)}
                                        />
                                    </td>
                                </tr>
                            )}
                            <tr>
                                <td className="align-middle form-label">
                                    Last Name
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        value={properties?.[keyName]['lastName'] ?? ''}
                                        onChange={(event) => handleChange(event, 'lastName', event.target.value)}
                                        onBlur={(event) => handleOnBlur(event, event.target.value)}
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </Collapse>

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
