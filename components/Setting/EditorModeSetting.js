import React, {useState} from "react";

const EditorModeSetting = ({qid, properties, fieldLabel, fieldSublabel, keyName, onChangeProperty, setSyncData}) => {
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
                        htmlFor={keyName}
                        className="form-label">
                        {fieldLabel}
                    </label>
                </div>
                <div className="col-12">
                    <div className="btn-group mb-1">
                        <button
                            type="button"
                            className={`btn ${(properties?.[keyName] === 'PlainText') ? 'btn-primary' : 'btn-outline-primary'} mb-0`}
                            onClick={(event) => handleClick(event, keyName, 'PlainText')}>
                            PLAIN TEXT
                        </button>
                        <button
                            type="button"
                            className={`btn ${(properties?.[keyName] === 'RichText') ? 'btn-primary' : 'btn-outline-primary'} mb-0`}
                            onClick={(event) => handleClick(event, keyName, 'RichText')}>
                            RICH TEXT
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

export default EditorModeSetting;
