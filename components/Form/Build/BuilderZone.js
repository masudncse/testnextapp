import React, {useState} from "react";
import ControlSwitcher from "../../Controls/ControlSwitcher";
import {useRouter} from "next/router";
import DropZoneContainer from "./DropZoneContainer";
import {getApiImagePath, swalConfirmPopup, tostify} from "../../../utils/helpers";
import {syncForm} from "../../../services/FormServices";
import {toast} from "react-toastify";

const BuilderZone = ({form, dragKey, dropKey, onControlSettings, onDropNewControl, onRemove, onDragStart, onDragEnter, onDragEnd, isHistoryPage, isEditable, styles}) => {
    const router = useRouter();
    const {id: formId} = router.query;

    const {selectedQuestions, setSelectedQuestions} = useState([]);
    const {questions, properties} = form;

    const [preview, setPreview] = useState(false);
    const [device, setDevice] = useState('phone');

    const handleRollback = (event) => {
        event.preventDefault();

        swalConfirmPopup((isConfirm) => {
            if (isConfirm) {
                syncForm(formId, {
                    ...form,
                    subject: "Rollback"
                }).then((response) => {
                    if (response?.data?.status) {
                        tostify(toast, 'success', response);

                        setTimeout(() => {
                            router.push(`/form/${formId}/build`);
                        }, 200);
                    }
                });
            }
        })
    }

    const handleStyleSetting = (event) => {
        event.preventDefault();

        if (!isHistoryPage) {
            onControlSettings(event, '', 'control_styles', {});
        }
    }

    const handleLogoSetting = (event) => {
        event.preventDefault();

        if (!isHistoryPage) {
            onControlSettings(event, '', 'control_logo', {});
        }
    }

    const handleSelectedQuestions = (event, qid) => {
        /*let mySelectedQuestions = [...selectedQuestions];
        mySelectedQuestions.push(qid);

        mySelectedQuestions = new Set(mySelectedQuestions);
        setSelectedQuestions(mySelectedQuestions);*/
    }

    return (
        <>

            {/*Rollback*/}
            {isHistoryPage && !_.isEmpty(form) && (
                <div className="row">
                    <div className="col-12">
                        <button type="button" className="btn btn-success"
                                onClick={(event) => handleRollback(event)}>Rollback
                        </button>
                    </div>
                </div>
            )}

            {/*Preview*/}
            {!isHistoryPage && (
                <div className="row">
                    <div className="col-12 text-end">
                        {preview && (
                            <div className="btn-group btn-group-sm me-2" role="group" aria-label="Basic example">
                                <button type="button"
                                        className={`btn btn-outline-dark ${device === 'phone' ? 'active' : ''} px-4 mb-0`}
                                        onClick={() => setDevice('phone')}>
                                    <i className="fa fa-mobile-phone" style={{fontSize: '0.725rem'}}/>
                                </button>
                                <button type="button"
                                        className={`btn btn-outline-dark ${device === 'tablet' ? 'active' : ''} px-4 mb-0`}
                                        onClick={() => setDevice('tablet')}>
                                    <i className="fa fa-tablet" style={{fontSize: '0.725rem'}}/>
                                </button>
                            </div>
                        )}

                        <button type="button" className="btn btn-success btn-sm px-3 mb-0 me-2"
                                onClick={() => setPreview((prevState) => !prevState)}>
                            <i className="fa fa-eye me-2"/> Preview
                        </button>
                        <button type="button" className="btn btn-simple btn-sm text-danger px-3 mb-0"
                                onClick={(event) => handleStyleSetting(event)}>
                            <i className="fa fa-paint-brush me-2"/> Styles
                        </button>
                    </div>
                </div>
            )}

            {/*Logo*/}
            <div className={`row  ${preview ? 'd-none' : ''} mt-4`}>
                <div className="col-12">
                    <div className="logo text-center mb-3">
                        <div style={{textAlign: form?.logo?.alignment}}>
                            <img src={getApiImagePath(form?.logo?.path)}
                                 width={form?.logo?.size ? form.logo.size + 'px' : '120px'} alt="logo"
                                 className="cursor-pointer"
                                 onClick={(event) => handleLogoSetting(event)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/*iFrame*/}
            {preview && (
                <div className="text-center mt-4">
                    <iframe src={`/form/${formId}`} className="preview vh-100"
                            width={device === 'tablet' ? '767' : device === 'phone' ? '480' : ''}/>
                </div>
            )}

            <div className={`builder-zone nice-scroll ${isHistoryPage ? ' disabled' : ''} ${preview ? 'd-none' : ''}`}>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body p-3">
                                <div className="row">
                                    <div className="col-12 p-4"
                                         onDragOver={(event) => event.preventDefault()}
                                         onDrop={onDropNewControl}>

                                        {/*Drop Container*/}
                                        <DropZoneContainer
                                            isHistoryPage={isHistoryPage}
                                            questions={questions}
                                        />

                                        {/*Loop on Questions*/}
                                        {!_.isEmpty(questions) &&
                                        questions.map((question, key) => {
                                            return (
                                                <div key={key}
                                                     draggable={true}
                                                     className={`builder-item control-item ${question?.type} active ${(dragKey === key) ? 'drag-item' : ''} ${(dropKey === key) ? 'drop-item' : ''}`}
                                                     onDragStart={() => onDragStart(key)}
                                                     onDragEnter={() => onDragEnter(key)}
                                                     onDragOver={(event) => event.preventDefault()}
                                                     onDragEnd={onDragEnd}
                                                     onClick={(event) => handleSelectedQuestions(event, question?.qid)}
                                                >

                                                    {/*Setting Buttons*/}
                                                    {!isHistoryPage && (
                                                        <div className='btn-wrapper'>
                                                            <button type="button" className="btn btn-primary"
                                                                    onClick={(event) =>
                                                                        onControlSettings(event, question?.qid, question?.type, properties?.[question.qid])
                                                                    }>
                                                                <i className="fa fa-cog me-2"/> Setting
                                                            </button>
                                                            <button type="button" className="btn btn-danger"
                                                                    onClick={(event) => onRemove(event, question.qid)}>
                                                                <i className="fa fa-remove me-2"/> Remove
                                                            </button>
                                                        </div>
                                                    )}

                                                    {/*Thumb Dotted*/}
                                                    {!isHistoryPage && (
                                                        <div className="drag-thumb">
                                                            <i className="fa fa-ellipsis-v"/>
                                                            <i className="fa fa-ellipsis-v"/>
                                                        </div>
                                                    )}

                                                    {/*Control Switcher*/}
                                                    <ControlSwitcher
                                                        qid={question?.qid}
                                                        type={question?.type}
                                                        properties={properties?.[question.qid]}
                                                        isEditable={isEditable}
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BuilderZone;
