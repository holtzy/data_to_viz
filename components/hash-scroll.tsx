"use client";

import { useEffect } from "react";

/**
 * Scrolls to `location.hash` once the page is hydrated. Arriving on
 * `/#story` or `/graph/violin.html#related` otherwise ends up at the top: the router resets the scroll
 * after hydration, at a moment that varies. So the jump is re-applied a few
 * times during the first second, until the user scrolls themselves.
 */
export function HashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (!target) return;

    const go = () => target.scrollIntoView({ behavior: "instant", block: "start" });
    const timers = [0, 100, 300, 600, 1000].map((t) => setTimeout(go, t));
    const stop = () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("load", go);
    };
    window.addEventListener("load", go, { once: true });
    const userEvents = ["wheel", "touchstart", "keydown", "mousedown"] as const;
    userEvents.forEach((e) => window.addEventListener(e, stop, { once: true, passive: true }));
    return () => {
      stop();
      userEvents.forEach((e) => window.removeEventListener(e, stop));
    };
  }, []);
  return null;
}
