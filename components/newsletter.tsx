"use client";

import { useEffect, useRef } from "react";
import { KIT_FORM_UID } from "@/lib/site";

/** Kit (ConvertKit) form. The embed script renders the form next to itself, so it is injected into our container. */
export function KitForm() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = ref.current;
    if (!container || container.childElementCount) return;
    const script = document.createElement("script");
    script.async = true;
    script.dataset.uid = KIT_FORM_UID;
    script.src = `https://prodigious-trailblazer-3628.ck.page/${KIT_FORM_UID}/index.js`;
    container.appendChild(script);
  }, []);
  return <div ref={ref} className="flex min-h-24 w-full justify-center" />;
}

/** "Get the decision tree poster" band shown at the bottom of content pages. */
export function NewsletterSection() {
  return (
    <section id="form" className="mt-20 border-t bg-muted/50 py-16">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center">
        <h2 className="font-heading text-3xl font-semibold tracking-wide sm:text-4xl">Dataviz decision tree</h2>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          <a href="/" className="text-brand hover:underline">
            Data To Viz
          </a>{" "}
          is a comprehensive <strong>classification of chart types</strong> organized by data input format.
          Get a high-resolution version of our decision tree delivered to your inbox now!
        </p>
        <div className="mt-6 w-full">
          <KitForm />
        </div>
        <img
          src="/img/poster/poster_small.png"
          alt="High resolution poster of the Data to Viz decision tree"
          loading="lazy"
          className="mt-8 w-full max-w-sm rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
}
