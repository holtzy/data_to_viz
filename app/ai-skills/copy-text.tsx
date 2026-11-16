"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** A small copy-to-clipboard icon button for `text`. */
export function CopyText({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy to clipboard"
      className="shrink-0 rounded-[4px] p-1 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-900"
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
    </button>
  );
}
