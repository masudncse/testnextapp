import React, {useEffect, useState} from "react";
import Head from "next/head";
import {toast} from "react-toastify";
import AdminLayout from "../../components/Layout/AdminLayout";
import {swalConfirmPopup, tostify} from "../../utils/helpers";
import moment from "moment";
import FormStatus from "../../components/Form/FormStatus";
import Link from "next/link";
import {Button, Dropdown, Form, InputGroup} from "react-bootstrap";
import DataCountInfo from "../../components/Common/DataCountInfo";
import CustomPagination from "../../components/Common/CustomPagination";
import withAuth from "../../utils/hooks/withAuth";
import {batchTrashForm, fetchForms, trashForm} from "../../services/FormServices";
import {useDispatch} from "react-redux";
import {SET_BREADCRUMB} from "../../store/slices/themeSlice";
import {useEffectOnce} from "../../utils/hooks/useEffectOnce";
import SLNChange from "../../components/Common/SLNChange";
import {useRouter} from "next/router";

const FormListPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [forms, setForms] = useState([])
    const [meta, setMeta] = useState({})
    const [orderBy, setOrderBy] = useState('')
    const [keyword, setKeyword] = useState('')
    const [page, setPage] = useState('')

    const [checked, setChecked] = useState([]);

    // Breadcrumb
    useEffectOnce(() => {
        dispatch(SET_BREADCRUMB({
            currentPage: "Forms",
            pageTitle: "All Forms"
        }));

        fetchFormData();
    });

    // Fetch form data
    const fetchFormData = (params = {}) => {
        fetchForms(params).then((response) => {
            if (response?.data?.data) {
                setForms(response.data.data);
                setMeta(response.data.meta);
            }
        });
    }

    // Paginate
    useEffect(() => {
        if (page) {
            fetchFormData({
                page: page,
                orderBy: orderBy,
                keyword: keyword
            });
        }
    }, [page]);

    // Sorting
    useEffect(() => {
        if (orderBy) {
            fetchFormData({
                orderBy: orderBy,
                keyword: keyword
            });
        }
    }, [orderBy]);


    const handleCheckAll = () => {
        let checkboxes = document.getElementsByClassName('row-checkbox');

        let updatedList = [...checked];
        for (let i = 0, n = checkboxes.length; i < n; i++) {
            updatedList.push(checkboxes[i].value);
        }

        updatedList = [...new Set(updatedList)];
        setChecked(updatedList);
    }

    const handleBatchTrash = (event) => {
        event.preventDefault();

        swalConfirmPopup((isConfirm) => {
            if (isConfirm) {
                batchTrashForm({
                    ids: checked
                }).then((response) => {
                    if (response?.data?.status) {
                        tostify(toast, 'info', response);
                        setChecked([]);
                        fetchFormData();
                    }
                });
            }
        });
    }

    const handleSearch = (event) => {
        event.preventDefault();

        fetchFormData({
            keyword: keyword
        });
    }

    useEffect(() => {
        const {keyword} = router.query;

        if (keyword) {
            setKeyword(keyword);

            fetchFormData({
                keyword: keyword
            });
        }
    }, [router.isReady])

    const handleTrash = (event, id) => {
        event.preventDefault();

        swalConfirmPopup((isConfirm) => {
            if (isConfirm) {
                trashForm(id).then((response) => {
                    if (response?.data?.status) {
                        tostify(toast, 'info', response);
                        fetchFormData();
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

    return (
        <AdminLayout>
            <Head>
                <title>All Forms</title>
            </Head>
            <div className="row">
                <div className="col-md-12 mb-4">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <div className="row">
                                <div className="col-2">
                                    <h6 className="mb-0">All Forms</h6>
                                    <DataCountInfo meta={meta}/>
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
                                        <Dropdown className="custom-dropdown-toggle me-2">
                                            <Dropdown.Toggle variant="outline-secondary" className="mb-0">
                                                <i className="fa fa-sort-alpha-asc me-2"/> Title [a-z]
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <button type="button" className="dropdown-item"
                                                        onClick={() => setOrderBy('title:asc')}>
                                                    <i className="fa fa-sort-alpha-asc me-2"/> Title [a-z]
                                                </button>
                                                <div className="dropdown-divider"/>
                                                <button type="button" className="dropdown-item"
                                                        onClick={() => setOrderBy('title:desc')}>
                                                    <i className="fa fa-sort-alpha-desc me-2"/> Title [z-a]
                                                </button>
                                                <div className="dropdown-divider"/>
                                                <button type="button" className="dropdown-item"
                                                        onClick={() => setOrderBy('created_at:desc')}>
                                                    <i className="fa fa-calendar me-2"/> Creation Date
                                                </button>
                                                <div className="dropdown-divider"/>
                                                <button type="button" className="dropdown-item"
                                                        onClick={() => setOrderBy('updated_at:desc')}>
                                                    <i className="fa fa-calendar-check-o me-2"/> Last Edit
                                                </button>
                                                <div className="dropdown-divider"/>
                                                <button type="button" className="dropdown-item"
                                                        onClick={() => setOrderBy('submissions_count:desc')}>
                                                    <i className="fa fa-envelope me-2"/> Submission Count
                                                </button>
                                            </Dropdown.Menu>
                                        </Dropdown>

                                        <div>
                                            <form className="search-form" onSubmit={(event) => handleSearch(event)}>
                                                <InputGroup>
                                                    <Form.Control
                                                        placeholder="Search here..."
                                                        defaultValue={keyword}
                                                        onChange={(event) => setKeyword(event.target.value)}/>
                                                    <Button type="submit" variant="outline-primary" className="mb-0">
                                                        <i className="fa fa-search"/>
                                                    </Button>
                                                </InputGroup>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <div className="table-responsive nice-scroll p-0 min-vh-50">
                                <table className="table align-items-center mb-0">
                                    <thead>
                                    <tr>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4 w-4">
                                            S/L
                                        </th>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                            Title
                                        </th>
                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Status
                                        </th>
                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                            Created On
                                        </th>
                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {forms.map((form, index) =>
                                        <tr key={index}>
                                            <td className="text-sm font-weight-bold ps-4">
                                                <div
                                                    className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex align-items-center me-2">
                                                        <div className="form-check mb-0" style={{minHeight: '0'}}>
                                                            <input className="form-check-input row-checkbox"
                                                                   type="checkbox"
                                                                   value={form.id}
                                                                   checked={checked.includes(form.id.toString())}
                                                                   onChange={(event) => handleCheckbox(event, event.target.value)}/>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <SLNChange startFrom={meta.from} currentIndex={index}/>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="ps-2">
                                                <div className="d-flex py-1">
                                                    <div className="d-flex flex-column justify-content-center">
                                                        <h6 className="mb-0 text-sm">{form.title}</h6>
                                                        <p className="text-xs text-secondary mb-0 font-weight-bold">
                                                            <Link
                                                                href={`/submission/${form.id}/list`} target="_blank">
                                                                {form.submissions_count} Submissions
                                                            </Link>,
                                                            Updated
                                                            on {moment(form.updated_at).format(
                                                            "MMM DD, YYYY"
                                                        )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-center align-middle text-sm">
                                                <FormStatus status={form.status}/>
                                            </td>
                                            <td className="text-center align-middle">
                                                <span className="text-secondary text-xs font-weight-bold">
                                                    {moment(form.created_at).format(
                                                        "MMM DD, YYYY"
                                                    )}
                                                </span>
                                            </td>
                                            <td className="text-center align-middle">
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <Link href={`/form/${form.id}/build`} target="_blank"
                                                          className="btn btn-link text-dark px-3 mb-0 me-2">
                                                        <i className="fa fa-pencil me-2"/>
                                                        Edit
                                                    </Link>
                                                    <Link href={`/submission/${form.id}/list`} target="_blank"
                                                          className="btn btn-link text-dark px-3 mb-0 me-2">
                                                        <i className="fa fa-paper-plane me-2"/>
                                                        Submissions
                                                    </Link>
                                                    <Link href={`/form/${form.id}/publish`} target="_blank"
                                                          className="btn btn-link text-dark px-3 mb-0 me-2">
                                                        <i className="fa fa-upload me-2"/>
                                                        Publish
                                                    </Link>
                                                    <div className="dropdown custom-dropdown-toggle">
                                                        <button
                                                            className="btn btn-outline-primary btn-sm mb-0 dropdown-toggle"
                                                            type="button" data-bs-toggle="dropdown"
                                                            aria-expanded="false">
                                                            More
                                                        </button>
                                                        <div className="dropdown-menu">
                                                            <Link href={`/form/${form.id}`} target="_blank"
                                                                  className="dropdown-item">
                                                                <i className="fa fa-eye me-2"/>
                                                                View
                                                            </Link>
                                                            <div className="dropdown-divider"/>
                                                            <Link href={`/form/${form.id}/build`} target="_blank"
                                                                  className="dropdown-item">
                                                                <i className="fa fa-pencil me-2"/>
                                                                Edit
                                                            </Link>
                                                            <div className="dropdown-divider"/>
                                                            <button type="button" className="dropdown-item"
                                                                    onClick={(event) => handleTrash(event, form.id)}>
                                                                <i className="fa fa-trash me-2"/>
                                                                Move to Trash
                                                            </button>
                                                            <div className="dropdown-divider"/>
                                                            <Link href={`/form/${form.id}/history`} target="_blank"
                                                                  className="dropdown-item">
                                                                <i className="fa fa-history me-2"/>
                                                                Revision History
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>)}
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
        </AdminLayout>
    )
}

export default withAuth(FormListPage);