import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import plugin from "eslint-plugin-tsdoc";
import { defineConfig } from "eslint/config";

const tsdoc = plugin;
export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: { js, tsdoc },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
    rules: {
      "tsdoc/syntax": "warn",
      "no-restricted-imports": [
        "error",
        {
          patterns: ["src/*"],
        },
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variableLike",
          format: ["camelCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
          modifiers: ["const"],
          leadingUnderscore: "allow",
        },
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },

        {
          selector: "property",
          format: ["camelCase", "UPPER_CASE"],
          modifiers: ["public"],
          filter: {
            regex: "^[a-zA-Z_][a-zA-Z0-9_]*$",
            match: true,
          },
          leadingUnderscore: "allow",
        },
      ],
    },
  },
  tseslint.configs.recommended,
  eslintConfigPrettier,
]);
