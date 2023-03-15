import React, {useEffect, useState} from "react";
import Head from "next/head";
import {toast} from "react-toastify";
import AdminLayout from "../../components/Layout/AdminLayout";
import {swalConfirmPopup, tostify} from "../../utils/helpers";
import moment from "moment";
import Index from "../../components/Form/FormStatus";
import Link from "next/link";
import DataCountInfo from "../../components/Common/DataCountInfo";
import CustomPagination from "../../components/Common/CustomPagination";
import withAuth from "../../utils/hooks/withAuth";
import {
    batchDeleteForm,
    batchRestoreForm,
    deleteForm,
    fetchTrashedForms,
    restoreForm
} from "../../services/FormServices";
import {SET_BREADCRUMB} from "../../store/slices/themeSlice";
import {useDispatch} from "react-redux";
import {useEffectOnce} from "../../utils/hooks/useEffectOnce";
import SLNChange from "../../components/Common/SLNChange";

const FormTrashListPage = () => {
    const dispatch = useDispatch();

    const [forms, setForms] = useState([])
    const [meta, setMeta] = useState({});
    const [page, setPage] = useState('');

    const [checked, setChecked] = useState([]);

    useEffectOnce(() => {
        dispatch(SET_BREADCRUMB({
            currentPage: "Trash List",
            pageTitle: "All Trashed Forms"
        }));

        fetchTrashedFormsData();
    });

    // Paginate
    useEffect(() => {
        if (page) {
            fetchTrashedFormsData({
                page: page
            });
        }
    }, [page]);

    const fetchTrashedFormsData = (params = {}) => {
        fetchTrashedForms(params).then((response) => {
            if (response?.data?.data) {
                setForms(response.data.data);
                setMeta(response.data.meta);
            }
        });
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

    /**
     *
     * @param event
     * @param id
     */
    const handleRestore = (event, id) => {
        event.preventDefault();

        swalConfirmPopup((isConfirm) => {
            if (isConfirm) {
                restoreForm(id).then((response) => {
                    if (response?.data?.status) {
                        tostify(toast, 'info', response);
                        fetchTrashedFormsData();
                    }
                })
            }
        })
    }

    /**
     *
     * @param event
     * @param id
     */
    const handleDelete = (event, id) => {
        event.preventDefault();

        swalConfirmPopup((isConfirm) => {
            if (isConfirm) {
                deleteForm(id).then((response) => {
                    if (response?.data?.status) {
                        tostify(toast, 'success', response);
                        fetchTrashedFormsData();
                    }
                });
            }
        });
    }

    /**
     *
     * @param event
     * @param id
     */
    const handleBatchRestore = (event, id) => {
        event.preventDefault();

        swalConfirmPopup((isConfirm) => {
            if (isConfirm) {
                batchRestoreForm({
                    ids: checked
                }).then((response) => {
                    if (response?.data?.status) {
                        tostify(toast, 'success', response);
                        setChecked([]);
                        fetchTrashedFormsData();
                    }
                });
            }
        });
    }

    /**
     *
     * @param event
     * @param id
     */
    const handleBatchDelete = (event, id) => {
        event.preventDefault();

        swalConfirmPopup((isConfirm) => {
            if (isConfirm) {
                batchDeleteForm({
                    ids: checked
                }).then((response) => {
                    if (response?.data?.status) {
                        tostify(toast, 'success', response);
                        setChecked([]);
                        fetchTrashedFormsData();
                    }
                });
            }
        });
    }

    return (
        <AdminLayout>
            <Head>
                <title>All Trashed Forms</title>
            </Head>
            <div className="row">
                <div className="col-md-12 mb-4">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <div className="row">
                                <div className="col-2">
                                    <h6 className="mb-0">All Trashed Forms</h6>
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
                                            <button type="button" className="btn btn-outline-success me-2"
                                                    onClick={(event) => handleBatchRestore(event)}>
                                                <i className="fa fa-trash-o me-2"/> Restore
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
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {forms.map((form, index) =>
                                        <tr key={index}>
                                            <td className="text-sm font-weight-bold ps-4">
                                                <div
                                                    className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex align-items-center">
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
                                                            <Link href={`/submission/${form.id}/list`} target="_blank">
                                                                {form.submissions_count} Submissions</Link>,
                                                            Updated
                                                            on {moment(form.updated_at).format(
                                                            "MMM DD, YYYY"
                                                        )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-center align-middle text-sm">
                                                <Index code={form.status}/>
                                            </td>
                                            <td className="text-center align-middle">
                                                  <span className="text-secondary text-xs font-weight-bold">
                                                    {moment(form.created_at).format(
                                                        "MMM DD, YYYY"
                                                    )}
                                                  </span>
                                            </td>
                                            <td className="text-center align-middle">
                                                <div className="d-flex align-items-center">
                                                    <button type="button"
                                                            className="btn btn-outline-success mb-0 btn-sm me-2"
                                                            onClick={(event) => handleRestore(event, form.id)}>
                                                        <i className="fa fa-recycle me-2"/>
                                                        Restore
                                                    </button>
                                                    <button type="button"
                                                            className="btn btn-outline-danger btn-sm mb-0"
                                                            onClick={(event) => handleDelete(event, form.id)}>
                                                        <i className="fa fa-trash-o me-2"/>
                                                        Delete
                                                    </button>
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

export default withAuth(FormTrashListPage);