import getConfig from "next/config";

import { AuthorType } from "@/lib/types/authorType";

const { publicRuntimeConfig } = getConfig();

export const authors: Record<string, AuthorType> = {
  ...(publicRuntimeConfig.authors || {}),
};

export const getAuthor = (
  name: string | undefined,
  defaultAuthor: string = publicRuntimeConfig.defaultAuthor
) => {
  if (typeof name === "undefined") return authors[defaultAuthor];
  if (authors.hasOwnProperty(name) && authors[name]) return authors[name];
  throw new Error(`${name} is not found in the authors.`);
};
