import { OpenGraphArticle, OpenGraphMedia } from "next-seo/lib/types";

import { AuthorType } from "@/lib/types/authorType";
import { getAuthor } from "@/lib/utils/authors";

export type PostMeta = {
  title: string;
  published_at: Date;
  modified_at?: Date;
  author?: string;
  description: string;
  images?: OpenGraphMedia[];
  tags?: OpenGraphArticle["tags"];
};

export type SerializablePostMeta = Omit<
  PostMeta,
  "published_at" | "modified_at" | "author"
> & {
  published_at: number;
  modified_at?: number;
  author: AuthorType;
};

export type PostType<T = undefined, U = PostMeta> = {
  pid: string;
  meta: U;
  body: T;
};

export const isPostMeta = (x: unknown): x is PostMeta => {
  return (
    typeof x === "object" &&
    x !== null &&
    x.hasOwnProperty("title") &&
    x.hasOwnProperty("published_at")
  );
};

export const toSerializablePostMeta = (meta: PostMeta) => {
  const converted: SerializablePostMeta = {
    title: meta.title,
    description: meta.description,
    published_at: 0,
    author: getAuthor(meta?.author),
  };
  if (meta?.images) {
    converted.images = meta.images;
  }
  if (meta?.tags) {
    converted.tags = meta.tags;
  }
  converted.published_at = meta.published_at.getTime();
  if (typeof meta?.modified_at !== "undefined") {
    converted.modified_at = meta.modified_at?.getTime();
  }
  return converted;
};
