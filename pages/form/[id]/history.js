import React, {useState} from "react";
import Head from "next/head";
import FormLayout from "../../../components/Layout/FormLayout";
import MiniHeader from "../../../components/Form/MiniHeader";
import {useDispatch} from "react-redux";
import {SET_BREADCRUMB} from "../../../store/slices/themeSlice";
import Sidebar from "../../../components/Form/History/Sidebar";
import BuilderZone from "../../../components/Form/Build/BuilderZone";
import {useEffectOnce} from "../../../utils/hooks/useEffectOnce";

const RevisionHistoryPage = () => {
    const dispatch = useDispatch();

    const [form, setForm] = useState({});

    // Breadcrumb
    useEffectOnce(() => {
        dispatch(SET_BREADCRUMB({
            parentPage: {
                pageTitle: "Forms",
                pageLink: '/form/list'
            },
            currentPage: "Revision History",
            pageTitle: "Revert by the history"
        }))
    });

    const handleChangeHistory = (event, form) => {
        event.preventDefault();

        if (!_.isEmpty(form)) {
            setForm(form);
        }
    }

    return (
        <FormLayout>
            <Head>
                <title>Revision History</title>
            </Head>
            <div className="form">
                <div className="history">
                    <div className="row">

                        {/*Mini Header*/}
                        <div className="col-12 px-4 mb-4">
                            <MiniHeader
                                form={form}
                                setForm={setForm}
                            />
                        </div>

                        {/*Sidebar*/}
                        <div className="col-md-3 px-4 mb-4">
                            <div className="w-85">
                                <Sidebar onChangeHistory={handleChangeHistory}/>
                            </div>
                        </div>

                        {/*Builder Zone*/}
                        <div className="col-md-6 mb-4">
                            <BuilderZone
                                form={form}
                                isHistoryPage={true}
                                isEditable={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </FormLayout>
    )
}

export default RevisionHistoryPage;