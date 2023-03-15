import React, {useState} from "react";
import InputError from "../Common/InputError";
import {useEffectOnce} from "../../utils/hooks/useEffectOnce";
import {validate} from "../../utils/validate";
import {Editor} from "@tinymce/tinymce-react";
import {TINYMCE_API_KEY} from "../../utils/constants";

const LongTextControl = ({qid, properties, errors, submission, onChange, onError, isEditable}) => {
    const minLength = properties?.minLength ? parseInt(properties.minLength) : null;
    const maxLength = properties?.maxLength ? parseInt(properties.maxLength) : null;

    const [value, setValue] = useState('');
    const [editorText, setEditorText] = useState('');

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

    const handleOnBlurEditor = (event, key, value) => {
        event.preventDefault();

        if (!isEditable) return false;

        setValue(value);

        onChange(qid, key, value);

        validate(qid, value, properties, (errors) => {
            onError(qid, errors);
        });
    }

    return (
        <div className="row" id={`id_${qid}`}>
            <div className="col-12">
                <div className="form-group row mb-0">
                    <label htmlFor={`input_${qid}`} className="col-sm-4 form-label mb-0 d-flex align-items-center">
                        {properties?.label}
                        {properties?.required === 'Yes' ? <span className="text-sm text-danger ms-1">*</span> : null}
                    </label>
                    <div className="col-sm-8">
                        {properties?.editorMode === 'PlainText' && (
                            <textarea
                                name={`name_${qid}`}
                                id={`input_${qid}`}
                                className={`form-control plain-text-editor ${errors?.[qid]?.length > 0 ? 'is-invalid' : ''}`}
                                placeholder={properties?.placeholder}
                                minLength={minLength}
                                maxLength={maxLength}
                                required={properties?.required === 'Yes'}
                                readOnly={properties?.readOnly === 'Yes'}
                                style={{
                                    width: properties?.fixedWidth ? properties?.fixedWidth + 'px' : ''
                                }}
                                rows={7}
                                value={value}
                                onChange={(event) => handleChange(event, properties['type'], event.target.value)}
                            />
                        )}

                        {properties?.editorMode === 'RichText' && (
                            <Editor
                                apiKey={TINYMCE_API_KEY}
                                onEditorChange={(newText) => setEditorText(newText)}
                                onBlur={(event) => handleOnBlurEditor(event, properties['type'], editorText)}
                                id={`input_${qid}`}
                                className="rich-text-editor"
                                initialValue={value}
                                init={{
                                    height: 280,
                                    width: properties?.fixedWidth ? properties?.fixedWidth + 'px' : '',
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount', 'fullscreen'
                                    ],
                                    toolbar: 'undo redo | formatselect | ' +
                                        'bold italic backcolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help | fullscreen',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                            />
                        )}

                        {/*Sub Label Setting Text*/}
                        {properties?.subLabel && (
                            <p className="sub-label text-sm text-muted mb-0" id={`sub-label_${qid}`}>
                                {properties.subLabel}
                            </p>)}

                        <InputError messages={errors?.[qid]} showFirst={true} className="d-block"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LongTextControl;
