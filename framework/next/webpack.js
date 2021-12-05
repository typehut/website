const WindiCSSWebpackPlugin = require("windicss-webpack-plugin");

module.exports = (config) => {
  return {
    webpack: (webpackConfig) => {
      webpackConfig.plugins.push(new WindiCSSWebpackPlugin());
      webpackConfig.resolve.extensions.splice(0, 0, ".esm.js");
      return webpackConfig;
    },
  };
};
