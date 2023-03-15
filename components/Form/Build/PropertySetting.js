import React, {useEffect, useState} from "react";
import SettingSwitcher from "../../Setting/SettingSwitcher";
import {getControlList} from "../../../utils/helpers";

export default function PropertySetting({controlSettings, onChangeProperty, setSyncData, form, setForm, setControlSettings, setStyles}) {
    const {qid, type, properties} = controlSettings;

    const [title, setTitle] = useState('');

    // Setting Title
    useEffect(() => {
        getControlList().every((item) => {
            if (item.type === type) {
                setTitle(item.name);
                return false;
            }

            return true;
        });

        if (type === 'control_logo') {
            setTitle('Logo');
        }

        if (_.isEmpty(type)) {
            setTitle('');
        }
    }, [type]);

    return (
        <div className="property-setting nice-scroll">
            <div className="row">
                {/*Card Heading*/}
                <div className="col-12 text-center">
                    <h6 className="text-md mb-1">
                        {title || 'Property'} Setting
                    </h6>
                    <p className="text-xs mb-0">
                        Please setting up necessary properties.
                    </p>
                </div>

                <hr className="horizontal dark my-3"/>

                {/*Setting Switcher*/}
                <div className="col-12">
                    <SettingSwitcher
                        qid={qid}
                        type={type}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        form={form}
                        setForm={setForm}
                        setControlSettings={setControlSettings}
                        setStyles={setStyles}
                    />
                </div>
            </div>
        </div>
    )
}
