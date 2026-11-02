"use client";

import { useState } from "react";
import { STORY_GROUPS } from "@/components/home/data/home";
import { cn } from "@/lib/utils";

/**
 * Data stories grouped by input data type. Every group is in the HTML
 * (inactive ones are hidden) so all story links stay crawlable.
 */
export function StoryTabs() {
  const [active, setActive] = useState(STORY_GROUPS[0].label);

  return (
    <div>
      <div role="tablist" aria-label="Data type" className="flex flex-wrap justify-center gap-2">
        {STORY_GROUPS.map((g) => (
          <button
            key={g.label}
            role="tab"
            aria-selected={active === g.label}
            onClick={() => setActive(g.label)}
            className={cn(
              "rounded-md border px-4 py-2 text-sm transition",
              active === g.label
                ? "border-brand bg-brand text-white shadow-sm"
                : "border-brand/50 bg-white/80 text-brand hover:border-brand hover:bg-brand/10",
            )}
          >
            {g.label}
          </button>
        ))}
      </div>
      {STORY_GROUPS.map((g) => (
        <ul
          key={g.label}
          role="tabpanel"
          aria-label={`${g.label} data stories`}
          hidden={active !== g.label}
          className="mx-auto mt-10 grid max-w-4xl animate-in gap-3 duration-500 fade-in sm:grid-cols-2"
        >
          {g.items.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                className="group flex h-full items-center gap-4 rounded-lg border bg-white/90 p-3 pr-5 transition hover:border-brand hover:shadow-md"
              >
                <div className="flex shrink-0 -space-x-4">
                  {s.images.slice(0, 3).map((src) => (
                    <img
                      key={src}
                      src={src}
                      alt=""
                      loading="lazy"
                      className="size-12 rounded-full border-2 border-white bg-white object-contain"
                    />
                  ))}
                </div>
                <span className="leading-snug group-hover:text-brand">{s.title}</span>
              </a>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
