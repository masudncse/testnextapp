import React, {useState} from "react";
import InputError from "../Common/InputError";
import {useEffectOnce} from "../../utils/hooks/useEffectOnce";
import {validate} from "../../utils/validate";

const PhoneControl = ({qid, properties, errors, submission, onChange, onError, isEditable}) => {
    const minLength = properties?.minLength ? parseInt(properties.minLength) : null;
    const maxLength = properties?.maxLength ? parseInt(properties.maxLength) : null;

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
        } else if (properties?.defaultValue) {
            setValue(properties.defaultValue);
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
                    <div className="col-sm-8">
                        <input
                            type="tel"
                            name={`name_${qid}`}
                            id={`input_${qid}`}
                            className={`form-control phone ${errors?.[qid]?.length > 0 ? 'is-invalid' : ''}`}
                            placeholder={properties?.placeholder}
                            minLength={minLength}
                            maxLength={maxLength}
                            required={properties?.required === 'Yes'}
                            readOnly={properties?.readOnly === 'Yes'}
                            style={{
                                width: properties?.fixedWidth ? properties?.fixedWidth + 'px' : ''
                            }}
                            value={value}
                            onChange={(event) => handleChange(event, properties['type'], event.target.value)}
                        />

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

export default PhoneControl;