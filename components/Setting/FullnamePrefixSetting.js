import React, {useState} from "react";
import InputError from "../Common/InputError";

export default function FullnamePrefixSetting({qid, properties, fieldLabel, fieldSubLabel, onChangeProperty, setSyncData}) {

    const [errors, setErrors] = useState([]);

    const handleChange = (event, key, checked) => {
        setErrors([]);

        const value = checked ? 'Yes' : 'No';

        onChangeProperty(qid, key, value);

        if (_.isEmpty(errors)) {
            setSyncData({
                subject: "Prefix Change"
            });
        }
    }

    const handleClick = (event, key, value) => {
        event.preventDefault();
        setErrors([]);

        onChangeProperty(qid, key, value);

        if (_.isEmpty(errors)) {
            setSyncData({
                subject: "Prefix Mode Change"
            });
        }
    }

    return (
        <div className="property-setting-item">
            <div className="row">
                <div className="col-12">
                    <label htmlFor={'showPrefix'} className="form-label">
                        {fieldLabel}
                    </label>
                </div>
                <div className="col-2 d-flex align-items-center">
                    <div className="form-check form-switch">
                        <input type="checkbox"
                               checked={properties?.['showPrefix'] === 'Yes'}
                               className="form-check-input"
                               id={'showPrefix'}
                               onChange={(event) => handleChange(event, 'showPrefix', event.target.checked)}
                        />
                    </div>
                </div>
                <div className="col-10">
                    <div className="btn-group btn-group-sm">
                        <button
                            type="button"
                            className={`btn ${(properties?.['prefixMode'] === 'TextBox') ? 'btn-primary' : 'btn-outline-primary'} text-xs px-2 mb-0`}
                            onClick={(event) => handleClick(event, 'prefixMode', 'TextBox')}>
                            TEXT BOX
                        </button>
                        <button
                            type="button"
                            className={`btn ${(properties?.['prefixMode'] === 'Dropdown') ? 'btn-primary' : 'btn-outline-primary'} text-xs px-2 mb-0`}
                            onClick={(event) => handleClick(event, 'prefixMode', 'Dropdown')}>
                            DROPDOWN
                        </button>
                    </div>
                </div>
                <div className="col-12">
                    {fieldSubLabel && (<small className="text-xs text-muted">
                        {fieldSubLabel}
                    </small>)}

                    <InputError messages={errors} className={'d-block'}/>
                </div>
            </div>
        </div>
    )
}