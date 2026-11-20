"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { SKILLS_REPO } from "@/lib/ai-skills";
import { DownloadSkills } from "./download-skills";

/**
 * `typed`: the code is typed out letter by letter when the option is shown.
 * `form`: no code block; the intro links to the email form, in a modal.
 */
type Option = {
  id: string;
  label: string;
  intro: ReactNode;
  code?: string;
  note?: string;
  typed?: boolean;
  form?: boolean;
};

/**
 * The ways to get the skills. With a `skill`, the commands install only that one and the
 * prompt asks for its `task`; without, they cover the whole repo.
 */
function optionsFor(skill?: string, task = "review the chart I attached"): Option[] {
  const example = skill ?? "roast-my-chart";
  return [
    {
      id: "download",
      label: "Download all",
      form: true,
      intro: (
        <>
          <DownloadSkills>Get all the dataviz skills in a zip file</DownloadSkills>, sent to your inbox.
        </>
      ),
      note: "Unzip it, then upload a skill folder to Claude, ChatGPT or your coding agent.",
    },
    {
      id: "prompt",
      label: "Prompt",
      typed: true,
      intro: skill
        ? "No install. Give your AI the link to the skill."
        : "No install. Give your AI the link of a skill and ask it to follow it.",
      code: `Read ${SKILLS_REPO}/blob/main/${example}/SKILL.md\nand use it to ${task}.`,
      note: "Works with any assistant that can open a URL. Otherwise, paste the content of the SKILL.md file instead.",
    },
    {
      id: "git",
      label: "Git",
      intro: skill
        ? "Clone the repo, then copy the skill folder into your tool's skills folder."
        : "Clone the repo, then copy the skill folders you want into your tool's skills folder.",
      code: `git clone ${SKILLS_REPO}.git\ncp -r dataviz-skills/${example} ~/.claude/skills/`,
      note: "Skills folders: ~/.claude/skills/ for Claude Code, ~/.cursor/skills/ for Cursor, ~/.agents/skills/ for Codex.",
    },
    {
      id: "npx",
      label: "Node",
      intro: `One command installs ${skill ? "it" : "the skills"} into any coding agent: Claude Code, Cursor, Codex, Copilot, Gemini CLI…`,
      code: skill ? `npx skills add holtzy/dataviz-skills --skill ${skill}` : "npx skills add holtzy/dataviz-skills",
      note: skill
        ? "Add --global to install it for all your projects."
        : "Add --skill roast-my-chart to install a single skill, and --global to install it for all your projects.",
    },
    {
      id: "claude",
      label: "Claude marketplace",
      intro: skill
        ? "In Claude Code, add the repo as a marketplace. This installs all the dataviz skills."
        : "In Claude Code, add the repo as a marketplace and install the skills.",
      code: "/plugin marketplace add holtzy/dataviz-skills\n/plugin install dataviz-skills@dataviz-skills",
    },
  ];
}

/**
 * One toggle per way to get the skills, and the matching command with a copy button.
 * `skill` / `task`: see optionsFor. `handClassName`: the font of the "install with" note, shown only when given.
 * `compact`: smaller text, for a skill page.
 */
export function InstallOptions({
  skill,
  task,
  handClassName,
  compact = false,
}: {
  skill?: string;
  task?: string;
  handClassName?: string;
  compact?: boolean;
}) {
  const options = optionsFor(skill, task);
  const [active, setActive] = useState(options[0].id);
  const [copied, setCopied] = useState(false);
  const option = options.find((o) => o.id === active)!;

  const copy = async () => {
    if (!option.code) return;
    await navigator.clipboard.writeText(option.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      {/* Button group: the options sit side by side in one bordered strip, centered except on a skill page.
          The handwritten note hangs to its right without pushing it off center. */}
      <div className={`flex ${compact ? "" : "justify-center"}`}>
        <div className="relative">
          <div
            role="tablist"
            aria-label="Ways to use the skills"
            className="inline-flex overflow-hidden rounded-[4px] border border-slate-200"
          >
            {options.map((o) => (
              <button
                key={o.id}
                type="button"
                role="tab"
                aria-selected={o.id === active}
                onClick={() => {
                  setActive(o.id);
                  setCopied(false);
                }}
                className="h-8 border-l border-slate-200 bg-white px-3 text-[13px] font-medium text-slate-600 transition-colors first:border-l-0 hover:bg-slate-50 aria-selected:bg-slate-900 aria-selected:text-white"
              >
                {o.label}
              </button>
            ))}
          </div>
          {handClassName && (
            <div
              aria-hidden
              className={`${handClassName} pointer-events-none absolute top-1/2 left-full ml-3 hidden -translate-y-1/2 items-center gap-1 text-xl whitespace-nowrap text-slate-400 sm:flex`}
            >
              <svg
                viewBox="0 0 50 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="h-6 w-10"
              >
                <path d="M46 8 C 34 24, 18 24, 4 16" />
                <path d="M11 11 L 4 16 L 12 21" />
              </svg>
              <span className="-translate-y-2 -rotate-3">how to use</span>
            </div>
          )}
        </div>
      </div>

      <div role="tabpanel" className={compact ? "mt-4" : "mt-6"}>
        <p className={compact ? "text-sm text-slate-600" : "text-slate-600"}>{option.intro}</p>
        {option.form ? null : (
          <div className={`relative rounded-[6px] bg-slate-900 text-slate-100 ${compact ? "mt-3" : "mt-4"}`}>
            <pre
              className={`pr-14 font-mono whitespace-pre-wrap [overflow-wrap:anywhere] ${compact ? "py-3 pl-4 text-[13px] leading-[22px]" : "py-4 pl-5 text-sm leading-6"}`}
            >
              <code>{option.typed ? <TypedText key={option.id} text={option.code ?? ""} /> : option.code}</code>
            </pre>
            <button
              type="button"
              onClick={copy}
              aria-label="Copy to clipboard"
              className="absolute top-2.5 right-2.5 rounded-[4px] p-2 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            </button>
          </div>
        )}
        {option.note && <p className={`mt-3 text-slate-500 ${compact ? "text-xs" : "text-sm"}`}>{option.note}</p>}
      </div>
    </div>
  );
}

/** Types `text` out with a blinking caret. Screen readers and reduced-motion users get the full text at once. */
function TypedText({ text }: { text: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = reduced ? text.length : 0;
    const timer = setInterval(() => {
      i = Math.min(i + 1, text.length);
      setCount(i);
      if (i === text.length) clearInterval(timer);
    }, 28);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <>
      <span className="sr-only">{text}</span>
      {/* The invisible full text keeps the block at its final height while typing. */}
      <span aria-hidden className="grid">
        <span className="invisible col-start-1 row-start-1">{text}</span>
        <span className="col-start-1 row-start-1">
          {text.slice(0, count)}
          <span className="ml-px inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-pulse bg-slate-300" />
        </span>
      </span>
    </>
  );
}
