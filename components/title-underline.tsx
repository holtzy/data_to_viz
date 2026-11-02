const WIDTH = 96;
const MID = 12;
const LINES = 7;
const STAGGER = 0.06; // seconds between two lines
const WAVE_START = 0.7; // after the draw-in

/** A line across the box made of 4 smooth humps of height `amp` (0 = straight). */
const wave = (amp: number) =>
  `M0 ${MID} Q12 ${MID - amp} 24 ${MID} T48 ${MID} T72 ${MID} T${WIDTH} ${MID}`;

/**
 * Line under page titles. It draws in from left to right, then splits into a
 * bundle of thin lines that each ripple as a wave (slightly staggered) before
 * merging back into one. The middle line never moves, so with reduced motion
 * the others are hidden and a static line remains (see `.title-underline`).
 */
export function TitleUnderline({ className }: { className?: string }) {
  const center = (LINES - 1) / 2;
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${WIDTH} 24`}
      className={`title-underline h-6 w-24 overflow-visible ${className ?? ""}`}
      fill="none"
      stroke="#334155"
      strokeWidth={1.5}
      strokeLinecap="round"
    >
      {Array.from({ length: LINES }, (_, i) => {
        const amp = (i - center) * 2.2;
        if (amp === 0) return <path key={i} d={wave(0)} />;
        return (
          <path key={i} d={wave(0)} className="title-underline-wave" strokeOpacity={0.45}>
            <animate
              attributeName="d"
              values={[wave(0), wave(amp), wave(-amp * 0.6), wave(0)].join(";")}
              keyTimes="0;0.35;0.7;1"
              calcMode="spline"
              keySplines="0.45 0 0.55 1;0.45 0 0.55 1;0.45 0 0.55 1"
              dur="1.4s"
              begin={`${(WAVE_START + i * STAGGER).toFixed(2)}s`}
              fill="freeze"
            />
          </path>
        );
      })}
    </svg>
  );
}
