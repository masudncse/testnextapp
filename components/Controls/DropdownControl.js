import React, {useState} from "react";
import InputError from "../Common/InputError";
import {useEffectOnce} from "../../utils/hooks/useEffectOnce";
import {validate} from "../../utils/validate";

const DropdownControl = ({qid, properties, errors, submission, onChange, onError, isEditable}) => {

    const [value, setValue] = useState('');

    const handleChange = (event, type, value) => {
        event.preventDefault();

        if (!isEditable) return false;

        setValue(value);

        onChange(qid, type, value);

        validate(qid, value, properties, (errors) => {
            onError(qid, errors);
        });
    }

    useEffectOnce(() => {
        if (!_.isEmpty(submission?.properties?.[qid]?.value)) {
            setValue(submission.properties[qid].value);
        } else if (properties?.defaultSelected) {
            setValue(properties.defaultSelected);
        }
    });

    return (
        <div className="row" id={`id_${qid}`}>
            <div className="col-12">
                <div className="form-group row mb-0">
                    <label htmlFor={`input_${qid}`} id={`label_${qid}`}
                           className="col-sm-4 form-label mb-0 d-flex align-items-center">
                        {properties?.label}
                        {properties?.required === 'Yes' ? <span className="text-sm text-danger ms-1">*</span> : null}
                    </label>
                    <div className="col-sm-8" id={`cid_${qid}`}>
                        <select
                            name={`name_${qid}`}
                            id={`input_${qid}`}
                            className={`form-select select ${errors?.[qid]?.length > 0 ? 'is-invalid' : ''}`}
                            style={{
                                width: properties?.fixedWidth ? properties?.fixedWidth + 'px' : ''
                            }}
                            value={value}
                            required={properties?.required === 'Yes'}
                            onChange={(event) => handleChange(event, properties['type'], event.target.value)}
                        >
                            <option value="">{properties?.emptyOptionText}</option>
                            {
                                properties?.options &&
                                properties?.options.length > 0 &&
                                properties?.options?.map((option, key) => {
                                    return <option key={key} value={option}>{option}</option>
                                })
                            }
                        </select>

                        {/*Sub Label Setting Text*/}
                        {properties?.subLabel && (
                            <p className="sub-label text-sm text-muted mb-0" id={`sub-label_${qid}`}>
                                {properties.subLabel}
                            </p>)}

                        <InputError messages={errors?.[qid]} showFirst={true}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DropdownControl;