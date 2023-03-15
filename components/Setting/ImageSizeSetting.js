import React, {useState} from "react";
import InputError from "../Common/InputError";

export default function ImageSizeSetting({qid, properties, sizeType, fieldLabel, fieldSubLabel, onChangeProperty, setSyncData}) {

    const [errors, setErrors] = useState({});

    let imageWidth = properties?.imageWidth ? parseInt(properties?.imageWidth) : '';
    let imageHeight = properties?.imageHeight ? parseInt(properties?.imageHeight) : '';

    const handleChange = (event, key, value) => {
        event.preventDefault();
        setErrors({});

        value = parseInt(value);

        onChangeProperty(qid, key, value);
    }

    const handleOnBlur = (event) => {
        event.preventDefault();

        if (_.isEmpty(errors)) {
            setSyncData({
                subject: fieldLabel + " Change"
            });
        }
    }

    return (
        <div className="property-setting-item">
            <div className="row">
                <div className="col-12">
                    <label htmlFor="imageWidth" className="form-label">
                        {fieldLabel}
                    </label>
                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col-md-6">
                            <input
                                type="number"
                                value={imageWidth}
                                id="imageWidth"
                                className={`form-control ${errors.length > 0 ? 'is-invalid' : ''}`}
                                onChange={(event) => handleChange(event, 'imageWidth', event.target.value)}
                                onBlur={(event) => handleOnBlur(event)}
                            />

                            <label htmlFor="imageWidth" className="form-label">
                                Width (PX)
                            </label>
                            <InputError messages={errors?.imageWidth}/>
                        </div>
                        <div className="col-md-6">
                            <input
                                type="number"
                                value={imageHeight}
                                id="imageHeight"
                                className={`form-control ${errors.length > 0 ? 'is-invalid' : ''}`}
                                onChange={(event) => handleChange(event, 'imageHeight', event.target.value)}
                                onBlur={(event) => handleOnBlur(event)}
                            />

                            <label htmlFor="imageHeight" className="form-label">
                                Height (PX)
                            </label>
                            <InputError messages={errors?.imageHeight}/>
                        </div>

                        {fieldSubLabel && (<small className="text-xs text-muted">
                            <div className="col-12">
                                {fieldSubLabel}
                            </div>
                        </small>)}
                    </div>
                </div>
            </div>
        </div>
    );
}