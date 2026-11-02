export const SITE_URL = "https://www.data-to-viz.com";
export const SITE_NAME = "from Data to Viz";
export const GA_MEASUREMENT_ID = "G-LHSDT02JTJ";
export const KIT_FORM_UID = "8010f15fd2";

export const NAV_LINKS = [
  { href: "/#explore", label: "Explore" },
  { href: "/#story", label: "Stories" },
  { href: "/#portfolio", label: "Charts" },
  { href: "/caveats.html", label: "Caveats" },
  { href: "/about.html", label: "About" },
] as const;

/** Highlighted call to action at the end of the navbar. */
export const NAV_CTA = { href: "/poster.html", label: "Poster" } as const;
