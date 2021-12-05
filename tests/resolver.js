const importResolver = require("enhanced-resolve").create.sync({
  conditionNames: ["import", "node", "default"],
  extensions: [".esm.js", ".js", ".json", ".node", ".ts"],
});
const requireResolver = require("enhanced-resolve").create.sync({
  conditionNames: ["require", "node", "default"],
  extensions: [".esm.js", ".js", ".json", ".node", ".ts", ".tsx"],
});

module.exports = function (request, options) {
  let resolver = requireResolver;
  if (options.conditions?.includes("import")) {
    resolver = importResolver;
  }
  return resolver(options.basedir, request);
};
