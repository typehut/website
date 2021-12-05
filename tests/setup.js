import "@testing-library/jest-dom/extend-expect";

jest.mock("next/config", () => () => {
  require("dotenv").config({
    path: require("path").resolve(__dirname, "../.env.local"),
  });
  return require("../framework/next")(
    {
      authors: {
        croutonn: {
          name: "croutonn",
          bio: "cat lover.",
          twitter: "croutnn",
          github: "croutonn",
        },
      },
    },
    {
      reactStrictMode: true,
    },
    []
  );
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
