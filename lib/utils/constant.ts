import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig() as {
  serverRuntimeConfig: Record<string, unknown>;
};

const GITHUB_CONTENTS_REPO = serverRuntimeConfig.githubContentsRepo;
const GITHUB_CONTENTS_BLOG_PATH = serverRuntimeConfig.githubContentsBlogPath;
const GITHUB_CONTENTS_BRANCH = serverRuntimeConfig.hasOwnProperty(
  "githubContentsBranch"
)
  ? serverRuntimeConfig.githubContentsBranch
  : "main";

export const GITHUB_CONTENTS_BLOG_ENDPOINT = `https://api.github.com/repos/${GITHUB_CONTENTS_REPO}/contents/${GITHUB_CONTENTS_BLOG_PATH}`;
export const GITHUB_CONTENTS_BLOG_POST_RAW = `https://raw.githubusercontent.com/${GITHUB_CONTENTS_REPO}/${GITHUB_CONTENTS_BRANCH}/${GITHUB_CONTENTS_BLOG_PATH}`;
