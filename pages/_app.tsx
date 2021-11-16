import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import Head from "next/head";

import { DEFAULT_SEO_OPTIONS } from "@/lib/utils/constant";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultSeo {...DEFAULT_SEO_OPTIONS} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
