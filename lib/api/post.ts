import {
  isPostMeta,
  PostMeta,
  toSerializablePostMeta,
} from "@/lib/types/postType";
import { isNotNull } from "@/lib/types/utils";
import {
  GITHUB_CONTENTS_BLOG_ENDPOINT,
  GITHUB_CONTENTS_BLOG_POST_RAW,
} from "@/lib/utils/constant";
import { httpGetRequest } from "@/lib/utils/http";
import { compileMDX, isolateMDX } from "@/lib/utils/mdx";

const mdxPattern = /\.mdx$/;

const getBlogDir = async () => {
  const { body } = await httpGetRequest(GITHUB_CONTENTS_BLOG_ENDPOINT, {
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
  const { body } = await httpGetRequest(
    `${GITHUB_CONTENTS_BLOG_POST_RAW}/${pid}.mdx`
  );
  const data = await compileMDX<PostMeta>(body, isPostMeta);
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
      const { body } = await httpGetRequest(
        `${GITHUB_CONTENTS_BLOG_POST_RAW}/${pid}.mdx`
      );
      try {
        return {
          pid,
          meta: toSerializablePostMeta(
            isolateMDX<PostMeta>(body, isPostMeta).data
          ),
        };
      } catch (error) {
        console.warn(`Meta data of ${pid} is invalid.`);
        return null;
      }
    })
  ).then((posts) => posts.filter(isNotNull));
};
