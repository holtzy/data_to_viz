import { pageMetadata } from "@/lib/metadata";
import { getSkill } from "@/lib/ai-skills";
import { DashList, SkillHeading, SkillPage } from "../skill-page";

export const metadata = pageMetadata({
  path: "/ai-skills/d3.html",
  title: "D3.js + React: an AI skill for clean D3 charts in React | Data to Viz",
  description:
    "An AI skill to build, fix or animate D3.js charts in a React or Next.js app: D3 for the math, React for the rendering. Based on the D3 Loves React course.",
  image: getSkill("d3").image,
});

export default function Page() {
  return (
    <SkillPage
      slug="d3"
      pitch="Clean D3.js charts inside React: D3 does the math, React draws."
      imageAlt="React and D3 code for a barplot, seen at an angle"
      task="build my chart with D3 and React"
      course={{
        name: "D3 Loves React",
        url: "https://www.d3-loves-react.com",
        image: "/ai-skills/courses/d3-loves-react.webp",
        text: "The skill follows the approach taught in the course: every concept step by step, with exercises and dozens of real-world chart examples.",
      }}
      pairs={[
        { slug: "new-dataviz-project", text: "Start a new project" },
        { slug: "roast-my-chart", text: "Check the chart once drawn" },
      ]}
    >
      <SkillHeading>What it does</SkillHeading>
      <DashList
        items={[
          "Uses D3 for the math only (scales, shapes, layouts) and React for the rendering.",
          "Sets up margins, axes as React components, and a responsive wrapper.",
          "Switches from SVG to canvas when there are too many marks.",
          "Animates transitions with Motion.",
        ]}
      />

      <SkillHeading>When to use it</SkillHeading>
      <p className="mt-4 text-slate-600">
        When you build a chart with D3 in a React or Next.js app. For vanilla D3, without React, it is not the right
        fit.
      </p>
    </SkillPage>
  );
}
