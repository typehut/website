module.exports = {
  testEnvironment: "jsdom",
  clearMocks: true,
  coverageDirectory: "tests/coverage",
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!<rootDir>/*.js",
    "!<rootDir>/tests/coverage/**/*",
    "!<rootDir>/public/**/*",
    "!<rootDir>/.next/**/*",
    "!**/node_modules/**",
  ],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  moduleNameMapper: {
    "^.+\\.module\\.css$": "identity-obj-proxy",
    "^.+\\.css$": "<rootDir>/tests/mocks/styleMock.js",
    "^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$": `<rootDir>/tests/mocks/fileMock.js`,
    "^@/(.*)$": "<rootDir>/$1",
  },
  moduleDirectories: ["node_modules", __dirname],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/public/",
    "<rootDir>/tests/coverage/",
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  transformIgnorePatterns: ["/node_modules/", "^.+\\.module\\.css$"],
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "tests/",
        filename: "report.html",
      },
    ],
  ],
};
