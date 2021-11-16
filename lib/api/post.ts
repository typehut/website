import got from "got";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

import { isPostMeta, toSerializablePostMeta } from "@/lib/types/postType";
import { isNotNull } from "@/lib/types/utils";
import {
  GITHUB_CONTENTS_BLOG_ENDPOINT,
  GITHUB_CONTENTS_BLOG_POST_RAW,
} from "@/lib/utils/constant";

const mdxPattern = /\.mdx$/;

const isolateMDX = (mdx: string) => {
  const { content, data } = matter(mdx);

  if (isPostMeta(data)) return { content, data };
  throw new Error("Failed to load meta data of the post.");
};

const compileMDX = async (mdx: string) => {
  const { content, data: meta } = isolateMDX(mdx);
  const body = await serialize(content);
  return { body, meta };
};

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

  return files.map((file: { name: string }) => ({
    params: { pid: file.name.replace(mdxPattern, "") },
  }));
};

export const get = async (pid: string) => {
  const { body } = await got.get(`${GITHUB_CONTENTS_BLOG_POST_RAW}/${pid}.mdx`);
  const data = await compileMDX(body);
  return {
    body: data.body,
    meta: toSerializablePostMeta(data.meta),
  };
};

export const all = async () => {
  const files = await getBlogDir();

  return Promise.all(
    files.map(async (file) => {
      const pid = file.name.replace(mdxPattern, "");
      const { body } = await got.get(
        `${GITHUB_CONTENTS_BLOG_POST_RAW}/${pid}.mdx`
      );
      try {
        return {
          pid,
          meta: toSerializablePostMeta(isolateMDX(body).data),
        };
      } catch (error) {
        console.warn(`Meta data of ${pid} is invalid.`);
        return null;
      }
    })
  ).then((posts) => posts.filter(isNotNull));
};
