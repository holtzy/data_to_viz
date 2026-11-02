import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Pages link to their public `.html` URLs (GitHub Pages) with plain <a>,
      // and images are pre-optimized static files, so these don't apply.
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-img-element": "off",
      // Article text is written directly in JSX: let apostrophes be apostrophes.
      "react/no-unescaped-entities": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
