import React, {useEffect, useState} from "react";
import InputError from "../Common/InputError";
import {useEffectOnce} from "../../utils/hooks/useEffectOnce";
import axios from "axios";
import {
    deleteFormImage,
    deleteFormQuestionImage,
    fetchFormImagePaths, uploadFormImage,
} from "../../services/FormServices";
import {getApiImagePath, swalConfirmPopup} from "../../utils/helpers";

export default function ImageUploadSetting({qid, properties, fieldLabel, fieldSubLabel, keyName, onChangeProperty, setSyncData, isRequired}) {

    const [galleryImagePaths, setGalleryImagePaths] = useState([]);
    const [selectedImagePath, setSelectedImagePath] = useState('');

    const [activeTab, setActiveTab] = useState('uploadTab');
    const [errors, setErrors] = useState([]);

    // Load Gallery
    useEffect(() => {
        if (activeTab === 'galleryTab') {
            loadGalleryImagePaths();
        }
    }, [activeTab]);

    const loadGalleryImagePaths = () => {
        fetchFormImagePaths().then((response) => {
            if (response?.data?.data) {
                setGalleryImagePaths(response.data.data);
            }
        })
    }

    const handleChange = (event, key, image) => {
        event.preventDefault();
        setErrors([]);

        let formData = new FormData();
        formData.append('image', image);

        uploadFormImage(formData)
            .then((response) => {
                if (response?.data?.data) {
                    event.target.value = '';

                    let {path} = response.data.data;

                    onChangeProperty(qid, key, path);

                    setSyncData({
                        subject: `${fieldLabel} Change`
                    });
                }
            });

        if (isRequired && !image) {
            setErrors([
                ...errors,
                "This field is required."
            ]);
        }
    }

    const handleRemove = (event, key, imagePath) => {
        event.preventDefault();

        swalConfirmPopup((isConfirm) => {
            if (isConfirm) {
                deleteFormQuestionImage({
                    imagePath: imagePath
                }).then((response) => {
                    if (response?.data?.status) {
                        onChangeProperty(qid, key, '');
                    }
                })
            }
        })
    }

    const handleSelectGalleryImage = (event, key, path) => {
        event.preventDefault();

        onChangeProperty(qid, key, path);

        setSyncData({
            subject: `${fieldLabel} Change`
        });
    }

    const handleRemoveGalleryImage = (event, imagePath) => {
        event.preventDefault();

        swalConfirmPopup((isConfirm) => {
            if (isConfirm) {
                deleteFormImage({
                    imagePath: imagePath
                }).then((response) => {
                    if (response?.data?.status) {
                        setSelectedImagePath('');
                        loadGalleryImagePaths();
                    }
                })
            }
        })
    }

    return (
        <div className="property-setting-item">
            <div className="file-upload-wrap">
                <div className="row">
                    <div className="col-12">
                        <label htmlFor={keyName} className="form-label">
                            {fieldLabel} {isRequired && (<span className="text-danger">*</span>)}
                        </label>
                    </div>
                    <div className="col-12">

                        {/*Tab Navs*/}
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <button className={`nav-link text-sm ${activeTab === 'uploadTab' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('uploadTab')}>
                                    Upload
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link text-sm ${activeTab === 'galleryTab' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('galleryTab')}>
                                    Gallery
                                </button>
                            </li>
                        </ul>

                        {/*Tab Container*/}
                        <div className="row pt-3">

                            {/*Upload Tab*/}
                            {activeTab === 'uploadTab' && (
                                <div className="col-md-12">
                                    <div className="row">
                                        {properties?.imagePath && (
                                            <div className="col-12">
                                                <img
                                                    src={getApiImagePath(properties?.imagePath)}
                                                    className="img-thumbnail mb-1 me-2"
                                                    width="80px"
                                                    alt="image"
                                                />

                                                <button
                                                    type="button"
                                                    className="btn btn-link text-danger py-0 mb-0"
                                                    onClick={(event) => handleRemove(event, keyName, properties?.imagePath)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        )}

                                        <div className="col-12">
                                            <input
                                                type="file"
                                                id={keyName}
                                                className={`form-control ${errors.length > 0 ? 'is-invalid' : ''}`}
                                                onChange={(event) => handleChange(event, keyName, event.target.files[0])}
                                            />

                                            {fieldSubLabel && (
                                                <small className="text-xs text-muted">
                                                    {fieldSubLabel}
                                                </small>
                                            )}

                                            <InputError messages={errors} className="d-block"/>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/*Gallery Tab*/}
                            {activeTab === 'galleryTab' && (
                                <div className="col-12">

                                    {/*Preview*/}
                                    <ul className="gallery-list nice-scroll">
                                        {
                                            galleryImagePaths &&
                                            galleryImagePaths.map((path, index) => {
                                                return <li key={index}
                                                           className={`gallery-list-item ${selectedImagePath === path ? 'active' : ''}`}
                                                           onClick={() => setSelectedImagePath(path)}>
                                                    <img src={getApiImagePath(path)} alt="image"/>
                                                </li>
                                            })
                                        }
                                    </ul>

                                    {/*Buttons*/}
                                    {selectedImagePath && (
                                        <div className="row mt-3">
                                            <div className="col-6">
                                                <button type="button" className="btn btn-primary btn-sm w-100 mb-0"
                                                        onClick={(event) => handleSelectGalleryImage(event, keyName, selectedImagePath)}>
                                                    Select
                                                </button>
                                            </div>
                                            <div className="col-6">
                                                <button type="button" className="btn btn-danger btn-sm w-100 mb-0"
                                                        onClick={(event) => handleRemoveGalleryImage(event, selectedImagePath)}>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
