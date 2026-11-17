import type { CSSProperties } from "react";

type Img = { src: string; height: number }; // all images are 240px wide

/** Vertical flashcards on the left, charts from dataviz-inspiration.com on the right (240px-wide copies in public/ai-skills/hero). */
const CARDS: Img[] = Array.from({ length: 18 }, (_, i) => ({ src: `/ai-skills/hero/card-${i + 1}.webp`, height: 480 }));
const VIZ_HEIGHTS = [136, 335, 435, 175, 241, 300, 156, 168, 249, 240, 291, 144, 173, 240, 238, 176, 143, 197];
const VIZ: Img[] = VIZ_HEIGHTS.map((height, i) => ({ src: `/ai-skills/hero/viz-${i + 1}.webp`, height }));

const CSS = `
@keyframes hero-up { from { transform: translateY(0) } to { transform: translateY(-33.333%) } }
@keyframes hero-down { from { transform: translateY(-33.333%) } to { transform: translateY(0) } }
@media (prefers-reduced-motion: reduce) { .hero-col { animation: none !important } }
`;

/** Fades the wall toward the title (along a line tilted 15°, fully gone well before its inner edge) and at the top and bottom. It's on the untilted frame, so the fades stay straight. */
const mask = (side: "left" | "right"): CSSProperties => {
  const value = `linear-gradient(${side === "left" ? 105 : 255}deg, #000 25%, transparent 75%), linear-gradient(to bottom, transparent, #000 25%, #000 75%, transparent)`;
  return { maskImage: value, WebkitMaskImage: value, maskComposite: "intersect", WebkitMaskComposite: "source-in" };
};

function Side({ images, side }: { images: Img[]; side: "left" | "right" }) {
  // Deal the images into 3 columns; each column slowly scrolls, the middle one the other way.
  const columns = [0, 1, 2].map((c) => images.filter((_, i) => i % 3 === c));
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute top-10 -bottom-28 -z-10 hidden w-[min(480px,calc(50vw-320px))] overflow-hidden opacity-45 xl:block ${
        side === "left" ? "left-0" : "right-0"
      }`}
      style={mask(side)}
    >
      {/* The columns, tilted by 30°, in a frame large enough to still cover the corners. */}
      <div className="absolute top-1/2 left-1/2 flex h-[220%] w-[125%] -translate-x-1/2 -translate-y-1/2 rotate-[30deg] gap-1.5">
        {columns.map((column, c) => (
          <div key={c} className="min-w-0 flex-1 overflow-hidden">
            <div
              className="hero-col flex flex-col gap-1.5"
              style={{ animation: `${c === 1 ? "hero-down" : "hero-up"} ${70 + c * 12}s linear infinite` }}
            >
              {/* Three times the same images, so the loop jumps back by exactly a third without a seam. */}
              {[...column, ...column, ...column].map((img, i) => (
                <img key={i} src={img.src} alt="" width={240} height={img.height} loading="lazy" className="w-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Two discreet masonry walls on the far left and right of the hero, on wide screens only. */
export function HeroColumns() {
  return (
    <>
      <style>{CSS}</style>
      <Side images={CARDS} side="left" />
      <Side images={VIZ} side="right" />
    </>
  );
}
