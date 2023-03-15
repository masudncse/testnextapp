import React, {useState} from "react";
import InputError from "../Common/InputError";
import {useEffectOnce} from "../../utils/hooks/useEffectOnce";
import {validate} from "../../utils/validate";

const MultipleChoiceControl = ({qid, properties, errors, submission, onChange, onError, isEditable}) => {

    const [checked, setChecked] = useState([]);

    const handleChange = (event, type, newValue) => {
        if (!isEditable) return false;

        let updatedList = [...checked];
        if (event.target.checked) {
            updatedList.push(newValue);
        } else {
            updatedList.splice(checked.indexOf(newValue), 1);
        }

        setChecked(updatedList);

        onChange(qid, type, updatedList);

        validate(qid, updatedList, properties, (errors) => {
            onError(qid, errors);
        });
    }

    useEffectOnce(() => {
        if (!_.isEmpty(submission?.properties?.[qid]?.value)) {
            setChecked(submission.properties[qid].value);
        } else if (properties?.defaultChecked) {
            setChecked(properties.defaultChecked);
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
                                        type="checkbox"
                                        name={`name_${qid}[${key}]`}
                                        className="form-check-input checkbox"
                                        id={`input_${qid}-${key}`}
                                        value={item}
                                        checked={checked.includes(item)}
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

export default MultipleChoiceControl;