import React, {useEffect, useState} from "react";
import Head from "next/head";
import FormLayout from "../../../components/Layout/FormLayout";
import BuilderZone from "../../../components/Form/Build/BuilderZone";
import ControlNavigation from "../../../components/Form/Build/ControlNavigation";
import withAuth from "../../../utils/hooks/withAuth";
import {useDispatch} from "react-redux";
import {SET_BREADCRUMB} from "../../../store/slices/themeSlice";
import MiniHeader from "../../../components/Form/MiniHeader";
import {useEffectOnce} from "../../../utils/hooks/useEffectOnce";
import {useRouter} from "next/router";
import {fetchForm, syncForm} from "../../../services/FormServices";
import PropertySetting from "../../../components/Form/Build/PropertySetting";
import {makeRandomString, swalConfirmPopup, tostify} from "../../../utils/helpers";
import {toast} from "react-toastify";

const FormBuilderPage = () => {
    const dispatch = useDispatch();

    const router = useRouter();
    const {id: formId} = router.query;

    const [syncData, setSyncData] = useState({});
    const [styles, setStyles] = useState('');

    const [dragKey, setDragKey] = useState('');
    const [dropKey, setDropKey] = useState('');

    const [form, setForm] = useState({
        id: '',
        client_id: '',
        title: '',
        logo: {},
        questions: [],
        properties: {},
        status: '',
        warning_message: '',
        expiry_date: '',
        expiry_time: '',
        action_after_submission: '',
        thank_you_page_content: '',
        redirect_link: '',
        deleted_at: '',
        created_at: '',
        updated_at: '',
    });
    const [dragNewControl, setDragNewControl] = useState({
        type: '',
        properties: {}
    });
    const [controlSettings, setControlSettings] = useState({
        qid: '',
        type: '',
        properties: {}
    });

    // Breadcrumb
    useEffectOnce(() => {
        dispatch(SET_BREADCRUMB({
            parentPage: {
                pageTitle: "Forms",
                pageLink: '/form/list'
            },
            currentPage: "Form Builder",
            pageTitle: "Build Your Desire Form"
        }));
    });

    // Fetch Dorm Data
    useEffect(() => {
        if (!_.isUndefined(formId)) {
            fetchForm(formId).then((response) => {
                if (response?.data) {
                    setForm(response.data);
                }
            });
        }
    }, [formId]);

    // Sync
    useEffect(() => {
        if (!_.isUndefined(formId) &&
            !_.isEmpty(form) &&
            !_.isEmpty(syncData?.subject)) {

            syncForm(formId, {
                questions: form?.questions ?? [],
                properties: form?.properties ?? {},
                subject: syncData?.subject
            }).then((response) => {
                if (response?.data?.status) {
                    tostify(toast, 'success', response);
                    setSyncData({});
                }
            });
        }
    }, [formId, form, syncData]);

    const handleAddNewControl = (type, properties) => {
        const qid = makeRandomString();

        const newQuestion = {
            qid: qid,
            type: type
        }

        const myForm = {...form};

        if (_.isEmpty(myForm.properties)) {
            myForm.properties = {};
        }

        if (!_.isEmpty(type) && !_.isEmpty(properties)) {
            myForm.questions = [...myForm.questions, newQuestion];
            myForm.properties[qid] = properties;
        }

        setForm(myForm);
        setControlSettings({});

        setSyncData({
            subject: "Add New Click Question"
        });
    }

    const handleDragNewControl = (type, properties) => {
        setDragNewControl({type, properties});
    }

    const handleDropNewControl = () => {
        if (_.isEmpty(dragNewControl)) return false

        const qid = makeRandomString();
        const {type, properties} = dragNewControl;

        const newQuestion = {
            qid: qid,
            type: type
        }

        const myForm = {...form};
        const copyQuestions = [...myForm.questions];

        if (_.isEmpty(myForm.properties)) {
            myForm.properties = {};
        }

        if (!_.isEmpty(type) && !_.isEmpty(properties) && !_.isUndefined(dropKey)) {
            copyQuestions.splice(dropKey, 0, newQuestion);

            myForm.questions = copyQuestions;
            myForm.properties[qid] = properties;
        }

        setForm(myForm);
        setControlSettings({});

        setSyncData({
            subject: 'Add New Drop Question'
        });

        setTimeout(() => {
            setDragNewControl({});
            setDragKey('');
            setDropKey('');
        });
    }

    const handleDragStart = (key) => {
        setDragKey(key);
    }

    const handleDragEnter = (key) => {
        setDropKey(key);
    }

    const handleDragEnd = () => {
        const myForm = {...form};
        const copyQuestions = [...myForm.questions];
        const dragItem = copyQuestions[dragKey]

        if (!_.isUndefined(dragKey) && !_.isUndefined(dropKey)) {
            copyQuestions.splice(dragKey, 1);
            copyQuestions.splice(dropKey, 0, dragItem)

            myForm.questions = copyQuestions;
        }

        setForm(myForm);
        setControlSettings({});

        setSyncData({
            subject: "Sort Order"
        });

        setTimeout(() => {
            setDragKey('');
            setDropKey('');
        })
    }

    const handleRemove = (event, qid) => {
        event.preventDefault();

        swalConfirmPopup((isConfirm) => {
            if (isConfirm) {
                const myForm = {...form};
                myForm.questions = myForm.questions.filter((question) => {
                    if (question.qid !== qid) {
                        return true;
                    }
                });

                if (myForm.properties?.[qid]) {
                    delete myForm.properties[qid];
                }

                setForm(myForm);
                setControlSettings({});

                setSyncData({
                    subject: "Remove"
                });
            }
        })
    }

    const handleControlSettings = (event, qid, type, properties) => {
        event.preventDefault();

        setControlSettings({
            qid: qid,
            type: type,
            properties: properties
        })
    }

    const handleResetControlSetting = () => {
        setControlSettings({});
    }

    const handleChangeSettingProperty = (qid, key, value) => {
        const myForm = {...form};
        const myControlSettings = {...controlSettings};

        myForm.properties[qid][key] = value;
        setForm(myForm);

        myControlSettings.properties = myForm.properties[qid];
        setControlSettings(myControlSettings)
    }

    return (
        <FormLayout>
            <Head>
                <title>Builder</title>
            </Head>

            {form?.stylesheet_link && (
                <link rel="stylesheet" href={form?.stylesheet_link}/>
            )}

            {/*Live Style*/}
            <style type="text/css">
                {`${styles}`}
            </style>

            <div className="form">
                <div className="build">
                    <div className="row">
                        {/*Mini Header*/}
                        <div className="col-12 px-4 mb-4">
                            <MiniHeader
                                form={form}
                                setForm={setForm}
                            />
                        </div>

                        {/*Control Navigation*/}
                        <div className="col-md-3">
                            <ControlNavigation
                                onAddNewControl={handleAddNewControl}
                                onDragNewControl={handleDragNewControl}
                            />
                        </div>

                        {/*Builder Zone*/}
                        <div className="col-md-6">
                            <BuilderZone
                                form={form}
                                dragKey={dragKey}
                                dropKey={dropKey}
                                onDragStart={handleDragStart}
                                onDragEnter={handleDragEnter}
                                onDragEnd={handleDragEnd}
                                onRemove={handleRemove}
                                onDropNewControl={handleDropNewControl}
                                onControlSettings={handleControlSettings}
                                isEditable={false}
                                styles={styles}
                            />
                        </div>

                        {/*Property Setting*/}
                        <div className="col-md-3">
                            <PropertySetting
                                controlSettings={controlSettings}
                                onChangeProperty={handleChangeSettingProperty}
                                setSyncData={setSyncData}
                                setControlSettings={setControlSettings}
                                form={form}
                                setForm={setForm}
                                setStyles={setStyles}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </FormLayout>
    )
}

export default withAuth(FormBuilderPage);