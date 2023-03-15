import React from "react";

const AuthSessionStatus = ({status, className, ...props}) => (
    <>
        {status && (
            <div
                className={`${className} font-medium text-sm text-success`}
                {...props}>
                {status}
            </div>
        )}
    </>
)

export default AuthSessionStatus
