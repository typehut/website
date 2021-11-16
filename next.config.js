/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
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
