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

const components: Record<string, React.ReactNode> = {
  Test: function () {
    return (
      <>
        <p>This is a Test Component.</p>
      </>
    );
  },
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
