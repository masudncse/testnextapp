import React from "react";
import {useRouter} from "next/router";

const FormThankYouContent = ({content}) => {
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
                            <div className="col-12 text-center">
                                <span dangerouslySetInnerHTML={{
                                    __html: content
                                }}/>

                                <hr/>
                                <button className="btn btn-success btn-lg text-uppercase mt-5"
                                        onClick={(event) => handleSubmitAgain(event)}>
                                    Submit Again
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormThankYouContent;
