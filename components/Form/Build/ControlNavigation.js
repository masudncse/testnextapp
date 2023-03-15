import React, {useState} from "react";
import {getControlList} from "../../../utils/helpers";

const ControlNavigation = ({onDragNewControl, onAddNewControl}) => {
    const [activeKey, setActiveKey] = useState(0);

    const handleDragStart = (event, key, type, properties) => {
        setActiveKey(key);
        onDragNewControl(type, properties);
    }

    const handleAddNewControl = (event, key, type, properties) => {
        event.preventDefault();
        setActiveKey(key);

        onAddNewControl(type, properties);
    }

    return (
        <div className="control-navigation nice-scroll">
            <div className="row">
                <div className="col-12">
                    <h6 className="text-md mb-0 ms-3">
                        Form Elements
                    </h6>
                </div>

                <hr className="horizontal dark my-2"/>

                <div className="col-12">
                    <aside
                        className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl position-relative nice-scroll custom-sidenav">
                        <div
                            className="collapse navbar-collapse h-auto">
                            <ul className="navbar-nav">
                                {getControlList().map((item, key) => {
                                        return (item.group === "") && (
                                            <li className="nav-item" key={key}>
                                                <a className={`nav-link ${activeKey === key ? 'active' : ''}`}
                                                   draggable={true}
                                                   onClick={(event) => handleAddNewControl(event, key, item.type, item.properties)}
                                                   onDragStart={(event) => handleDragStart(event, key, item.type, item.properties)}>
                                                    <div
                                                        className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                                        <img src={item.icon} alt="icon"/>
                                                    </div>
                                                    <span className="nav-link-text ms-1">
                                                {item.name}
                                            </span>
                                                </a>
                                            </li>
                                        )
                                    }
                                )}
                                <li className="nav-item mt-4 mb-3">
                                    <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6 mb-0">
                                        Basic Elements
                                    </h6>
                                </li>
                                {getControlList().map((item, key) => {
                                    return (item.group === "basic" && (
                                        <li className="nav-item" key={key}>
                                            <a className={`nav-link ${activeKey === key ? 'active' : ''}`}
                                               draggable={true}
                                               onClick={(event) => handleAddNewControl(event, key, item.type, item.properties)}
                                               onDragStart={(event) => handleDragStart(event, key, item.type, item.properties)}>
                                                <div
                                                    className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                                    <img src={item.icon} alt="icon"/>
                                                </div>
                                                <span className="nav-link-text ms-1">
                                                {item.name}
                                            </span>
                                            </a>
                                        </li>
                                    ))
                                })}
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}

export default ControlNavigation;
