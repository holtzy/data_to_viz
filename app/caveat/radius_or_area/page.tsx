import { CaveatLayout } from "@/components/layouts";
import { Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/caveat/radius_or_area.html",
  title: "Scaling to radius or area? | Dataviz pitfall gallery",
  description:
    "A usual practice in data visualization consists of scaling a graphic component to a numeric value. For instance, bar lengths are scaled to values in a…",
  image: "/img/mistake/radius_or_area.png",
});

export default function Page() {
  return (
    <CaveatLayout title="Scaling to radius or area?" images={["/img/mistake/radius_or_area.png"]}>
      <p>
        A usual practice in data visualization consists of <code>scaling</code> a graphic component
        to a numeric value. For instance, bar lengths are scaled to values in a{" "}
        <a href="/graph/barplot">barplot</a>. When the value is scaled to an area, scaling it by two
        sides at the same time produces a quadratic effect for a linear change. This amplifies the
        differences.
      </p>

      <Section id="example" title="Example">
        <p>
          Here is an example coming from the Barack Obama’s{" "}
          <a href="https://www.youtube.com/watch?v=kl2g40GoRxg">State of the Union</a> speech in
          2011. It shows the 2010 Gross Domestic Product of 5 countries, each value being
          represented by a circle. The radius of each circle has been scaled based on the size of
          each nation’s economy.
        </p>

        <div className="text-center">
          {" "}
          <img
            src="/figures/caveat/radius_or_area/1.webp"
            alt="img"
            width={600}
            height={337}
            loading="lazy"
          />{" "}
        </div>

        <div className="text-center">
          {" "}
          Source:{" "}
          <a href="https://www.youtube.com/watch?v=kl2g40GoRxg">
            The 2011 State of the Union Address
          </a>{" "}
        </div>

        <p>Here, America’s economy looks way bigger than the others.</p>
      </Section>

      <Section id="correction" title="Correction">
        <p>
          This distorts the perception of the relative sizes of the circles since the radius scales
          linearly, but the area scales quadratically. Basically, the size of the United States
          economy appears much bigger than it should.
        </p>

        <p>
          Here is a corrected version released on the{" "}
          <a href="http://blog.fastfedora.com/2011/01/2011-state-of-the-union-visualizations.html">
            Fast Fedora blog
          </a>{" "}
          where circle size is scaled to the area instead:
        </p>

        <div className="text-center">
          {" "}
          <img
            src="/figures/caveat/radius_or_area/2.webp"
            alt="img"
            width={600}
            height={384}
            loading="lazy"
          />{" "}
        </div>

        <p>
          The United States still has the biggest economy, but the difference from other countries
          does not appear as big as it did on the first graphic.
        </p>
      </Section>

      <Section id="to-bear-in-mind" title="To bear in mind">
        <p>
          When working with 2d objects, the scaling must be done using the area and not the radius.
          Furthermore, note that areas are a poor metaphor of values, being poorly perceived by
          human eyes. It must be used only when better visuals have already been used on the graphic
          (like in <a href="/graph/bubble.html">bubble plot</a>). In this case, a barplot would
          probably have done a better job.
        </p>
      </Section>

      <Section id="going-further" title="Going further">
        <ul>
          {" "}
          <li>
            <em>Linear vs. Quadratic Change</em> by{" "}
            <a href="https://eagereyes.org/blog/2008/linear-vs-quadratic-change">Robert Kosara</a>
          </li>{" "}
          <li>
            <em>2011 State of the Union Visualizations: Charts, Graphs &amp; Infographics</em> on
            the{" "}
            <a href="http://blog.fastfedora.com/2011/01/2011-state-of-the-union-visualizations.html">
              Fast Fedora
            </a>{" "}
            blog
          </li>{" "}
          <li>
            This pitfall example comes from this{" "}
            <a href="http://paldhous.github.io/ucb/2016/dataviz/week2.html">blog</a>
          </li>{" "}
        </ul>
      </Section>
    </CaveatLayout>
  );
}
