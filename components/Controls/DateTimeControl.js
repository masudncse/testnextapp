import React, {useEffect, useState} from "react";
import InputError from "../Common/InputError";
import {validate} from "../../utils/validate";

const DateTimeControl = ({qid, properties, errors, submission, onChange, onError, isEditable}) => {

    const [values, setValues] = useState({
        date: '',
        time: '',
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

        if (properties?.showPickerType === 'Date' || properties?.showPickerType === 'Both') {
            myValues['date'] = ''
            setValues(myValues);
        } else {
            delete myValues['date']
            setValues(myValues);
        }

        if (properties?.showPickerType === 'Time' || properties?.showPickerType === 'Both') {
            myValues['time'] = ''
            setValues(myValues);
        } else {
            delete myValues['time'];
            setValues(myValues);
        }

        if (!_.isEmpty(submission?.properties?.[qid]?.value)) {
            setValues(submission.properties[qid].value);
        }
    }, [properties.showPickerType, submission]);

    return (
        <div className="row" id={`id_${qid}`}>
            <div className="col-12">
                <div className="form-group row mb-0">
                    <label htmlFor={`input_${qid}`} id={`label_${qid}`}
                           className="col-sm-4 form-label mb-0 d-flex align-items-center">
                        {properties?.label}
                        {properties?.required === 'Yes' ? <span className="text-sm text-danger ms-1">*</span> : null}
                    </label>
                    <div className="col-md-8">
                        <div className="row justify-content-between">
                            {(properties?.showPickerType === 'Date' || properties?.showPickerType === "Both") && (
                                <div className="col">
                                    <input type="date"
                                           name={`input_${qid}['date]`}
                                           id={`input_${qid}-date`}
                                           className="form-control date"
                                           required={properties?.required === 'Yes'}
                                           readOnly={properties?.readOnly === 'Yes'}
                                           style={{
                                               width: properties?.fixedWidth ? properties?.fixedWidth + 'px' : ''
                                           }}
                                           value={values?.date ?? ''}
                                           onChange={(event) => handleChange(event, properties?.['type'], 'date', event.target.value)}
                                    />
                                    <label htmlFor={`input_${qid}-date`} id={`sub-label_${qid}-date`}
                                           className="form-label">
                                        {properties?.subLabels?.date}
                                    </label>
                                </div>
                            )}
                            {(properties?.showPickerType === "Time" || properties?.showPickerType === "Both") && (
                                <div className="col">
                                    <input type="time"
                                           name={`input_${qid}['time]`}
                                           id={`input_${qid}-time`}
                                           className="form-control time"
                                           required={properties?.required === 'Yes'}
                                           readOnly={properties?.readOnly === 'Yes'}
                                           style={{
                                               width: properties?.fixedWidth ? properties?.fixedWidth + 'px' : ''
                                           }}
                                           value={values?.time ?? ''}
                                           onChange={(event) => handleChange(event, properties?.['type'], 'time', event.target.value)}
                                    />
                                    <label htmlFor={`input_${qid}-time`} id={`sub-label_${qid}-time`}
                                           className="form-label">
                                        {properties?.subLabels?.time}
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

export default DateTimeControl;