const path = require("path");

const withPlugins = require("next-compose-plugins");

const plugins = [
  require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
  }),
];

/** @type {import('next').NextConfig} */
const nextConfiguration = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    loader: "cloudinary",
    path: `https://res.cloudinary.com/${process.env.CLOUDINARY_PUBLIC_NAME}/image/upload/`,
  },
  serverRuntimeConfig: {
    githubContentsRepo: process.env.GITHUB_CONTENTS_REPO,
    githubContentsBlogPath: process.env.GITHUB_CONTENTS_BLOG_PATH,
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
};

module.exports = withPlugins(plugins, nextConfiguration);
