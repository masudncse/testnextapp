import React, {useEffect, useState} from "react";
import Head from "next/head";
import Link from "next/link";
import FormLayout from "../../../components/Layout/FormLayout";
import {Dropdown} from "react-bootstrap";
import {SET_BREADCRUMB} from "../../../store/slices/themeSlice";
import {useDispatch} from "react-redux";
import {
    batchFavouriteSubmission,
    batchReadSubmission,
    batchTrashSubmission,
    favouriteSubmission,
    fetchSubmissionsByFormId,
    readSubmission,
    trashSubmission
} from "../../../services/SubmissionServices";
import {fetchForm} from "../../../services/FormServices";
import {useRouter} from "next/router";
import CustomPagination from "../../../components/Common/CustomPagination";
import {useEffectOnce} from "../../../utils/hooks/useEffectOnce";
import {swalConfirmPopup, tostify} from "../../../utils/helpers";
import {toast} from "react-toastify";
import moment from "moment";
import {CSVLink} from "react-csv";
import ViewDataByControlType from "../../../components/Common/ViewDataByControlType";
import SLNChange from "../../../components/Common/SLNChange";
import DataCountInfo from "../../../components/Common/DataCountInfo";

const SubmissionListPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const {formId} = router.query

    const [form, setForm] = useState({})
    const [questions, setQuestions] = useState([]);

    const [submissions, setSubmissions] = useState([]);
    const [submission, setSubmission] = useState({});
    const [currentKey, setCurrentKey] = useState('');

    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);

    const [csvData, setCsvData] = useState([
        ["firstname", "lastname", "email"],
        ["Ahmed", "Tomi", "ah@smthing.co.com"],
        ["Raed", "Labes", "rl@smthing.co.com"],
        ["Yezzi", "Min l3b", "ymin@cocococo.com"]
    ]);

    const [meta, setMeta] = useState({})
    const [page, setPage] = useState('');

    const [keyword, setKeyword] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const [checked, setChecked] = useState([]);

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

        const skipColumns = ['control_image'];
        questions.forEach((question) => {
            const property = form.properties[question.qid];
            if (property.label && !skipColumns.includes(property.type)) {
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

    // CSV Data
    useEffect(() => {
        if (!_.isEmpty(columns) && !_.isEmpty(rows)) {
            let csvColumns = [];
            columns.forEach((column) => {
                if (column.visible) {
                    csvColumns.push(column.label);
                }
            });

            let csvRows = [];
            rows.forEach((row) => {
                let tmpCsvRow = []
                columns.forEach((column) => {
                    if (column.visible) {
                        tmpCsvRow.push(row[column['key']]);
                    }
                })

                csvRows.push(tmpCsvRow);
            })

            setCsvData([csvColumns, ...csvRows]);
        }
    }, [columns, rows])

    // Breadcrumb
    useEffectOnce(() => {
        dispatch(SET_BREADCRUMB({
            parentPage: {
                pageTitle: "Forms",
                pageLink: '/form/list'
            },
            currentPage: "Submissions",
            pageTitle: "All Submissions"
        }))
    });

    // Fetch Form Data
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
     * Fetch Submissions By formId
     */
    useEffect(() => {
        if (formId) {
            fetchSubmissionData(formId);
        }
    }, [formId]);

    // Paginate
    useEffect(() => {
        if (page) {
            setChecked([]);
            fetchSubmissionData(formId, {
                page: page,
                keyword: keyword,
                date_from: dateFrom,
                date_to: dateTo,
            });
        }
    }, [page]);

    const handleViewInModal = (event, key) => {
        event.preventDefault();

        setCurrentKey(key)
        setSubmission(rows[key]);

        let myModal = new bootstrap.Modal(document.getElementById('myModal'));
        myModal.toggle();
    }

    const handleCloseModal = () => {
        setSubmission({});
        setCurrentKey('');
    }

    const handlePreviousSubmission = () => {
        let myCurrentKey = currentKey - 1;
        if (myCurrentKey < 0) {
            return alert("Wait")
        }

        setCurrentKey(myCurrentKey);

        setSubmission(rows[myCurrentKey]);
    }

    const handleNextSubmission = () => {
        let myCurrentKey = currentKey + 1;

        if (myCurrentKey > submissions.length - 1) {
            return alert("Wait")
        }

        setCurrentKey(myCurrentKey);

        setSubmission(rows[myCurrentKey]);
    }


    const fetchSubmissionData = (formId, params = {}) => {
        fetchSubmissionsByFormId(formId, params).then((response) => {
            if (response?.data?.data) {
                const data = response.data;

                setSubmissions(data.data);
                setMeta(data.meta)
                setPage(data.page)
            }
        })
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

    const handleSearch = (event) => {
        event.preventDefault();

        fetchSubmissionData(formId, {
            keyword: keyword,
            date_from: dateFrom,
            date_to: dateTo,
        });
    }

    const handleTrash = (event, id) => {
        event.preventDefault();

        swalConfirmPopup((isConfirm) => {
            if (isConfirm) {
                trashSubmission(id).then((response) => {
                    if (response?.data?.status) {
                        tostify(toast, 'info', response);
                        fetchSubmissionData(formId);
                    }
                });
            }
        });
    }

    const handleRead = (event, id) => {
        event.preventDefault();

        readSubmission(id).then((response) => {
            if (response?.data?.status) {
                tostify(toast, 'info', response);
                fetchSubmissionData(formId);
            }
        });
    }

    const handleFavourite = (event, id) => {
        event.preventDefault();

        favouriteSubmission(id).then((response) => {
            if (response?.data?.status) {
                tostify(toast, 'info', response);
                fetchSubmissionData(formId);
            }
        });
    }

    const handleBatchFavourite = (event, isFavourite) => {
        event.preventDefault();

        batchFavouriteSubmission({
            ids: checked,
            is_favourite: isFavourite
        }).then((response) => {
            if (response?.data?.status) {
                tostify(toast, 'info', response);
                fetchSubmissionData(formId);
            }
        });
    }

    const handleBatchRead = (event, isRead) => {
        event.preventDefault();

        batchReadSubmission({
            ids: checked,
            is_read: isRead
        }).then((response) => {
            if (response?.data?.status) {
                tostify(toast, 'info', response);
                fetchSubmissionData(formId);
            }
        });
    }

    const handleBatchTrash = (event) => {
        event.preventDefault();

        swalConfirmPopup((isConfirm) => {
            if (isConfirm) {
                batchTrashSubmission({
                    ids: checked
                }).then((response) => {
                    if (response?.data?.status) {
                        tostify(toast, 'info', response);
                        setChecked([]);
                        fetchSubmissionData(formId);
                    }
                });
            }
        });
    }

    const handleVisibility = (event, key) => {
        let myColumns = [...columns];
        myColumns[key]['visible'] = !myColumns[key]['visible'];

        setColumns(myColumns);
    }

    const handleSelectAllColumns = (event) => {
        let myColumns = [...columns];

        if (event.target.checked) {
            myColumns = myColumns.filter((column) => {
                column.visible = true;
                return column;
            })
        } else {
            myColumns = myColumns.filter((column) => {
                column.visible = false;
                return column;
            })
        }

        setColumns(myColumns);
    }

    const handleSearchColumn = (event) => {

        let keyword = event.target.value.toLowerCase() ?? '';

        let columnList = document.getElementsByClassName('column-list-item');

        for (let i = 0; i < columnList.length; i++) {
            let columnLabel = columnList?.[i]?.childNodes?.[0]?.firstChild?.value.toLowerCase() ?? '';

            if (columnLabel.includes(keyword)) {
                columnList[i].style.display = 'block';
            } else {
                columnList[i].style.display = 'none';
            }
        }
    }

    return (
        <FormLayout>
            <Head>
                <title>All Submissions</title>
            </Head>
            <div className="submission">
                <div className="row">
                    {/*Search*/}
                    <div className="col-12">
                        <div className="card mb-4">
                            <div className="card-header pb-0">
                                <h6 className="text-lg">Search</h6>
                            </div>
                            <div className="card-body px-0 pt-0 pb-2 px-4 mb-3">
                                <form onSubmit={(event) => handleSearch(event)}>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <label htmlFor="keyword" className="form-label">Keyword</label>
                                            <div className="input-group text-body">
                                            <span className="input-group-text">
                                                <i className="fa fa-search"/>
                                            </span>
                                                <input type="search" name="keyword" id="keyword"
                                                       className="form-control"
                                                       placeholder="Type here..."
                                                       onChange={(event) => setKeyword(event.target.value)}/>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <label htmlFor="date" className="form-label">
                                                Date Range (from - to)
                                            </label>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <input type="date" name="date_from" className="form-control"
                                                           id="date"
                                                           onChange={(event) => setDateFrom(event.target.value)}/>
                                                </div>
                                                <div className="col-md-6">
                                                    <input type="date" name="date_to" className="form-control"
                                                           onChange={(event) => setDateTo(event.target.value)}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-1">
                                            <label className="form-label">&nbsp;</label>
                                            <button type="submit" className="btn btn-primary d-block">Search</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/*Table*/}
                    <div className="col-md-12 mb-4">
                        <div className="card mb-4">
                            <div className="card-header pb-0">
                                <div className="row">
                                    <div className="col-2">
                                        <h6 className="mb-0">All Submissions</h6>
                                        <p className="text-xs text-secondary mb-0 font-weight-bold">
                                            <DataCountInfo meta={meta}/>
                                        </p>
                                    </div>

                                    {/*Batch Operation*/}
                                    <div className="col-6">
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
                                                <div className="dropdown me-2">
                                                    <button className="btn btn-outline-primary dropdown-toggle"
                                                            type="button"
                                                            id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                                            aria-expanded="false">
                                                        <i className="fa fa-star me-2"/> Favourite
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                        <li>
                                                            <button type="button" className="dropdown-item"
                                                                    onClick={(event) => handleBatchFavourite(event, '1')}>
                                                                Favourite
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button type="button" className="dropdown-item"
                                                                    onClick={(event) => handleBatchFavourite(event, '0')}>
                                                                Unfavourite
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="dropdown me-2">
                                                    <button className="btn btn-outline-dark dropdown-toggle"
                                                            type="button"
                                                            id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                                            aria-expanded="false">
                                                        <i className="fa fa-envelope me-2"/> Read
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                        <li>
                                                            <button type="button" className="dropdown-item"
                                                                    onClick={(event) => handleBatchRead(event, '1')}>
                                                                Mark as Read
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button type="button" className="dropdown-item"
                                                                    onClick={(event) => handleBatchRead(event, '0')}>
                                                                Mark as Unread
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <button type="button" className="btn btn-outline-danger me-2"
                                                        onClick={(event) => handleBatchTrash(event)}>
                                                    <i className="fa fa-trash-o me-2"/> Trash
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/*Short Links*/}
                                    <div className="col-4">
                                        <div className="d-flex justify-content-end">
                                            <div className="dropdown columns me-2">
                                                <button className="btn btn-outline-dark dropdown-toggle" type="button"
                                                        id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                                        aria-expanded="false">
                                                    <i className="fa fa-eye me-2"/> Columns
                                                </button>
                                                <div className="dropdown-menu">
                                                    <div className="columns-inner">
                                                        <div className="row align-items-center">
                                                            <div className="col-md-12">
                                                                <h5 className="text-sm mb-2">
                                                                    Show/Hide Columns
                                                                </h5>
                                                            </div>
                                                            <div className="col-12 mb-3 py-2 border-bottom border-top">
                                                                <div className="row">
                                                                    <div className="col-md-7">
                                                                        <div className="input-group">
                                                                            <span className="input-group-text">
                                                                                <i className="fa fa-search"/>
                                                                            </span>
                                                                            <input type="search"
                                                                                   className="form-control form-control-sm"
                                                                                   placeholder="Search here..."
                                                                                   onChange={(event) => handleSearchColumn(event)}/>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="col-md-5 d-flex justify-content-end">
                                                                        <div className="form-check">
                                                                            <input className="form-check-input"
                                                                                   type="checkbox"
                                                                                   onChange={(event) => handleSelectAllColumns(event)}/>
                                                                            <label className="form-check-label">
                                                                                Select All
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <ul className="column-list">
                                                                    {columns.map((column, key) => {
                                                                        return <li key={key}
                                                                                   className="column-list-item">
                                                                            <div className="form-check">
                                                                                <input type="checkbox"
                                                                                       className="form-check-input"
                                                                                       id={`id_${key}`}
                                                                                       checked={column.visible}
                                                                                       value={column.label}
                                                                                       onChange={(event) => handleVisibility(event, key)}/>
                                                                                <label className="form-check-label"
                                                                                       htmlFor={`id_${key}`}>
                                                                                    {column.label}
                                                                                </label>
                                                                            </div>
                                                                        </li>
                                                                    })}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="button" className="btn btn-outline-danger me-2"
                                                    onClick={() => {
                                                        router.push(`/submission/${formId}/trash-list`);
                                                    }}>
                                                <i className="fa fa-list me-2"/> Trash List
                                            </button>
                                            <Dropdown className="custom-dropdown-toggle me-2">
                                                <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                                                    <i className="fa fa-file me-2"/> Forms
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu style={{margin: 0}}>
                                                    <Link href={`/form/${formId}`} target="_blank"
                                                          className="dropdown-item">
                                                        <i className="fa fa-eye me-2"/> View Form
                                                    </Link>
                                                    <div className="dropdown-divider"/>
                                                    <Link href={`/form/${formId}/build`} target="_blank"
                                                          className="dropdown-item">
                                                        <i className="fa fa-edit me-2"/> Edit Form
                                                    </Link>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <Dropdown className="custom-dropdown-toggle">
                                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                                    <i className="fa fa-download me-2"/> Download
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <CSVLink className="dropdown-item" data={csvData}
                                                             filename={`submissions-report-` + moment(new Date()).format('MMM-DD-YYYY')}>
                                                        <i className="fa fa-file-excel-o me-2"/> As CSV
                                                    </CSVLink>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal fade" id="myModal" data-bs-backdrop="static" data-bs-keyboard="false">
                                <div className="modal-dialog modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <div className="row w-100">
                                                <div className="col-9">
                                                    <h5 className="modal-title">
                                                        View Submission
                                                        <small className="text-xxs d-block">
                                                            Updated
                                                            at {moment(submission?.updated_at).format('MMM DD, YYYY')}
                                                        </small>
                                                    </h5>
                                                </div>
                                                <div className="col-3 text-end">
                                                    <button type="button" className="bg-light rounded border-0 px-2"
                                                            data-bs-dismiss="modal" aria-label="Close"
                                                            onClick={handleCloseModal}>
                                                        <i className="fa fa-remove text-danger"/>
                                                    </button>
                                                </div>
                                                <div className="col-12 mt-3">
                                                    <div className="d-flex">
                                                        <div className="btn-group me-4">
                                                            <button type="button"
                                                                    className="btn btn-outline-primary btn-sm px-3 py-2 mb-0"
                                                                    onClick={handlePreviousSubmission}>
                                                                <i className="fa fa-chevron-left"/>
                                                            </button>
                                                            <button type="button"
                                                                    className="btn btn-outline-primary btn-sm px-3 py-2 mb-0"
                                                                    onClick={handleNextSubmission}>
                                                                <i className="fa fa-chevron-right"/>
                                                            </button>
                                                        </div>
                                                        <div className="d-flex">
                                                            <button type="button"
                                                                    className="btn btn-outline-dark btn-sm px-3 py-2 mb-0 me-1">
                                                                <i className="fa fa-print"/>
                                                            </button>
                                                            <Dropdown className="custom-dropdown-toggle">
                                                                <Dropdown.Toggle variant="outline-dark"
                                                                                 className="px-3 py-2 mb-0">
                                                                    <i className="fa fa-ellipsis-v"/>
                                                                </Dropdown.Toggle>

                                                                <Dropdown.Menu>
                                                                    <Link href={`/submission/${submission?.id}/edit`}
                                                                          className="dropdown-item" target="_blank">
                                                                        <i className="fa fa-edit me-3"/> Edit
                                                                    </Link>
                                                                    <div className="dropdown-divider"/>
                                                                    <button type="button" className="dropdown-item"
                                                                            onClick={(event) => handleTrash(event, submission?.id)}>
                                                                        <i className="fa fa-trash me-3"/>
                                                                        Move to Trash
                                                                    </button>
                                                                    <div className="dropdown-divider"/>
                                                                    {submission?.is_read ?
                                                                        <button type="button" className="dropdown-item"
                                                                                onClick={(event) => handleRead(event, submission?.id)}>
                                                                            <i className="fa fa-envelope me-3"/>
                                                                            Mark as Unread
                                                                        </button> :
                                                                        <button type="button" className="dropdown-item"
                                                                                onClick={(event) => handleRead(event, submission?.id)}>
                                                                            <i className="fa fa-envelope-open me-3"/>
                                                                            Mark as Read
                                                                        </button>}
                                                                    <div className="dropdown-divider"/>
                                                                    {submission?.is_favourite ?
                                                                        <button type="button" className="dropdown-item"
                                                                                onClick={(event) => handleFavourite(event, submission?.id)}>
                                                                            <i className="fa fa-star me-3"/>
                                                                            Remove from Favourite
                                                                        </button> :
                                                                        <button type="button" className="dropdown-item"
                                                                                onClick={(event) => handleFavourite(event, submission?.id)}>
                                                                            <i className="fa fa-star-o me-3"/>
                                                                            Add to Favourite
                                                                        </button>}
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-body">
                                            <table className="table">
                                                <tbody>
                                                {columns.map((column, index) => {
                                                    if (column.visible) {
                                                        return <tr>
                                                            <td key={index} className="text-xs font-weight-bold">
                                                                <label
                                                                    className="d-block text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ms-0">
                                                                    {column.label}
                                                                </label>
                                                                <ViewDataByControlType
                                                                    type={column['type']}
                                                                    value={submission[column['key']]}
                                                                />
                                                            </td>
                                                        </tr>
                                                    }
                                                })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">
                                <div className="table-responsive nice-scroll p-0 min-vh-50">
                                    <table className="table align-items-center mb-0">
                                        <thead>
                                        <tr>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
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
                                                <td className="actions text-xs font-weight-bold">
                                                    <div
                                                        className="d-flex justify-content-between align-items-center ps-3">
                                                        <div className="d-flex align-items-center">
                                                            <div className="form-check mb-0" style={{minHeight: '0'}}>
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
                                                             onClick={(event) => handleFavourite(event, row.id)}>
                                                            {row.is_favourite ?
                                                                <i className="fa fa-star text-warning"/> :
                                                                <i className="fa fa-star-o"/>}
                                                        </div>
                                                        <div className="icon me-1"
                                                             onClick={(event) => handleRead(event, row.id)}>
                                                            {row.is_read ?
                                                                <i className="fa fa-envelope-open-o"/> :
                                                                <i className="fa fa-envelope-o"/>}
                                                        </div>
                                                        <div className="">
                                                            <Dropdown className="custom-dropdown-toggle">
                                                                <Dropdown.Toggle variant="link" className="px-2 mb-0">
                                                                    <i className="fa fa-ellipsis-v text-xs"/>
                                                                </Dropdown.Toggle>

                                                                <Dropdown.Menu>
                                                                    <button type="button" className="dropdown-item"
                                                                            onClick={(event) => handleViewInModal(event, index)}>
                                                                        <i className="fa fa-trash me-3"/>
                                                                        View
                                                                    </button>
                                                                    <div className="dropdown-divider"/>
                                                                    <Link href={`/submission/${row.id}/edit`}
                                                                          className="dropdown-item">
                                                                        <i className="fa fa-edit me-3"/> Edit
                                                                    </Link>
                                                                    <div className="dropdown-divider"/>
                                                                    <button type="button" className="dropdown-item"
                                                                            onClick={(event) => handleTrash(event, row.id)}>
                                                                        <i className="fa fa-trash me-3"/>
                                                                        Move to Trash
                                                                    </button>
                                                                    <div className="dropdown-divider"/>
                                                                    {row.is_read ?
                                                                        <button type="button" className="dropdown-item"
                                                                                onClick={(event) => handleRead(event, row.id)}>
                                                                            <i className="fa fa-envelope me-3"/>
                                                                            Mark as Unread
                                                                        </button> :
                                                                        <button type="button" className="dropdown-item"
                                                                                onClick={(event) => handleRead(event, row.id)}>
                                                                            <i className="fa fa-envelope-open me-3"/>
                                                                            Mark as Read
                                                                        </button>}
                                                                    <div className="dropdown-divider"/>
                                                                    {row.is_favourite ?
                                                                        <button type="button" className="dropdown-item"
                                                                                onClick={(event) => handleFavourite(event, row.id)}>
                                                                            <i className="fa fa-star me-3"/>
                                                                            Remove from Favourite
                                                                        </button> :
                                                                        <button type="button" className="dropdown-item"
                                                                                onClick={(event) => handleFavourite(event, row.id)}>
                                                                            <i className="fa fa-star-o me-3"/>
                                                                            Add to Favourite
                                                                        </button>}
                                                                </Dropdown.Menu>
                                                            </Dropdown>
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

export default SubmissionListPage;