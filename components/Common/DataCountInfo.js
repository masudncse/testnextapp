import React from "react";

const DataCountInfo = ({meta}) => {
    return <p className="text-xs text-secondary mb-0 font-weight-bold">
        Showing {meta?.from} to {meta?.to} of {meta?.total} entries
    </p>
}

export default DataCountInfo;