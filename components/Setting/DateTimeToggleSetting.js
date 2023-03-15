import React, {useState} from "react";

const DateTimeToggleSetting = ({qid, properties, fieldLabel, fieldSublabel, keyName, onChangeProperty, setSyncData}) => {
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
                    <label htmlFor="subLabel" className="form-label">
                        {fieldLabel}
                    </label>
                </div>
                <div className="col-8">
                    <div className="btn-group mb-1">
                        <button
                            type="button"
                            className={`btn ${(properties?.[keyName] === 'Date') ? 'btn-primary' : 'btn-outline-primary'} mb-0`}
                            onClick={(event) => handleClick(event, keyName, 'Date')}>
                            DATE
                        </button>
                        <button
                            type="button"
                            className={`btn ${(properties?.[keyName] === 'Time') ? 'btn-primary' : 'btn-outline-primary'} mb-0`}
                            onClick={(event) => handleClick(event, keyName, 'Time')}>
                            TIME
                        </button>
                        <button
                            type="button"
                            className={`btn ${(properties?.[keyName] === 'Both') ? 'btn-primary' : 'btn-outline-primary'} mb-0`}
                            onClick={(event) => handleClick(event, keyName, 'Both')}>
                            BOTH
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

export default DateTimeToggleSetting;
