import React from "react";
import Link from "next/link";
import {useSelector} from "react-redux";

const CustomBreadcrumb = () => {
    const {breadcrumb} = useSelector((state) => state.theme);
    const {parentPage, currentPage, pageTitle} = breadcrumb;

    if (_.isEmpty(currentPage) || _.isEmpty(pageTitle)) {
        return null
    }

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm">
                    <Link href="/" className="opacity-5 text-dark">
                        Dashboard
                    </Link>
                </li>

                {parentPage && <li className="breadcrumb-item text-sm text-dark">
                    <Link href={parentPage.pageLink} className="opacity-5 text-dark">
                        {parentPage.pageTitle}
                    </Link>
                </li>}

                <li className="breadcrumb-item text-sm text-dark active" aria-current="page">
                    {currentPage}
                </li>
            </ol>
            <h6 className="font-weight-bolder mb-0">
                {pageTitle}
            </h6>
        </nav>
    )
}

export default CustomBreadcrumb;