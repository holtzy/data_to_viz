"use client";

import { useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Download } from "lucide-react";
import { KitForm } from "@/components/newsletter";
import { buttonClass } from "@/lib/button";

/** Kit form whose confirmation email holds the link to the skills zip. */
const SKILLS_FORM_UID = "2824d83ea2";

/**
 * A trigger that opens a Kit form in a modal; Kit emails the skills zip.
 * Underlined words by default; pass `className` to style it as a button.
 */
export function DownloadSkills({
  children,
  className = "link cursor-pointer",
}: {
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 overflow-hidden p-6 text-center sm:max-w-lg sm:p-8">
          {/* The six skill cards, edge to edge at the top of the modal. */}
          <img
            src="/ai-skills/modal.webp"
            alt=""
            width={1236}
            height={524}
            className="-mx-6 -mt-6 mb-6 block h-auto w-[calc(100%+3rem)] max-w-none sm:-mx-8 sm:-mt-8 sm:mb-8 sm:w-[calc(100%+4rem)]"
          />
          <DialogTitle className="font-heading text-2xl font-bold tracking-[0.03em]">
            Get all the dataviz skills
          </DialogTitle>
          <DialogDescription className="mt-3 text-base text-slate-600">
            Enter your email and I&rsquo;ll send you every skill in a zip file, ready to add to Claude, ChatGPT or your
            coding agent.
          </DialogDescription>
          <KitForm uid={SKILLS_FORM_UID} className="mt-6" />
          <p className="mt-4 text-xs text-slate-500">No spam. Unsubscribe at any time.</p>
        </DialogContent>
      </Dialog>
    </>
  );
}

/** Centered pitch for the skills zip, shown between skill categories. */
export function DownloadSkillsCta() {
  return (
    <aside className="mx-auto max-w-xl py-16 text-center">
      <p className="font-heading text-[28px] leading-9 font-bold tracking-[0.03em]">Take them all with you</p>
      <p className="mt-3 text-slate-600">
        Every dataviz skill in one zip file, sent to your inbox. Unzip it and add the skills to Claude, ChatGPT or your
        coding agent.
      </p>
      <div className="mt-8">
        <DownloadSkills className={buttonClass("dark", "lg")}>
          <Download className="size-5" />
          Download all skills
        </DownloadSkills>
      </div>
    </aside>
  );
}
