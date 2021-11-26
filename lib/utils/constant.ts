import { DefaultSeoProps } from "next-seo";

import getConfig from "@/lib/utils/config";

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

const GITHUB_CONTENTS_REPO = serverRuntimeConfig.githubContentsRepo as string;
const GITHUB_CONTENTS_BLOG_PATH =
  serverRuntimeConfig.githubContentsBlogPath as string;
const GITHUB_CONTENTS_BRANCH = serverRuntimeConfig.hasOwnProperty(
  "githubContentsBranch"
)
  ? serverRuntimeConfig.githubContentsBranch
  : "main";

export const GITHUB_CONTENTS_BLOG_ENDPOINT = `https://api.github.com/repos/${GITHUB_CONTENTS_REPO}/contents/${GITHUB_CONTENTS_BLOG_PATH}`;
export const GITHUB_CONTENTS_BLOG_POST_RAW = `https://raw.githubusercontent.com/${GITHUB_CONTENTS_REPO}/${GITHUB_CONTENTS_BRANCH}/${GITHUB_CONTENTS_BLOG_PATH}`;

export const LRU_MAX_SIZE = serverRuntimeConfig?.lruMaxSize || 1000;
export const LRU_MAX_AGE = serverRuntimeConfig?.lruMaxAge || Infinity;

export const DEFAULT_SEO_OPTIONS =
  publicRuntimeConfig.defaultSeo as Readonly<DefaultSeoProps>;
