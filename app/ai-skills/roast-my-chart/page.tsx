import { pageMetadata } from "@/lib/metadata";
import { getSkill } from "@/lib/ai-skills";
import { ComparisonItem, SkillComparison } from "../skill-comparison";
import { DashList, SkillHeading, SkillPage } from "../skill-page";

export const metadata = pageMetadata({
  path: "/ai-skills/roast-my-chart.html",
  title: "Roast my chart: an AI skill to review your dataviz | Data to Viz",
  description:
    "An AI skill that checks your chart against 61 common dataviz caveats and returns a prioritized list of fixes. Works with Claude, ChatGPT, Cursor and other assistants, on an image or on plotting code.",
  image: getSkill("roast-my-chart").image,
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

export default function Page() {
  return (
    <SkillPage
      slug="roast-my-chart"
      pitch="Checks your chart against 61 common dataviz caveats and tells you what to fix."
      imageAlt="The Data to Viz caveat flashcards laid out on a table"
      task="review the chart I attached"
      pairs={[{ slug: "inspiration", text: "Find a better chart form" }]}
      example={
        // DRAFT: example content to replace with a real roast.
        <>
          <div className="max-w-2xl">
            <SkillHeading id="example">What the skill changed</SkillHeading>
            <p className="mt-4 text-slate-600">
              The same chart, reviewed with and without the skill. Without it, you get generic tips. With it, every
              caveat is checked, and you get what is actually wrong with this chart, ranked, with a fix.
            </p>
          </div>
          <SkillComparison
            command="/roast-my-chart"
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
                  <p className="text-slate-500 italic">A rainbow for six bars, on an axis that starts at 40. Bold.</p>
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
        </>
      }
    >
      <SkillHeading>What it does</SkillHeading>
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

      <SkillHeading>When to use it</SkillHeading>
      <p className="mt-4 text-slate-600">
        Before you publish a chart. Share a screenshot or the plotting code, and ask your AI to roast it.
      </p>
    </SkillPage>
  );
}
