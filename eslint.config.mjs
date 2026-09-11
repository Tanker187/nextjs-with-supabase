import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

// Use the Next.js recommended config. If TypeScript-specific rules are needed
// add them via overrides below instead of extending next/typescript to avoid
// potential circular references with FlatCompat.
export default [
  ...compat.extends("next/core-web-vitals"),
  // Example of adding TypeScript overrides safely (uncomment if needed):
  // {
  //   files: ["**/*.ts", "**/*.tsx"],
  //   rules: {
  //     // Add TypeScript-specific rules here
  //   },
  // },
];
