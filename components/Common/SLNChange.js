import React from "react";

const SLNChange = ({startFrom, currentIndex, className}) => {
    return (
        <span className={className}>
            {startFrom += currentIndex}
        </span>
    )
}

export default SLNChange;