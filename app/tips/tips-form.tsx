"use client";

import { useEffect, useRef } from "react";

/** Kit (ConvertKit) "best tips" form — a different form than the site-wide poster form. */
const TIPS_FORM_UID = "00710104fc";

export function TipsForm() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = ref.current;
    if (!container || container.childElementCount) return;
    const script = document.createElement("script");
    script.async = true;
    script.dataset.uid = TIPS_FORM_UID;
    script.src = `https://prodigious-trailblazer-3628.ck.page/${TIPS_FORM_UID}/index.js`;
    container.appendChild(script);
  }, []);
  return <div ref={ref} className="flex min-h-48 w-full justify-center" />;
}
