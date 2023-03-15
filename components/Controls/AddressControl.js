import React, {useEffect, useState} from "react";
import InputError from "../Common/InputError";
import {validate} from "../../utils/validate";
import {getCountryList} from "../../utils/helpers";

const AddressControl = ({qid, properties, errors, submission, onChange, onError, isEditable}) => {

    const [values, setValues] = useState({
        streetAddress: "",
        streetAddressLine2: "",
        city: "",
        state: "",
        postal: "",
        country: ""
    });

    const handleChange = (event, type, key, value) => {
        event.preventDefault();

        if (!isEditable) return false;

        const newValues = {...values};
        newValues[key] = value;

        setValues(newValues);

        onChange(qid, type, newValues);

        validate(qid, newValues, properties, (errors) => {
            onError(qid, errors);
        });
    }

    useEffect(() => {
        let myValues = {...values};

        if (properties?.showStreetAddress === 'Yes') {
            myValues['streetAddress'] = ''
        } else {
            delete myValues['streetAddress'];
        }

        if (properties?.showStreetAddressLine2 === 'Yes') {
            myValues['streetAddressLine2'] = ''
        } else {
            delete myValues['streetAddressLine2']
        }

        if (properties?.showCity === 'Yes') {
            myValues['city'] = ''
        } else {
            delete myValues['city']
        }

        if (properties?.showState === 'Yes') {
            myValues['state'] = ''
        } else {
            delete myValues['state']
        }

        if (properties?.showPostal === 'Yes') {
            myValues['postal'] = ''
        } else {
            delete myValues['postal']
        }

        if (properties?.showCountry === 'Yes') {
            myValues['country'] = ''
        } else {
            delete myValues['country']
        }

        setValues(myValues);

        if (!_.isEmpty(submission?.properties?.[qid]?.value)) {
            setValues(submission.properties[qid].value);
        }
    }, [properties.showMiddleName, properties.showPrefix, submission]);

    return (
        <div className="row" id={`id_${qid}`}>
            <div className="col-12">
                <div className="form-group row mb-0">
                    <label htmlFor={`input_${qid}`} id={`label_${qid}`}
                           className="col-sm-4 form-label mb-2 d-flex align-items-start mt-2">
                        {properties?.label}
                        {properties?.required === 'Yes' ? <span className="text-sm text-danger ms-1">*</span> : null}
                    </label>
                    <div className="col-md-8" id={`cid_${qid}`}>
                        <div className="row justify-content-between">
                            {properties?.showStreetAddress === "Yes" && (
                                <div className="col-12 mb-3">
                                    <input type="text"
                                           name={`input_${qid}['streetAddress]`}
                                           id={`input_${qid}-street-address`}
                                           className="form-control street-address"
                                           placeholder={properties?.placeholders?.streetAddress ?? ''}
                                           required={properties?.required === 'Yes'}
                                           readOnly={properties?.readOnly === 'Yes'}
                                           value={values?.streetAddress ?? ''}
                                           onChange={(event) => handleChange(event, properties?.['type'], 'streetAddress', event.target.value)}
                                    />
                                    <label htmlFor={`input_${qid}-street-address`}
                                           id={`sub-label_${qid}-street-address`} className="form-label">
                                        {properties?.subLabels?.streetAddress}
                                    </label>
                                </div>
                            )}
                            {properties?.showStreetAddressLine2 === "Yes" && (
                                <div className="col-12 mb-3">
                                    <input type="text"
                                           name={`input_${qid}['streetAddressLine2]`}
                                           id={`input_${qid}-street-address-line-2`}
                                           className="form-control street-address-line-2"
                                           placeholder={properties?.placeholders?.streetAddressLine2 ?? ''}
                                           required={properties?.required === 'Yes'}
                                           readOnly={properties?.readOnly === 'Yes'}
                                           value={values?.streetAddressLine2 ?? ''}
                                           onChange={(event) => handleChange(event, properties?.['type'], 'streetAddressLine2', event.target.value)}
                                    />
                                    <label htmlFor={`input_${qid}-street-address-line-2`}
                                           id={`sub-label_${qid}-street-address-line-2`} className="form-label">
                                        {properties?.subLabels?.streetAddressLine2}
                                    </label>
                                </div>
                            )}
                            {properties?.showCity === "Yes" && (
                                <div className="col-6 mb-3">
                                    <input type="text"
                                           name={`input_${qid}['city]`}
                                           id={`input_${qid}-city`}
                                           className="form-control city"
                                           placeholder={properties?.placeholders?.city ?? ''}
                                           required={properties?.required === 'Yes'}
                                           readOnly={properties?.readOnly === 'Yes'}
                                           value={values?.city ?? ''}
                                           onChange={(event) => handleChange(event, properties?.['type'], 'city', event.target.value)}
                                    />
                                    <label htmlFor={`input_${qid}-city`} id={`sub-label_${qid}-city`}
                                           className="form-label">
                                        {properties?.subLabels?.city}
                                    </label>
                                </div>
                            )}
                            {properties?.showState === "Yes" && (
                                <div className="col-6 mb-3">
                                    <input type="text"
                                           name={`input_${qid}['state]`}
                                           id={`input_${qid}-state`}
                                           className="form-control state"
                                           placeholder={properties?.placeholders?.state ?? ''}
                                           required={properties?.required === 'Yes'}
                                           readOnly={properties?.readOnly === 'Yes'}
                                           value={values?.state ?? ''}
                                           onChange={(event) => handleChange(event, properties?.['type'], 'state', event.target.value)}
                                    />
                                    <label htmlFor={`input_${qid}-state`} id={`sub-label_${qid}-city`}
                                           className="form-label">
                                        {properties?.subLabels?.state}
                                    </label>
                                </div>
                            )}
                            {properties?.showPostal === "Yes" && (
                                <div className="col-6 mb-3">
                                    <input type="text"
                                           name={`input_${qid}['postal]`}
                                           id={`input_${qid}-postal`}
                                           className="form-control postal"
                                           placeholder={properties?.placeholders?.postal ?? ''}
                                           required={properties?.required === 'Yes'}
                                           readOnly={properties?.readOnly === 'Yes'}
                                           value={values?.postal ?? ''}
                                           onChange={(event) => handleChange(event, properties?.['type'], 'postal', event.target.value)}
                                    />
                                    <label htmlFor={`input_${qid}-postal`} id={`sub-label_${qid}-postal`}
                                           className="form-label">
                                        {properties?.subLabels?.postal}
                                    </label>
                                </div>
                            )}
                            {properties?.showCountry === "Yes" && (
                                <div className="col-6 mb-3">
                                    <select
                                        name={`input_${qid}['country]`}
                                        id={`input_${qid}-country`}
                                        className="form-select country"
                                        required={properties?.required === 'Yes'}
                                        value={values?.country ?? ''}
                                        onChange={(event) => handleChange(event, properties?.['type'], 'country', event.target.value)}
                                    >
                                        <option value="">Select</option>
                                        {getCountryList().map((country, index) => {
                                            return <option key={index} value={country?.name}>
                                                {country?.name}
                                            </option>
                                        })}
                                    </select>
                                    <label htmlFor={`input_${qid}-country`} id={`sub-label_${qid}-city`}
                                           className="form-label">
                                        {properties?.subLabels?.country}
                                    </label>
                                </div>
                            )}

                            <div className="col-12">
                                <InputError messages={errors?.[qid]} showFirst={true} className="d-block"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddressControl;