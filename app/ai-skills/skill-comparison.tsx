import type { ReactNode } from "react";

type Side = { body: ReactNode; caption: string };

/**
 * The same prompt answered without and with a skill, side by side.
 * `command` is the slash command shown in the prompt line, `prompt` the rest of the question,
 * `attachment` an optional chip after it (e.g. the chart being reviewed).
 */
export function SkillComparison({
  command,
  prompt,
  attachment,
  before,
  after,
}: {
  command: string;
  prompt: string;
  attachment?: ReactNode;
  before: Side;
  after: Side;
}) {
  return (
    <figure className="mt-8 rounded-2xl border border-slate-200 bg-white p-2">
      <figcaption className="flex flex-wrap items-center gap-x-2 gap-y-2 px-4 py-3 font-mono text-[13px] text-slate-700">
        <span aria-hidden className="text-slate-400">
          &gt;
        </span>
        <span className="text-sky-600">{command}</span>
        <span>{prompt}</span>
        {attachment}
      </figcaption>
      <div className="grid overflow-hidden rounded-xl border border-slate-200 md:grid-cols-2">
        <Column label="Before" tone="before" side={before} />
        <Column label="After" tone="after" side={after} />
      </div>
    </figure>
  );
}

function Column({ label, tone, side }: { label: string; tone: "before" | "after"; side: Side }) {
  return (
    <div className="flex flex-col border-slate-200 first:border-b md:first:border-r md:first:border-b-0">
      <div className="flex-1 p-4">
        <span
          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
            tone === "before" ? "bg-slate-100 text-slate-600" : "bg-sky-100 text-sky-700"
          }`}
        >
          {label}
        </span>
        <div className="mt-4 space-y-3 px-1 text-[15px] leading-relaxed text-slate-700">{side.body}</div>
      </div>
      <p className="border-t border-dashed border-slate-200 px-4 py-3 text-center font-mono text-xs text-slate-500">
        {side.caption}
      </p>
    </div>
  );
}

/** A titled box inside the "after" column, e.g. one flagged issue. */
export function ComparisonItem({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 px-3.5 py-3">
      <p className="font-medium text-slate-900">{title}</p>
      <div className="mt-1 text-sm leading-relaxed text-slate-500">{children}</div>
    </div>
  );
}
