import "@testing-library/jest-dom/extend-expect";

jest.mock(
  "next/config",
  () => () =>
    /** @type {import("../lib/types/next").NextConfig} */
    ({
      serverRuntimeConfig: {
        githubContentsRepo: process.env.GITHUB_CONTENTS_REPO,
        githubContentsBlogPath: process.env.GITHUB_CONTENTS_BLOG_PATH,
        authors: {
          croutonn: {
            name: "croutonn",
            bio: "cat lover.",
            twitter: "croutnn",
            github: "croutonn",
          },
        },
        defaultAuthor: "croutonn",
      },
      publicRuntimeConfig: {
        siteUrl: process.env.SITE_URL,
        defaultSeo: {
          titleTemplate: `%s | ${process.env.SITE_NAME}`,
          defaultTitle: process.env.SITE_NAME,
          description: process.env.SITE_DESCRIPTION,
          openGraph: {
            type: "website",
            locale: "ja_JP",
            url: process.env.SITE_URL,
            site_name: process.env.SITE_NAME,
          },
          twitter: {
            site: `@${process.env.SITE_TWITTER}`,
            cardType: "summary_large_image",
          },
        },
      },
    })
);
