const withPlugins = require("next-compose-plugins");

/**
 * @typedef {{ name: string; bio?: string; twitter?: string; github?: string }} Author
 * @param {{ authors: Record<string, Author>; defaultAuthor?: string }} config
 * @param {import("../../lib/types/next").NextConfig} nextConfig
 */
module.exports = (config, nextConfig, plugins) => {
  return withPlugins(plugins, {
    ...require("./runtimeConfig")(config),
    ...require("./webpack")(config),
    ...require("./images")(config),
    ...nextConfig,
  });
};
