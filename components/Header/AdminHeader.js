import React from "react";
import Head from "next/head";
import Script from "next/script";

export default function AuthHeader() {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="76x76"
                    href="/img/apple-icon.png"
                />
                <link rel="icon" type="image/png" href="/img/favicon.png" />
                <title>Soft UI Dashboard by Creative Tim</title>
                {/*     Fonts and icons     */}
                <link
                    href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
                    rel="stylesheet"
                />
                {/* Nucleo Icons */}
                <link href="/css/nucleo-icons.css" rel="stylesheet" />
                <link href="/css/nucleo-svg.css" rel="stylesheet" />
                {/* Font Awesome Icons */}
                <link href="/css/nucleo-svg.css" rel="stylesheet" />
                {/* CSS Files */}
                <link
                    id="pagestyle"
                    href="/css/soft-ui-dashboard.css?v=1.0.7"
                    rel="stylesheet"
                />
            </Head>
            <Script src="https://kit.fontawesome.com/42d5adcbca.js" />
            {/*<Script src="/js/core/bootstrap.bundle.min.js" />*/}
            {/*<Script src="/js/plugins/perfect-scrollbar.min.js" />*/}
            {/*<Script src="/js/plugins/smooth-scrollbar.min.js" />*/}
            {/*<Script src="/js/soft-ui-dashboard.min.js" />*/}
            <Script src="/js/globals.js" />
        </>
    );
}
