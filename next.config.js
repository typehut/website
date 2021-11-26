// @ts-check
const path = require("path");

const withPlugins = require("next-compose-plugins");
const WindiCSSWebpackPlugin = require("windicss-webpack-plugin");

const plugins = [
  require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
  }),
];

/** @type {import("./lib/types/next").NextConfig} */
const nextConfiguration = {
  reactStrictMode: true,
  images: {
    loader: "cloudinary",
    path: `https://res.cloudinary.com/${process.env.CLOUDINARY_PUBLIC_NAME}/image/upload/`,
  },
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
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin());
    return config;
  },
};

module.exports = withPlugins(plugins, nextConfiguration);
