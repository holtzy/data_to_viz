// One-shot migration of legacy/index.html into data files used by the React home page:
//   components/home/data/trees.ts    decision-tree SVGs (crawlable chart links + tooltip data)
//   components/home/data/charts.tsx  the 40 chart cards (former Bootstrap modals), as JSX
//   components/home/data/home.ts     story menu, portfolio items, caveat cards
import * as cheerio from "cheerio";
import fs from "node:fs";
import path from "node:path";
import * as prettier from "prettier";

const ROOT = path.resolve(import.meta.dirname, "../..");
const OUT = path.join(ROOT, "components/home/data");
fs.mkdirSync(OUT, { recursive: true });
const $ = cheerio.load(fs.readFileSync(path.join(ROOT, "legacy/index.html"), "utf8"), { xml: false });

const abs = (href) => {
  if (!href) return href;
  const m = href.match(/^https?:\/\/(?:www\.)?data-to-viz\.com(\/.*)?$/i);
  if (m) return m[1] && m[1] !== "/" ? m[1] : "/";
  if (/^(https?:|mailto:|#)/.test(href)) return href;
  return "/" + href.replace(/^\.?\//, "");
};
const jsxText = (s) => s.replace(/&/g, "&amp;").replace(/[{}<>]/g, (c) => `{"${c}"}`);

// Small HTML -> JSX for the rich text inside chart cards.
function toJsx(node) {
  if (node.type === "text") return jsxText(node.data.replace(/\s+/g, " "));
  if (node.type !== "tag") return "";
  const el = $(node);
  const kids = el.contents().toArray().map(toJsx).join("");
  const tag = node.tagName;
  if (tag === "a") return `<a href=${JSON.stringify(abs(el.attr("href")))}>${kids}</a>`;
  if (tag === "br") return "<br />";
  if (["p", "ul", "ol", "li", "em", "strong", "code", "u"].includes(tag)) return `<${tag}>${kids}</${tag}>`;
  if (tag === "b") return `<strong>${kids}</strong>`;
  if (tag === "i") return `<em>${kids}</em>`;
  return kids;
}

// ------------------------------------------------------------- chart cards (modals)
const charts = {};
$(".portfolio-modal").each((_, m) => {
  const id = $(m).attr("id");
  if (id === "poster_full") return;
  const body = $(m).find(".modal-body");
  const blocks = {};
  body.find(".cardtitle").each((_, t) => {
    const name = $(t).text().trim();
    const parts = [];
    let n = $(t).next();
    if (n.is("hr")) n = n.next();
    while (n.length && !n.is(".cardtitle")) {
      parts.push(n);
      n = n.next();
    }
    blocks[name] = parts;
  });
  const html = (name) =>
    (blocks[name] ?? [])
      .map((p) => {
        // drop trailing <br> and wrapper divs; keep paragraphs and lists
        p.find("br").last().filter((_, b) => !b.nextSibling).remove();
        return p.is("div") ? p.contents().toArray().map(toJsx).join("") : toJsx(p[0]);
      })
      .join("")
      .trim();
  const code = (blocks.Code ?? []).flatMap((p) =>
    p.find("a").toArray().map((a) => ({ label: $(a).text().trim(), href: abs($(a).attr("href")) })),
  );
  const pageLink = body.find("a").first().attr("href");
  charts[id] = {
    title: body.find("h2").first().text().trim(),
    href: abs(pageLink),
    image: abs(body.find("img").first().attr("src")),
    intro: body.find(".item-intro").text().trim(),
    about: html("About"),
    mistakes: html("Common Mistakes"),
    code,
  };
});

let chartsSrc = `// Generated from legacy/index.html by scripts/migrate/convert-home.mjs — edit freely.
import type { ReactNode } from "react";

export type Chart = {
  title: string;
  /** Dedicated page, e.g. /graph/violin.html */
  href: string;
  image: string;
  intro: string;
  about: ReactNode;
  mistakes: ReactNode;
  code: { label: string; href: string }[];
};

export const CHARTS: Record<string, Chart> = {
`;
for (const [id, c] of Object.entries(charts)) {
  chartsSrc += `  ${JSON.stringify(id)}: {
    title: ${JSON.stringify(c.title)},
    href: ${JSON.stringify(c.href)},
    image: ${JSON.stringify(c.image)},
    intro: ${JSON.stringify(c.intro)},
    about: <>${c.about}</>,
    mistakes: <>${c.mistakes}</>,
    code: ${JSON.stringify(c.code)},
  },
`;
}
chartsSrc += "};\n";
fs.writeFileSync(path.join(OUT, "charts.tsx"), await prettier.format(chartsSrc, { parser: "typescript", printWidth: 100 }));

// ------------------------------------------------------------- decision trees
const LABELS = Object.fromEntries(
  $("#tree-button-container button").toArray().map((b) => [$(b).attr("data-tree-section"), $(b).text().trim()]),
);
const trees = $("#explore .tree").toArray().map((t) => {
  const id = $(t).attr("id");
  const svg = $(t).find("svg").first();
  svg.attr("id", `tree-${id}`).attr("width", "100%").removeAttr("height").removeAttr("style");
  svg.attr("role", "img").attr("aria-label", `Decision tree for ${LABELS[id]} data`);
  svg.find("image").each((_, im) => {
    const href = $(im).attr("xlink:href") ?? $(im).attr("href");
    $(im).removeAttr("xlink:href").attr("href", abs(href)).removeAttr("class");
  });
  // Tooltips: Bootstrap title HTML -> { text, image } in data attributes
  svg.find("[data-toggle=tooltip]").each((_, g) => {
    const tip = cheerio.load($(g).attr("title") ?? "");
    const text = tip("em").first().text().replace(/\s+/g, " ").trim();
    const img = tip("img").first().attr("src");
    for (const a of ["title", "data-toggle", "data-html", "data-placement", "offset", "style", "class"]) $(g).removeAttr(a);
    $(g).attr("data-tip", text);
    if (img) $(g).attr("data-tip-image", abs(img));
  });
  // Chart icons: modal anchors -> real crawlable links to the chart page
  svg.find("a").each((_, a) => {
    const href = $(a).attr("href") ?? $(a).attr("xlink:href") ?? "";
    $(a).removeAttr("data-toggle").removeAttr("xlink:href");
    const key = href.startsWith("#") ? href.slice(1) : null;
    if (key && charts[key]) {
      $(a).attr("href", charts[key].href).attr("data-chart", key).attr("aria-label", charts[key].title);
    } else if (key !== null) {
      // icon without a dedicated page/modal (e.g. waffle, hive): not a link
      $(a).replaceWith($(a).contents());
    } else {
      $(a).attr("href", abs(href));
    }
  });
  const markup = $.html(svg).replace(/\n\s*\n/g, "\n");
  return { id, label: LABELS[id], svg: markup };
});
fs.writeFileSync(
  path.join(OUT, "trees.ts"),
  `// Generated from legacy/index.html by scripts/migrate/convert-home.mjs.
// SVG artwork of the decision trees. Chart icons are <a data-chart="..."> links to
// the chart page; groups with data-tip / data-tip-image show the "your data looks like" tooltip.
export const TREES: { id: string; label: string; svg: string }[] = ${JSON.stringify(trees, null, 2)};
`,
);

// ------------------------------------------------------------- stories, portfolio, caveats
const stories = $("#story .btn-group > .btn-group").toArray().map((g) => ({
  label: $(g).find("button").text().trim(),
  items: $(g)
    .find("a.dropdown-item")
    .toArray()
    .filter((a) => $(a).attr("href"))
    .map((a) => ({ title: $(a).text().trim(), href: abs($(a).attr("href")) })),
}));
const filters = $("#portfolio-button-container button").toArray().map((b) => ({
  id: $(b).attr("data-portfolio-section"),
  label: $(b).text().trim(),
}));
const portfolio = $("#portfolio-items .portfolio-item").toArray().map((it) => {
  const key = $(it).find("a").attr("href").slice(1);
  return {
    id: key,
    title: $(it).find(".captionPortfolio").text().trim(),
    image: abs($(it).find("img").attr("src")),
    href: charts[key]?.href ?? null,
    categories: ($(it).attr("class") ?? "").split(/\s+/).filter((c) => filters.some((f) => f.id === c)),
  };
});
const caveats = $("#caveats a.mybtnrelated").toArray().map((a) => ({
  href: abs($(a).attr("href")),
  image: abs($(a).find("img").attr("src")),
  title: $(a).find(".mytitlerelated").text().trim(),
  text: $(a).find(".mytextrelated").text().replace(/\s+/g, " ").trim(),
}));

fs.writeFileSync(
  path.join(OUT, "home.ts"),
  `// Generated from legacy/index.html by scripts/migrate/convert-home.mjs — edit freely.
export const STORY_GROUPS = ${JSON.stringify(stories, null, 2)};

export const PORTFOLIO_FILTERS = ${JSON.stringify(filters, null, 2)};

export const PORTFOLIO: { id: string; title: string; image: string; href: string | null; categories: string[] }[] = ${JSON.stringify(portfolio, null, 2)};

export const CAVEAT_CARDS = ${JSON.stringify(caveats, null, 2)};
`,
);
await Promise.all(
  ["home.ts"].map(async (f) => {
    const p = path.join(OUT, f);
    fs.writeFileSync(p, await prettier.format(fs.readFileSync(p, "utf8"), { parser: "typescript", printWidth: 100 }));
  }),
);
console.log(
  `charts ${Object.keys(charts).length}, trees ${trees.length}, story groups ${stories.length}, portfolio ${portfolio.length}, caveats ${caveats.length}`,
);
console.log("portfolio without page:", portfolio.filter((p) => !p.href).map((p) => p.id).join(" ") || "none");
