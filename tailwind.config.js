/** @typedef {{ settings?: { fontSizeMin?: number; fontSizeMax?: number; ratioMin?: number; screenMin?: number; screenMax?: number; unit?: "rem" | "px"; prefix?: string; }; values?: Record<string, [number, number]>; }} FluidTypeConfig */
/** @typedef {import("tailwindcss/tailwind-config").TailwindConfig & { theme: { fluidType?: FluidTypeConfig }}} TailwindConfig */

const colors = require("tailwindcss/colors");

/** @type {TailwindConfig} */
module.exports = {
  mode: "jit",
  purge: {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
  },
  darkMode: false,
  theme: {
    colors: {
      inherit: "inherit",
      current: "currentColor",
      transparent: "transparent",
      black: "#000",
      white: "#fff",
      primary: {
        50: "#e7e7eb",
        100: "#d0cfd8",
        200: "#b9b7c5",
        300: "#a29fb2",
        400: "#8b879f",
        500: "#746f8c",
        600: "#5d5779",
        700: "#463f66",
        800: "#2f2753",
        900: "#181040",
      },
      secondary: colors.gray,
      accent: colors.indigo,
      info: colors.sky,
      safe: colors.green,
      warn: colors.amber,
      danger: colors.red,
    },
    fluidType: {
      settings: {
        fontSizeMin: 1,
        screenMin: 23.4375, // 375px (iPhone X)
      },
    },
    fontFamily: {
      display: [
        "-apple-system",
        "BlinkMacSystemFont",
        "Helvetica Neue",
        "Arial",
        "Hiragino Kaku Gothic ProN",
        "Hiragino Sans",
        "Yu Gothic",
        "BIZ UDPGothic",
        "Meiryo",
        "sans-serif",
      ],
      body: [
        "-apple-system",
        "BlinkMacSystemFont",
        "Helvetica Neue",
        "Arial",
        "Hiragino Kaku Gothic ProN",
        "Hiragino Sans",
        "BIZ UDPGothic",
        "Meiryo",
        "sans-serif",
      ],
      code: [
        "SFMono-Regular",
        "Consolas",
        "Courier New",
        "BIZ UDGothic",
        "Meiryo",
        "monospace",
      ],
    },
    extend: {
      minHeight: {
        16: "4rem",
      },
      transitionTimingFunction: {
        "out-sharp": "cubic-bezier(0.24, 1, 0.32, 1)",
      },
      transitionDuration: {
        250: "250ms",
        350: "350ms",
      },
      rotate: {
        "-135": "-135deg",
        135: "135deg",
      },
      inset: {
        "1_75": "0.4375rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  corePlugins: {
    fontSize: false,
  },
  plugins: [require("tailwindcss-fluid-type")],
};
