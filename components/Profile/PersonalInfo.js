import React, {useEffect, useState} from "react";
import axios from "../../utils/axios";
import {SET_AUTH_DATA} from "../../store/slices/authSlice";
import {getApiImagePath, makeInputErrors, tostify} from "../../utils/helpers";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {updatePersonalInfo} from "../../services/ProfileServices";
import InputError from "../Common/InputError";

export default function PersonalInfo() {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isDisableSubmitButton, setIsDisableSubmitButton] = useState(false);

    const [name, setName] = useState('');
    const [profileImagePath, setProfileImagePath] = useState('');
    const [oldProfileImageId, setOldProfileImageId] = useState('');
    const [email, setEmail] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [niceName, setNiceName] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [designation, setDesignation] = useState('');

    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        setName(auth.name ?? '');
        setEmail(auth.email ?? '');
        setProfileImagePath(auth.profile_image?.path ?? '');
        setOldProfileImageId(auth.profile_image?.id ?? '');
        setNiceName(auth.profile?.nice_name ?? '');
        setGender(auth.profile?.gender ?? '');
        setDateOfBirth(auth.profile?.date_of_birth ?? '');
        setDesignation(auth.profile?.designation ?? '');
    }, [auth]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors({});

        let formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append("name", name);
        formData.append("old_profile_image_id", oldProfileImageId);
        formData.append("profile_image", profileImage);
        formData.append("nice_name", niceName);
        formData.append("gender", gender);
        formData.append("date_of_birth", dateOfBirth);
        formData.append("designation", designation);

        updatePersonalInfo(formData, setErrors).then((response) => {
            if (response?.data?.status) {
                if (response?.data?.data?.user) {
                    dispatch(SET_AUTH_DATA(response.data.data.user));
                }

                tostify(toast, 'info', response)
            }
        });
    }

    const handleReset = (event) => {
        event.preventDefault();

        setName('');
        setDesignation('');
        setNiceName('');
        setGender('');
        setDateOfBirth('');
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="card h-100">
                    <div className="card-header pb-0 p-3">
                        <h6 className="mb-0">Personal Info</h6>
                    </div>
                    <div className="card-body p-3">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label htmlFor="name">
                                            Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(event) => setName(event.target.value)}
                                            className={"form-control " + (errors?.name ? "is-invalid" : null)}
                                            id="name"
                                            placeholder="Enter your name"
                                        />
                                        <InputError messages={errors?.name}/>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label htmlFor="email">
                                            Email <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            className={"form-control"}
                                            id="email"
                                            readOnly={true}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="mb-3">
                                        <label htmlFor="designation">
                                            Designation
                                        </label>
                                        <input
                                            type="text"
                                            value={designation}
                                            onChange={(event) => setDesignation(event.target.value)}
                                            className={"form-control " + (errors?.designation ? "is-invalid" : null)}
                                            id="designation"
                                            placeholder="Enter designation"
                                        />
                                        <InputError messages={errors?.designation}/>
                                    </div>
                                </div>
                                <div className="col-5">
                                    <div className="mb-3">
                                        <label htmlFor="nice_name">
                                            Nice Name
                                        </label>
                                        <input
                                            type="text"
                                            value={niceName}
                                            onChange={(event) => setNiceName(event.target.value)}
                                            className={"form-control " + (errors?.nice_name ? "is-invalid" : null)}
                                            id="nice_name"
                                            placeholder="Enter nice name"
                                        />
                                        <InputError messages={errors?.nice_name}/>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="mb-3">
                                        <label htmlFor="gender">
                                            Select Gender
                                        </label>
                                        <select className="form-select" value={gender}
                                                onChange={(event) => setGender(event.target.value)}>
                                            <option value="">Select</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                        <InputError messages={errors?.gender}/>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="mb-3">
                                        <label htmlFor="date_of_birth">
                                            Date of Birth
                                        </label>
                                        <input
                                            type="date"
                                            value={dateOfBirth}
                                            onChange={(event) => setDateOfBirth(event.target.value)}
                                            className={"form-control " + (errors?.date_of_birth ? "is-invalid" : null)}
                                            id="date_of_birth"
                                            placeholder="Enter date of birth"
                                        />
                                        <InputError messages={errors?.date_of_birth}/>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="mb-3">
                                        <label htmlFor="profile_image" className="d-block">
                                            Profile Image
                                        </label>

                                        <img src={getApiImagePath(profileImagePath)} width="120" alt="profile-image"
                                             className="img-thumbnail"/>
                                        <input
                                            type="file"
                                            className={"form-control " + (errors?.profile_image ? 'is-invalid' : '')}
                                            id="profile_image"
                                            onChange={(event) => setProfileImage(event.target.files[0])}
                                        />
                                        <InputError messages={errors?.profile_image}/>
                                    </div>
                                </div>

                                <div className="mb-3 text-end">
                                    <button type="reset" className="btn btn-secondary me-2"
                                            onClick={handleReset}>
                                        Reset
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
