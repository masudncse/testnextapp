import {Head, Html, Main, NextScript} from 'next/document'
import React from "react";
import Script from "next/script";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="apple-touch-icon" sizes="76x76" href={"/img/apple-icon.png"}/>
                <link rel="icon" type="image/png" href={"/img/favicon.png"}/>

                {/* Google Fonts */}
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"/>

                {/* Nucleo Fonts & Icons */}
                <link rel="stylesheet" href={"/css/nucleo-icons.css"}/>
                <link rel="stylesheet" href={"/css/nucleo-svg.css"}/>

                {/* Font Awesome Icons */}
                <script src={"https://kit.fontawesome.com/42d5adcbca.js"}/>

                {/*<link rel="stylesheet" href={"https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"}
                      integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
                      crossOrigin="anonymous"/>*/}

                {/* CSS Files */}
                <link rel="stylesheet" href={"/css/soft-ui-dashboard.css"}/>
            </Head>
            <body className={`antialiased g-sidenav-show bg-gray-100 nice-scroll`}>
            <Main/>
            <NextScript/>

            {/* Scripts */}
            {/*<script src={"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.3/jquery.min.js"}
                    integrity="sha512-STof4xm1wgkfm7heWqFJVn58Hm3EtS31XFaagaa8VMReCXAkQnJZ+jEy8PCC/iT18dFy95WcExNHFTqLyp72eQ=="
                    crossOrigin="anonymous" referrerPolicy="no-referrer"/>*/}
            <script src={"https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.3/js/bootstrap.bundle.min.js"}
                    integrity="sha512-i9cEfJwUwViEPFKdC1enz4ZRGBj8YQo6QByFTF92YXHi7waCqyexvRD75S5NVTsSiTv7rKWqG9Y5eFxmRsOn0A=="
                    crossOrigin="anonymous" referrerPolicy="no-referrer"/>
            <Script src={"/js/globals.js"}/>
            </body>
        </Html>
    )
}
