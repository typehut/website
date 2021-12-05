import { loadDefaultJapaneseParser } from "budoux";

import { WORDBREAK_THRESHOLD } from "@/lib/utils/constant";

export const timestampToIso = (timestamp: string | number) => {
  const value = typeof timestamp === "string" ? parseInt(timestamp) : timestamp;
  return new Date(value).toISOString();
};

export const insertWordBreakJa = (
  text: string,
  threshold = WORDBREAK_THRESHOLD
) => {
  const parser = loadDefaultJapaneseParser();
  return parser
    .translateHTMLString(text, threshold)
    .replace(/(^<span[^>]+>)|(<\/span>$)/, "");
};
