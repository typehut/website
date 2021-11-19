const colors = require("tailwindcss/colors");

/** @type {import("tailwindcss/tailwind-config").TailwindConfig} */
module.exports = {
  mode: "jit",
  purge: {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
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
        secondary: colors.coolGray,
        focus: colors.teal,
      },
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
};
