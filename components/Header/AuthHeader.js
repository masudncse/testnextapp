import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function AuthHeader() {
    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                <link rel="apple-touch-icon" sizes="76x76" href="/img/apple-icon.png"/>
                <link rel="icon" type="image/png" href="/img/favicon.png"/>
                <title>Login - Online Form Builder</title>
                <script src="https://kit.fontawesome.com/42d5adcbca.js" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"/>
                <link rel="stylesheet" href="/css/soft-ui-dashboard.css"/>
            </Head>
        </>
    );
}
