import type { ReactNode } from "react";
import { PageShell } from "@/components/layouts";
import { pageMetadata } from "@/lib/metadata";
import { getSkill, skillHref } from "@/lib/ai-skills";
import { CopyText } from "../copy-text";
import { InstallOptions } from "../install-options";
import { ComparisonItem, SkillComparison } from "../skill-comparison";

const skill = getSkill("roast-my-chart");
const INVOKE = "/roast-my-chart";

/** Skills that go well with this one, shown in the sidebar. */
const PAIRS = [{ slug: "inspiration", text: "Find a better chart form" }];

export const metadata = pageMetadata({
  path: "/ai-skills/roast-my-chart.html",
  title: "Roast my chart: an AI skill to review your dataviz | Data to Viz",
  description:
    "An AI skill that checks your chart against 61 common dataviz caveats and returns a prioritized list of fixes. Works with Claude, ChatGPT, Cursor and other assistants, on an image or on plotting code.",
  image: skill.image,
});

/** The chart attached to the example prompt: six rainbow bars on a y-axis that starts at 40. */
function ChartChip() {
  const bars = [44, 52, 47, 58, 41, 50];
  const colors = ["#e6194b", "#f58231", "#ffe119", "#3cb44b", "#4363d8", "#911eb4"];
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 py-1 pr-2.5 pl-1.5 text-xs text-slate-500">
      <svg viewBox="0 0 36 24" className="h-5 w-8" aria-hidden>
        <line x1="2" y1="22" x2="35" y2="22" stroke="#94a3b8" strokeWidth="0.8" />
        {bars.map((v, i) => {
          const h = (v - 40) * 1.1;
          return <rect key={i} x={4 + i * 5.3} y={22 - h} width="4" height={h} fill={colors[i]} />;
        })}
      </svg>
      sales.png
    </span>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-14 font-heading text-[26px] leading-9 font-bold tracking-[0.03em] first:mt-0">{children}</h2>
  );
}

/** A list with "–" markers, as in a terminal. */
function DashList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-slate-600">
          <span aria-hidden className="text-slate-300">
            –
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <PageShell>
      <div className="mx-auto max-w-[1080px] px-6 pt-32 pb-24 sm:px-10 sm:pt-40">
        {/* Header: name, pitch, ways to install and byline on the left; the skill image on the right. */}
        <header className="grid items-center gap-10 md:grid-cols-[1.3fr_1fr] md:gap-14">
          <div>
            <p className="font-mono text-sm text-slate-400">
              <a href="/ai-skills.html" className="no-underline hover:text-slate-700">
                ai-skills
              </a>
              {INVOKE}
            </p>
            <h1 className="mt-3 font-heading text-[40px] leading-[48px] font-bold tracking-[0.03em] sm:text-5xl sm:leading-[60px]">
              {skill.name}
            </h1>
            <p className="mt-4 max-w-md text-lg text-slate-600">
              Checks your chart against 61 common dataviz caveats and tells you what to fix.
            </p>
            <div className="mt-7">
              <InstallOptions skill={skill.slug} compact />
            </div>
            <p className="mt-5 font-mono text-xs text-slate-400">By Yan Holtz · Updated {skill.updated}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-2">
            <img
              src={skill.image}
              alt="The Data to Viz caveat flashcards laid out on a table"
              width={800}
              height={500}
              className="aspect-[16/10] w-full rounded-xl object-cover"
            />
          </div>
        </header>

        <div className="mt-24 grid gap-14 md:grid-cols-[1fr_260px] md:gap-16">
          <article className="max-w-2xl">
            <Heading>What it does</Heading>
            <DashList
              items={[
                <>
                  Checks all 61{" "}
                  <a href="/caveats.html" className="link">
                    dataviz caveats
                  </a>
                  , and flags only what it sees in your chart.
                </>,
                "Says what is wrong and how to fix it, with code if you share code.",
                "Ranks the fixes: 🔴 misleading, 🟠 hard to read, 🟡 polish.",
                "Links each fix to its flashcard.",
              ]}
            />

            <Heading>When to use it</Heading>
            <p className="mt-4 text-slate-600">
              Before you publish a chart. Share a screenshot or the plotting code, and ask your AI to roast it.
            </p>
          </article>

          <aside className="md:pt-1">
            <p className="text-sm text-slate-500">Pairs with</p>
            <ul className="mt-4 space-y-4">
              {PAIRS.map((pair) => {
                const other = getSkill(pair.slug);
                return (
                  <li key={pair.slug}>
                    <a href={skillHref(other)} className="group flex items-center gap-3 no-underline">
                      <img
                        src={other.image}
                        alt=""
                        width={800}
                        height={500}
                        className="h-10 w-16 shrink-0 rounded-[6px] border border-slate-200 object-cover"
                      />
                      <span>
                        <span className="block text-[15px] font-semibold text-slate-900 group-hover:underline">
                          {other.name}
                        </span>
                        <span className="block text-sm text-slate-500">{pair.text}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 border-t border-slate-100 pt-6">
              <p className="text-sm text-slate-500">Invoke with</p>
              <div className="mt-3 flex items-center justify-between gap-2 rounded-[6px] bg-slate-100 py-2 pr-2 pl-3 font-mono text-sm text-slate-800">
                <code>{INVOKE}</code>
                <CopyText text={INVOKE} />
              </div>
            </div>
          </aside>
        </div>

        {/* DRAFT: example content to replace with a real roast. */}
        <section aria-labelledby="example" className="mt-24">
          <div className="max-w-2xl">
            <h2 id="example" className="font-heading text-[26px] leading-9 font-bold tracking-[0.03em]">
              What the skill changed
            </h2>
            <p className="mt-4 text-slate-600">
              The same chart, reviewed with and without the skill. Without it, you get generic tips. With it, every
              caveat is checked, and you get what is actually wrong with this chart, ranked, with a fix.
            </p>
          </div>
          <SkillComparison
            command={INVOKE}
            prompt="what do you think of my chart?"
            attachment={<ChartChip />}
            before={{
              body: (
                <>
                  <p>
                    Nice chart! It is clear and colorful. A few ideas: add a title, label your axes, and maybe add a
                    legend for the colors.
                  </p>
                  <p>Want me to make these changes?</p>
                </>
              ),
              caption: "generic tips · could apply to any chart",
            }}
            after={{
              body: (
                <>
                  <p className="italic text-slate-500">A rainbow for six bars, on an axis that starts at 40. Bold.</p>
                  <ComparisonItem title="🔴 Do not cut the y-axis">
                    The y-axis starts at 40, so Coffee (52) looks three times taller than Tea (44). Start it at 0.
                  </ComparisonItem>
                  <ComparisonItem title="🟠 Use color intentionally">
                    Six colors for one variable. Use a single color, and highlight the bar you want to talk about.
                  </ComparisonItem>
                  <ComparisonItem title="🟡 Rank your barplot">
                    The bars are in alphabetical order. Sort them from largest to smallest.
                  </ComparisonItem>
                  <p className="text-sm text-slate-500">Checked 61 caveats: 3 flagged, 18 not applicable.</p>
                </>
              ),
              caption: "61 caveats checked · ranked · with a fix",
            }}
          />
        </section>
      </div>
    </PageShell>
  );
}
