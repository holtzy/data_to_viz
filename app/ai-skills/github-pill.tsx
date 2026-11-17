"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { SKILLS_REPO } from "@/lib/ai-skills";

const API = "https://api.github.com/repos/holtzy/dataviz-skills";

/** The GitHub mark (lucide has no brand icons). */
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden className={className}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

/**
 * Link to the repo with its star count. `initialStars` is fetched at build time;
 * the browser then asks GitHub for the current count.
 */
export function GithubPill({ initialStars }: { initialStars: number | null }) {
  const [stars, setStars] = useState(initialStars);

  useEffect(() => {
    fetch(API)
      .then((r) => (r.ok ? r.json() : null))
      .then((repo) => typeof repo?.stargazers_count === "number" && setStars(repo.stargazers_count))
      .catch(() => {});
  }, []);

  return (
    <a
      href={SKILLS_REPO}
      className="inline-flex h-8 items-center gap-2 rounded-full border border-slate-200 bg-white pr-1 pl-3.5 text-[13px] font-medium text-slate-700 no-underline transition-colors hover:border-slate-300 hover:bg-slate-50"
    >
      <GithubIcon className="size-4" />
      holtzy/dataviz-skills
      {stars !== null && <StarCount stars={stars} />}
    </a>
  );
}

/**
 * The star badge: it fades in and counts up to `stars` (and from the old number to the new one
 * when GitHub answers with a different count). No animation for people who prefer reduced motion.
 */
function StarCount({ stars }: { stars: number }) {
  const [shown, setShown] = useState<number | null>(null);
  const from = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = from.current;
    const duration = reduced ? 0 : 1200;
    let frame = 0;
    let t0 = 0;
    const tick = (now: number) => {
      t0 ||= now;
      const p = duration ? Math.min((now - t0) / duration, 1) : 1;
      const value = Math.round(start + (stars - start) * (1 - Math.pow(1 - p, 3)));
      from.current = value;
      setShown(value);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    // A short pause, so the count starts once the page has settled.
    const timer = setTimeout(() => (frame = requestAnimationFrame(tick)), reduced ? 0 : 400);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [stars]);

  return (
    <span
      className={`flex h-6 items-center gap-1 rounded-full bg-slate-100 px-2 text-slate-600 tabular-nums transition-all duration-500 ${
        shown === null ? "scale-75 opacity-0" : "scale-100 opacity-100"
      }`}
    >
      <Star className="size-3.5 fill-amber-400 text-amber-400" />
      {/* The invisible final number keeps the badge at its final width while counting. */}
      <span className="grid">
        <span className="invisible col-start-1 row-start-1">{stars}</span>
        <span aria-hidden className="col-start-1 row-start-1 text-right">
          {shown ?? 0}
        </span>
      </span>
      <span className="sr-only">{stars} stars on GitHub</span>
    </span>
  );
}
