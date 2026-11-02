import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type PageMetadataInput = {
  /** Public URL path, exactly as indexed by search engines, e.g. `/graph/barplot.html`. */
  path: string;
  title: string;
  description: string;
  /** Image used when the page is shared, e.g. `/img/section/BarSmall.png`. */
  image?: string;
};

/**
 * Metadata for a content page: the full `<title>` (no template suffix, so
 * titles Google already ranks stay identical), a canonical URL, and social cards.
 */
export function pageMetadata({ path, title, description, image }: PageMetadataInput): Metadata {
  const images = image ? [{ url: image }] : undefined;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { type: "article", url: path, siteName: SITE_NAME, title, description, images },
    twitter: { card: "summary_large_image", title, description, images: image ? [image] : undefined },
  };
}

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();
