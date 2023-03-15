import React from "react";

const HeadingControl = ({qid, properties}) => {
    return (
        <div className="row" id={`id_${qid}`}>
            <div className="col-12" style={{textAlign: properties?.textAlignment}}>
                <div className="heading-inner">
                    <h1 className="heading" id={`heading_${qid}`}
                        style={{fontSize: properties?.headingFontSize + 'px'}}>
                        {properties?.headingText || properties?.headingDefaultText}
                    </h1>
                    <p className="sub-heading" id={`sub-heading_${qid}`}
                       style={{fontSize: properties?.subHeadingFontSize + 'px'}}>
                        {properties?.subHeadingText ?? properties?.subHeadingDefaultText}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HeadingControl;