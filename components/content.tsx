import type { ReactNode } from "react";
import { codeToHtml } from "shiki";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonClass } from "@/lib/button";

/** A titled block of an article. `id` is the anchor used in links (`#definition`). */
export function Section({
  id,
  title,
  level = 2,
  children,
}: {
  id: string;
  title: ReactNode;
  level?: 2 | 3 | 4;
  children?: ReactNode;
}) {
  const Heading = `h${level}` as const;
  return (
    <section id={id} className="scroll-mt-24">
      <Heading>{title}</Heading>
      {children}
    </section>
  );
}

/**
 * Source code, highlighted at build time. Folded by default like on the
 * original R Markdown pages, but always present in the HTML for search engines.
 */
export async function Code({
  lang = "r",
  open = false,
  children,
}: {
  lang?: "r" | "python" | "javascript" | "bash";
  open?: boolean;
  children: string;
}) {
  const html = await codeToHtml(children, { lang, theme: "github-light" });
  return (
    <details open={open} className="group my-4">
      <summary className="ml-auto flex w-fit cursor-pointer list-none items-center gap-1 rounded-md px-2 py-1 text-xs font-light tracking-wider text-slate-600 uppercase select-none hover:bg-slate-100 hover:text-brand [&::-webkit-details-marker]:hidden">
        <span className="group-open:hidden">Show code</span>
        <span className="hidden group-open:inline">Hide code</span>
        <ChevronDown className="size-3.5 transition-transform group-open:rotate-180" />
      </summary>
      <div
        className="mt-2 overflow-x-auto rounded-lg border bg-[#f6f8fa] text-[13px] leading-relaxed [&_pre]:!bg-transparent [&_pre]:p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </details>
  );
}

/** Raw console output printed by a code chunk. */
export function Output({ children }: { children: string }) {
  return (
    <pre className="my-4 overflow-x-auto rounded-lg border bg-muted/40 p-4 text-[13px] leading-relaxed">
      {children}
    </pre>
  );
}

/** An interactive chart (htmlwidget), served as a standalone page and lazily embedded. */
export function Widget({ src, height, width }: { src: string; height: number; width?: number }) {
  return (
    <figure className="full-bleed my-6 px-[15px]">
      <iframe
        src={src}
        loading="lazy"
        title="Interactive chart"
        className="mx-auto block w-full border-0"
        style={{ height: height + 16, maxWidth: Math.max(width ?? 900, 700) }}
      />
    </figure>
  );
}

export function RelatedGrid({ children }: { children: ReactNode }) {
  return (
    <div className="full-bleed my-6 px-[15px]">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
    </div>
  );
}

export function RelatedCard({
  href,
  image,
  title,
  children,
}: {
  href: string;
  image: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="group flex flex-col items-center rounded-xl border bg-card p-5 text-center no-underline transition hover:border-brand/40 hover:shadow-md"
    >
      <img src={image} alt={title} loading="lazy" className="size-20 object-contain" />
      <span className="mt-3 font-heading text-[17px] leading-snug font-bold text-foreground group-hover:text-brand">
        {title}
      </span>
      <span className="mt-2 text-[15px] leading-snug text-muted-foreground">{children}</span>
    </a>
  );
}

export function ButtonLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={buttonClass("secondary", "md", className)}
    >
      {children}
    </a>
  );
}
