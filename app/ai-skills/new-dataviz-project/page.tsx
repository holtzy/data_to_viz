import { pageMetadata } from "@/lib/metadata";
import { getSkill } from "@/lib/ai-skills";
import { DashList, SkillHeading, SkillPage } from "../skill-page";

export const metadata = pageMetadata({
  path: "/ai-skills/new-dataviz-project.html",
  title: "New dataviz project: an AI skill to start a web dataviz project | Data to Viz",
  description:
    "An AI skill that scaffolds a web dataviz project with React, TypeScript, D3, shadcn/ui and Tailwind: a default barplot, nice fonts, and a GitHub Pages deployment ready to go.",
  image: getSkill("new-dataviz-project").image,
});

export default function Page() {
  return (
    <SkillPage
      slug="new-dataviz-project"
      pitch="Start a web dataviz project in one prompt, ready to deploy on GitHub Pages."
      imageAlt="The starter page of a dataviz project, in React and TypeScript, seen at an angle"
      task="start a new dataviz project"
      pairs={[
        { slug: "d3", text: "Draw the charts in React" },
        { slug: "inspiration", text: "Find a chart idea first" },
      ]}
    >
      <SkillHeading>What it does</SkillHeading>
      <DashList
        items={[
          "Sets up React and TypeScript, with D3, shadcn/ui, Tailwind and Lucide icons.",
          "Adds nice, self-hosted fonts and a narrow reading column.",
          "Draws a default responsive barplot, following the D3 skill.",
          "Deploys to GitHub Pages on every push.",
        ]}
      />

      <SkillHeading>When to use it</SkillHeading>
      <p className="mt-4 text-slate-600">
        When you start a new dataviz website or chart project. You only have to replace the barplot with your own
        charts.
      </p>
    </SkillPage>
  );
}
