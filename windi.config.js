// @ts-check
import colors from "windicss/colors";
import { defineConfig } from "windicss/helpers";

// import fluidTypePlugin from "./framework/windicss/plugins/fluid-types";
import variableColorsPlugin from "./framework/windicss/plugins/variable-colors";

export default defineConfig({
  mode: "jit",
  extract: {
    include: [
      "./styles/**/*.css",
      "./pages/**/*.{jsx,tsx}",
      "./components/**/*.{jsx,tsx}",
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
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    fluidType: {
      settings: {
        prefix: "",
        fontSizeMin: 1,
        screenMin: 23.4375, // 375px (iPhone X)
      },
    },
    variableColors: {
      default: "primary-900",
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
      transitionTimingFunction: {
        "out-sharp": "cubic-bezier(0.24, 1, 0.32, 1)",
      },
    },
  },
  variants: {
    extend: {},
  },
  corePlugins: {
    // fontSize: true,
    // container: false,
  },
  plugins: [variableColorsPlugin],
});
