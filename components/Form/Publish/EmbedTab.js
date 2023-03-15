import React, {useEffect, useRef, useState} from "react";
import {tostify} from "../../../utils/helpers";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

const EmbedTab = ({active}) => {

    const router = useRouter();
    const {id: formId} = router.query;

    const iframeTag = useRef()
    const [defaultIframeTag, setDefaultIframeTag] = useState('');

    useEffect(() => {
        if (!_.isUndefined(formId)) {
            let srcLink = `${location.origin}/form/${formId}`;
            setDefaultIframeTag(`<iframe src="${srcLink}"></iframe>`)
        }
    }, [formId]);

    const handleCopyToClipboard = (event) => {
        event.preventDefault();

        navigator.clipboard.writeText(iframeTag.current.value);

        tostify(toast, 'success', {message: 'Copied'});
    }

    if (!active) {
        return false
    }

    return (
        <form>
            <div className="row">
                <div className="col-12 mb-4">
                    <div className="row">
                        <div className="col-6">
                            <div className="card">
                                <div className="card-body p-3">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label htmlFor="" className="form-label">
                                                IFRAME
                                            </label>
                                        </div>
                                        <div className="col-md-12">
                                            <textarea
                                                ref={iframeTag}
                                                className="form-control"
                                                rows={5}
                                                defaultValue={defaultIframeTag}
                                                readOnly={true}
                                            />
                                        </div>
                                        <div className="col-12 mb-3">
                                            <div className="form-text">
                                                Use this code in order to embed your form in an iFrame within your page.
                                            </div>
                                        </div>
                                        <div className="col-12 text-end">
                                            <button type="button" className="btn btn-success"
                                                    onClick={() => handleCopyToClipboard(event)}>
                                                <i className="fa fa-copy me-2"/> Copy Code
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default EmbedTab;