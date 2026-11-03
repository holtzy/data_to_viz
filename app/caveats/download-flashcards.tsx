"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { KitForm } from "@/components/newsletter";
import { buttonClass } from "@/lib/button";

/** Kit form that emails the flashcards. */
const FLASHCARDS_FORM_UID = "b63addebcc";

/** "Download all flashcards": opens a Kit form; Kit emails the flashcards. */
export function DownloadFlashcards() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={buttonClass("primary", "md")}>
        <Download className="size-4" />
        Download all flashcards
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 p-6 text-center sm:max-w-md sm:p-8">
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
