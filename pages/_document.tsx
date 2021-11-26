import Document, { Html, Head, Main, NextScript } from "next/document";

import getConfig from "@/lib/utils/config";

interface DocumentProps {}

const { publicRuntimeConfig } = getConfig();

class MyDocument extends Document<DocumentProps> {
  render() {
    return (
      <Html lang={publicRuntimeConfig.siteLang}>
        <Head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
