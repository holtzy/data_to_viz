import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layouts";
import { buttonClass } from "@/lib/button";
import { getSkill, skillHref } from "@/lib/ai-skills";
import { CopyText } from "./copy-text";
import { InstallOptions } from "./install-options";

export function SkillHeading({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mt-14 font-heading text-[26px] leading-9 font-bold tracking-[0.03em] first:mt-0">
      {children}
    </h2>
  );
}

/** A list with "–" markers, as in a terminal. */
export function DashList({ items }: { items: ReactNode[] }) {
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

/** Who wrote the skill with Yan. `photo` is optional: initials are shown without it. */
export type CoAuthor = { name: string; url: string; role: string; photo?: string };
/** The course the skill is based on. `image`: a preview of the course page. */
export type Course = { name: string; url: string; image: string; text: string };

/**
 * The page of one skill: header (name, pitch, ways to install, byline, image), the description
 * (`children`) with a sidebar (skills it pairs with, how to invoke it), then an optional `example`
 * section at full width. `task` finishes the sentence of the example prompt ("…and use it to <task>.").
 * A `coAuthor` is credited in the byline and the sidebar; a `course` gets a link under the byline and
 * a banner below the description.
 */
export function SkillPage({
  slug,
  pitch,
  imageAlt,
  coAuthor,
  course,
  task,
  pairs,
  children,
  example,
}: {
  slug: string;
  pitch: string;
  imageAlt: string;
  coAuthor?: CoAuthor;
  course?: Course;
  task: string;
  pairs: { slug: string; text: string }[];
  children: ReactNode;
  example?: ReactNode;
}) {
  const skill = getSkill(slug);
  const invoke = `/${slug}`;
  return (
    <PageShell>
      <div className="mx-auto max-w-[1080px] px-6 pt-32 pb-24 sm:px-10 sm:pt-40">
        <header className="grid items-center gap-10 md:grid-cols-[1.3fr_1fr] md:gap-14">
          <div>
            <p className="font-mono text-sm text-slate-400">
              <a href="/ai-skills.html" className="no-underline hover:text-slate-700">
                ai-skills
              </a>
              {invoke}
            </p>
            <h1 className="mt-3 font-heading text-[40px] leading-[48px] font-bold tracking-[0.03em] sm:text-5xl sm:leading-[60px]">
              {skill.name}
            </h1>
            <p className="mt-4 max-w-md text-lg text-slate-600">{pitch}</p>
            <div className="mt-7">
              <InstallOptions skill={slug} task={task} compact />
            </div>
            <p className="mt-5 font-mono text-xs text-slate-400">
              By Yan Holtz
              {coAuthor && (
                <>
                  {" and "}
                  <a href={coAuthor.url} className="text-slate-600 underline underline-offset-2 hover:text-slate-900">
                    {coAuthor.name}
                  </a>
                </>
              )}{" "}
              · Updated {skill.updated}
            </p>
            {course && (
              <a href={course.url} className="link mt-3 inline-flex items-center gap-1.5 text-sm font-medium">
                📚 Based on the {course.name} course
                <ArrowRight className="size-3.5" />
              </a>
            )}
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-2">
            <img
              src={skill.image}
              alt={imageAlt}
              width={800}
              height={500}
              className="aspect-[16/10] w-full rounded-xl object-cover"
            />
          </div>
        </header>

        <div className="mt-24 grid gap-14 md:grid-cols-[1fr_260px] md:gap-16">
          <article className="max-w-2xl">{children}</article>

          <aside className="md:pt-1">
            {coAuthor && (
              <div className="mb-6 border-b border-slate-100 pb-6">
                <p className="text-sm text-slate-500">Co-authored with</p>
                <a href={coAuthor.url} className="group mt-4 flex items-center gap-3 no-underline">
                  {coAuthor.photo ? (
                    <img
                      src={coAuthor.photo}
                      alt=""
                      width={160}
                      height={160}
                      className="size-12 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
                      {coAuthor.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </span>
                  )}
                  <span>
                    <span className="block text-[15px] font-semibold text-slate-900 group-hover:underline">
                      {coAuthor.name}
                    </span>
                    <span className="block text-sm text-slate-500">{coAuthor.role}</span>
                  </span>
                </a>
              </div>
            )}
            <p className="text-sm text-slate-500">Pairs with</p>
            <ul className="mt-4 space-y-4">
              {pairs.map((pair) => {
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
                <code>{invoke}</code>
                <CopyText text={invoke} />
              </div>
            </div>
          </aside>
        </div>

        {course && (
          <aside
            aria-label={`The ${course.name} course`}
            className="mt-24 grid items-center gap-8 rounded-2xl border border-slate-200 bg-white p-2 md:grid-cols-[1fr_1.1fr] md:gap-10"
          >
            <a href={course.url} className="block overflow-hidden rounded-xl">
              <img
                src={course.image}
                alt={`The ${course.name} course page`}
                width={800}
                height={500}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover object-top"
              />
            </a>
            <div className="px-4 pb-6 md:px-0 md:pr-8 md:pb-0">
              <p className="font-mono text-xs tracking-wide text-slate-400 uppercase">Go further</p>
              <p className="mt-2 font-heading text-[26px] leading-9 font-bold tracking-[0.03em]">{course.name}</p>
              <p className="mt-3 text-slate-600">{course.text}</p>
              <a href={course.url} className={buttonClass("dark", "md", "mt-6")}>
                See the course
                <ArrowRight className="size-4" />
              </a>
            </div>
          </aside>
        )}

        {example && <section className="mt-24">{example}</section>}
      </div>
    </PageShell>
  );
}
