import React from "react";
import FullNameControl from "./FullNameControl";
import EmailControl from "./EmailControl";
import Button from "./SubmitControl";
import DropdownControl from "./DropdownControl";
import SingleChoiceControl from "./SingleChoiceControl";
import MultipleChoiceControl from "./MultipleChoiceControl";
import PhoneControl from "./PhoneControl";
import ParagraphControl from "./ParagraphControl";
import ShortTextControl from "./ShortTextControl";
import NumberControl from "./NumberControl";
import HeadingControl from "./HeadingControl";
import LongTextControl from "./LongTextControl";
import DateTimeControl from "./DateTimeControl";
import AddressControl from "./AddressControl";
import ImageControl from "./ImageControl";
import TimeControl from "./TimeControl";

export default function ControlSwitcher({qid, type, properties, errors, submission, onError, onChange, isEditable}) {
    switch (type) {
        case 'control_time':
            return <TimeControl
                qid={qid}
                properties={properties}
                errors={errors}
                submission={submission}
                onChange={onChange}
                onError={onError}
                isEditable={isEditable}
            />
        case 'control_image':
            return <ImageControl
                qid={qid}
                properties={properties}
            />
        case 'control_address':
            return <AddressControl
                qid={qid}
                properties={properties}
                errors={errors}
                submission={submission}
                onChange={onChange}
                onError={onError}
                isEditable={isEditable}
            />
        case 'control_datetime':
            return <DateTimeControl
                qid={qid}
                properties={properties}
                errors={errors}
                submission={submission}
                onChange={onChange}
                onError={onError}
                isEditable={isEditable}
            />
        case 'control_long_text':
            return <LongTextControl
                qid={qid}
                properties={properties}
                errors={errors}
                submission={submission}
                onChange={onChange}
                onError={onError}
                isEditable={isEditable}
            />
        case 'control_heading':
            return <HeadingControl
                qid={qid}
                properties={properties}
            />
        case 'control_number':
            return <NumberControl
                qid={qid}
                properties={properties}
                errors={errors}
                submission={submission}
                onChange={onChange}
                onError={onError}
                isEditable={isEditable}
            />
        case 'control_paragraph':
            return <ParagraphControl
                qid={qid}
                properties={properties}
                errors={errors}
                submission={submission}
                onChange={onChange}
                onError={onError}
                isEditable={isEditable}
            />
        case 'control_short_text':
            return <ShortTextControl
                qid={qid}
                properties={properties}
                errors={errors}
                submission={submission}
                onChange={onChange}
                onError={onError}
                isEditable={isEditable}
            />
        case 'control_phone':
            return <PhoneControl
                qid={qid}
                properties={properties}
                errors={errors}
                submission={submission}
                onChange={onChange}
                onError={onError}
                isEditable={isEditable}
            />
        case 'control_fullname':
            return <FullNameControl
                qid={qid}
                properties={properties}
                errors={errors}
                submission={submission}
                onChange={onChange}
                onError={onError}
                isEditable={isEditable}
            />
        case 'control_email':
            return <EmailControl
                qid={qid}
                properties={properties}
                errors={errors}
                submission={submission}
                onChange={onChange}
                onError={onError}
                isEditable={isEditable}
            />
        case 'control_dropdown':
            return <DropdownControl
                qid={qid}
                properties={properties}
                errors={errors}
                submission={submission}
                onChange={onChange}
                onError={onError}
                isEditable={isEditable}
            />
        case 'control_single_choice':
            return <SingleChoiceControl
                qid={qid}
                properties={properties}
                errors={errors}
                submission={submission}
                onChange={onChange}
                onError={onError}
                isEditable={isEditable}
            />
        case 'control_multiple_choice':
            return <MultipleChoiceControl
                qid={qid}
                properties={properties}
                errors={errors}
                submission={submission}
                onChange={onChange}
                onError={onError}
                isEditable={isEditable}
            />
        case 'control_button':
            return <Button
                qid={qid}
                properties={properties}
                errors={errors}
                isEditable={isEditable}
            />
        default:
            return 'Nothing found!'
    }
}
