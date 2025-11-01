import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";

//? ESLint に関しては勉強不足で書けない．
//? そのため．AIに書いてもらった
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat
    .config({
      extends: ["plugin:@next/next/core-web-vitals-legacy", "next/typescript"],
    })
    .map((config) => {
      if ("name" in config) {
        const sanitized = { ...config };
        delete sanitized.name;
        return sanitized;
      }
      return config;
    }),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "lib/generated/**",
      "next-env.d.ts",
    ],
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": tseslint,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: false,
        },
      ],
      "@typescript-eslint/no-floating-promises": "error",
    },
  },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
        },
      ],
      "no-console": [
        "warn",
        {
          allow: ["warn", "error"],
        },
      ],
    },
  },
];

export default eslintConfig;
