import { buttonClass } from "@/lib/button";

/** The live Claude Code workshop, sold on the React Graph Gallery. Update or remove after November 23. */
const WORKSHOP = {
  url: "https://www.react-graph-gallery.com/workshop/claude-code",
  date: "Monday, November 23, 15:00 to 17:00 (Paris time)",
  totalSeats: 30,
  /** Set by hand: the live count is on the workshop page, from Stripe. */
  seatsLeft: 6,
};

type Cluster = { cx: number; cy: number; r: number; color: string; label: string; kids: [number, number, number][] };

/**
 * Packed bubbles named after D3 modules, like the background of the workshop page.
 * Placed in a 1000×520 box, leaving the middle free for the text.
 */
const CLUSTERS: Cluster[] = [
  {
    cx: 95,
    cy: 90,
    r: 80,
    color: "#59a14f",
    label: "d3-shape",
    kids: [
      [101.9, 96.8, 30.3],
      [55.7, 63.0, 24.7],
      [106.2, 40.9, 22.7],
      [49.4, 113.9, 21.4],
      [86.0, 143.9, 17.3],
      [143.5, 64.7, 16.1],
      [151.4, 101.3, 15.8],
      [125.2, 139.4, 15.5],
    ],
  },
  {
    cx: 40,
    cy: 270,
    r: 55,
    color: "#e15759",
    label: "d3-axis",
    kids: [
      [41.5, 287.2, 19.6],
      [19.2, 254.6, 15.6],
      [66.6, 253.5, 14.4],
      [45.8, 232.9, 10.8],
    ],
  },
  {
    cx: 210,
    cy: 350,
    r: 95,
    color: "#edc948",
    label: "d3-scale",
    kids: [
      [205.3, 343.3, 38.3],
      [244.4, 398.4, 27.2],
      [274.0, 353.0, 23.0],
      [258.5, 309.2, 21.4],
      [197.5, 283.9, 18.3],
    ],
  },
  {
    cx: 130,
    cy: 470,
    r: 60,
    color: "#f28e2b",
    label: "d3-hierarchy",
    kids: [
      [155.1, 452.6, 24.2],
      [119.3, 490.0, 23.2],
      [108.5, 445.8, 20.3],
      [159.2, 497.5, 14.8],
    ],
  },
  {
    cx: 905,
    cy: 95,
    r: 70,
    color: "#4e79a7",
    label: "d3-brush",
    kids: [
      [872.0, 92.9, 26.1],
      [926.2, 99.6, 24.6],
      [915.0, 52.7, 20.3],
      [900.2, 144.1, 14.8],
    ],
  },
  { cx: 800, cy: 40, r: 40, color: "#e15759", label: "d3-color", kids: [[799.7, 39.9, 16.5]] },
  {
    cx: 960,
    cy: 250,
    r: 85,
    color: "#59a14f",
    label: "d3-selection",
    kids: [
      [962.5, 237.6, 34.1],
      [954.5, 300.5, 27.2],
      [909.7, 267.7, 24.6],
      [1007.0, 276.6, 22.7],
      [911.8, 215.9, 18.4],
      [1014.8, 224.9, 17.1],
    ],
  },
  {
    cx: 790,
    cy: 360,
    r: 60,
    color: "#edc948",
    label: "d3-time",
    kids: [
      [808.1, 359.5, 23.8],
      [759.0, 353.9, 23.4],
      [776.3, 393.1, 17.4],
      [785.8, 320.1, 14.9],
    ],
  },
  {
    cx: 920,
    cy: 440,
    r: 45,
    color: "#e15759",
    label: "d3-zoom",
    kids: [
      [925.4, 440.6, 15.8],
      [898.1, 451.0, 11.1],
      [894.6, 423.8, 10.4],
    ],
  },
];

/** Pastel bubble clusters, in two strips pinned to the card's left and right edges, as tall as the card. */
function Bubbles() {
  return (
    <>
      <BubbleStrip x={0} className="left-0" />
      <BubbleStrip x={700} className="right-0" />
    </>
  );
}

/** The clusters whose center falls in the 300-wide band starting at `x`. */
function BubbleStrip({ x, className }: { x: number; className: string }) {
  return (
    <svg
      aria-hidden
      viewBox={`${x} 0 300 520`}
      className={`pointer-events-none absolute top-0 -z-10 hidden h-full w-auto opacity-20 sm:block lg:opacity-40 ${className}`}
    >
      {CLUSTERS.filter((c) => c.cx >= x && c.cx < x + 300).map((c) => (
        <g key={c.label}>
          <circle cx={c.cx} cy={c.cy} r={c.r} fill={c.color} fillOpacity={0.06} />
          {c.kids.map(([kx, ky, r], i) => (
            <circle
              key={i}
              cx={kx}
              cy={ky}
              r={r}
              fill={c.color}
              fillOpacity={0.15}
              stroke={c.color}
              strokeOpacity={0.6}
            />
          ))}
          <text
            // Above the cluster, or below it when that would leave the box; kept inside the strip sideways.
            x={Math.min(Math.max(c.cx, x + c.label.length * 4.5), x + 300 - c.label.length * 4.5)}
            y={c.cy - c.r < 20 ? c.cy + c.r + 16 : c.cy - c.r - 6}
            textAnchor="middle"
            fontSize={13}
            fill={c.color}
            className="font-mono"
          >
            {c.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Ad for the workshop, in the style of its landing page: bubbles, seat count, date, and a link to book. */
export function WorkshopAd({ className = "" }: { className?: string }) {
  const taken = WORKSHOP.totalSeats - WORKSHOP.seatsLeft;
  return (
    <div className={`mx-auto max-w-4xl ${className}`}>
      {/* A short rule, to give the page some breath before the ad. */}
      <hr className="mx-auto mb-20 w-16 border-t-2 border-slate-200" />
      <section
        aria-labelledby="workshop"
        className="relative isolate overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center sm:px-12"
      >
        <Bubbles />
        <p className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium">
          🎟️ Only {WORKSHOP.seatsLeft} seats left
        </p>
        <h2
          id="workshop"
          className="mx-auto mt-5 max-w-md font-heading text-[28px] leading-tight font-bold tracking-[0.03em] sm:text-4xl"
        >
          Workshop: Claude Code for Dataviz
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-slate-600">
          Skills shine in an AI agent. In a 2-hour live workshop, we install Claude Code together, step by step, and you
          leave with an agent building your dataviz app.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm text-slate-600">
          <span>🗓️ {WORKSHOP.date}</span>
          <span>💻 Online</span>
          <span>🎁 Claude Code access included</span>
        </div>

        {/* One dot per seat: grey when taken, outlined in green when still open. */}
        <div
          role="img"
          aria-label={`${WORKSHOP.seatsLeft} seats left out of ${WORKSHOP.totalSeats}`}
          className="mx-auto mt-6 flex max-w-[16rem] flex-wrap justify-center gap-1"
        >
          {Array.from({ length: WORKSHOP.totalSeats }, (_, i) => (
            <span
              key={i}
              className={`size-2.5 rounded-full ${i < taken ? "bg-slate-300" : "border-2 border-emerald-500 bg-white"}`}
            />
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-600">
          <img src="/ai-skills/people/yan-holtz.webp" alt="" className="size-8 rounded-full" />
          Taught by Yan Holtz
        </div>
        <a href={WORKSHOP.url} className={buttonClass("dark", "md", "mt-5")}>
          Save my seat
        </a>
      </section>
    </div>
  );
}
