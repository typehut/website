import getRuntimeConfig from "next/config";

import type {
  PublicRuntimeConfig,
  ServerRuntimeConfig,
} from "@/lib/types/next";

export const getConfig = () =>
  getRuntimeConfig() as {
    publicRuntimeConfig: PublicRuntimeConfig;
    serverRuntimeConfig: ServerRuntimeConfig;
  };
