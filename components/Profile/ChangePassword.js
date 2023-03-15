import React, {useState} from "react";
import {logout} from "../../utils/auth";
import {tostify} from "../../utils/helpers";
import {toast} from "react-toastify";
import {changePassword} from "../../services/ProfileServices";
import InputError from "../Common/InputError";

export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors({});

        changePassword({
            current_password: currentPassword,
            new_password: newPassword,
            confirm_password: confirmPassword,
        }, setErrors).then((response) => {
            if (response?.data?.status) {
                tostify(toast, 'success', response);

                setTimeout(async () => {
                    await logout()
                }, 3000);
            }
        })
    }

    const handleReset = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="card h-100">
                    <div className="card-header pb-0 p-3">
                        <h6 className="mb-0">Change Password</h6>
                    </div>
                    <div className="card-body p-3">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="current_password">
                                    Current Password <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(event) => setCurrentPassword(event.target.value)}
                                    className={"form-control " + (errors?.current_password ? "is-invalid" : '')}
                                    id="current_password"
                                    placeholder="Enter current password"
                                />
                                <InputError messages={errors?.current_password}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="new_password" className="form-label">
                                    New Password <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(event) => setNewPassword(event.target.value)}
                                    className={"form-control " + (errors?.new_password ? "is-invalid" : '')}
                                    id="new_password"
                                    placeholder="Enter new password"
                                />
                                <InputError messages={errors?.new_password}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirm_password" className="form-label">
                                    Confirm Password <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                    className={"form-control " + (errors?.confirm_password ? "is-invalid" : '')}
                                    id="confirm_password"
                                    placeholder="Enter confirm password"
                                />
                                <InputError messages={errors?.confirm_password}/>
                            </div>

                            <div className="mb-3 text-end">
                                <button type="reset" className="btn btn-secondary me-2"
                                        onClick={handleReset}>
                                    Reset
                                </button>
                                <button type="submit"
                                        className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
