import React from 'react';
import moment from "moment";

const ViewDataByControlType = ({type, value}) => {
    let newValue = '';

    switch (type) {
        case 'control_fullname':
            if (!_.isEmpty(value)) {
                newValue = Object.values(value).join(' ');
            }
            break;
        case 'control_address':
            if (!_.isEmpty(value)) {
                newValue = Object.values(value).join(', ');
            }
            break;
        case 'control_multiple_choice':
            if (!_.isEmpty(value)) {
                newValue = value.join(', ');
            }
            break;
        case 'control_datetime':
            let strDateTime = ''
            if (!_.isEmpty(value?.['date'])) {
                strDateTime += moment(value['date']).format('MMM DD, YYYY')
            }
            if (!_.isEmpty(value?.['time'])) {
                strDateTime += ' ' + moment(value['time'], 'HH:mm A').format('hh:mm A')
            }
            newValue = strDateTime;
            break;
        case 'control_time':
            if (!_.isEmpty(value)) {
                newValue = moment(value, 'HH:mm A').format('hh:mm A')
            }
            break;
        case 'date':
            if (!_.isEmpty(value)) {
                newValue = moment(value).format('MMM DD, YYYY')
            }
            break;
        default:
            newValue = value;
    }

    return (
        <span>{newValue}</span>
    )
};

export default ViewDataByControlType;