import { IdProvider } from "@radix-ui/react-id";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import Head from "next/head";
import "windi.css";

import { DEFAULT_SEO_OPTIONS } from "@/lib/utils/constant";
import "@/styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultSeo {...DEFAULT_SEO_OPTIONS} />
      <IdProvider>
        <Component {...pageProps} />
      </IdProvider>
    </>
  );
};
export default MyApp;
