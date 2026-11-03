"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FLASHCARD_SECTIONS, FLASHCARD_SIZE, FLASHCARD_THUMB_SIZE, type Flashcard } from "@/lib/flashcards";
import { buttonClass } from "@/lib/button";
import { cn } from "@/lib/utils";

type Props = {
  /** Card id → article on data-to-viz.com that covers the same caveat. */
  articles: Record<string, string>;
};

/**
 * Caveat flashcards grouped by section. "See card" (or the image) opens it large;
 * cards with a matching article get a "Read more" link to it.
 */
// TEMPORARY: compare tile images with ?view=crop (default) | full | vertical.
type View = "crop" | "full" | "vertical";
const VIEWS: Record<
  View,
  { src: (c: Flashcard) => string; size: { width: number; height: number }; pad: string; grid: string }
> = {
  crop: {
    src: (c) => c.thumb,
    size: FLASHCARD_THUMB_SIZE,
    pad: "px-2 py-5",
    grid: "sm:grid-cols-2 md:grid-cols-3",
  },
  full: { src: (c) => c.image, size: FLASHCARD_SIZE, pad: "", grid: "sm:grid-cols-2 md:grid-cols-3" },
  vertical: {
    src: (c) => `/flashcards/vertical/${c.id}.webp`,
    size: { width: 720, height: 1440 },
    pad: "",
    grid: "grid-cols-2 md:grid-cols-3",
  },
};

/** Every card in the order shown on the page, for Previous / Next in the modal. */
const ALL_CARDS = FLASHCARD_SECTIONS.flatMap((s) => s.cards);

export function FlashcardGallery({ articles }: Props) {
  const [open, setOpen] = useState<Flashcard | null>(null);
  const article = open ? articles[open.id] : undefined;
  const index = open ? ALL_CARDS.findIndex((c) => c.id === open.id) : -1;
  const prev = index > 0 ? ALL_CARDS[index - 1] : null;
  const next = index >= 0 && index < ALL_CARDS.length - 1 ? ALL_CARDS[index + 1] : null;

  // ← / → switch cards. Handled on the modal itself: it doesn't let key events reach the window.
  const onModalKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft" && prev) setOpen(prev);
    if (e.key === "ArrowRight" && next) setOpen(next);
  };
  const [view, setView] = useState<View>("crop");
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get("view");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- temporary comparison switch
    if (v === "full" || v === "vertical") setView(v);
  }, []);
  const v = VIEWS[view];

  return (
    <>
      <SectionPills />

      {FLASHCARD_SECTIONS.map((section) => (
        <section key={section.id} aria-labelledby={section.id} className="mt-16">
          <h2
            id={section.id}
            className="scroll-mt-24 border-b border-slate-100 pb-2 font-heading text-[28px] leading-9 font-bold tracking-[0.03em]"
          >
            {section.title}
          </h2>
          <ul className={`mt-6 grid grid-cols-1 gap-x-5 gap-y-7 ${v.grid}`}>
            {section.cards.map((card) => (
              <li key={card.id} className="group">
                {/* Borderless tile: the charts on the card's gray, then the title on a lighter band. */}
                <div className="flex h-full flex-col overflow-hidden rounded-[6px]">
                  <div className="relative overflow-hidden bg-[#f2f2f2]">
                    <button
                      type="button"
                      onClick={() => setOpen(card)}
                      aria-label={`See card: ${card.title}`}
                      className={`block w-full cursor-zoom-in ${v.pad}`}
                    >
                      <img
                        src={v.src(card)}
                        alt={`Flashcard: ${card.title}`}
                        width={v.size.width}
                        height={v.size.height}
                        loading="lazy"
                        className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.04]"
                      />
                    </button>
                    {/* Hover veil with the actions (mouse and keyboard only; touch taps the image). */}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 bg-slate-900/55 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100 focus-within:pointer-events-auto focus-within:opacity-100 [@media(hover:none)]:hidden">
                      <button type="button" onClick={() => setOpen(card)} className={buttonClass("secondary", "sm")}>
                        See card
                      </button>
                      {articles[card.id] && (
                        <a href={articles[card.id]} className={buttonClass("primary", "sm")}>
                          Read more
                        </a>
                      )}
                    </div>
                  </div>
                  {/* Caption band, a lighter gray than the image area. */}
                  <div className="flex-1 bg-[#f9f9f9] px-3 py-2.5">
                    <p className="text-[15px] leading-snug text-slate-700">{card.title}</p>
                    {articles[card.id] && (
                      <a
                        href={articles[card.id]}
                        className="link mt-1 inline-block text-sm [@media(hover:hover)]:hidden"
                      >
                        Read more
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        {open && (
          <DialogContent
            onKeyDown={onModalKeyDown}
            className="max-h-[95vh] gap-5 overflow-y-auto p-4 sm:max-w-5xl sm:p-6"
          >
            <img
              src={open.image}
              alt={`Flashcard: ${open.title}`}
              width={FLASHCARD_SIZE.width}
              height={FLASHCARD_SIZE.height}
              className="h-auto w-full border border-slate-200"
            />
            {/* The card is self-explanatory: its title is only announced to screen readers. */}
            <DialogTitle className="sr-only">{open.title}</DialogTitle>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <button
                type="button"
                onClick={() => prev && setOpen(prev)}
                disabled={!prev}
                className={buttonClass("secondary", "md", "justify-self-start disabled:opacity-40")}
              >
                <ChevronLeft className="size-4" />
                Previous
              </button>
              {article ? (
                <a href={article} className={buttonClass("primary", "md")}>
                  Read more
                  <ArrowRight className="size-4" />
                </a>
              ) : (
                <span />
              )}
              <button
                type="button"
                onClick={() => next && setOpen(next)}
                disabled={!next}
                className={buttonClass("secondary", "md", "justify-self-end disabled:opacity-40")}
              >
                Next
                <ChevronRight className="size-4" />
              </button>
            </div>
            <p className="text-center text-xs text-slate-400 [@media(hover:none)]:hidden">
              Use <kbd className="rounded border border-slate-200 px-1 font-sans">←</kbd>{" "}
              <kbd className="rounded border border-slate-200 px-1 font-sans">→</kbd> to switch cards
            </p>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}

/**
 * Links to each section on one horizontally scrollable row. A white fade marks
 * the side(s) that still have hidden pills.
 */
function SectionPills() {
  const ref = useRef<HTMLDivElement>(null);
  const [fade, setFade] = useState({ left: false, right: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setFade({ left: el.scrollLeft > 4, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <nav aria-label="Caveat sections" className="relative">
      <div ref={ref} className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto flex w-max gap-2 px-1 py-1">
          {FLASHCARD_SECTIONS.map((s) => (
            <Badge
              key={s.id}
              variant="secondary"
              render={<a href={`#${s.id}`} />}
              className="h-7 gap-1.5 px-3 text-[13px] font-normal text-slate-700 hover:bg-slate-200"
            >
              {s.title}
              <span className="text-slate-400 tabular-nums">{s.cards.length}</span>
            </Badge>
          ))}
        </div>
      </div>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent transition-opacity",
          fade.left ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent transition-opacity",
          fade.right ? "opacity-100" : "opacity-0",
        )}
      />
    </nav>
  );
}
