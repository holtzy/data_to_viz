import { pageMetadata } from "@/lib/metadata";
import { getSkill } from "@/lib/ai-skills";
import { SkillComparison } from "../skill-comparison";
import { DashList, SkillHeading, SkillPage } from "../skill-page";

export const metadata = pageMetadata({
  path: "/ai-skills/inspiration.html",
  title: "Inspiration: an AI skill to find dataviz references before drawing | Data to Viz",
  description:
    "An AI skill that searches 750+ published charts on dataviz-inspiration.com and Dataviz Index, and borrows their best ideas before drawing your chart. By Yan Holtz and Joël Gombin.",
  image: getSkill("inspiration").image,
});

/** A case-study image that opens full size. */
function Shot({ src, width, height, alt }: { src: string; width: number; height: number; alt: string }) {
  return (
    <a href={src} target="_blank" rel="noreferrer" className="block">
      <img src={src} alt={alt} width={width} height={height} loading="lazy" className="w-full rounded-md" />
    </a>
  );
}

export default function Page() {
  return (
    <SkillPage
      slug="inspiration"
      pitch="Before drawing, your AI finds 3 to 5 published charts to borrow ideas from."
      imageAlt="A wall of published charts from dataviz-inspiration.com"
      coAuthor={{ name: "Joël Gombin", url: "https://github.com/joelgombin", role: "Co-author of the skill" }}
      task="find references before making my chart"
      pairs={[{ slug: "roast-my-chart", text: "Check the chart once drawn" }]}
      example={
        <>
          <div className="max-w-2xl">
            <SkillHeading id="example">What the skill changed</SkillHeading>
            <p className="mt-4 text-slate-600">
              A case study by Joël Gombin: a one-line request, in French, for a map of abstention in the 2026 municipal
              elections in Burgundy, with data from his{" "}
              <a href="https://mcp.andre.vote/" className="link">
                André
              </a>{" "}
              server. Without the skill, a correct but generic map. With it, a chart with a message.
            </p>
          </div>
          <SkillComparison
            command="/inspiration"
            prompt="Fais-moi une carte de l'abstention aux municipales 2026 par commune en Bourgogne"
            before={{
              body: (
                <>
                  <Shot
                    src="/ai-skills/inspiration/before.webp"
                    width={1400}
                    height={1645}
                    alt="Map of abstention by town in Burgundy, in a default yellow-to-red palette, with a plain title"
                  />
                  <p className="text-sm text-slate-500">A default palette, a descriptive title, no story.</p>
                </>
              ),
              caption: "correct · but could be any map",
            }}
            after={{
              body: (
                <>
                  <Shot
                    src="/ai-skills/inspiration/after.webp"
                    width={1400}
                    height={919}
                    alt="The same map in a single brown hue, with a headline, annotated cities and two side charts"
                  />
                  <DashList
                    items={[
                      "A title that states the finding: towns stayed home.",
                      "One hue, so darker means more abstention.",
                      "Cities annotated, with their surroundings for comparison.",
                      "Two side charts: abstention by town size, and how many voters each band holds.",
                    ]}
                  />
                </>
              ),
              caption: "references found first · then borrowed",
            }}
          />
        </>
      }
    >
      <SkillHeading>What it does</SkillHeading>
      <DashList
        items={[
          <>
            Searches 750+ published charts on{" "}
            <a href="https://www.dataviz-inspiration.com" className="link">
              dataviz-inspiration.com
            </a>{" "}
            and{" "}
            <a href="https://datavizindex.fr" className="link">
              Dataviz Index
            </a>
            , in English and French.
          </>,
          "Looks at the 3 to 5 best matches before drawing: form, annotation, palette, layout.",
          "Shows you each reference, with a link to the original and to the gallery.",
          "Then draws your chart, borrowing what fits.",
        ]}
      />

      <SkillHeading>When to use it</SkillHeading>
      <p className="mt-4 text-slate-600">
        Before writing any plotting code. It kicks in on its own for requests like “make a map of X”.
      </p>
    </SkillPage>
  );
}
