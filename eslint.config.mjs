// Flat config: typescript-eslint recommended everywhere,
// eslint-plugin-cypress recommended for Cypress specs.
import cypress from "eslint-plugin-cypress";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["node_modules/", "cypress/videos/", "cypress/screenshots/", "cypress/downloads/"],
  },
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: { globals: globals.node },
  },
  {
    files: ["cypress/**/*.ts"],
    ...cypress.configs.recommended,
  }
);
