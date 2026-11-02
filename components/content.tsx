import type { ReactNode } from "react";
import { codeToHtml } from "shiki";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <details open={open} className="group not-prose my-4">
      <summary className="ml-auto flex w-fit cursor-pointer list-none items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold tracking-wider text-brand uppercase select-none hover:bg-brand/10 [&::-webkit-details-marker]:hidden">
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
    <pre className="not-prose my-4 overflow-x-auto rounded-lg border bg-muted/40 p-4 text-[13px] leading-relaxed">
      {children}
    </pre>
  );
}

/** An interactive chart (htmlwidget), served as a standalone page and lazily embedded. */
export function Widget({ src, height, width }: { src: string; height: number; width?: number }) {
  return (
    <figure className="not-prose my-6">
      <iframe
        src={src}
        loading="lazy"
        title="Interactive chart"
        className="mx-auto block w-full border-0"
        style={{ height: height + 16, maxWidth: width }}
      />
    </figure>
  );
}

export function RelatedGrid({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
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
      className="group flex flex-col items-center rounded-xl border bg-card p-5 text-center transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
    >
      <img src={image} alt={title} loading="lazy" className="size-20 object-contain" />
      <p className="mt-3 font-heading text-sm font-semibold tracking-wider text-foreground uppercase group-hover:text-brand">
        {title}
      </p>
      <p className="mt-2 text-sm leading-snug text-muted-foreground">{children}</p>
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
      className={cn(
        "not-prose inline-flex items-center rounded-md border border-brand px-4 py-2 text-sm font-semibold tracking-wide text-brand uppercase no-underline transition hover:bg-brand hover:text-white",
        className,
      )}
    >
      {children}
    </a>
  );
}
