import { pageMetadata } from "@/lib/metadata";
import { getSkill } from "@/lib/ai-skills";
import { DashList, SkillHeading, SkillPage } from "../skill-page";

export const metadata = pageMetadata({
  path: "/ai-skills/matplotlib.html",
  title: "Matplotlib: an AI skill for publication-ready charts in Python | Data to Viz",
  description:
    "An AI skill to write clean Matplotlib and Seaborn code: styling, annotations, layouts and maps. By Joseph Barbier and Yan Holtz, from the Matplotlib Journey course.",
  image: getSkill("matplotlib").image,
});

export default function Page() {
  return (
    <SkillPage
      slug="matplotlib"
      pitch="Publication-ready charts in Python, with Matplotlib and Seaborn."
      imageAlt="Matplotlib code in Python, seen at an angle"
      task="write my chart in Matplotlib"
      coAuthor={{
        name: "Joseph Barbier",
        url: "https://github.com/JosephBARBIERDARNAL",
        role: "Python dataviz developer",
        photo: "/ai-skills/people/joseph-barbier.webp",
      }}
      course={{
        name: "Matplotlib Journey",
        url: "https://www.matplotlib-journey.com",
        image: "/ai-skills/courses/matplotlib-journey.webp",
        text: "The skill comes from Matplotlib Journey, the course Joseph Barbier and Yan Holtz built: 5 modules and 34 lessons to make you love Matplotlib.",
      }}
      pairs={[
        { slug: "inspiration", text: "Find a chart idea first" },
        { slug: "roast-my-chart", text: "Check the chart once drawn" },
      ]}
    >
      <SkillHeading>What it does</SkillHeading>
      <DashList
        items={[
          "Uses the object-oriented API and builds the figure deliberately.",
          "Styles for the reading task: theme, text and annotations.",
          "Builds layouts around comparisons, and maps with a proper projection.",
          "Renders the chart, looks at it, and refines it.",
        ]}
      />

      <SkillHeading>When to use it</SkillHeading>
      <p className="mt-4 text-slate-600">
        Whenever you create or polish a Matplotlib, Seaborn or GeoPandas chart. It covers the code: the chart design
        comes from the other skills.
      </p>
    </SkillPage>
  );
}
