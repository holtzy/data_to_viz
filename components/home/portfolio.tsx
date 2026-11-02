"use client";

import { useState, type MouseEvent } from "react";
import { PORTFOLIO, PORTFOLIO_FILTERS } from "@/components/home/data/home";
import { useOpenChart } from "@/components/home/chart-dialog";
import { ChartTile } from "@/components/chart-tile";
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
            className="animate-in fade-in duration-500"
          >
            <ChartTile
              href={item.href ?? "#"}
              image={item.image}
              title={item.title}
              onClick={(e) => onOpen(e, item.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
