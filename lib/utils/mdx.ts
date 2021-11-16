import matter from "gray-matter";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import QuickLRU from "quick-lru";

import { LRU_MAX_AGE, LRU_MAX_SIZE } from "./constant";

export const cache = new QuickLRU({
  maxSize: LRU_MAX_SIZE,
  maxAge: LRU_MAX_AGE,
});

export const isolateMDX = <
  T extends Record<string, unknown> = Record<string, unknown>
>(
  mdx: string,
  typeGuard: (x: unknown) => x is T
) => {
  const { content, data } = matter(mdx);
  if (typeGuard(data)) return { content, data };
  throw new Error("Failed to load meta data of the mdx.");
};

export const compileMDX = async <
  T extends Record<string, unknown> = Record<string, unknown>
>(
  mdx: string,
  typeGuard: (x: unknown) => x is T
) => {
  if (cache.has(mdx)) {
    return cache.get(mdx) as {
      body: MDXRemoteSerializeResult<Record<string, unknown>>;
      meta: T;
    };
  }
  const { content, data: meta } = isolateMDX<T>(mdx, typeGuard);
  const body = await serialize(content);
  const data = { body, meta };
  cache.set(mdx, data);
  return data;
};
