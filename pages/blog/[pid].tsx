import parseFrontMatter from "gray-matter";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import * as React from "react";

import * as PostAPI from "@/lib/api/post";

type BlogParams = {
  pid: string;
};

type BlogProps = {
  pid: BlogParams["pid"];
  source: MDXRemoteSerializeResult;
  meta: Record<string, unknown>;
};

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

const Blog: NextPage<BlogProps> = ({ source }) => {
  return (
    <>
      <MDXRemote {...source} components={components} />
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
    const data = await PostAPI.get(pid);
    const { content, data: meta } = parseFrontMatter(data);
    const source = await serialize(content, { scope: meta });
    return {
      props: { pid, source, meta },
    };
  } catch (error) {
    console.error("Failed to load the blog post.");
    throw error;
  }
};

export default Blog;
export { getStaticPaths, getStaticProps };
