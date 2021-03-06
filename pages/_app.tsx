import Head from "next/head";
import { DefaultSeo } from "next-seo";
import * as React from "react";

import { DEFAULT_SEO_OPTIONS } from "@/lib/utils/constant";

import type { AppProps } from "next/app";

import "windi.css";
import "@/styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultSeo {...DEFAULT_SEO_OPTIONS} />
      <Component {...pageProps} />
    </>
  );
};
export default MyApp;
