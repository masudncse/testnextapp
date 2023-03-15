import React, {useEffect, useState} from "react";
import InputError from "../Common/InputError";
import {Collapse} from "react-bootstrap";

export default function AddressPlaceholdersSetting({qid, properties, fieldLabel, fieldSubLabel, keyName, onChangeProperty, setSyncData, isRequired}) {

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
                            {(properties?.showStreetAddress === 'Yes') && (
                                <tr>
                                    <td className="align-middle form-label">
                                        Street Address
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            value={properties?.[keyName]['streetAddress'] ?? ''}
                                            onChange={(event) => handleChange(event, 'streetAddress', event.target.value)}
                                            onBlur={(event) => handleOnBlur(event, event.target.value)}
                                        />
                                    </td>
                                </tr>
                            )}
                            {(properties?.showStreetAddressLine2 === 'Yes') && (
                                <tr>
                                    <td className="align-middle form-label">
                                        Street Address Line 2
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            value={properties?.[keyName]['streetAddressLine2'] ?? ''}
                                            onChange={(event) => handleChange(event, 'streetAddressLine2', event.target.value)}
                                            onBlur={(event) => handleOnBlur(event, event.target.value)}
                                        />
                                    </td>
                                </tr>
                            )}
                            {(properties?.showCity === 'Yes') && (
                                <tr>
                                    <td className="align-middle form-label">
                                        City
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            value={properties?.[keyName]['city'] ?? ''}
                                            onChange={(event) => handleChange(event, 'city', event.target.value)}
                                            onBlur={(event) => handleOnBlur(event, event.target.value)}
                                        />
                                    </td>
                                </tr>
                            )}
                            {(properties?.showState === 'Yes') && (
                                <tr>
                                    <td className="align-middle form-label">
                                        State
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            value={properties?.[keyName]['state'] ?? ''}
                                            onChange={(event) => handleChange(event, 'state', event.target.value)}
                                            onBlur={(event) => handleOnBlur(event, event.target.value)}
                                        />
                                    </td>
                                </tr>
                            )}
                            {(properties?.showPostal === 'Yes') && (
                                <tr>
                                    <td className="align-middle form-label">
                                        Postal
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            value={properties?.[keyName]['postal'] ?? ''}
                                            onChange={(event) => handleChange(event, 'postal', event.target.value)}
                                            onBlur={(event) => handleOnBlur(event, event.target.value)}
                                        />
                                    </td>
                                </tr>
                            )}
                            {(properties?.showCountry === 'Yes') && (
                                <tr>
                                    <td className="align-middle form-label">
                                        Country
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            value={properties?.[keyName]['country'] ?? ''}
                                            onChange={(event) => handleChange(event, 'country', event.target.value)}
                                            onBlur={(event) => handleOnBlur(event, event.target.value)}
                                        />
                                    </td>
                                </tr>
                            )}

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
