import React from "react";
import {getApiImagePath} from "../../utils/helpers";

export default function ImageControl({qid, properties}) {

    const imageWidth = properties?.imageWidth ? properties?.imageWidth + 'px' : '120px'
    const imageHeight = properties?.imageHeight ? properties?.imageHeight + 'px' : ''
    const imageAlt = properties?.imageAltText ?? ''

    return (
        <div className="row" id={`id_${qid}`}>
            <div className="col-12" id={`cid_${qid}`}>
                <div className="image-wrap">
                    <a href={properties?.linkImage ?? ''} target="_blank" className="image-link">
                        <div className="image-inner"
                             style={{textAlign: properties?.imageAlignment, overflow: 'hidden'}}>
                            <img
                                src={getApiImagePath(properties?.imagePath)}
                                width={imageWidth}
                                height={imageHeight}
                                alt={imageAlt}
                                className="image"
                            />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
