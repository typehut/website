import got from "got";
import parseFrontMatter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

import {
  GITHUB_CONTENTS_BLOG_ENDPOINT,
  GITHUB_CONTENTS_BLOG_POST_RAW,
} from "@/lib/utils/constant";

const mdxPattern = /\.mdx$/;

const getBlogDir = async () => {
  const { body } = await got.get(GITHUB_CONTENTS_BLOG_ENDPOINT, {
    headers: {
      accept: "application/vnd.github.v3+json",
    },
    responseType: "json",
  });

  if (!Array.isArray(body)) {
    throw new Error("GITHUB_CONTENTS_BLOG_PATH is not a path to a directory.");
  }

  return body.filter((item) => item.type === "file" && item.download_url);
};

export const paths = async () => {
  const files = await getBlogDir();

  return files.map((file) => ({
    params: { pid: file.name.replace(mdxPattern, "") },
  }));
};

export const get = async (pid: string) => {
  const { body } = await got.get(`${GITHUB_CONTENTS_BLOG_POST_RAW}/${pid}.mdx`);
  const { content, data: meta } = parseFrontMatter(body);
  const source = await serialize(content, { scope: meta });

  return { source, meta };
};
