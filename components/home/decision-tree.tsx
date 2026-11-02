"use client";

import { useState, type MouseEvent } from "react";
import { TREES } from "@/components/home/data/trees";
import { useOpenChart } from "@/components/home/chart-dialog";
import { buttonClass } from "@/lib/button";

type Tip = { text: string; image?: string; x: number; y: number };

/**
 * The interactive decision trees. Every tree is in the HTML (inactive ones are
 * hidden) so search engines see all chart links; clicking an icon opens its card.
 */
export function DecisionTree() {
  const [active, setActive] = useState(TREES[0].id);
  const [tip, setTip] = useState<Tip | null>(null);
  const openChart = useOpenChart();

  const onClick = (e: MouseEvent) => {
    const link = (e.target as Element).closest<HTMLAnchorElement>("a[data-chart]");
    if (!link || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    openChart(link.dataset.chart!);
  };

  const onMove = (e: MouseEvent) => {
    const g = (e.target as Element).closest<SVGGElement>("[data-tip]");
    if (!g) return setTip(null);
    setTip({ text: g.dataset.tip!, image: g.dataset.tipImage, x: e.clientX, y: e.clientY });
  };

  return (
    <div>
      <div role="tablist" aria-label="Data type" className="flex flex-wrap justify-center gap-2">
        {TREES.map((t) => (
          <button
            key={t.id}
            id={`tree-tab-${t.id}`}
            role="tab"
            aria-selected={active === t.id}
            aria-controls={`tree-panel-${t.id}`}
            onClick={() => setActive(t.id)}
            className={buttonClass("toggle")}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div onClick={onClick} onMouseMove={onMove} onMouseLeave={() => setTip(null)} className="mt-8">
        {TREES.map((t) => (
          <div
            key={t.id}
            id={`tree-panel-${t.id}`}
            role="tabpanel"
            aria-labelledby={`tree-tab-${t.id}`}
            hidden={active !== t.id}
            className="mx-auto max-w-5xl animate-in fade-in duration-700 [&_a[data-chart]]:cursor-pointer [&_a[data-chart]_image]:transition-opacity [&_a[data-chart]:hover_image]:opacity-60"
            dangerouslySetInnerHTML={{ __html: t.svg }}
          />
        ))}
      </div>
      {tip && (
        <div
          role="tooltip"
          className="pointer-events-none fixed z-50 w-72 rounded-[4px] border bg-popover p-3 text-sm text-popover-foreground shadow-xl"
          style={{
            left: Math.min(tip.x + 16, window.innerWidth - 300),
            top: Math.min(tip.y + 16, window.innerHeight - 260),
          }}
        >
          <p className="font-heading text-[11px] font-semibold tracking-widest text-brand uppercase">
            Your data look like
          </p>
          <p className="mt-1">{tip.text}</p>
          {tip.image && <img src={tip.image} alt="" className="mt-3 max-h-40 w-full object-contain object-left" />}
        </div>
      )}
    </div>
  );
}
