import React, {useEffect, useRef, useState} from "react";
import {SET_AUTH_DATA} from "../../store/slices/authSlice";
import {tostify} from "../../utils/helpers";
import {toast} from "react-toastify";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {Editor} from '@tinymce/tinymce-react';
import {getCompanySizes, updateCompanyInfo} from "../../services/ProfileServices";
import InputError from "../Common/InputError";
import {TINYMCE_API_KEY} from "../../utils/constants";

export default function CompanyInfo() {
    const dispatch = useDispatch();
    const editorRef = useRef('');

    const [companySizes, setCompanySizes] = useState([]);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isDisableChangeProfileInfoSubmitButton, setIsDisableSubmitButton] = useState(false);

    const [companyName, setCompanyName] = useState('');
    const [yearOfEstablishment, setYearOfEstablishment] = useState('');
    const [companySize, setCompanySize] = useState('');
    const [businessDescription, setBusinessDescription] = useState('');
    const [businessDescriptionEditor, setBusinessDescriptionEditor] = useState('');
    const [businessLicenseNo, setBusinessLicenseNo] = useState('');
    const [websiteURL, setWebsiteURL] = useState('');

    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        setCompanyName(auth.profile?.company_name ?? '');
        setYearOfEstablishment(auth.profile?.year_of_establishment ?? '');
        setCompanySize(auth.profile?.company_size ?? '');
        setBusinessDescription(auth.profile?.business_description ?? '');
        setBusinessLicenseNo(auth.profile?.business_license_no ?? '');
        setWebsiteURL(auth.profile?.website_url ?? '');
    }, [auth]);

    useEffect(() => {
        if(!_.isEmpty(companySizes)) return;
        getCompanySizes().then((response) => {
            if (response?.data?.status) {
                setCompanySizes(response.data.data);
            }
        })
    }, [companySizes]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors({});

        updateCompanyInfo({
            company_name: companyName,
            year_of_establishment: yearOfEstablishment,
            company_size: companySize,
            business_license_no: businessLicenseNo,
            website_url: websiteURL,
            business_description: businessDescriptionEditor,
        }, setErrors).then((response) => {
            if (response?.data?.status) {
                if (response?.data?.data?.user) {
                    dispatch(SET_AUTH_DATA(response.data.data.user));
                }

                tostify(toast, 'info', response);
            }
        })
    }

    const handleReset = () => {
        setCompanyName('');
        setYearOfEstablishment('');
        setCompanySize('');
        setBusinessLicenseNo('');
        setWebsiteURL('');
        setBusinessDescription('');
        setBusinessDescriptionEditor('');
        editorRef.current = '';
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="card h-100">
                    <div className="card-header pb-0 p-3">
                        <h6 className="mb-0">Company Info</h6>
                    </div>
                    <div className="card-body p-3">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-5">
                                    <div className="mb-3">
                                        <label htmlFor="company_name">
                                            Company Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={companyName}
                                            onChange={(event) => setCompanyName(event.target.value)}
                                            className={"form-control " + (errors?.company_name ? "is-invalid" : null)}
                                            id="company_name"
                                            placeholder="Enter company name"
                                        />
                                        <InputError messages={errors?.company_name}/>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="mb-3">
                                        <label htmlFor="year_of_establishment">
                                            Year of Establishment
                                        </label>
                                        <input
                                            type="text"
                                            value={yearOfEstablishment}
                                            onChange={(event) => setYearOfEstablishment(event.target.value)}
                                            className={"form-control " + (errors?.year_of_establishment ? "is-invalid" : null)}
                                            id="year_of_establishment"
                                            placeholder="Enter year of establishment"
                                        />
                                        <InputError messages={errors?.year_of_establishment}/>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="mb-3">
                                        <label htmlFor="company_size">
                                            Company Size
                                        </label>
                                        <select className="form-select" value={companySize}
                                                onChange={(event) => setCompanySize(event.target.value)}>
                                            <option value="">Select</option>
                                            {companySizes.map((item, key) => {
                                                return <option value={item.id} key={key}>
                                                    {item.text}
                                                </option>
                                            })}
                                        </select>
                                        <InputError messages={errors?.company_size}/>
                                    </div>
                                </div>
                                <div className="col-5">
                                    <div className="mb-3">
                                        <label htmlFor="business_license_no">
                                            Business License No.
                                        </label>
                                        <input
                                            type="text"
                                            value={businessLicenseNo}
                                            onChange={(event) => setBusinessLicenseNo(event.target.value)}
                                            className={"form-control " + (errors?.business_license_no ? "is-invalid" : null)}
                                            id="business_license_no"
                                            placeholder="Enter business license no."
                                        />
                                        <InputError messages={errors?.business_license_no}/>
                                    </div>
                                </div>
                                <div className="col-7">
                                    <div className="mb-3">
                                        <label htmlFor="website_url">
                                            Website URL
                                        </label>
                                        <input
                                            type="url"
                                            value={websiteURL}
                                            onChange={(event) => setWebsiteURL(event.target.value)}
                                            className={"form-control " + (errors?.website_url ? "is-invalid" : null)}
                                            id="website_url"
                                            placeholder="Enter website URL"
                                        />
                                        <InputError messages={errors?.website_url}/>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="mb-3">
                                        <label htmlFor="business_description">
                                            Business Description
                                        </label>
                                        <Editor
                                            ref={editorRef}
                                            apiKey={TINYMCE_API_KEY}
                                            onEditorChange={(newText) => setBusinessDescriptionEditor(newText)}
                                            initialValue={businessDescription}
                                            init={{
                                                height: 280,
                                                menubar: false,
                                                plugins: [
                                                    'advlist autolink lists link image charmap print preview anchor',
                                                    'searchreplace visualblocks code fullscreen',
                                                    'insertdatetime media table paste code help wordcount'
                                                ],
                                                toolbar: 'undo redo | formatselect | ' +
                                                    'bold italic backcolor | alignleft aligncenter ' +
                                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                                    'removeformat | help',
                                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                            }}
                                        />
                                        <InputError messages={errors?.business_description} className={'d-block'}/>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3 text-end">
                                <button type="reset" className="btn btn-secondary me-2"
                                        onClick={handleReset}>Reset
                                </button>
                                <button type="submit" className="btn btn-primary"
                                        disabled={isDisableChangeProfileInfoSubmitButton}>Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
