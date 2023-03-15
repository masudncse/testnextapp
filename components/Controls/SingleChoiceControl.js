import React, {useState} from "react";
import InputError from "../Common/InputError";
import {useEffectOnce} from "../../utils/hooks/useEffectOnce";
import {validate} from "../../utils/validate";

const SingleChoiceControl = ({qid, properties, errors, submission, onChange, onError, isEditable}) => {

    const [value, setValue] = useState('');

    const handleChange = (event, type, value) => {
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
        } else if (properties?.defaultChecked) {
            setValue(properties.defaultChecked);
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
                        {
                            properties?.options &&
                            properties?.options.length > 0 &&
                            properties?.options.map((item, key) => {
                                return <div key={key} className="form-check">
                                    <input
                                        type="radio"
                                        name={`name_${qid}`}
                                        className="form-check-input radio"
                                        id={`input_${qid}-${key}`}
                                        value={item}
                                        checked={item === value}
                                        onChange={(event) => handleChange(event, properties['type'], event.target.value)}
                                    />
                                    <label className="form-check-label" htmlFor={`input_${qid}-${key}`}>
                                        {item}
                                    </label>
                                </div>
                            })
                        }

                        <InputError messages={errors?.[qid]} showFirst={true} className="d-block"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleChoiceControl;