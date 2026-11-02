import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages. `/graph/barplot` is written to
  // `out/graph/barplot.html`, matching the URLs Google has indexed.
  ...(isDev
    ? {
        // The dev server doesn't know about `.html`: map the public URLs used in
        // links (`/graph/barplot.html`, `/about.html`) onto their routes.
        async rewrites() {
          return [
            { source: "/index.html", destination: "/" },
            { source: "/:slug.html", destination: "/:slug" },
            { source: "/:section/:slug.html", destination: "/:section/:slug" },
          ];
        },
      }
    : { output: "export" as const }),
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
