const DARK_MODE_MESSAGE =
  "Use `web-ui-color()` to support dark mode (see src/styles/colors.scss)";

module.exports = {
  extends: [
    "stylelint-config-standard-scss",
    // Disable rules that may conflict with Prettier formatting.
    "stylelint-config-prettier-scss",
  ],
  rules: {
    "alpha-value-notation": "number",
    "at-rule-allowed-list": [
      "each",
      "else",
      "error",
      "font-face",
      "for",
      "forward",
      "function",
      "if",
      "include",
      "keyframes",
      "media",
      "mixin",
      "return",
      "supports",
      "use",
    ],
    "color-function-notation": "legacy",
    "color-named": [
      "never",
      {
        message: DARK_MODE_MESSAGE,
      },
    ],
    "color-no-hex": [
      true,
      {
        message: DARK_MODE_MESSAGE,
      },
    ],
    // These and other empty line rules tend to be hard to configure
    // in a way that matches our code style, so they're disabled for now.
    "comment-empty-line-before": null,
    "custom-property-empty-line-before": null,
    "custom-property-pattern": [
      // web-ui properties don't strictly follow kebab-case.
      "(^__internal__.+$)|(^web-ui_(internal_)?.+$)|(^([a-z][a-z0-9]*)(-[a-z0-9]+)*$)",
      {
        message: "Expected custom property name to be kebab-case",
      },
    ],
    "declaration-empty-line-before": null,
    "function-disallowed-list": [
      ["/^rgb/", "/^hsl/"],
      {
        message: DARK_MODE_MESSAGE,
      },
    ],
    "function-name-case": "lower",
    "no-descending-specificity": null,
    "property-no-unknown": [
      true,
      {
        // Add basic support for CSS Modules.
        ignoreProperties: ["composes"],
        ignoreSelectors: [":export"],
      },
    ],
    "rule-empty-line-before": null,
    "scss/at-mixin-pattern": [
      // Sass allows making mixins private by prefixing them with an underscore.
      "^_?(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$",
      {
        message: "Expected mixin name to be kebab-case",
      },
    ],
    "scss/dollar-variable-empty-line-before": null,
    "scss/double-slash-comment-empty-line-before": null,
    "selector-class-pattern": [
      // We prefix classes that should only be composed and
      // not directly imported with an underscore.
      "^_?([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
      {
        message: "Expected class selector to be kebab-case",
      },
    ],
    "selector-not-notation": "simple",
    "selector-pseudo-class-no-unknown": [
      true,
      {
        // Add basic support for CSS Modules.
        ignorePseudoClasses: ["export", "global"],
      },
    ],
  },
};
