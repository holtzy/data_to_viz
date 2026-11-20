/** The skills of github.com/holtzy/dataviz-skills, grouped as on the /ai-skills page. */

export const SKILLS_REPO = "https://github.com/holtzy/dataviz-skills";

export type SkillCategory = { id: string; title: string; description: string };
/** `page`: the skill has its own page at /ai-skills/<slug>.html. `updated`: date shown on that page. */
export type Skill = {
  slug: string;
  name: string;
  category: string;
  description: string;
  coAuthor?: string;
  image: string;
  page?: boolean;
  updated?: string;
};

/** The skill's own page when it has one, its folder on GitHub otherwise. */
export const skillHref = (skill: Skill) =>
  skill.page ? `/ai-skills/${skill.slug}.html` : `${SKILLS_REPO}/tree/main/${skill.slug}`;

export const getSkill = (slug: string) => SKILLS.find((s) => s.slug === slug)!;

export const SKILL_CATEGORIES: SkillCategory[] = [
  { id: "roast", title: "Roast", description: "Review a finished chart and get a list of what to fix." },
  { id: "inspiration", title: "Inspiration", description: "Find published charts to borrow ideas from before drawing." },
  { id: "code", title: "Code", description: "Clean, idiomatic plotting code in your favorite library." },
];

export const SKILLS: Skill[] = [
  {
    slug: "d3",
    name: "D3.js + React",
    category: "code",
    description: "Build, fix or animate a D3.js chart inside a React or Next.js app.",
    image: "/ai-skills/d3.webp",
    page: true,
    updated: "November 5, 2026",
  },
  {
    slug: "ggplot2",
    name: "ggplot2",
    category: "code",
    description: "Publication-ready charts in R, following an opinionated set of ggplot2 best practices.",
    coAuthor: "Cédric Scherer",
    image: "/ai-skills/ggplot2.webp",
    page: true,
    updated: "November 5, 2026",
  },
  {
    slug: "matplotlib",
    name: "Matplotlib",
    category: "code",
    description: "Publication-ready charts in Python with Matplotlib and Seaborn: styling, annotations, layouts and maps.",
    coAuthor: "Joseph Barbier",
    image: "/ai-skills/matplotlib.webp",
    page: true,
    updated: "November 5, 2026",
  },
  {
    slug: "new-dataviz-project",
    name: "New dataviz project",
    category: "code",
    description: "Start a web dataviz project with React, TypeScript, D3 and Tailwind, ready to deploy on GitHub Pages.",
    image: "/ai-skills/new-dataviz-project.webp",
    page: true,
    updated: "November 9, 2026",
  },
  {
    slug: "roast-my-chart",
    name: "Roast my chart",
    category: "roast",
    description: "Check a chart against the 61 Data to Viz caveat flashcards and get a prioritized list of fixes.",
    image: "/ai-skills/roast-my-chart.webp",
    page: true,
    updated: "November 5, 2026",
  },
  {
    slug: "inspiration",
    name: "Inspiration",
    category: "inspiration",
    description: "Find 3 to 5 published charts to borrow ideas from, on dataviz-inspiration.com and Dataviz Index.",
    coAuthor: "Joël Gombin",
    image: "/ai-skills/inspiration.webp",
    page: true,
    updated: "November 10, 2026",
  },
];
