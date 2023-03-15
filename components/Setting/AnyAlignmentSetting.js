import React, {useState} from "react";

const AnyAlignmentSetting = ({qid, properties, fieldLabel, fieldSublabel, keyName, onChangeProperty, setSyncData}) => {
    const [errors, setErrors] = useState([]);

    const handleClick = (event, key, value) => {
        event.preventDefault();
        setErrors([]);

        onChangeProperty(qid, key, value);

        if (_.isEmpty(errors)) {
            setSyncData({
                subject: `${fieldLabel} Change`
            });
        }
    }

    return (
        <div className="property-setting-item">
            <div className="row">
                <div className="col-12">
                    <label
                        htmlFor="subLabel"
                        className="form-label">
                        {fieldLabel}
                    </label>
                </div>
                <div className="col-8">
                    <div className="btn-group mb-1">
                        <button
                            type="button"
                            className={`btn ${(properties?.[keyName] === 'left') ? 'btn-primary' : 'btn-outline-primary'} mb-0`}
                            onClick={(event) => handleClick(event, keyName, 'left')}>
                            LEFT
                        </button>
                        <button
                            type="button"
                            className={`btn ${(properties?.[keyName] === 'center') ? 'btn-primary' : 'btn-outline-primary'} mb-0`}
                            onClick={(event) => handleClick(event, keyName, 'center')}>
                            CENTER
                        </button>
                        <button
                            type="button"
                            className={`btn ${(properties?.[keyName] === 'right') ? 'btn-primary' : 'btn-outline-primary'} mb-0`}
                            onClick={(event) => handleClick(event, keyName, 'right')}>
                            RIGHT
                        </button>
                    </div>

                    {fieldSublabel && (<small className="text-xs text-muted">
                        {fieldSublabel}
                    </small>)}
                </div>
            </div>
        </div>
    );
}

export default AnyAlignmentSetting;
