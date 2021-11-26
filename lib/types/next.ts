import { NextConfig as NextConfigBase } from "next";
import { DefaultSeoProps } from "next-seo";

import { AuthorType } from "@/lib/types/authorType";

export interface ServerRuntimeConfig {
  lruMaxSize?: number;
  lruMaxAge?: number;
  githubContentsRepo: `${string}/${string}`;
  githubContentsBranch?: string;
  githubContentsBlogPath: string;
  authors: Record<string, AuthorType>;
  defaultAuthor: keyof ServerRuntimeConfig["authors"];
}

export interface PublicRuntimeConfig {
  siteName: string;
  siteUrl: `http${"" | "s"}://${string}`;
  siteLang: string;
  defaultSeo: DefaultSeoProps;
}

export interface NextConfig extends NextConfigBase {
  publicRuntimeConfig: PublicRuntimeConfig;
  serverRuntimeConfig: ServerRuntimeConfig;
}
