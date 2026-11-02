"use client";

import { useState, type MouseEvent } from "react";
import { PORTFOLIO, PORTFOLIO_FILTERS } from "@/components/home/data/home";
import { useOpenChart } from "@/components/home/chart-dialog";
import { cn } from "@/lib/utils";
import { buttonClass } from "@/lib/button";

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
            className={buttonClass("toggle", "sm")}
          >
            {f.label}
          </button>
        ))}
      </div>
      <ul className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-start gap-x-3 gap-y-5">
        {PORTFOLIO.map((item) => (
          <li
            key={item.id}
            hidden={filter !== "all" && !item.categories.includes(filter)}
            className="w-[130px] animate-in fade-in duration-500"
          >
            <a
              href={item.href ?? "#"}
              onClick={(e) => onOpen(e, item.id)}
              className="group flex flex-col items-center text-center"
            >
              {/* Same tile as the React Graph Gallery front page: icon + "+" overlay on hover. */}
              <span className="relative block size-[122px]">
                <img src={item.image} alt={item.title} loading="lazy" className="size-[122px] object-contain" />
                <span
                  aria-hidden
                  className="absolute inset-0 flex items-center justify-center rounded-full bg-brand text-4xl text-white opacity-0 transition-opacity group-hover:opacity-60"
                >
                  +
                </span>
              </span>
              <span className="mt-1 text-sm font-light text-slate-500 group-hover:text-slate-900">{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
