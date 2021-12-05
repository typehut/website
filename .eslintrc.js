module.exports = {
  extends: [
    "next/core-web-vitals",
    "plugin:jsx-a11y/recommended",
    "@typehut/eslint-config-import",
    "prettier",
  ],
  rules: {
    "jsx-a11y/anchor-is-valid": "off",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
  },
  overrides: [
    {
      files: ["**/*.ts"],
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {
        "@typescript-eslint/consistent-type-imports": "error",
        "@typescript-eslint/no-empty-interface": "off",
      },
    },
    {
      files: ["**/*.test.ts", "**/*.test.tsx"],
      extends: [
        "plugin:jest-dom/recommended",
        "next/core-web-vitals",
        "prettier",
      ],
      rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
      },
    },
  ],
};
