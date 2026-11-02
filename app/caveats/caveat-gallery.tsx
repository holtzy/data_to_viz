"use client";

import { useState } from "react";
import { buttonClass } from "@/lib/button";
import { cn } from "@/lib/utils";

export type CaveatTag = "top10" | "improvement" | "misleading" | "map" | "bar";

export type CaveatItem = {
  href: string;
  image: string;
  title: string;
  text: string;
  tags: CaveatTag[];
  /** Links to an article outside data-to-viz.com (shown slightly faded, as on the original page). */
  external?: boolean;
};

const FILTERS: { value: CaveatTag | "all"; label: string }[] = [
  { value: "all", label: "Show all" },
  { value: "top10", label: "Top 10" },
  { value: "improvement", label: "Improvement" },
  { value: "misleading", label: "Misleading" },
  { value: "map", label: "Map" },
  { value: "bar", label: "Bar" },
];

/** Filterable grid of caveats. Every card stays in the HTML; filtering only hides cards. */
export function CaveatGallery({ items }: { items: CaveatItem[] }) {
  const [filter, setFilter] = useState<CaveatTag | "all">("all");

  return (
    <>
      <div role="group" aria-label="Filter caveats" className="flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            aria-pressed={filter === f.value}
            onClick={() => setFilter(f.value)}
            className={buttonClass("toggle", "sm")}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.href} className={cn(filter !== "all" && !item.tags.includes(filter) && "hidden")}>
            <a
              href={item.href}
              className={cn(
                "group flex h-full flex-col items-center rounded-xl border bg-card p-5 text-center transition hover:border-brand/40 hover:shadow-md",
                item.external && "opacity-70 hover:opacity-100",
              )}
            >
              <img src={item.image} alt={item.title} loading="lazy" className="size-24 object-contain" />
              <h2 className="mt-4 font-heading text-[17px] leading-snug font-bold text-slate-900 group-hover:text-brand">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-snug text-muted-foreground">{item.text}</p>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
