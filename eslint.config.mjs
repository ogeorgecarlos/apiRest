import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  {
    rules: {
        "no-unused-vars": "error",
        "no-undef": "error",
        "semi": "error",
        "no-console": "error"
    }
  },
];