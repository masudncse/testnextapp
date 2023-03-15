import React, {useState} from "react";
import InputError from "../Common/InputError";
import {Collapse} from "react-bootstrap";

export default function AddressFieldsToggleSetting({qid, properties, fieldLabel, fieldSubLabel, keyName, onChangeProperty, setSyncData, isRequired}) {

    const [open, setOpen] = useState(true);
    const [errors, setErrors] = useState([]);

    const handleChange = (event, key, checked) => {
        setErrors([]);

        const value = checked ? 'Yes' : 'No';

        onChangeProperty(qid, key, value);

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
                    <label className="form-label d-block cursor-pointer"
                           onClick={() => setOpen(!open)}>
                        {fieldLabel}
                        <i className={`fa fa-chevron-${open ? 'up' : 'down'} float-end`}/>
                    </label>
                </div>
                <div className="col-12">
                    <Collapse in={open}>
                        <div className="">
                            <div className="d-flex flex-wrap">
                                <div className="form-check me-3 mb-2">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="showStreetAddress"
                                        checked={properties?.['showStreetAddress'] === 'Yes'}
                                        onChange={(event) => handleChange(event, "showStreetAddress", event.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="showStreetAddress">
                                        Street Address
                                    </label>
                                </div>
                                <div className="form-check me-3 mb-2">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="showStreetAddressLine2"
                                        checked={properties?.['showStreetAddressLine2'] === 'Yes'}
                                        onChange={(event) => handleChange(event, "showStreetAddressLine2", event.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="showStreetAddressLine2">
                                        Street Address Line 2
                                    </label>
                                </div>
                                <div className="form-check me-3 mb-2">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="showCity"
                                        checked={properties?.['showCity'] === 'Yes'}
                                        onChange={(event) => handleChange(event, "showCity", event.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="showCity">
                                        City
                                    </label>
                                </div>
                                <div className="form-check me-3 mb-2">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="showState"
                                        checked={properties?.['showState'] === 'Yes'}
                                        onChange={(event) => handleChange(event, "showState", event.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="showState">
                                        State
                                    </label>
                                </div>
                                <div className="form-check me-3 mb-2">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="showPostal"
                                        checked={properties?.['showPostal'] === 'Yes'}
                                        onChange={(event) => handleChange(event, "showPostal", event.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="showPostal">
                                        Postal/Zip Code
                                    </label>
                                </div>
                                <div className="form-check me-3 mb-2">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="showCountry"
                                        checked={properties?.['showCountry'] === 'Yes'}
                                        onChange={(event) => handleChange(event, "showCountry", event.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="showCountry">
                                        Country
                                    </label>
                                </div>
                            </div>
                        </div>
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
