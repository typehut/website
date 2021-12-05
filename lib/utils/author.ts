import { getConfig } from "@/lib/utils/config";

import type { AuthorType } from "@/lib/types/authorType";

const { serverRuntimeConfig } = getConfig();

export const authors: Record<string, AuthorType> = {
  ...(serverRuntimeConfig.authors || {}),
};

export const getAuthor = (
  name: string | undefined,
  defaultAuthor: string = serverRuntimeConfig.defaultAuthor
) => {
  if (typeof name === "undefined") return authors[defaultAuthor];
  if (authors.hasOwnProperty(name) && authors[name]) return authors[name];
  throw new Error(`${name} is not found in the authors.`);
};
