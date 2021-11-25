import plugin from "windicss/plugin";

const DEFAULT_VARIANTS = ["responsive", "hover", "focus"];

const DEFAULT_SETTINGS = {
  prefix: "var-",
  variable: "--variable-color",
};

/**
 * @param {Record<string, string | Record<string, string>>} colors
 * @returns {Record<string, string>}
 */
const genrateColorMap = (colors) =>
  Object.entries(colors).reduce((output, [name, value]) => {
    if (typeof value === "string") {
      output[name] = value;
    } else if (typeof value === "object" && !Array.isArray(value)) {
      Object.entries(value).map(([number, value]) => {
        output[`${name}-${number}`] = value;
      });
    }
    return output;
  }, {});

const VariableColorsPlugin = plugin(
  ({ addBase, addUtilities, config, theme, variants, e }) => {
    /** @type {string} */
    const prefix = theme("variableColors.prefix", DEFAULT_SETTINGS.prefix);
    /** @type {string} */
    const variable = theme(
      "variableColors.variable",
      DEFAULT_SETTINGS.variable
    );
    /** @type {string | null} */
    const defaultColor = theme("variableColors.default", null);
    /**
     * @param {string} value
     * @returns {Record<string, string>}
     */
    const generateProperties = (value) => ({
      [variable]: value,
    });
    const colorMap = genrateColorMap(theme("colors"));
    const styles = Object.entries(colorMap).reduce(
      /**
       * @param {Record<string, Record<string, string>>} output
       */
      (output, [name, value]) => {
        output[`.${e(`${prefix}${name}`)}`] = generateProperties(value);
        return output;
      },
      {}
    );

    addUtilities(styles, variants("variableColor", DEFAULT_VARIANTS));

    if (
      defaultColor &&
      Object.prototype.hasOwnProperty.call(colorMap, defaultColor)
    ) {
      addBase({
        ":root": { [variable]: colorMap[defaultColor] },
      });
    }
  }
);

export default VariableColorsPlugin;
