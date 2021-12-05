/**
 * @typedef {{ name: string; bio?: string; twitter?: string; github?: string }} Author
 * @param {{ authors: Record<string, Author>; defaultAuthor?: string }} config
 */
module.exports = (config) => {
  return {
    serverRuntimeConfig: {
      githubContentsRepo: process.env.GITHUB_CONTENTS_REPO,
      githubContentsBlogPath: process.env.GITHUB_CONTENTS_BLOG_PATH,
      authors: config.authors,
      defaultAuthor: config.hasOwnProperty("defaultAuthor")
        ? config.defaultAuthor
        : Object.keys(config.authors).shift(),
    },
    publicRuntimeConfig: {
      siteName: process.env.SITE_NAME,
      siteUrl: process.env.SITE_URL,
      siteLang: process.env.SITE_LOCALE.split("_").shift() || "en",
      defaultSeo: {
        titleTemplate: `%s | ${process.env.SITE_NAME}`,
        defaultTitle: process.env.SITE_NAME,
        description: process.env.SITE_DESCRIPTION,
        openGraph: {
          type: "website",
          locale: process.env.SITE_LOCALE,
          url: process.env.SITE_URL,
          site_name: process.env.SITE_NAME,
        },
        twitter: {
          site: `@${process.env.SITE_TWITTER}`,
          cardType: "summary_large_image",
        },
      },
    },
  };
};
