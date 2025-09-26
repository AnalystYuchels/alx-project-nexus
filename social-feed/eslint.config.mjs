import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      // ✅ Allow `any` where needed (your Apollo + props)
      "@typescript-eslint/no-explicit-any": "off",

      // ✅ Allow <img> tags (your avatars & post images)
      "@next/next/no-img-element": "off",

      // ✅ Don’t force const (handy for demo data arrays)
      "prefer-const": "off",
    },
  },
];

export default eslintConfig;
