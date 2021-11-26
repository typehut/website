import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { NextSeo, NextSeoProps } from "next-seo";

import * as PostAPI from "@/lib/api/post";
import { PostType, SerializablePostMeta } from "@/lib/types/postType";
import getConfig from "@/lib/utils/config";
import { timestampToIso } from "@/lib/utils/format";

import type { ParsedUrlQuery } from "querystring";

const components: Record<string, React.ReactNode> = {};
const { publicRuntimeConfig } = getConfig();

export interface BlogParams extends ParsedUrlQuery {
  pid: PostType["pid"];
}

export interface BlogProps
  extends PostType<MDXRemoteSerializeResult, SerializablePostMeta> {}

const Blog: NextPage<BlogProps> = ({ pid, body, meta }) => {
  const nextSeoProps: NextSeoProps = {
    title: meta.title,
    description: meta.description,
    canonical: `${publicRuntimeConfig.siteUrl}/blog/${pid}`,
    twitter: {
      handle: meta.author?.twitter ?? `@${meta.author.twitter}`,
    },
    openGraph: {
      images: meta?.images,
      type: "article",
      article: {
        publishedTime: timestampToIso(meta.published_at),
        modifiedTime: meta?.modified_at
          ? timestampToIso(meta.modified_at)
          : undefined,
        tags: meta?.tags,
        authors: [`${publicRuntimeConfig.siteUrl}/authors/${meta.author.name}`],
      },
    },
  };

  return (
    <>
      <NextSeo {...nextSeoProps} />
      <article>
        <h1>{meta.title}</h1>
        <p>by {meta.author.name}</p>
        <MDXRemote {...body} components={components} />
      </article>
    </>
  );
};

const getStaticPaths: GetStaticPaths<BlogParams> = async (context) => {
  try {
    const paths = await PostAPI.paths();
    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error("Failed to get paths of the blog posts.");
    throw error;
  }
};

const getStaticProps: GetStaticProps<BlogProps, BlogParams> = async ({
  params,
}) => {
  const pid = params!.pid;

  try {
    const { body, meta } = await PostAPI.get(pid);
    return {
      props: { pid, body, meta },
    };
  } catch (error) {
    console.error("Failed to load the blog post.");
    throw error;
  }
};

export default Blog;
export { getStaticPaths, getStaticProps };
