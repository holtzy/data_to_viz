import { pageMetadata } from "@/lib/metadata";
import { getSkill } from "@/lib/ai-skills";
import { DashList, SkillHeading, SkillPage } from "../skill-page";

export const metadata = pageMetadata({
  path: "/ai-skills/ggplot2.html",
  title: "ggplot2: an AI skill for publication-ready charts in R | Data to Viz",
  description:
    "An AI skill to write clean, idiomatic ggplot2 code: themes, scales, legends, faceting and export. By Cédric Scherer and Yan Holtz, from the ggplot2 Uncharted course.",
  image: getSkill("ggplot2").image,
});

export default function Page() {
  return (
    <SkillPage
      slug="ggplot2"
      pitch="Publication-ready charts in R, following an opinionated set of ggplot2 best practices."
      imageAlt="ggplot2 code in R, seen at an angle"
      task="write my chart in ggplot2"
      coAuthor={{
        name: "Cédric Scherer",
        url: "https://www.cedricscherer.com",
        role: "Data visualization designer",
        photo: "/ai-skills/people/cedric-scherer.webp",
      }}
      course={{
        name: "ggplot2 Uncharted",
        url: "https://www.ggplot2-uncharted.com",
        image: "/ai-skills/courses/ggplot2-uncharted.webp",
        text: "The skill comes from ggplot2 Uncharted, the interactive course Cédric Scherer and Yan Holtz built to make you a ggplot2 expert.",
      }}
      pairs={[
        { slug: "inspiration", text: "Find a chart idea first" },
        { slug: "roast-my-chart", text: "Check the chart once drawn" },
      ]}
    >
      <SkillHeading>What it does</SkillHeading>
      <DashList
        items={[
          "Writes tidy, idiomatic ggplot2 code.",
          "Sets a clean theme, readable scales and legends.",
          "Handles faceting and export settings.",
          "Avoids the most common ggplot2 pitfalls.",
        ]}
      />

      <SkillHeading>When to use it</SkillHeading>
      <p className="mt-4 text-slate-600">
        Whenever you write, fix or refactor ggplot2 code. It covers the code: the chart design comes from the other
        skills.
      </p>
    </SkillPage>
  );
}
