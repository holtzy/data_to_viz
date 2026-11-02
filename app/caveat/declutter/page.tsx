import { CaveatLayout } from "@/components/layouts";
import { Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/caveat/declutter.html",
  title: "Decluttering your chart | Dataviz pitfall gallery",
  description:
    "Getting rid of all the unnecessary elements can greatly improve the quality and impact of your chart. First, the chart will be cleaner and thus more…",
  image: "/img/mistake/declutter_your_graphic.png",
});

export default function Page() {
  return (
    <CaveatLayout
      title="Decluttering your chart"
      images={["/img/mistake/declutter_your_graphic.png"]}
    >
      <p>
        Getting rid of all the unnecessary elements can greatly improve the quality and impact of
        your chart. First, the chart will be cleaner and thus more likely to be read by people.
        Second, it will allow people to target directly what is important on the chart, and thus to
        get your point.
      </p>

      <p>
        Here is a good example that takes a cluttered graphic from{" "}
        <a href="http://viz.wtf">viz.wtf</a> and gets rid of the unnecessary elements. This example
        comes from the website{" "}
        <a href="http://www.storytellingwithdata.com/blog/2017/3/29/declutter-this-graph">
          Storytelling with data
        </a>{" "}
        by <a href="http://www.storytellingwithdata.com/about/">Cole Nussbaumer Knaflic</a>.
      </p>

      <Section id="initial-graphic" title="Initial graphic">
        <p>
          The idea of the chart is to show that women tend to begin Christmas shopping earlier than
          men:
        </p>
        <br />
        <div className="text-center">
          {" "}
          <img src="/figures/caveat/declutter/1.webp" alt="img" width={500} loading="lazy" />{" "}
        </div>
      </Section>

      <Section id="final-appearance" title="Final appearance:">
        <br />
        <div className="text-center">
          {" "}
          <img src="/figures/caveat/declutter/2.webp" alt="img" width={500} loading="lazy" />{" "}
        </div>
      </Section>

      <Section id="step-by-step" title="Step by step">
        <p>Here are the components you can consider removing when making a chart:</p>
        <ul>
          {" "}
          <li>3D (always)</li> <li>Color effects for decoration (always)</li>{" "}
          <li>Grid lines (if unnecessary only)</li> <li>Axis</li> <li>Decimals</li>{" "}
          <li>Play with font and text size: some text is more important than others</li>{" "}
        </ul>
        <p>
          Here is an animation showing the evolution of the previous chart at each step of the
          improvement:
        </p>
        <br />
        <br />
        <div className="text-center">
          {" "}
          <img src="/figures/caveat/declutter/3.gif" alt="img" width={600} loading="lazy" />{" "}
        </div>

        <div className="text-center">
          {" "}
          <em>
            <a href="http://www.storytellingwithdata.com/blog/2017/3/29/declutter-this-graph">
              The impact of decluttering your graph by Storytelling with data
            </a>
          </em>{" "}
        </div>
      </Section>

      <Section id="going-further" title="Going further">
        <ul>
          {" "}
          <li>
            Visit the website{" "}
            <a href="http://www.storytellingwithdata.com/">Story Telling with data</a>
          </li>{" "}
          <li>
            Order <a href="http://www.storytellingwithdata.com/book/">Cole’s book</a>: a data
            visualization guide for business professionals
          </li>{" "}
          <li>
            <a href="https://www.darkhorseanalytics.com/blog/data-looks-better-naked">
              Data looks better naked
            </a>
            , by Dark Horse Analytics.
          </li>{" "}
        </ul>
      </Section>
    </CaveatLayout>
  );
}
