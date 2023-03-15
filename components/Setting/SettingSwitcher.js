import React from "react";
import AnyRichEditorSetting from "./AnyRichEditorSetting";
import AnyTextSetting from "./AnyTextSetting";
import AnyNumberSetting from "./AnyNumberSetting";
import AnyAlignmentSetting from "./AnyAlignmentSetting";
import AnyCheckboxSetting from "./AnyCheckboxSetting";
import AnyEntryLimitSetting from "./AnyEntryLimitSetting";
import EditorModeSetting from "./EditorModeSetting";
import FullnamePrefixSetting from "./FullnamePrefixSetting";
import AnyOptionsSetting from "./AnyOptionsSetting";
import FullnamePlaceholdersSetting from "./FullnamePlaceholdersSetting";
import FullnameSubLabelsSetting from "./FullnameSubLabelsSetting";
import DateTimeSubLabelsSetting from "./DateTimeSubLabelsSetting";
import DateTimeToggleSetting from "./DateTimeToggleSetting";
import AddressSubLabelsSetting from "./AddressSubLabelsSetting";
import AddressPlaceholdersSetting from "./AddressPlaceholdersSetting";
import AddressFieldsToggleSetting from "./AddressFieldsToggleSetting";
import ImageSizeSetting from "./ImageSizeSetting";
import ImageUploadSetting from "./ImageUploadSetting";
import LogoSetting from "./LogoSetting";
import StyleSetting from "./StyleSetting";

export default function SettingSwitcher({qid, type, properties, onChangeProperty, setSyncData, form, setForm, setControlSettings, setStyles}) {
    switch (type) {
        case 'control_styles':
            return (
                <>
                    <StyleSetting
                        fieldLabel="Style Editor"
                        fieldSubLabel="Please change your stylesheet."
                        setStyles={setStyles}
                    />
                </>
            );
        case 'control_logo':
            return (
                <>
                    <LogoSetting
                        form={form}
                        setForm={setForm}
                        keyName="imagePath"
                        fieldLabel="Image"
                        fieldSubLabel="Please upload image."
                    />
                </>
            );
        case 'control_image':
            return (
                <>
                    <ImageUploadSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        isRequired={false}
                        keyName="imagePath"
                        fieldLabel="Image"
                        fieldSubLabel="Please upload image."
                    />
                    <ImageSizeSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        fieldLabel="Size"
                    />
                    <AnyAlignmentSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="imageAlignment"
                        fieldLabel="Image Alignment"
                    />
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        isRequired={false}
                        keyName="linkImage"
                        fieldLabel="Link Image"
                        fieldSubLabel="Set a link for the image."
                        btColumnSize="col-md-12"
                        active={true}
                    />
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        isRequired={false}
                        keyName="imageAltText"
                        fieldLabel="Alternative Text"
                        fieldSubLabel="This text will be shown if the image can't be loaded."
                        btColumnSize="col-md-12"
                        active={true}
                    />
                </>
            );
        case 'control_address':
            return (
                <>
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        isRequired={false}
                        keyName="label"
                        fieldLabel="Field Label"
                        active={true}
                    />
                    <AddressFieldsToggleSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        isRequired={false}
                        fieldLabel="Show/Hide Fields"
                        fieldSubLabel="Select which fields to include on your form"
                    />
                    <AddressSubLabelsSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        isRequired={false}
                        keyName="subLabels"
                        fieldLabel="Sub Labels"
                    />
                    <AddressPlaceholdersSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="placeholders"
                        fieldLabel="Placeholders"
                    />
                    <AnyCheckboxSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="required"
                        fieldLabel="Required"
                        fieldSubLabel="Prevent submission if this field is empty"
                    />
                    <AnyCheckboxSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="readOnly"
                        fieldLabel="Read Only"
                        fieldSubLabel="This field only read only mood"
                    />
                </>
            );
        case 'control_datetime':
            return (
                <>
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        isRequired={false}
                        keyName="label"
                        fieldLabel="Field Label"
                        active={true}
                    />
                    <DateTimeToggleSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="showPickerType"
                        fieldLabel="Picker Type"
                        fieldSubLabel="Prevent submission if this field is empty"
                    />
                    <DateTimeSubLabelsSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        isRequired={false}
                        keyName="subLabels"
                        fieldLabel="Sub Labels"
                    />
                    <AnyCheckboxSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="required"
                        fieldLabel="Required"
                        fieldSubLabel="Prevent submission if this field is empty"
                    />
                    <AnyCheckboxSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="readOnly"
                        fieldLabel="Read Only"
                        fieldSubLabel="This field only read only mood"
                    />
                    <AnyNumberSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="fixedWidth"
                        fieldLabel="Fixed Width (PX)"
                        fieldSubLabel="This width of this field will change according to your form's width."
                        active={true}
                    />
                </>
            );
        case 'control_time':
            return (
                <>
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        isRequired={false}
                        keyName="label"
                        fieldLabel="Field Label"
                        active={true}
                    />
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="subLabel"
                        fieldLabel="Sub Label"
                        active={true}
                    />
                    <AnyCheckboxSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="required"
                        fieldLabel="Required"
                        fieldSubLabel="Prevent submission if this field is empty"
                    />
                    <AnyCheckboxSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="readOnly"
                        fieldLabel="Read Only"
                        fieldSubLabel="This field only read only mood"
                    />
                    <AnyNumberSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="fixedWidth"
                        fieldLabel="Fixed Width (PX)"
                        fieldSubLabel="This width of this field will change according to your form's width."
                        active={true}
                    />
                    {/*<DuplicateSetting
                        qid={qid}
                        setForm={setForm}
                        setSyncData={setSyncData}
                        setControlSettings={setControlSettings}
                        fieldLabel="Duplicate Field"
                        fieldSubLabel="Duplicate this field with all saved settings"
                    />*/}
                </>
            );
        case 'control_long_text':
            return (
                <>
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        isRequired={false}
                        keyName="label"
                        fieldLabel="Field Label"
                        active={true}
                    />
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="subLabel"
                        fieldLabel="Sub Label"
                        active={true}
                    />
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="defaultValue"
                        fieldLabel="Default Value"
                        active={true}
                    />
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="placeholder"
                        fieldLabel="Placeholder"
                        active={properties?.editorMode === "PlainText"}
                    />
                    <AnyCheckboxSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="required"
                        fieldLabel="Required"
                        fieldSubLabel="Prevent submission if this field is empty"
                    />
                    <AnyCheckboxSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="readOnly"
                        fieldLabel="Read Only"
                        fieldSubLabel="This field only read only mood"
                    />
                    <AnyEntryLimitSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        fieldLabel="Entry Limits"
                        fieldSubLabel="The entry limits function works only on letter count."
                    />
                    <EditorModeSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="editorMode"
                        fieldLabel="Editor Mode"
                    />
                    <AnyNumberSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="fixedWidth"
                        fieldLabel="Fixed Width (PX)"
                        fieldSubLabel="This width of this field will change according to your form's width."
                        active={true}
                    />
                </>
            );
        case 'control_heading':
            return (
                <>
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        isRequired={false}
                        keyName="headingText"
                        fieldLabel="Heading Text"
                        btColumnSize="col-12"
                        active={true}
                    />
                    <AnyNumberSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="headingFontSize"
                        fieldLabel="Heading Font Size (PX)"
                        fieldSubLabel="Set the font-size in pixel"
                        btColumnSize="col-10"
                        active={true}
                    />
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        isRequired={false}
                        keyName="subHeadingText"
                        fieldLabel="Subheading Text"
                        btColumnSize="col-12"
                        active={true}
                    />
                    <AnyNumberSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="subHeadingFontSize"
                        fieldLabel="Subheading Font Size (PX)"
                        fieldSubLabel="Set the font-size in pixel"
                        btColumnSize="col-10"
                        active={true}
                    />
                    <AnyAlignmentSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="textAlignment"
                        fieldLabel="Text Alignment"
                    />
                </>
            );
        case 'control_number':
            return (
                <>
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        isRequired={false}
                        keyName="label"
                        fieldLabel="Field Label"
                        btColumnSize="col-8"
                        active={true}
                    />
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="subLabel"
                        fieldLabel="Sub Label"
                        btColumnSize="col-8"
                        active={true}
                    />
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="defaultValue"
                        fieldLabel="Default Value"
                        btColumnSize="col-8"
                        active={true}
                    />
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="placeholder"
                        fieldLabel="Placeholder"
                        btColumnSize="col-8"
                        active={true}
                    />
                    <AnyCheckboxSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="required"
                        fieldLabel="Required"
                        fieldSubLabel="Prevent submission if this field is empty"
                    />
                    <AnyCheckboxSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="readOnly"
                        fieldLabel="Read Only"
                        fieldSubLabel="This field only read only mood"
                    />
                    <AnyEntryLimitSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        fieldLabel="Character Limit"
                    />
                    <AnyNumberSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="fixedWidth"
                        fieldLabel="Fixed Width (PX)"
                        fieldSubLabel="This width of this field will change according to your form's width."
                        active={true}
                    />
                </>
            );
        case 'control_paragraph':
            return (
                <>
                    <AnyRichEditorSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        isRequired={false}
                        keyName="contents"
                        fieldLabel="Paragraph Text"
                        features="full"
                    />
                </>
            );
        case 'control_short_text':
            return (
                <>
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        isRequired={false}
                        keyName="label"
                        fieldLabel="Field Label"
                        active={true}
                    />
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="subLabel"
                        fieldLabel="Sub Label"
                        active={true}
                    />
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="defaultValue"
                        fieldLabel="Default Value"
                        active={true}
                    />
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="placeholder"
                        fieldLabel="Placeholder"
                        active={true}
                    />
                    <AnyCheckboxSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="required"
                        fieldLabel="Required"
                        fieldSubLabel="Prevent submission if this field is empty"
                    />
                    <AnyCheckboxSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="readOnly"
                        fieldLabel="Read Only"
                        fieldSubLabel="This field only read only mood"
                    />
                    <AnyEntryLimitSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        fieldLabel="Character Limit"
                    />
                    <AnyNumberSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="fixedWidth"
                        fieldLabel="Fixed Width (PX)"
                        fieldSubLabel="This width of this field will change according to your form's width."
                        active={true}
                    />
                </>
            );
        case 'control_phone':
            return (
                <>
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        isRequired={false}
                        keyName="label"
                        fieldLabel="Field Label"
                        active={true}
                    />
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="subLabel"
                        fieldLabel="Sub Label"
                        active={true}
                    />
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="defaultValue"
                        fieldLabel="Default Value"
                        active={true}
                    />
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="placeholder"
                        fieldLabel="Placeholder"
                        active={true}
                    />
                    <AnyCheckboxSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="required"
                        fieldLabel="Required"
                        fieldSubLabel="Prevent submission if this field is empty"
                    />
                    <AnyCheckboxSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="readOnly"
                        fieldLabel="Read Only"
                        fieldSubLabel="This field only read only mood"
                    />
                    <AnyEntryLimitSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        fieldLabel="Character Limit"
                    />
                    <AnyNumberSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="fixedWidth"
                        fieldLabel="Fixed Width (PX)"
                        fieldSubLabel="This width of this field will change according to your form's width."
                        active={true}
                    />
                </>
            );
        case 'control_fullname':
            return (
                <>
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        isRequired={false}
                        keyName="label"
                        fieldLabel="Field Label"
                        active={true}
                    />
                    <AnyCheckboxSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="showMiddleName"
                        fieldLabel="Middle Name"
                        fieldSubLabel="Let users enter a middle name"
                    />
                    <FullnameSubLabelsSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        isRequired={false}
                        keyName="subLabels"
                        fieldLabel="Sub Labels"
                    />
                    <FullnamePlaceholdersSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="placeholders"
                        fieldLabel="Placeholders"
                    />
                    <FullnamePrefixSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        fieldLabel="Prefix"
                    />
                    <AnyOptionsSetting
                        show={properties?.showPrefix === 'Yes' && properties?.prefixMode === "Dropdown"}
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="prefixOptions"
                        fieldLabel="Prefix Options"
                        fieldSubLabel="Enter each option on a new line."
                    />
                    <AnyCheckboxSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="required"
                        fieldLabel="Required"
                        fieldSubLabel="Prevent submission if this field is empty"
                    />
                    <AnyCheckboxSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="readOnly"
                        fieldLabel="Read Only"
                        fieldSubLabel="This field only read only mood"
                    />
                </>
            );
        case 'control_email':
            return (
                <>
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        isRequired={false}
                        keyName="label"
                        fieldLabel="Field Label"
                        active={true}
                    />
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="subLabel"
                        fieldLabel="Sub Label"
                        active={true}
                    />
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="defaultValue"
                        fieldLabel="Default Value"
                        active={true}
                    />
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="placeholder"
                        fieldLabel="Placeholder"
                        active={true}
                    />
                    <AnyCheckboxSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="required"
                        fieldLabel="Required"
                        fieldSubLabel="Prevent submission if this field is empty"
                    />
                    <AnyCheckboxSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="readOnly"
                        fieldLabel="Read Only"
                        fieldSubLabel="This field only read only mood"
                    />
                    <AnyEntryLimitSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        fieldLabel="Character Limit"
                    />
                    <AnyNumberSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="fixedWidth"
                        fieldLabel="Fixed Width (PX)"
                        fieldSubLabel="This width of this field will change according to your form's width."
                        active={true}
                    />
                </>
            );
        case 'control_dropdown':
            return (
                <>
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        isRequired={false}
                        keyName="label"
                        fieldLabel="Field Label"
                        active={true}
                    />
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="subLabel"
                        fieldLabel="Sub Label"
                        active={true}
                    />
                    <AnyCheckboxSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="required"
                        fieldLabel="Required"
                        fieldSubLabel="Prevent submission if this field is empty"
                    />
                    <AnyOptionsSetting
                        show={true}
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        isRequired={true}
                        keyName="options"
                        fieldLabel="Options"
                        fieldSubLabel="Enter each option on a new line."
                    />
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="defaultSelected"
                        fieldLabel="Default Selected"
                        active={true}
                    />
                    <AnyNumberSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="fixedWidth"
                        fieldLabel="Fixed Width (PX)"
                        fieldSubLabel="This width of this field will change according to your form's width."
                        active={true}
                    />
                </>
            );
        case 'control_single_choice':
            return (
                <>
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        isRequired={false}
                        keyName="label"
                        fieldLabel="Field Label"
                        active={true}
                    />
                    <AnyOptionsSetting
                        show={true}
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        isRequired={true}
                        keyName="options"
                        fieldLabel="Options"
                        fieldSubLabel="Enter each option on a new line."
                    />
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="defaultChecked"
                        fieldLabel="Default Checked"
                        btColumnSize='col-md-12'
                        active={true}
                    />
                    <AnyCheckboxSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="required"
                        fieldLabel="Required"
                        fieldSubLabel="Prevent submission if this field is empty"
                    />
                </>
            );
        case 'control_multiple_choice':
            return (
                <>
                    <AnyTextSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        isRequired={false}
                        keyName="label"
                        fieldLabel="Field Label"
                        active={true}
                    />
                    <AnyOptionsSetting
                        show={true}
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        isRequired={true}
                        keyName="options"
                        fieldLabel="Options"
                        fieldSubLabel="Enter each option on a new line."
                    />
                    <AnyOptionsSetting
                        show={true}
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        isRequired={false}
                        keyName="defaultChecked"
                        fieldLabel="Default Checked"
                        fieldSubLabel="Enter each option on a new line."
                    />
                    <AnyCheckboxSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="required"
                        fieldLabel="Required"
                        fieldSubLabel="Prevent submission if this field is empty"
                    />
                </>
            );
        case 'control_button':
            return (
                <>
                    <AnyAlignmentSetting
                        qid={qid}
                        properties={properties}
                        onChangeProperty={onChangeProperty}
                        setSyncData={setSyncData}
                        keyName="buttonAlign"
                        fieldLabel="Button Alignment"
                    />
                </>
            );
        default:
            return 'Nothing found!';
    }
}