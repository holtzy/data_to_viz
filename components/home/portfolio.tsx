"use client";

import { useState, type MouseEvent } from "react";
import { PORTFOLIO, PORTFOLIO_FILTERS } from "@/components/home/data/home";
import { useOpenChart } from "@/components/home/chart-dialog";
import { cn } from "@/lib/utils";

/** "A world of possibilities": every chart type, filterable by purpose. */
export function Portfolio() {
  const [filter, setFilter] = useState("all");
  const openChart = useOpenChart();

  const onOpen = (e: MouseEvent, id: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    openChart(id);
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {PORTFOLIO_FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            aria-pressed={filter === f.id}
            className={cn(
              "rounded-md border px-3 py-1.5 text-sm transition",
              filter === f.id
                ? "border-brand bg-brand text-white"
                : "border-brand/40 bg-background text-brand hover:border-brand hover:bg-brand/10",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-6">
        {PORTFOLIO.map((item) => (
          <li
            key={item.id}
            hidden={filter !== "all" && !item.categories.includes(filter)}
            className="animate-in fade-in duration-500"
          >
            <a
              href={item.href ?? "#"}
              onClick={(e) => onOpen(e, item.id)}
              className="group flex flex-col items-center text-center"
            >
              <span className="relative block overflow-hidden rounded-full">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="size-28 object-contain transition duration-300 group-hover:scale-105 group-hover:opacity-70"
                />
              </span>
              <span className="mt-2 font-serif text-sm font-semibold group-hover:text-brand">
                {item.title}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
