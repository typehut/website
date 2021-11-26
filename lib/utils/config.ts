import getRuntimeConfig from "next/config";

import { PublicRuntimeConfig, ServerRuntimeConfig } from "@/lib/types/next";

const getConfig = () =>
  getRuntimeConfig() as {
    publicRuntimeConfig: PublicRuntimeConfig;
    serverRuntimeConfig: ServerRuntimeConfig;
  };

export default getConfig;
