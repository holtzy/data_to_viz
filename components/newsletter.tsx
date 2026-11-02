"use client";

import { useEffect, useRef, useState } from "react";
import { KIT_FORM_UID } from "@/lib/site";
import { buttonClass } from "@/lib/button";

const KIT_HOST = "https://prodigious-trailblazer-3628.kit.com";

/**
 * Kit (ConvertKit) embedded form. The embed script renders the form next to
 * itself, so it is injected into our container. When the script is blocked
 * (content blockers often do), a link to the hosted form is shown instead.
 */
export function KitForm({ uid = KIT_FORM_UID, className }: { uid?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    if (!container.querySelector("script")) {
      const script = document.createElement("script");
      script.async = true;
      script.dataset.uid = uid;
      script.src = `${KIT_HOST}/${uid}/index.js`;
      script.onerror = () => setBlocked(true);
      container.appendChild(script);
    }
    const timer = setTimeout(() => {
      if (!container.querySelector("form")) setBlocked(true);
    }, 4000);
    // A slow network can render the form after the fallback appeared: hide it then.
    const observer = new MutationObserver(() => {
      if (container.querySelector("form")) setBlocked(false);
    });
    observer.observe(container, { childList: true, subtree: true });
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [uid]);

  return (
    <div className={className}>
      <div ref={ref} className="flex w-full justify-center" />
      {blocked && (
        <a href={`${KIT_HOST}/${uid}`} className={buttonClass("primary", "lg")}>
          Subscribe to the newsletter
        </a>
      )}
    </div>
  );
}

/** "Get the decision tree poster" band shown at the bottom of content pages. */
export function NewsletterSection() {
  return (
    <section id="form" className="mt-20 border-t bg-muted/50 py-16">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center">
        <h2 className="font-heading text-3xl font-bold sm:text-4xl">Dataviz decision tree</h2>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          <a href="/" className="link">
            Data To Viz
          </a>{" "}
          is a comprehensive <strong>classification of chart types</strong> organized by data input format. Get a
          high-resolution version of our decision tree delivered to your inbox now!
        </p>
        <KitForm className="mt-6 w-full" />
        <img
          src="/img/poster/poster_small.png"
          alt="High resolution poster of the Data to Viz decision tree"
          loading="lazy"
          className="mt-8 w-full max-w-sm shadow-lg"
        />
      </div>
    </section>
  );
}
