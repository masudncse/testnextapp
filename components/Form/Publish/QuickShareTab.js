import React, {useRef, useState} from "react";
import {TagsInput} from "react-tag-input-component";
import {useRouter} from "next/router";
import {tostify} from "../../../utils/helpers";
import {toast} from "react-toastify";

const QuickShareTab = ({active}) => {

    const router = useRouter();
    const {id: formId} = router.query

    const shareLink = useRef();

    const [selected, setSelected] = useState(["example@gmail.com"]);

    const handleCopyToClipboard = (event) => {
        event.preventDefault();

        navigator.clipboard.writeText(shareLink.current.value)
        tostify(toast, 'success', {message: 'Copied'});
    }

    const handleOpenInWindow = (event) => {
        event.preventDefault();

        window.open(shareLink.current.value, '_blank');
    }

    if (!active) {
        return false
    }

    return (
        <form>
            <div className="row">
                {/*Link to Share*/}
                <div className="col-12 mb-4">
                    <div className="row">
                        <div className="col-6">
                            <div className="card">
                                <div className="card-body p-3">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label htmlFor="" className="form-label">
                                                Link to Share
                                            </label>
                                        </div>
                                        <div className="col-md-10 mb-2">
                                            <input type="text" ref={shareLink}
                                                   value={`${location.origin}/form/${formId}`}
                                                   readOnly={true} className="form-control"/>
                                        </div>
                                        <div className="col-12">
                                            <button type="button" className="btn btn-success me-2"
                                                    onClick={(event) => handleCopyToClipboard(event)}>
                                                Copy Link
                                            </button>
                                            <button type="button" className="btn btn-primary"
                                                    onClick={(event) => handleOpenInWindow(event)}>
                                                Open in New Tab
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*Invite Via Email*/}
                <div className="col-12 mb-4">
                    <div className="row">
                        <div className="col-6">
                            <div className="card">
                                <div className="card-body p-3">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label htmlFor="" className="form-label">
                                                Invite by Email
                                            </label>
                                        </div>
                                        <div className="col-md-12">
                                            <pre>{JSON.stringify(selected)}</pre>

                                            <TagsInput
                                                value={selected}
                                                onChange={setSelected}
                                                name="emails"
                                                placeHolder="Add More"
                                            />
                                        </div>
                                        <div className="col-12 mb-3">
                                            <div className="form-text">
                                                Press enter to add new tag
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="email_body">Email Body</label>
                                            <textarea className="form-control" rows="5" id="email_body"
                                                      placeholder="Leave a comment here"/>
                                        </div>
                                        <div className="col-12 text-end">
                                            <button type="submit" className="btn btn-primary">Send Invitation</button>
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

export default QuickShareTab;
