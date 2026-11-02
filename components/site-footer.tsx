const SOCIAL = [
  { href: "https://twitter.com/R_Graph_Gallery", label: "Twitter" },
  { href: "https://www.linkedin.com/in/yan-holtz-2477534a/", label: "LinkedIn" },
  { href: "https://github.com/holtzy/data_to_viz", label: "GitHub" },
];

const GALLERIES = [
  { href: "https://r-graph-gallery.com", label: "R Graph Gallery" },
  { href: "https://python-graph-gallery.com", label: "Python Graph Gallery" },
  { href: "https://www.react-graph-gallery.com", label: "React Graph Gallery" },
  { href: "https://d3-graph-gallery.com", label: "D3 Graph Gallery" },
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-background py-10 text-sm text-muted-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-3">
        <div>
          <a href="/">
            <img src="/img/logo/typo.png" alt="from Data to Viz" className="h-7 w-auto" />
          </a>
          <p className="mt-3">
            A work by{" "}
            <a href="https://www.yan-holtz.com/" className="text-brand hover:underline">
              Yan Holtz
            </a>{" "}
            and Conor Healy.
          </p>
        </div>
        <nav aria-label="Graph galleries">
          <p className="font-heading text-xs font-semibold tracking-widest text-foreground uppercase">Build it</p>
          <ul className="mt-3 space-y-1">
            {GALLERIES.map((g) => (
              <li key={g.href}>
                <a href={g.href} className="hover:text-brand">
                  {g.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Social">
          <p className="font-heading text-xs font-semibold tracking-widest text-foreground uppercase">Follow</p>
          <ul className="mt-3 space-y-1">
            {SOCIAL.map((s) => (
              <li key={s.href}>
                <a href={s.href} className="hover:text-brand">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-8 max-w-6xl px-4 text-xs">© from Data to Viz {new Date().getFullYear()}</p>
    </footer>
  );
}
