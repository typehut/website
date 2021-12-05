import Head from "next/head";
import { DefaultSeo } from "next-seo";
import * as React from "react";

import { ScrollPositionProvider } from "@/components/base/ScrollPositionProvider";
import { WindowScrollPositionContext } from "@/lib/context/windowScrollPosition";
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
      <ScrollPositionProvider
        context={WindowScrollPositionContext}
        container={typeof window === "undefined" ? null : window}
      >
        <Component {...pageProps} />
      </ScrollPositionProvider>
    </>
  );
};
export default MyApp;
