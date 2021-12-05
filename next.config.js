const framework = require("./framework/next");

module.exports = framework(
  {
    authors: {
      croutonn: {
        name: "croutonn",
        bio: "cat lover.",
        twitter: "croutnn",
        github: "croutonn",
      },
    },
  },
  {
    reactStrictMode: true,
  },
  [
    require("@next/bundle-analyzer")({
      enabled: process.env.ANALYZE === "true",
    }),
  ]
);
