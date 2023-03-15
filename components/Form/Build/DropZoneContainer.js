import React from "react";

const DropZoneContainer = ({isHistoryPage, questions}) => {
    let htmlContent = '';

    {
        !isHistoryPage && _.isEmpty(questions) && (
            htmlContent = <div className="drop-zone-container">
                <i className="fa fa-plus-circle fa-3x text-success mb-4"/>
                <h5>Drag & Drop Element</h5>
                <p className="text-xs">
                    Please drag your desired field from the left sidebar.
                </p>
            </div>
        )
    }

    {
        isHistoryPage && _.isEmpty(questions) && (
            htmlContent = <div className="drop-zone-container">
                <i className="fa fa-history fa-3x text-success mb-4"/>
                <h6>Select From Revision History</h6>
                <p className="text-xs">
                    Please select a revision from left sidebar panel.
                </p>
            </div>
        )
    }

    return htmlContent
}

export default DropZoneContainer;