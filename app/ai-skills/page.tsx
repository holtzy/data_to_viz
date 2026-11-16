import { Caveat } from "next/font/google";
import { PageShell } from "@/components/layouts";
import { TitleUnderline } from "@/components/title-underline";
import { pageMetadata } from "@/lib/metadata";
import { SKILLS, SKILL_CATEGORIES, skillHref, type Skill } from "@/lib/ai-skills";
import { GithubPill } from "./github-pill";
import { InstallOptions } from "./install-options";

/** Handwritten font, only for the little notes around the hero. */
const hand = Caveat({ subsets: ["latin"], weight: "500" });

export const metadata = pageMetadata({
  path: "/ai-skills.html",
  title: "AI Skills for Better Data Visualization | Data to Viz",
  description:
    "Free AI skills that help Claude, ChatGPT, Cursor and other assistants build better charts: D3.js, ggplot2 and Matplotlib code, a chart roast against 61 dataviz caveats, and inspiration from published charts.",
  image: "/ai-skills/roast-my-chart.webp",
});

/** Star count at build time, so the pill shows a number before the browser refreshes it. */
async function getStars(): Promise<number | null> {
  try {
    const res = await fetch("https://api.github.com/repos/holtzy/dataviz-skills");
    const repo = await res.json();
    return typeof repo.stargazers_count === "number" ? repo.stargazers_count : null;
  } catch {
    return null;
  }
}

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <li>
      <a
        href={skillHref(skill)}
        className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-2 no-underline transition-colors hover:border-slate-300"
      >
        <div className="overflow-hidden rounded-xl bg-[#f2f2f2]">
          <img
            src={skill.image}
            alt=""
            width={800}
            height={500}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        </div>
        <div className="px-3 pt-3.5 pb-3">
          <p className="text-[17px] font-semibold text-slate-900">{skill.name}</p>
          <p className="mt-1 text-[15px] leading-snug text-slate-500">{skill.description}</p>
          {skill.coAuthor && <p className="mt-2 text-sm text-slate-400">With {skill.coAuthor}</p>}
        </div>
      </a>
    </li>
  );
}

export default async function Page() {
  const stars = await getStars();

  return (
    <PageShell>
      <header className="flex flex-col items-center px-4 pt-36 pb-10 text-center sm:pt-44">
        {/* GitHub pill, with a handwritten "give me a star!" note pointing at it on wider screens. */}
        <div className="relative mb-6">
          <GithubPill initialStars={stars} />
          <div
            aria-hidden
            className={`${hand.className} pointer-events-none absolute top-[-34px] left-full ml-3 hidden w-40 text-left text-xl text-slate-400 sm:block`}
          >
            <span className="ml-10 block -rotate-6">give me a star!</span>
            <svg
              viewBox="0 0 60 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="h-8 w-12"
            >
              <path d="M44 4 C 36 26, 22 32, 4 30" />
              <path d="M11 24 L 4 30 L 12 35" />
            </svg>
          </div>
        </div>
        <h1 className="max-w-3xl font-heading text-[36px] leading-[46px] font-bold tracking-[0.03em] sm:text-5xl sm:leading-[60px]">
          AI Skills for Better Data Visualization
        </h1>
        <TitleUnderline className="mt-3" />
        <p className="mt-4 max-w-md text-slate-600">
          By{" "}
          <a href="https://www.yan-holtz.com" className="link">
            Yan Holtz
          </a>
          , for people who want to build better graphs.
        </p>
      </header>

      <section id="install" aria-label="How to use the skills" className="mx-auto max-w-2xl scroll-mt-24 px-6 pt-6">
        <InstallOptions handClassName={hand.className} />
      </section>

      {/* One row per category: number, title and description on the left, its skill cards on the right. */}
      <section
        id="skills"
        aria-label="Skills"
        className="mx-auto max-w-[1080px] scroll-mt-24 px-6 pt-24 pb-16 sm:px-10"
      >
        {SKILL_CATEGORIES.map((category, i) => (
          <section
            key={category.id}
            aria-labelledby={category.id}
            className="grid gap-8 border-t border-slate-100 py-14 md:grid-cols-[1fr_2fr] md:gap-10"
          >
            <div>
              <p className="font-mono text-sm text-slate-400">{String(i + 1).padStart(2, "0")}</p>
              <h2 id={category.id} className="mt-2 font-heading text-[28px] leading-9 font-bold tracking-[0.03em]">
                {category.title}
              </h2>
              <p className="mt-2 max-w-xs text-slate-500">{category.description}</p>
            </div>
            <ul className="grid gap-5 sm:grid-cols-2">
              {SKILLS.filter((s) => s.category === category.id).map((skill) => (
                <SkillCard key={skill.slug} skill={skill} />
              ))}
            </ul>
          </section>
        ))}
      </section>
    </PageShell>
  );
}
