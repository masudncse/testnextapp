import React, {useEffect, useState} from "react";
import Head from "next/head";
import AdminLayout from "../components/Layout/AdminLayout";
import {getApiImagePath} from "../utils/helpers";
import {useDispatch, useSelector} from "react-redux";
import ChangePassword from "../components/Profile/ChangePassword";
import PersonalInfo from "../components/Profile/PersonalInfo";
import CompanyInfo from "../components/Profile/CompanyInfo";
import withAuth from "../utils/hooks/withAuth";
import {SET_BREADCRUMB} from "../store/slices/themeSlice";
import {useEffectOnce} from "../utils/hooks/useEffectOnce";

const ProfilePage = () => {
    const dispatch = useDispatch();

    const [profileImagePath, setProfileImagePath] = useState('');
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');

    const auth = useSelector((state) => state.auth);

    useEffectOnce(() => {
        dispatch(SET_BREADCRUMB({
            currentPage: "Profile",
            pageTitle: "Update Your Profile"
        }))
    });

    useEffect(() => {
        setName(auth.name)
        setProfileImagePath(auth.profile_image?.path)
        setDesignation(auth.profile?.designation ?? 'No Designation')
    }, [auth])

    return (
        <AdminLayout>
            <Head>
                <title>Profile</title>
            </Head>
            <div className="page-header min-height-300 border-radius-xl" style={{
                backgroundImage: 'url("/img/curved-images/curved0.jpg")',
                backgroundPositionY: "50%"
            }}>
                <span className="mask bg-gradient-primary opacity-6"/>
            </div>
            <div className="card card-body blur shadow-blur mx-4 mt-n6 overflow-hidden">
                <div className="row gx-4">
                    <div className="col-auto">
                        <div className="avatar avatar-xl position-relative">
                            <img src={getApiImagePath(profileImagePath)} alt="profile_image"
                                 className="w-100 border-radius-lg shadow-sm"
                            />
                        </div>
                    </div>
                    <div className="col-auto my-auto">
                        <div className="h-100">
                            <h5 className="mb-1">{name}</h5>
                            <p className="mb-0 font-weight-bold text-sm">
                                {designation}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-12 col-xl-7">
                        <PersonalInfo/>
                        <br/>
                        <CompanyInfo/>
                    </div>
                    <div className="col-12 col-xl-5">
                        <ChangePassword/>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default withAuth(ProfilePage);