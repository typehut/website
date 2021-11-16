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
    authors: {
      croutonn: {
        name: "croutonn",
        bio: "",
        twitter: "croutnn",
        github: "croutonn",
      },
    },
    defaultAuthor: "croutonn",
  },
};
