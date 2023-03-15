import React, {useEffect, useState} from "react";
import InputError from "../Common/InputError";
import {Editor} from "@tinymce/tinymce-react";
import {TINYMCE_API_KEY} from "../../utils/constants";


const AnyRichEditorSetting = ({qid, properties, fieldLabel, fieldSubLabel, keyName, btColumnSize, onChangeProperty, setSyncData, isRequired, features}) => {

    const [editorText, setEditorText] = useState('');

    const [initContent, setInitContent] = useState('');
    const [errors, setErrors] = useState([]);

    const [height, setHeight] = useState('');
    const [menubar, setMenubar] = useState(false);
    const [plugins, setPlugins] = useState('');
    const [toolbar, setToolbar] = useState('');

    useEffect(() => {
        if (features === 'full') {
            setHeight('450');
            setMenubar(true);
            setPlugins('preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons');
            setToolbar('fullscreen preview | undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | insertfile image media template link anchor codesample | ltr rtl');
        } else if (features === 'basic') {
            setHeight('280');
            setMenubar(false);
            setPlugins('advlist autolink lists link image charmap preview anchor, searchreplace visualblocks code fullscreen, insertdatetime media table paste code help wordcount, fullscreen');
            setToolbar('undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | fullscreen');
        }
    });

    // Init
    useEffect(() => {
        if (properties?.contents) {
            setInitContent(properties?.contents);
        } else {
            setInitContent(properties?.defaultContents);
        }
    }, [properties?.contents]);

    const handleChange = (event, key, value) => {
        event.preventDefault();
        setErrors([]);

        onChangeProperty(qid, key, value);

        if (isRequired && _.isEmpty(value)) {
            setErrors([
                ...errors,
                "This field is required."
            ]);
        }
    }

    const handleOnBlur = (event) => {
        event.preventDefault();

        if (_.isEmpty(errors)) {
            setSyncData({
                subject: `${fieldLabel} Change`
            });
        }
    }

    const handleOnBlurEditor = (event, key, value) => {
        event.preventDefault();

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
                        htmlFor="label"
                        className="form-label">
                        {fieldLabel} {isRequired && (<span className="text-danger">*</span>)}
                    </label>
                </div>
                <div className={`${btColumnSize ?? 'col-12'}`}>
                    {properties?.editorMode === 'PlainText' && (
                        <textarea id="label"
                                  value={properties?.contents || ''}
                                  className={`form-control ${errors.length > 0 ? 'is-invalid' : ''}`}
                                  onChange={(event) => handleChange(event, keyName, event.target.value)}
                                  onBlur={(event) => handleOnBlur(event)}
                        />
                    )}

                    {properties?.editorMode === 'RichText' &&
                    menubar && plugins && toolbar && height && (
                        <Editor
                            apiKey={TINYMCE_API_KEY}
                            onEditorChange={(newText) => setEditorText(newText)}
                            onBlur={(event) => handleOnBlurEditor(event, keyName, editorText)}
                            initialValue={initContent}
                            init={{
                                height: height,
                                menubar: menubar,
                                plugins: plugins,
                                toolbar: toolbar,
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />
                    )}

                    {fieldSubLabel && (<small className="text-xs text-muted">
                        <div className="col-12">
                            {fieldSubLabel}
                        </div>
                    </small>)}

                    <InputError messages={errors}/>
                </div>
            </div>
        </div>
    );
}

export default AnyRichEditorSetting;