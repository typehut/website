import { getConfig } from "@/lib/utils/config";

import type { DefaultSeoProps } from "next-seo";

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

export const SCREEN_SIZES = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

type ScreenSizesQueries = Record<
  keyof typeof SCREEN_SIZES | `<${keyof typeof SCREEN_SIZES}`,
  string
>;
export const SCREEN_SIZE_QUERIES: ScreenSizesQueries = Object.entries(
  SCREEN_SIZES
).reduce<ScreenSizesQueries>(
  (result, [key, value]) => ({
    ...result,
    [key]: `(min-width:${value}px)`,
    [`<${key}`]: `(max-width:${value}px)`,
  }),
  {} as ScreenSizesQueries
);

export const WORDBREAK_THRESHOLD = 1000;

export const NAV_ITEMS = [
  {
    href: "/",
    label: "Works",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/blog",
    label: "Blog",
  },
  {
    href: "/contact",
    label: "Contact",
  },
] as const;
