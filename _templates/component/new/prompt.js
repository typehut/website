const { pascalCase } = require("change-case");

module.exports = [
  {
    type: "input",
    name: "name",
    message: "What is name of the component?",
    format: pascalCase,
    result: (s) => s.split(" ").map(pascalCase).join(""),
  },
  {
    type: "select",
    name: "category",
    message: "What is the component category?",
    choices: ["base", "case", "domain"],
  },
];
