import got, { ExtendOptions } from "got";
import QuickLRU from "quick-lru";

import { LRU_MAX_AGE, LRU_MAX_SIZE } from "./constant";

export const storageAdapter = new QuickLRU({
  maxSize: LRU_MAX_SIZE,
  maxAge: LRU_MAX_AGE,
}) as ExtendOptions["cache"];

export const httpGetRequest = (url: string, options: any = {}) => {
  return got.get(url, { cache: storageAdapter, ...options });
};
