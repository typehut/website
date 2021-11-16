import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import * as React from "react";

import * as PostAPI from "@/lib/api/post";
import { PostType, SerializablePostMeta } from "@/lib/types/postType";

type BlogParams = {
  pid: PostType["pid"];
};

type BlogProps = PostType<MDXRemoteSerializeResult, SerializablePostMeta>;

const components: Record<string, React.ReactNode> = {};

const Blog: NextPage<BlogProps> = ({ body }) => {
  return (
    <>
      <MDXRemote {...body} components={components} />
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
