export type PostMeta = {
  title: string;
  published_at: Date;
  modified_at?: Date;
};

export type SerializablePostMeta = {
  title: string;
  published_at: number;
  modified_at?: number;
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
    published_at: 0,
  };
  converted.published_at = meta.published_at.getTime();
  if (typeof meta?.modified_at !== "undefined") {
    converted.modified_at = meta.modified_at?.getTime();
  }
  return converted;
};
