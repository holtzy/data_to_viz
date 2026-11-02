import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/** Every page folder under app/ that has a page.tsx, as its public `.html` URL. */
function pageUrls(dir = path.join(process.cwd(), "app"), prefix = ""): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (!entry.isDirectory() || /^[_(\[]/.test(entry.name)) return [];
    const route = `${prefix}/${entry.name}`;
    const full = path.join(dir, entry.name);
    const self = fs.existsSync(path.join(full, "page.tsx")) ? [`${route}.html`] : [];
    return [...self, ...pageUrls(full, route)];
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    ...pageUrls()
      .sort()
      .map((p) => ({
        url: `${SITE_URL}${p}`,
        changeFrequency: "yearly" as const,
        priority: p.startsWith("/graph/") ? 0.8 : 0.6,
      })),
  ];
}
