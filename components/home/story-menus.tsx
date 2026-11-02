"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { STORY_GROUPS } from "@/components/home/data/home";
import { buttonClass } from "@/lib/button";

/**
 * One dropdown per data type listing its data stories, as on the original site.
 * Built on <details> so every story link is in the HTML even when closed.
 */
export function StoryMenus() {
  const ref = useRef<HTMLDivElement>(null);

  // Close the open menu on outside click or Escape.
  useEffect(() => {
    const closeAll = () => ref.current?.querySelectorAll("details[open]").forEach((d) => d.removeAttribute("open"));
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) closeAll();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="flex flex-wrap justify-center gap-2">
      {STORY_GROUPS.map((g) => (
        <details key={g.label} name="story-menu" className="group relative">
          <summary
            className={buttonClass("secondary", "md", "cursor-pointer list-none [&::-webkit-details-marker]:hidden")}
          >
            {g.label}
            <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
          </summary>
          <ul className="absolute top-full left-1/2 z-20 mt-2 w-72 -translate-x-1/2 border bg-white p-1.5 text-left text-base leading-snug shadow-lg">
            {g.items.map((s) => (
              <li key={s.href}>
                <a href={s.href} className="block px-3 py-2 text-slate-900 transition-colors hover:bg-slate-100">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
}
