import { MDXRemote } from "next-mdx-remote";
import { NextSeo } from "next-seo";

import * as PostAPI from "@/lib/api/post";
import { getConfig } from "@/lib/utils/config";
import { insertWordBreakJa, timestampToIso } from "@/lib/utils/format";

import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { NextSeoProps } from "next-seo";
import type { ParsedUrlQuery } from "querystring";
import type { PostType, SerializablePostMeta } from "@/lib/types/postType";

const components: Record<string, React.ReactNode> = {};
const {
  publicRuntimeConfig: { siteUrl },
} = getConfig();

export interface BlogParams extends ParsedUrlQuery {
  pid: PostType["pid"];
}

export interface BlogProps
  extends PostType<
    MDXRemoteSerializeResult,
    SerializablePostMeta & { titleHtml: string }
  > {}

const Blog: NextPage<BlogProps> = ({ pid, body, meta }) => {
  const nextSeoProps: NextSeoProps = {
    title: meta.title,
    description: meta.description,
    canonical: `${siteUrl}/blog/${pid}`,
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
        authors: [`${siteUrl}/authors/${meta.author.name}`],
      },
    },
  };

  return (
    <>
      <NextSeo {...nextSeoProps} />
      <article>
        <h1
          className="break-heading"
          dangerouslySetInnerHTML={{ __html: meta.titleHtml }}
        ></h1>
        <p>by {meta.author.name}</p>
        <MDXRemote {...body} components={components} />
      </article>
    </>
  );
};

const getStaticPaths: GetStaticPaths<BlogParams> = async () => {
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
  /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
  const pid = params!.pid;

  try {
    const { body, meta } = await PostAPI.get(pid);
    return {
      props: {
        pid,
        body,
        meta: {
          ...meta,
          titleHtml: insertWordBreakJa(meta.title),
        },
      },
    };
  } catch (error) {
    console.error("Failed to load the blog post.");
    throw error;
  }
};

export default Blog;
export { getStaticPaths, getStaticProps };
