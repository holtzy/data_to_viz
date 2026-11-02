"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { CHARTS } from "@/components/home/data/charts";
import { buttonClass } from "@/lib/button";

const ChartDialogContext = createContext<(id: string) => void>(() => {});

/** Opens the chart summary card (formerly a Bootstrap modal) for a chart id like "violin". */
export const useOpenChart = () => useContext(ChartDialogContext);

export function ChartDialogProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState<string | null>(null);
  const open = useCallback((chartId: string) => setId(chartId), []);
  const chart = id ? CHARTS[id] : null;

  return (
    <ChartDialogContext.Provider value={open}>
      {children}
      <Dialog open={!!chart} onOpenChange={(o) => !o && setId(null)}>
        {chart && (
          <DialogContent className="max-h-[90vh] overflow-y-auto p-6 sm:max-w-2xl sm:p-8">
            <a href={chart.href} className="mx-auto block">
              <img src={chart.image} alt="" className="mx-auto size-28 object-contain" />
            </a>
            <div className="text-center">
              <DialogTitle className="font-heading text-[28px] font-bold tracking-[0.03em]">
                <a href={chart.href} className="hover:underline hover:underline-offset-4">
                  {chart.title}
                </a>
              </DialogTitle>
              <DialogDescription className="mt-2 text-base">{chart.intro}</DialogDescription>
            </div>
            <div className="prose prose-neutral max-w-none text-[15px] prose-headings:font-heading prose-a:text-slate-900 prose-a:decoration-slate-400 prose-a:underline-offset-3 hover:prose-a:decoration-slate-900">
              <h3>About</h3>
              {chart.about}
              {chart.mistakes && (
                <>
                  <h3>Common mistakes</h3>
                  {chart.mistakes}
                </>
              )}
              {chart.code.length > 0 && <h3>Code</h3>}
            </div>
            {chart.code.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {chart.code.map((c) => (
                  <a key={c.href} href={c.href} className={buttonClass("secondary", "sm")}>
                    {c.label}
                  </a>
                ))}
              </div>
            )}
            <a href={chart.href} className={buttonClass("primary", "lg", "mt-2 w-full")}>
              Read the full {chart.title.toLowerCase()} page
            </a>
          </DialogContent>
        )}
      </Dialog>
    </ChartDialogContext.Provider>
  );
}
