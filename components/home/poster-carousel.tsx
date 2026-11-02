"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SLIDES = [
  { src: "/img/poster/poster_mockup_croped.jpg", alt: "The Data to Viz poster on a wall" },
  { src: "/img/poster/poster_800_400.png", alt: "The complete Data to Viz decision tree poster" },
  { src: "/img/poster/poster_zoom_800_400.png", alt: "Close-up view of the Data to Viz poster" },
];

export function PosterCarousel() {
  const [index, setIndex] = useState(0);
  const go = (delta: number) => setIndex((i) => (i + delta + SLIDES.length) % SLIDES.length);

  return (
    <div>
      <div className="relative overflow-hidden rounded-lg bg-muted shadow-sm">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {SLIDES.map((s, i) => (
            <img
              key={s.src}
              src={s.src}
              alt={s.alt}
              loading={i === 0 ? undefined : "lazy"}
              className="aspect-2/1 w-full shrink-0 object-cover"
            />
          ))}
        </div>
        {[
          { delta: -1, Icon: ChevronLeft, label: "Previous image", side: "left-3" },
          { delta: 1, Icon: ChevronRight, label: "Next image", side: "right-3" },
        ].map(({ delta, Icon, label, side }) => (
          <button
            key={label}
            onClick={() => go(delta)}
            aria-label={label}
            className={cn(
              "absolute top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-foreground shadow transition hover:bg-white",
              side,
            )}
          >
            <Icon className="size-5" />
          </button>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            onClick={() => setIndex(i)}
            aria-label={`Show image ${i + 1}`}
            className={cn("size-2.5 rounded-full transition", i === index ? "bg-brand" : "bg-foreground/20")}
          />
        ))}
      </div>
    </div>
  );
}
