import React, {useEffect, useState} from "react";
import Head from "next/head";
import FormLayout from "../../../components/Layout/FormLayout";
import {SET_BREADCRUMB} from "../../../store/slices/themeSlice";
import {useDispatch} from "react-redux";
import {
    batchDeleteSubmission,
    batchRestoreSubmission,
    deleteSubmission,
    fetchTrashedSubmissionsByFormId,
    restoreSubmission
} from "../../../services/SubmissionServices";
import {fetchForm} from "../../../services/FormServices";
import {useRouter} from "next/router";
import CustomPagination from "../../../components/Common/CustomPagination";
import {swalConfirmPopup, tostify} from "../../../utils/helpers";
import {toast} from "react-toastify";
import ViewDataByControlType from "../../../components/Common/ViewDataByControlType";
import SLNChange from "../../../components/Common/SLNChange";
import DataCountInfo from "../../../components/Common/DataCountInfo";

const SubmissionTrashListPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const {formId} = router.query;

    const [form, setForm] = useState({});
    const [questions, setQuestions] = useState([]);
    const [submissions, setSubmissions] = useState([]);

    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);

    const [meta, setMeta] = useState({})
    const [page, setPage] = useState('')

    const [checked, setChecked] = useState([]);

    // Breadcrumb
    useEffect(() => {
        dispatch(SET_BREADCRUMB({
            parentPage: {
                pageTitle: "Submissions",
                pageLink: `/submission/${formId}/list`
            },
            currentPage: "Trashed Submissions",
            pageTitle: "All Trashed Submissions"
        }))
    }, [formId]);

    // Fetch form data
    useEffect(() => {
        if (formId) {
            fetchForm(formId).then((response) => {
                if (response?.data) {
                    const data = response.data;

                    setForm(data);
                    setQuestions(data.questions);
                }
            })
        }
    }, [formId]);

    /**
     * Fetch submission by formId
     */
    useEffect(() => {
        if (formId) {
            fetchTrashedSubmissionData(formId);
        }
    }, [formId]);

    // Table Data
    useEffect(() => {
        /*Columns*/
        let myColumns = [
            {
                key: 'created_at',
                label: 'Submission Date',
                type: 'date',
                visible: true,
            },
            {
                key: 'ip',
                label: 'Submission IP',
                type: '',
                visible: true,
            },
            {
                key: 'updated_at',
                label: 'Last Update Date',
                type: 'date',
                visible: true,
            },
            {
                key: 'id',
                label: 'Submission ID',
                type: '',
                visible: true,
            }
        ]
        questions.forEach((question) => {
            const property = form.properties[question.qid];
            if (property.label) {
                myColumns.push({
                    key: question.qid,
                    label: property.label,
                    type: question.type,
                    visible: true,
                })
            }
        })
        setColumns(myColumns);

        /*Rows*/
        let myRows = [];
        submissions.forEach((submission) => {
            let data = {
                ...submission,
            }

            questions.forEach((question) => {
                let property = submission.properties[question.qid];
                data[question.qid] = property?.value;
            })

            myRows.push(data)
        });
        setRows(myRows);
    }, [form, questions, submissions])

    // Paginate
    useEffect(() => {
        if (page) {
            setChecked([]);
            fetchTrashedSubmissionData(formId, {
                page: page,
            });
        }
    }, [page]);

    const fetchTrashedSubmissionData = (formId, params = {}) => {
        fetchTrashedSubmissionsByFormId(formId, params).then((response) => {
            if (response?.data?.data) {
                const data = response.data;

                setSubmissions(data.data);
                setMeta(data.meta);
                setPage(data.page);
            }
        })
    }

    const handleRestore = (event, id) => {
        event.preventDefault();

        swalConfirmPopup((isConfirm) => {
            if (isConfirm) {
                restoreSubmission(id).then((response) => {
                    if (response?.data?.status) {
                        tostify(toast, 'info', response);
                        fetchTrashedSubmissionData(formId);
                    }
                });
            }
        });
    }

    const handleDelete = (event, id) => {
        event.preventDefault();

        swalConfirmPopup((isConfirm) => {
            if (isConfirm) {
                deleteSubmission(id).then((response) => {
                    if (response?.data?.status) {
                        tostify(toast, 'info', response);
                        fetchTrashedSubmissionData(formId);
                    }
                });
            }
        });
    }

    const handleCheckbox = (event, value) => {
        let updatedList = [...checked];

        if (event.target.checked) {
            updatedList.push(value);
        } else {
            updatedList.splice(checked.indexOf(value), 1);
        }

        updatedList = [...new Set(updatedList)];
        setChecked(updatedList);
    }

    const handleCheckAll = () => {
        let checkboxes = document.getElementsByClassName('row-checkbox');

        let updatedList = [...checked];
        for (let i = 0, n = checkboxes.length; i < n; i++) {
            updatedList.push(checkboxes[i].value);
        }

        updatedList = [...new Set(updatedList)];
        setChecked(updatedList);
    }

    const handleBatchRestore = (event) => {
        event.preventDefault();

        swalConfirmPopup((isConfirm) => {
            if (isConfirm) {
                batchRestoreSubmission({
                    ids: checked
                }).then((response) => {
                    if (response?.data?.status) {
                        tostify(toast, 'info', response);
                        fetchTrashedSubmissionData(formId);
                        setChecked([]);
                    }
                });
            }
        });
    }

    const handleBatchDelete = (event) => {
        event.preventDefault();

        swalConfirmPopup((isConfirm) => {
            if (isConfirm) {
                batchDeleteSubmission({
                    ids: checked
                }).then((response) => {
                    if (response?.data?.status) {
                        tostify(toast, 'info', response);
                        fetchTrashedSubmissionData(formId);
                        setChecked([]);
                    }
                });
            }
        });
    }

    return (
        <FormLayout>
            <Head>
                <title>Trashed Submissions</title>
            </Head>
            <div className="submission">
                <div className="row">
                    <div className="col-md-12 mb-4">
                        <div className="card mb-4">
                            <div className="card-header pb-0">
                                <div className="row">
                                    <div className="col-2">
                                        <h6 className="mb-0">Trashed Submissions</h6>
                                        <p className="text-xs text-secondary mb-0 font-weight-bold">
                                            <DataCountInfo meta={meta}/>
                                        </p>
                                    </div>
                                    <div className="col-9">
                                        {checked.length > 0 && (
                                            <div className="d-flex">
                                                <button type="button" className="btn btn-outline-secondary me-2"
                                                        onClick={(event) => handleCheckAll(event)}>
                                                    <i className="fa fa-check me-2 text-success"/>
                                                    Check All
                                                </button>
                                                <button type="button" className="btn btn-outline-secondary me-2">
                                                    {checked.length} Entries Selected
                                                    <span className="badge bg-danger ms-2" onClick={(event) => {
                                                        event.preventDefault();
                                                        event.stopPropagation();
                                                        setChecked([]);
                                                    }}>
                                                        <i className="fa fa-remove"/>
                                                    </span>
                                                </button>
                                                <button type="button" className="btn btn-outline-success me-2"
                                                        onClick={(event) => handleBatchRestore(event)}>
                                                    <i className="fa fa-refresh me-2"/> Restore
                                                </button>
                                                <button type="button" className="btn btn-outline-danger"
                                                        onClick={(event) => handleBatchDelete(event)}>
                                                    <i className="fa fa-trash-o me-2"/> Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">
                                <div className="table-responsive nice-scroll p-0 min-vh-50">
                                    <table className="table align-items-center mb-0">
                                        <thead>
                                        <tr>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 w-9">
                                                Actions
                                            </th>
                                            {columns.map((column, index) => {
                                                if (column.visible) {
                                                    return <th key={index}
                                                               className={`text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2`}>
                                                        {column.label}
                                                    </th>
                                                }
                                            })}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {rows.map((row, index) => {
                                            return <tr key={index}>
                                                <td className="actions text-xs font-weight-bold w-6">
                                                    <div
                                                        className="d-flex justify-content-around align-items-center ps-2">
                                                        <div className="d-flex align-items-center">
                                                            <div className="form-check mb-0"
                                                                 style={{minHeight: '0'}}>
                                                                <input className="form-check-input row-checkbox"
                                                                       type="checkbox"
                                                                       value={row.id}
                                                                       checked={checked.includes(row.id.toString())}
                                                                       onChange={(event) => handleCheckbox(event, event.target.value)}/>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <SLNChange startFrom={meta.from} currentIndex={index}
                                                                       className="me-2"/>
                                                        </div>
                                                        <div className="icon me-2"
                                                             onClick={(event) => handleRestore(event, row.id)}>
                                                            <i className="fa fa-refresh text-success"
                                                               style={{fontSize: '0.75rem'}}/>
                                                        </div>
                                                        <div className="icon"
                                                             onClick={(event) => handleDelete(event, row.id)}>
                                                            <i className="fa fa-trash-o text-danger"/>
                                                        </div>
                                                    </div>
                                                </td>

                                                {columns.map((column, index) => {
                                                    if (column.visible) {
                                                        return <td key={index} className="text-xs font-weight-bold">
                                                            <ViewDataByControlType
                                                                type={column['type']}
                                                                value={row[column['key']]}
                                                            />
                                                        </td>
                                                    }
                                                })}
                                            </tr>
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-md-12">
                                        <div className="d-flex justify-content-center">
                                            <CustomPagination meta={meta} setPage={setPage}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FormLayout>
    )
}

export default SubmissionTrashListPage;
