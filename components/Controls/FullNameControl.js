import React, {useEffect, useState} from "react";
import InputError from "../Common/InputError";
import {validate} from "../../utils/validate";

const FullNameControl = ({qid, properties, errors, submission, onChange, onError, isEditable}) => {

    const [btColumnSize, setBtColumnSize] = useState('col-md-8');
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
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

        if (properties?.showMiddleName === 'Yes') {
            myValues['middleName'] = ''
            setValues(myValues);
        }

        if (properties?.showPrefix === 'Yes') {
            myValues['prefix'] = ''
            setValues(myValues);
        }

        if (properties?.showMiddleName === 'Yes' && properties?.showPrefix === 'Yes') {
            setBtColumnSize('col-md-12');
        } else {
            setBtColumnSize('col-md-8');
        }

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
                            {properties?.showPrefix === 'Yes' && properties?.prefixMode === 'Dropdown' && (
                                <div className="col-sm-6">
                                    <select
                                        name={`input_${qid}['prefix]`}
                                        id={`input_${qid}-prefix`}
                                        className="form-select prefix"
                                        required={properties?.required === 'Yes'}
                                        value={values?.prefix ?? ''}
                                        onChange={(event) => handleChange(event, properties?.['type'], 'prefix', event.target.value)}
                                    >
                                        <option value="">Select</option>
                                        {properties?.prefixOptions && properties?.prefixOptions.map((prefix, index) => {
                                            return <option key={index} value={prefix}>{prefix}</option>
                                        })}
                                    </select>
                                    <label htmlFor={`input_${qid}-prefix`} id={`sub-label_${qid}-prefix`}
                                           className="form-label">
                                        {properties?.subLabels?.prefix}
                                    </label>
                                </div>
                            )}
                            {properties?.showPrefix === 'Yes' && properties?.prefixMode === 'TextBox' && (
                                <div className="col-sm-6">
                                    <input
                                        type="text"
                                        name={`input_${qid}['prefix]`}
                                        id={`input_${qid}-prefix`}
                                        className="form-control prefix"
                                        placeholder={properties?.placeholders?.prefix ?? ''}
                                        required={properties?.required === 'Yes'}
                                        readOnly={properties?.readOnly === 'Yes'}
                                        value={values?.prefix ?? ''}
                                        onChange={(event) => handleChange(event, properties?.['type'], 'prefix', event.target.value)}
                                    />
                                    <label htmlFor={`input_${qid}-prefix`} id={`sub-label_${qid}-prefix`}
                                           className="form-label">
                                        {properties?.subLabels?.prefix}
                                    </label>
                                </div>
                            )}
                            <div className={`${properties?.prefix === 'Yes' ? 'col-sm-8' : 'col-sm-6'}`}>
                                <input
                                    type="text"
                                    name={`input_${qid}['firstName]`}
                                    id={`input_${qid}-first-name`}
                                    className="form-control first-name"
                                    placeholder={properties?.placeholders?.firstName ?? ''}
                                    required={properties?.required === 'Yes'}
                                    readOnly={properties?.readOnly === 'Yes'}
                                    value={values?.firstName ?? ''}
                                    onChange={(event) => handleChange(event, properties?.['type'], 'firstName', event.target.value)}
                                />
                                <label htmlFor={`input_${qid}-first-name`} id={`sub-label_${qid}-first-name`}
                                       className="form-label">
                                    {properties?.subLabels?.firstName}
                                </label>
                            </div>
                            {properties?.showMiddleName === "Yes" && (
                                <div className="col-sm-6">
                                    <input
                                        type="text"
                                        name={`input_${qid}['middleName]`}
                                        id={`input_${qid}-middle-name`}
                                        className="form-control middle-name"
                                        placeholder={properties?.placeholders?.middleName ?? ''}
                                        required={properties?.required === 'Yes'}
                                        readOnly={properties?.readOnly === 'Yes'}
                                        value={values?.middleName ?? ''}
                                        onChange={(event) => handleChange(event, properties?.['type'], 'middleName', event.target.value)}
                                    />
                                    <label htmlFor={`input_${qid}-middle-name`} id={`sub-label_${qid}-middle-name`}
                                           className="form-label">
                                        {properties?.subLabels?.middleName}
                                    </label>
                                </div>
                            )}
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    name={`input_${qid}['lastName]`}
                                    id={`input_${qid}-last-name`}
                                    className="form-control"
                                    placeholder={properties?.placeholders?.lastName ?? ''}
                                    required={properties?.required === 'Yes'}
                                    readOnly={properties?.readOnly === 'Yes'}
                                    value={values?.lastName ?? ''}
                                    onChange={(event) => handleChange(event, properties?.['type'], 'lastName', event.target.value)}
                                />
                                <label htmlFor={`input_${qid}-last-name`} id={`sub-label_${qid}-last-name`}
                                       className="form-label">
                                    {properties?.subLabels?.lastName}
                                </label>
                            </div>
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

export default FullNameControl;