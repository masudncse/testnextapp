import React, {useEffect, useState} from "react";
import {deleteFormImage, fetchFormImagePaths, updateForm, uploadFormImage,} from "../../services/FormServices";
import {getApiImagePath, swalConfirmPopup, tostify} from "../../utils/helpers";
import {useRouter} from "next/router";
import {toast} from "react-toastify";

export default function LogoSetting({form, setForm}) {
    const router = useRouter();
    const {id: formId} = router.query;

    const [galleryImagePaths, setGalleryImagePaths] = useState([]);
    const [selectedImagePath, setSelectedImagePath] = useState('');

    const [activeTab, setActiveTab] = useState('uploadTab');

    const [logo, setLogo] = useState({
        path: '',
        size: '',
        alignment: '',
    });

    // Load Gallery
    useEffect(() => {
        if (activeTab === 'galleryTab') {
            loadGalleryImagePaths();
        }
    }, [activeTab]);

    // Logo Data
    useEffect(() => {
        setLogo(form?.logo);
    }, [form?.logo]);

    const loadGalleryImagePaths = () => {
        fetchFormImagePaths().then((response) => {
            if (response?.data?.data) {
                setGalleryImagePaths(response.data.data);
            }
        })
    }

    const updateLogoProperty = (logoData, subject) => {
        updateForm(formId, {
            logo: logoData,
            subject: subject
        }).then((response) => {
            if (response?.data?.data) {
                tostify(toast, 'success', response);
                setForm(response.data.data);

                if (response?.data?.data?.logo) {
                    setLogo(response.data.data.logo);
                }
            }
        });
    }

    const handleChangeImage = (event, image) => {
        event.preventDefault();

        let formData = new FormData();
        formData.append('image', image);

        uploadFormImage(formData)
            .then((response) => {
                if (response?.data?.data) {
                    event.target.value = '';

                    let {path} = response.data.data;

                    let myLogo = {...logo};
                    myLogo['path'] = path;

                    setLogo(myLogo);

                    updateLogoProperty(myLogo, "Upload New Logo");
                }
            });
    }

    const handleSelectGalleryImage = (event, key, path) => {
        event.preventDefault();

        let myLogo = {...logo};
        myLogo[key] = path;

        setLogo(myLogo);

        updateLogoProperty(myLogo, "Select Gallery Logo");
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

    const handleChangeSize = (event, key, value) => {
        event.preventDefault();

        let myLogo = {...logo};
        myLogo[key] = value;

        setLogo(myLogo);
    }

    const handleOnBlurSize = (event) => {
        event.preventDefault();

        updateLogoProperty(logo, "Logo Size Change");
    }

    const handleChangeAlignment = (event, key, value) => {
        event.preventDefault();

        let myLogo = {...logo};
        myLogo[key] = value;

        setLogo(myLogo);

        updateLogoProperty(myLogo, "Logo Alignment Change");
    }

    return (
        <>
            <div className="property-setting-item">
                <div className="file-upload-wrap">
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="Image" className="form-label">
                                Image
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
                                            {logo?.path && (
                                                <div className="col-12">
                                                    <img
                                                        src={getApiImagePath(logo?.path)}
                                                        className="img-thumbnail mb-1 me-2"
                                                        width="80px"
                                                        alt="image"
                                                    />
                                                </div>
                                            )}

                                            <div className="col-12">
                                                <input
                                                    type="file"
                                                    id="image"
                                                    className="form-control"
                                                    onChange={(event) => handleChangeImage(event, event.target.files[0])}
                                                />
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
                                                            onClick={(event) => handleSelectGalleryImage(event, 'path', selectedImagePath)}>
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
            <div className="property-setting-item">
                <div className="row">
                    <div className="col-12">
                        <label htmlFor="size" className="form-label">
                            Size (PX)
                        </label>
                    </div>
                    <div className="col-10">
                        <input
                            type="number"
                            value={logo?.size ? parseInt(logo?.size) : ''}
                            id="size"
                            className="form-control"
                            onChange={(event) => handleChangeSize(event, 'size', event.target.value)}
                            onBlur={(event) => handleOnBlurSize(event)}
                        />
                        <small className="text-xs text-muted">
                            Set logo size in pixel
                        </small>
                    </div>
                </div>
            </div>
            <div className="property-setting-item">
                <div className="row">
                    <div className="col-12">
                        <label
                            htmlFor="subLabel"
                            className="form-label">
                            Logo Alignment
                        </label>
                    </div>
                    <div className="col-8">
                        <div className="btn-group mb-1">
                            <button
                                type="button"
                                className={`btn ${(logo?.alignment === 'left') ? 'btn-primary' : 'btn-outline-primary'} mb-0`}
                                onClick={(event) => handleChangeAlignment(event, 'alignment', 'left')}>
                                LEFT
                            </button>
                            <button
                                type="button"
                                className={`btn ${(logo?.alignment === 'center') ? 'btn-primary' : 'btn-outline-primary'} mb-0`}
                                onClick={(event) => handleChangeAlignment(event, 'alignment', 'center')}>
                                CENTER
                            </button>
                            <button
                                type="button"
                                className={`btn ${(logo?.alignment === 'right') ? 'btn-primary' : 'btn-outline-primary'} mb-0`}
                                onClick={(event) => handleChangeAlignment(event, 'alignment', 'right')}>
                                RIGHT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
