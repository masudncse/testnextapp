import React from "react";

export default function Button({qid, properties}) {
    let buttonAlign = properties['buttonAlign']
    let textAlign = '';

    switch (buttonAlign) {
        case 'left':
            textAlign = 'text-start';
            break;
        case 'center':
            textAlign = 'text-center';
            break;
        case 'right':
            textAlign = 'text-end';
            break;
        default:
            textAlign = 'text-center';
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="form-group row mb-0">
                    <div className={`col-sm-12 ${textAlign}`}>
                        <button
                            type="submit"
                            name={`name_${qid}`}
                            id={`input_${qid}`}
                            className="btn btn-primary btn-lg mb-0"
                            data-qid={qid}
                            data-control-type="control_button"
                        >{properties?.text}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}