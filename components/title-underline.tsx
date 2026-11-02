import type { CSSProperties } from "react";

const SEGMENTS = 12;

/**
 * Short black line under page titles. It draws in from left to right, splits
 * into segments that ripple in a staggered wave, then merges back into one line.
 * Pure CSS (see `.title-underline` in globals.css); static with reduced motion.
 */
export function TitleUnderline({ className }: { className?: string }) {
  return (
    <div aria-hidden className={`title-underline flex h-4 w-24 items-center ${className ?? ""}`}>
      {Array.from({ length: SEGMENTS }, (_, i) => (
        <span key={i} style={{ "--i": i } as CSSProperties} className="h-[3px] flex-1 bg-slate-900" />
      ))}
    </div>
  );
}
