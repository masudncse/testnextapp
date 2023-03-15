import React, {useEffect, useState} from "react";
import InputError from "../Common/InputError";
import {validate} from "../../utils/validate";

const TimeControl = ({qid, properties, errors, submission, onChange, onError, isEditable}) => {

    const [value, setValue] = useState('');

    const handleChange = (event, type, value) => {
        event.preventDefault();

        if (!isEditable) return false;

        onChange(qid, type, value);

        validate(qid, value, properties, (errors) => {
            onError(qid, errors);
        });
    }

    useEffect(() => {
        if (!_.isEmpty(submission?.properties?.[qid]?.value)) {
            setValue(submission.properties[qid].value);
        }
    }, [submission]);

    return (
        <div className="row" id={`id_${qid}`}>
            <div className="col-12" id={`cid_${qid}`}>
                <div className="form-group row mb-0">
                    <label htmlFor={`input_${qid}`} id={`label_${qid}`}
                           className="col-sm-4 form-label mb-0 d-flex align-items-center">
                        {properties?.label}
                        {properties?.required === 'Yes' ? <span className="text-sm text-danger ms-1">*</span> : null}
                    </label>
                    <div className="col-md-8">
                        <input
                            type="time"
                            name={`name_${qid}`}
                            id={`input_${qid}`}
                            className="form-control time"
                            required={properties?.required === 'Yes'}
                            readOnly={properties?.readOnly === 'Yes'}
                            style={{
                                width: properties?.fixedWidth ? properties?.fixedWidth + 'px' : ''
                            }}
                            value={value ?? ''}
                            onChange={(event) => handleChange(event, properties?.['type'], event.target.value)}
                        />

                        {properties?.subLabel && (
                            <p className="sub-label text-sm text-muted mb-0" id={`sub-label_${qid}`}>
                                {properties.subLabel}
                            </p>)}

                        <InputError messages={errors?.[qid]} showFirst={true} className="d-block"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TimeControl;