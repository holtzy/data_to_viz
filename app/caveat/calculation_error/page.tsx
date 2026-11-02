import { CaveatLayout } from "@/components/layouts";
import { Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/caveat/calculation_error.html",
  title: "Calculation errors | Dataviz pitfall gallery",
  description:
    "This is probably the most obvious pitfall example of the collection, but is probably the most frequent one as well. Number inconsistencies on a graphic…",
  image: "/img/mistake/calculation_error.png",
});

export default function Page() {
  return (
    <CaveatLayout title="Calculation errors" images={["/img/mistake/calculation_error.png"]}>
      <p>
        This is probably the most obvious pitfall example of the collection, but is probably the
        most frequent one as well. Number inconsistencies on a graphic make it completely useless.
      </p>

      <Section id="percentages-dont-add-up-to-100" title="Percentages don’t add up to 100%">
        <p>
          For example, when displaying percentages on a pie chart, double-check that the percents
          sum to 100%:
        </p>

        <div className="text-center">
          {" "}
          <img
            src="/figures/caveat/calculation_error/1.webp"
            alt="img"
            width={500}
            height={323}
            loading="lazy"
          />{" "}
        </div>

        <div className="text-center">
          {" "}
          Source:{" "}
          <a href="http://viz.wtf/post/162907112938/i-guess-its-best-to-show-all-the-data-and-use-a#notes">
            WTF Visualizations
          </a>{" "}
        </div>

        <p>
          Here, alsoe note that using an exploded 3D pie chart is probably the worst way to convey
          information ever invented. (<a href="/caveat/pie.html">Read more about it</a>)
        </p>
      </Section>

      <Section id="values-dont-match-visuals" title="Values don’t match visuals">
        <p>
          In the following example, the 45% annotation is linked with the biggest part of the donut
          chart; clearly something is incorrect.
        </p>

        <div className="text-center">
          {" "}
          <img
            src="/figures/caveat/calculation_error/2.webp"
            alt="img"
            width={400}
            height={315}
            loading="lazy"
          />{" "}
        </div>

        <div className="text-center">
          {" "}
          Source:{" "}
          <a href="http://viz.wtf/post/169392205697/fewer-people-would-have-a-hard-time-giving-up">
            WTF Visualizations
          </a>{" "}
        </div>
      </Section>

      <Section id="going-further" title="Going further">
        <ul>
          {" "}
          <li>
            On a daily basis, the website <a href="http://viz.wtf">WTF Visualization</a> shows
            visualizations that make no sense. Check it out or follow them on{" "}
            <a href="https://twitter.com/WTFViz">twitter</a>.
          </li>{" "}
        </ul>
      </Section>
    </CaveatLayout>
  );
}
