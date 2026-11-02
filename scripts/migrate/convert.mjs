// One-shot migration: turns the knitted R Markdown pages in legacy/{graph,story,caveat}
// into Next.js pages written in plain JSX.
//
//   node scripts/migrate/convert.mjs [section/slug ...]
//
// - app/<section>/<slug>/page.tsx       page content as JSX
// - public/figures/<section>/<slug>/*   chart images converted to webp
// - public/widgets/<section>/*.html     interactive htmlwidgets, standalone (iframed)
import * as cheerio from "cheerio";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import * as prettier from "prettier";

const ROOT = path.resolve(import.meta.dirname, "../..");
const LEGACY = path.join(ROOT, "legacy");
const SECTIONS = ["graph", "story", "caveat"];
const SKIP = new Set(["footer", "header", "tmp", "All_related_code", "template_datatoviz", "template_story", "template_caveat"]);
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "dtv-"));

const only = process.argv.slice(2);
const warnings = [];
const manifest = [];

// ---------------------------------------------------------------- helpers

const jsxText = (s) =>
  s.replace(/&/g, "&amp;").replace(/[{}<>]/g, (c) => `{"${c}"}`);
const jsxAttr = (s) => (/["\\\n]/.test(s) ? `{${JSON.stringify(s)}}` : `"${s}"`);
const templateLiteral = (s) =>
  "`" + s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${") + "`";

function frontMatter(file) {
  if (!fs.existsSync(file)) return {};
  const m = fs.readFileSync(file, "utf8").match(/^---\n([\s\S]*?)\n---/);
  const out = {};
  for (const line of (m?.[1] ?? "").split("\n")) {
    const kv = line.match(/^([A-Za-z0-9_]+):\s*"?(.*?)"?\s*$/);
    if (kv && kv[2]) out[kv[1]] = kv[2];
  }
  return out;
}

// Map any link to the site onto a root-relative URL so it stays on-site.
function rewriteHref(href, section) {
  if (!href) return href;
  href = href.trim();
  const abs = href.match(/^https?:\/\/(?:www\.)?data-to-viz\.com(\/[^\s]*)?$/i);
  if (abs) return abs[1] && abs[1] !== "/" ? abs[1].replace(/^\/index\.html/, "/") : "/";
  if (/^(https?:|mailto:|#)/i.test(href)) return href;
  if (href.startsWith("/")) return href;
  return path.posix.normalize(`/${section}/${href}`);
}

// Turn an image reference into a URL served by the new site.
let imgCounter = 0;
function resolveImage(src, section, slug) {
  if (!src) return src;
  const gh = src.match(/^https?:\/\/github\.com\/holtzy\/data_to_viz\/raw\/master\/(img\/.*)$/);
  if (gh) return "/" + gh[1];
  if (/^https?:/.test(src)) return src;
  const outDir = path.join(ROOT, "public/figures", section, slug);
  fs.mkdirSync(outDir, { recursive: true });
  const n = ++imgCounter;
  let input;
  if (src.startsWith("data:")) {
    const m = src.match(/^data:image\/([a-z+]+);base64,(.*)$/s);
    if (!m) { warnings.push(`${section}/${slug}: unsupported data URI`); return ""; }
    const ext = m[1] === "svg+xml" ? "svg" : m[1];
    input = path.join(TMP, `${section}-${slug}-${n}.${ext}`);
    fs.writeFileSync(input, Buffer.from(m[2], "base64"));
  } else {
    const rel = decodeURIComponent(src.split("?")[0]);
    const local = path.resolve(LEGACY, section, rel);
    if (local.startsWith(path.join(LEGACY, "img") + path.sep)) return "/img/" + path.relative(path.join(LEGACY, "img"), local);
    const rootImg = path.resolve(ROOT, section, rel);
    if (rootImg.startsWith(path.join(ROOT, "img") + path.sep)) return "/img/" + path.relative(path.join(ROOT, "img"), rootImg).split(path.sep).join("/");
    if (!fs.existsSync(local)) { warnings.push(`${section}/${slug}: missing image ${src}`); return src; }
    input = local;
  }
  const ext = path.extname(input).toLowerCase();
  if (ext === ".gif" || ext === ".svg") {
    const name = `${n}${ext}`;
    fs.copyFileSync(input, path.join(outDir, name));
    return `/figures/${section}/${slug}/${name}`;
  }
  const name = `${n}.webp`;
  const dest = path.join(outDir, name);
  execFileSync("cwebp", ["-quiet", "-q", "82", "-m", "6", input, "-o", dest]);
  return `/figures/${section}/${slug}/${name}`;
}

// ---------------------------------------------------------------- widgets

const SKIP_DEPS = /^libs\/(bootstrap|navigation|pagedtable|header-attrs|kePrint|jqueryui|tocify|highlightjs)/;
const INLINE_SKIP = /Bootstrap v|Respond\.js|Sticky Tabs|buildTabsets|initializeCodeFolding|Google Inc\.|CKInit|html5shiv/;
let widgetCounter = 0;
function extractWidget($, el, section, slug) {
  const id = $(el).attr("id");
  const n = ++widgetCounter;
  const style = $(el).attr("style") ?? "";
  const height = parseInt(style.match(/height:\s*(\d+)px/)?.[1] ?? "500", 10);
  const width = parseInt(style.match(/width:\s*(\d+)px/)?.[1] ?? "0", 10) || undefined;
  const clone = $(el).clone();
  clone.attr("style", style.replace(/width:\s*\d+px/, "width:100%"));
  const dataScripts = $(`script[data-for="${id}"]`).toArray().map((s) => $.html(s)).join("\n");

  const deps = [];
  const depsDir = path.join(ROOT, "public/widgets", section);
  $('script[src^="libs/"], link[href^="libs/"]').each((_, d) => {
    const ref = $(d).attr("src") ?? $(d).attr("href");
    if (!ref?.startsWith("libs/") || SKIP_DEPS.test(ref)) return;
    deps.push($.html(d));
    const libDir = ref.split("/").slice(0, 2).join("/");
    const from = path.join(LEGACY, section, libDir);
    const to = path.join(depsDir, libDir);
    if (fs.existsSync(from) && !fs.existsSync(to)) fs.cpSync(from, to, { recursive: true });
  });
  // Self-contained pages (caveats) inline their libraries as plain <script> blocks
  // before the widget data. Keep everything a widget may need, skip page plumbing.
  for (const sc of $("script").toArray()) {
    if ($(sc).attr("data-for")) break;
    if ($(sc).attr("src") || $(sc).attr("type")) continue;
    const code = $(sc).html() ?? "";
    if (code.length < 2000 || INLINE_SKIP.test(code.slice(0, 300))) continue;
    const name = `libs/inline-${createHash("sha1").update(code).digest("hex").slice(0, 10)}.js`;
    const dest = path.join(depsDir, name);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    if (!fs.existsSync(dest)) fs.writeFileSync(dest, code);
    deps.push(`<script src="${name}"></script>`);
  }

  const file = `${slug}-${n}.html`;
  fs.mkdirSync(depsDir, { recursive: true });
  fs.writeFileSync(
    path.join(depsDir, file),
    `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>${slug} – interactive chart – from Data to Viz</title>
<link rel="canonical" href="https://www.data-to-viz.com/${section}/${slug}.html" />
${deps.join("\n")}
<style>html,body{margin:0;padding:0;background:#fff;font-family:system-ui,sans-serif;overflow:hidden}</style>
</head>
<body>
${$.html(clone)}
${dataScripts}
</body>
</html>
`,
  );
  return { src: `/widgets/${section}/${file}`, height, width };
}

// ---------------------------------------------------------------- DOM -> JSX

function convertPage(section, slug) {
  imgCounter = 0;
  widgetCounter = 0;
  const html = fs.readFileSync(path.join(LEGACY, section, `${slug}.html`), "utf8");
  const $ = cheerio.load(html);
  const fm = frontMatter(path.join(LEGACY, section, `${slug}.Rmd`));
  // Body = everything in .main-container after the page header and before the
  // newsletter section. Some pages split it into several .mycontent blocks.
  const firstContent = $(".mycontent").first();
  if (!firstContent.length) throw new Error("no .mycontent");
  const container = firstContent.parent();
  const bodyNodes = [];
  let started = !container.children("#header").length;
  for (const ch of container.contents().toArray()) {
    if (!started) {
      started = $(ch).is("#header");
      continue;
    }
    if ($(ch).is("section#form, footer")) break;
    if (ch.type === "tag" && ["script", "style", "br", "hr"].includes(ch.tagName)) continue;
    bodyNodes.push(ch);
  }
  const content = $(bodyNodes);
  const pageTitle =
    fm.mytitle ??
    $("title").text().replace(/\s*–\s*from Data to Viz\s*$/, "").trim();

  const levels = content.find("div.section").add(content.filter("div.section")).toArray().map((s) => +($(s).attr("class").match(/level(\d)/)?.[1] ?? 1));
  const minLevel = levels.length ? Math.min(...levels) : 1;
  let usesComponents = new Set();

  const kids = (el) => $(el).contents().toArray().map(conv).join("");

  function conv(node) {
    if (node.type === "text") {
      const t = node.data.replace(/\s+/g, " ");
      return jsxText(t);
    }
    if (node.type === "comment" || node.type !== "tag") return "";
    const el = $(node);
    const tag = node.tagName.toLowerCase();
    const cls = el.attr("class") ?? "";

    if (tag === "script" || tag === "style" || tag === "noscript") return "";
    if (tag === "div" && /\bmycontent\b/.test(cls)) return kids(node);
    if (cls.split(/\s+/).includes("html-widget")) {
      const w = extractWidget($, node, section, slug);
      usesComponents.add("Widget");
      return `\n<Widget src="${w.src}" height={${w.height}}${w.width ? ` width={${w.width}}` : ""} />\n`;
    }
    if (tag === "div" && /\bsection\b/.test(cls)) {
      const level = +(cls.match(/level(\d)/)?.[1] ?? 1);
      const heading = el.children("h1,h2,h3,h4").first();
      const title = heading.length ? kids(heading).trim() : "";
      heading.remove();
      const firstHr = el.children().first();
      if (firstHr.is("hr")) firstHr.remove();
      usesComponents.add("Section");
      const as = level - minLevel === 0 ? "" : ` level={${Math.min(4, 2 + level - minLevel)}}`;
      const titleAttr = /[<{&]/.test(title) ? `{<>${title}</>}` : jsxAttr(title);
      return `\n<Section id="${el.attr("id")}" title=${titleAttr}${as}>\n${kids(node)}\n</Section>\n`;
    }
    if (tag === "div" && /\bsourceCode\b/.test(cls)) {
      const pre = el.find("pre").first();
      const lang = (pre.attr("class") ?? "").includes("python") ? "python" : "r";
      usesComponents.add("Code");
      return `\n<Code lang="${lang}">{${templateLiteral(pre.find("code").text().replace(/\n+$/, ""))}}</Code>\n`;
    }
    if (tag === "pre") {
      usesComponents.add("Output");
      return `\n<Output>{${templateLiteral(el.text().replace(/\n+$/, ""))}}</Output>\n`;
    }
    if (tag === "div" && /\brow\b/.test(cls) && el.find("a.mybtnrelated").length) {
      usesComponents.add("RelatedGrid").add("RelatedCard");
      const cards = el.find("a.mybtnrelated").toArray().map((a) => {
        const $a = $(a);
        const img = resolveImage($a.find("img").attr("src"), section, slug);
        const title = $a.find(".mytitlerelated").text().trim().replace(/\s+/g, " ");
        const text = $a.find(".mytextrelated").text().trim().replace(/\s+/g, " ");
        return `<RelatedCard href="${rewriteHref($a.attr("href"), section)}" image="${img}" title=${jsxAttr(title)}>${jsxText(text)}</RelatedCard>`;
      });
      return `\n<RelatedGrid>\n${cards.join("\n")}\n</RelatedGrid>\n`;
    }
    if (tag === "div" && /\brow\b/.test(cls)) {
      return `\n<div className="grid gap-6 md:grid-cols-12">${kids(node)}</div>\n`;
    }
    const col = cls.match(/\bcol-(?:md|lg|sm)-(\d+)/g);
    if (tag === "div" && col) {
      const md = cls.match(/\bcol-md-(\d+)/)?.[1] ?? cls.match(/\bcol-(?:lg|sm)-(\d+)/)?.[1];
      const span = { 2: "md:col-span-2", 3: "md:col-span-3", 4: "md:col-span-4", 6: "md:col-span-6", 8: "md:col-span-8", 9: "md:col-span-9", 12: "md:col-span-12" }[md] ?? "md:col-span-12";
      return `<div className="${span}">${kids(node)}</div>`;
    }
    if (tag === "a" && /\bbtn\b/.test(cls)) {
      usesComponents.add("ButtonLink");
      return `<ButtonLink href=${jsxAttr(rewriteHref(el.attr("href"), section))}>${el.text().trim().replace(/\s+/g, " ")}</ButtonLink> `;
    }
    if (tag === "p" && el.children("a.btn").length && !el.text().replace(el.children("a.btn").text(), "").trim()) {
      return `\n<div className="flex flex-wrap gap-2">${kids(node)}</div>\n`;
    }
    if (tag === "img") {
      const src = resolveImage(el.attr("src"), section, slug);
      if (!src) return "";
      const alt = el.attr("alt") || `${pageTitle} – chart example`;
      const w = el.attr("width");
      return `<img src="${src}" alt=${jsxAttr(alt)}${w && /^\d+$/.test(w) ? ` width={${w}}` : ""} loading="lazy" />`;
    }
    if (tag === "p") {
      // drop <br> padding at the edges of paragraphs; empty spacer paragraphs too
      while (el.contents().first().is("br")) el.contents().first().remove();
      while (el.contents().last().is("br")) el.contents().last().remove();
      const inner = kids(node).trim();
      if (!inner) return "";
      if (el.children().length === 1 && el.children("img").length && !el.text().trim()) return `\n<figure>${inner}</figure>\n`;
      return `\n<p>${inner}</p>\n`;
    }
    if (tag === "center") return `\n<div className="text-center">${kids(node)}</div>\n`;
    if (tag === "br") return "<br />";
    if (tag === "hr") return "\n<hr />\n";
    if (tag === "span" || tag === "label" || tag === "font") return kids(node);
    if (tag === "a") {
      const href = rewriteHref(el.attr("href"), section);
      const ext = /^https?:/.test(href ?? "");
      if (!href) return kids(node);
      return `<a href=${jsxAttr(href)}${ext ? "" : ""}>${kids(node)}</a>`;
    }
    if (["select", "input", "button", "option"].includes(tag)) {
      warnings.push(`${section}/${slug}: dropped <${tag}>`);
      return "";
    }
    if (tag === "td" || tag === "th") {
      const align = (el.attr("style") ?? "").match(/text-align:\s*(left|right|center)/)?.[1];
      return `<${tag}${align && align !== "left" ? ` className="text-${align}"` : ""}>${kids(node).trim()}</${tag}>`;
    }
    if (tag === "table") return `\n<div className="overflow-x-auto"><table>${$(node).children().toArray().map(conv).join("")}</table></div>\n`;
    if (["thead", "tbody", "tr"].includes(tag)) return `<${tag}>${$(node).children().toArray().map(conv).join("")}</${tag}>`;
    if (["h1", "h2", "h3", "h4", "h5"].includes(tag)) {
      const lvl = Math.min(4, Math.max(2, +tag[1] + 1));
      return `\n<h${lvl}>${kids(node)}</h${lvl}>\n`;
    }
    if (["em", "strong", "u", "code", "ul", "ol", "li", "blockquote", "b", "i", "sup", "sub"].includes(tag)) {
      const t = tag === "b" ? "strong" : tag === "i" ? "em" : tag;
      if (tag === "code" && !el.text()) return "";
      return `<${t}>${kids(node)}</${t}>`;
    }
    if (tag === "div") return `\n<div>${kids(node)}</div>\n`;
    warnings.push(`${section}/${slug}: unknown <${tag}>`);
    return kids(node);
  }

  const body = bodyNodes.map(conv).join("");

  // --- page metadata
  const firstP = content.find("p").add(content.filter("p")).toArray().map((p) => $(p).text().replace(/\s+/g, " ").trim()).find((t) => t.length > 60) ?? "";
  const description = firstP.length > 158 ? firstP.slice(0, 155).replace(/\s+\S*$/, "") + "…" : firstP;
  const images = Object.keys(fm).filter((k) => /^myimage\d?$/.test(k)).sort().map((k) => fm[k]).map((src) =>
    src.startsWith("../img/") ? src.slice(2) : `/img/section/${src}`,
  );

  const Layout = { graph: "GraphLayout", story: "StoryLayout", caveat: "CaveatLayout" }[section];
  const titleTag = {
    graph: `${pageTitle} – from Data to Viz`,
    story: `${pageTitle} – from Data to Viz`,
    caveat: `${pageTitle} | Dataviz pitfall gallery`,
  }[section];

  const imports = [...usesComponents].sort();
  const src = `import { ${Layout} } from "@/components/layouts";
${imports.length ? `import { ${imports.join(", ")} } from "@/components/content";\n` : ""}import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/${section}/${slug}.html",
  title: ${JSON.stringify(titleTag)},
  description: ${JSON.stringify(description)},
  image: ${JSON.stringify(images[0] ?? "/img/logo/typo.png")},
});

export default function Page() {
  return (
    <${Layout} title=${jsxAttr(pageTitle)} images={${JSON.stringify(images)}}>
      ${body}
    </${Layout}>
  );
}
`;
  manifest.push({ section, slug, title: pageTitle, description, images });
  return src;
}

// ---------------------------------------------------------------- main

const prettierConfig = { parser: "typescript", printWidth: 100 };
for (const section of SECTIONS) {
  for (const f of fs.readdirSync(path.join(LEGACY, section)).filter((f) => f.endsWith(".html")).sort()) {
    const slug = f.replace(/\.html$/, "");
    if (SKIP.has(slug)) continue;
    if (only.length && !only.includes(`${section}/${slug}`)) continue;
    try {
      fs.rmSync(path.join(ROOT, "public/figures", section, slug), { recursive: true, force: true });
      const raw = convertPage(section, slug);
      const out = path.join(ROOT, "app", section, slug, "page.tsx");
      fs.mkdirSync(path.dirname(out), { recursive: true });
      let formatted = raw;
      try {
        formatted = await prettier.format(raw, prettierConfig);
      } catch (e) {
        warnings.push(`${section}/${slug}: prettier failed: ${e.message.split("\n")[0]}`);
      }
      fs.writeFileSync(out, formatted);
      console.log(`✓ ${section}/${slug}`);
    } catch (e) {
      console.error(`✗ ${section}/${slug}: ${e.stack}`);
    }
  }
}
if (!only.length) {
  fs.writeFileSync(path.join(ROOT, "scripts/migrate/manifest.json"), JSON.stringify(manifest, null, 2));
}
console.log(`\n${warnings.length} warnings`);
for (const w of [...new Set(warnings)]) console.log("  ! " + w);
fs.rmSync(TMP, { recursive: true, force: true });
