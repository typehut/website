import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import * as React from "react";

import * as PostAPI from "@/lib/api/post";
import { PostType, SerializablePostMeta } from "@/lib/types/postType";

type BlogParams = {
  pid: PostType["pid"];
};

type BlogProps = PostType<MDXRemoteSerializeResult, SerializablePostMeta>;

type HTMLElementProps = JSX.IntrinsicAttributes & {
  children?: React.ReactNode;
};

const components: Record<string, React.ReactNode> = {
  h1: (props: HTMLElementProps) => <h2 {...props}>{props.children}</h2>,
  h2: (props: HTMLElementProps) => <h3 {...props}>{props.children}</h3>,
  h3: (props: HTMLElementProps) => <h4 {...props}>{props.children}</h4>,
  h4: (props: HTMLElementProps) => <h5 {...props}>{props.children}</h5>,
  h5: (props: HTMLElementProps) => <h6 {...props}>{props.children}</h6>,
};

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
