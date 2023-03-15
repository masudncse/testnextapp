import React, {useEffect, useState} from "react";
import {Accordion} from "react-bootstrap";
import {useRouter} from "next/router";
import {fetchFormHistoriesByFormId} from "../../../services/FormHistoryServices";
import moment from "moment";

const Sidebar = ({onChangeHistory}) => {
    const router = useRouter();
    const {id: formId} = router.query

    const [activeKey, setActiveKey] = useState('');
    const [formHistories, setFormHistories] = useState({});

    // Fetch history data
    useEffect(() => {
        if (!_.isUndefined(formId)) {
            fetchFormHistoriesByFormId(formId).then((response) => {
                if (response?.data) {
                    setFormHistories(response.data);
                }
            })
        }
    }, [formId]);

    return (
        <div className="history-accordion">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12">
                                    <Accordion defaultActiveKey="0" flush>
                                        {formHistories && Object.keys(formHistories).map((key, index) => {
                                            return <Accordion.Item key={index} eventKey={index}>
                                                <Accordion.Header>
                                                    {moment(key).format('DD MMM, YYYY')} ({formHistories[key].length} Changed)
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <div
                                                        className="d-flex flex-column align-items-stretch flex-shrink-0">
                                                        {formHistories[key].map((item, index) => {
                                                            return <div key={index}
                                                                        className="list-group list-group-flush nice-scroll">
                                                                <button type="button"
                                                                        className={`list-group-item list-group-item-action ${activeKey === index ? 'active' : ''} border rounded mb-2`}
                                                                        onClick={(event) => {
                                                                            setActiveKey(index);
                                                                            onChangeHistory(event, item)
                                                                        }}
                                                                >
                                                                    <div
                                                                        className="d-flex w-100 align-items-center justify-content-between">
                                                                        <strong className="mb-0 text-sm">
                                                                            {item.subject}
                                                                        </strong>
                                                                    </div>
                                                                    <div className="col-10 mb-0 text-xs">
                                                                        <i className="fa fa-clock-o me-2"/>
                                                                        {item?.client?.name} - {moment(item.created_at).format('hh:mm:ss A')}
                                                                    </div>
                                                                </button>
                                                            </div>
                                                        })}
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        })}
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;