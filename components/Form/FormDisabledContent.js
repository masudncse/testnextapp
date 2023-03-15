import React from "react";
import moment from "moment";
import {useRouter} from "next/router";

const FormDisabledContent = ({warningMessage, expiryDate, expiryTime, submissionLimit}) => {
    const router = useRouter();

    const handleSubmitAgain = (event) => {
        event.preventDefault();

        router.back();
        router.reload();
    }
    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body p-3">
                        <div className="row">
                            <div className="col-12 text-center py-10">
                                {warningMessage && (
                                    <h3>
                                        <i className="fa fa-warning fa-2x text-warning d-block mb-3 "/>
                                        {warningMessage}
                                    </h3>
                                )}

                                {(expiryDate && expiryTime) && (
                                    <>
                                        <h5>
                                            Open: &nbsp;
                                            {moment(new Date(expiryDate)).format("DD MMM, YYYY")} {moment(expiryTime, 'HH:mm').format("hh:mm A")}
                                        </h5>
                                    </>
                                )}

                                {submissionLimit > 0 && (
                                    <h4 className="text-danger">{submissionLimit} submissions has been taken.</h4>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormDisabledContent;
