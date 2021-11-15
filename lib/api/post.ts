import got from "got";

import {
  GITHUB_CONTENTS_BLOG_ENDPOINT,
  GITHUB_CONTENTS_BLOG_POST_RAW,
} from "@/lib/utils/constant";

export const paths = async () => {
  const { body } = await got.get(GITHUB_CONTENTS_BLOG_ENDPOINT, {
    headers: {
      accept: "application/vnd.github.v3+json",
    },
    responseType: "json",
  });

  if (!Array.isArray(body)) {
    throw new Error("GITHUB_CONTENTS_BLOG_PATH is not a path to a directory.");
  }

  const mdxPattern = /\.mdx$/;

  return body
    .filter((item) => item.type === "file" && item.download_url)
    .map((item) => ({
      params: { pid: item.name.replace(mdxPattern, "") },
    }));
};

export const get = async (pid: string) => {
  const { body } = await got.get(`${GITHUB_CONTENTS_BLOG_POST_RAW}/${pid}.mdx`);
  return body;
};
