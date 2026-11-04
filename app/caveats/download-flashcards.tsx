"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { KitForm } from "@/components/newsletter";
import { buttonClass } from "@/lib/button";
import { FLASHCARD_SECTIONS } from "@/lib/flashcards";

/** Kit form that emails the flashcards. */
const FLASHCARDS_FORM_UID = "b63addebcc";
const CARD_COUNT = FLASHCARD_SECTIONS.reduce((n, s) => n + s.cards.length, 0);

/** "Download all flashcards": opens a Kit form; Kit emails the flashcards. */
export function DownloadFlashcards({ size = "md" }: { size?: "md" | "lg" }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={buttonClass("dark", size)}>
        <Download className={size === "lg" ? "size-5" : "size-4"} />
        Download all flashcards
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 overflow-hidden p-6 text-center sm:max-w-lg sm:p-8">
          {/* The cards fanned out, edge to edge at the top of the modal. */}
          <img
            src="/flashcards/grid.webp"
            alt=""
            width={1024}
            height={399}
            className="-mx-6 -mt-6 mb-6 block h-auto w-[calc(100%+3rem)] max-w-none sm:-mx-8 sm:-mt-8 sm:mb-8 sm:w-[calc(100%+4rem)]"
          />
          <DialogTitle className="font-heading text-2xl font-bold tracking-[0.03em]">
            Get all the flashcards
          </DialogTitle>
          <DialogDescription className="mt-3 text-base text-slate-600">
            Enter your email and I&rsquo;ll send you every flashcard in high resolution, ready to print or share.
          </DialogDescription>
          <KitForm uid={FLASHCARDS_FORM_UID} className="mt-6" />
          <p className="mt-4 text-xs text-slate-500">No spam. Unsubscribe at any time.</p>
        </DialogContent>
      </Dialog>
    </>
  );
}

/** Centered pitch for the flashcards PDF, shown between gallery sections. */
export function DownloadCta({ title, text }: { title: string; text: string }) {
  return (
    <aside className="mx-auto mt-24 max-w-xl text-center">
      <p className="font-heading text-[28px] leading-9 font-bold tracking-[0.03em]">{title}</p>
      <p className="mt-3 text-slate-600">{text.replace("{count}", String(CARD_COUNT))}</p>
      <div className="mt-8">
        <DownloadFlashcards size="lg" />
      </div>
    </aside>
  );
}
