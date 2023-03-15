import React, {useEffect, useState} from "react";

const ParagraphControl = ({qid, properties}) => {

    const [contents, setContents] = useState('');

    useEffect(() => {
        if (properties?.contents) {
            setContents(properties?.contents);
        } else {
            setContents(properties?.defaultContents);
        }
    }, [properties?.contents]);

    return (
        <div className="row" id={`id_${qid}`}>
            <div className="col-12" id={`cid_${qid}`}>
                {contents ? <div className="contents"
                                 dangerouslySetInnerHTML={{__html: contents}}/> : properties?.defaultContents}
            </div>
        </div>
    );
}

export default ParagraphControl;