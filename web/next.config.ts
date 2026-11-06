import type { NextConfig } from "next";
import path from "node:path";
import manifest from "./package.json";

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ["127.0.0.1"],
  turbopack: {
    root: path.resolve(import.meta.dirname, ".."),
    // Category examples live outside web/, but share its installed dependencies.
    resolveAlias: {
      "@phosphor-icons/react/ssr":
        "./node_modules/@phosphor-icons/react/dist/ssr/index.es.js",
      ...Object.fromEntries(
        Object.keys(manifest.dependencies).map((name) => [
          name,
          `./node_modules/${name}`,
        ]),
      ),
    },
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  outputFileTracingRoot: path.resolve(import.meta.dirname, ".."),
  outputFileTracingIncludes: { "/*": ["../category/**/*"] },
};

export default nextConfig;
