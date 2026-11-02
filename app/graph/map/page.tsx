import { GraphLayout } from "@/components/layouts";
import { ButtonLink, Code, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/graph/map.html",
  title: "Background Map – from Data to Viz",
  description:
    "A background map is a type of visualization that uses a geographical map as the backdrop to display data points or regions. The data is overlaid on the…",
  image: "/img/section/Map150.png",
});

export default function Page() {
  return (
    <GraphLayout title="Background Map" images={["/img/section/Map150.png"]}>
      <Section id="definition" title="Definition">
        <p>
          A <code>background map</code> is a type of visualization that uses a geographical map as
          the backdrop to display data points or regions. The data is overlaid on the map, allowing
          for a spatial understanding of the information. Background maps are often used to
          visualize data that is tied to a specific location, such as population density, crime
          rates, or weather patterns.
        </p>

        <Code lang="r">{`library(maps)
# the map library contains many maps. Here is the world map
map('world', col="grey", fill=TRUE, bg="white", lwd=0.05, mar=rep(0,4), border=0, ylim=c(-80,80) )`}</Code>

        <figure>
          <img
            src="/figures/graph/map/1.webp"
            alt="Background Map – chart example"
            width={960}
            height={480}
            loading="lazy"
          />
        </figure>

        <p>
          R offers multiple avenues for generating background maps. One such method is by utilizing
          the <code>maps</code> package, which enables the creation of maps for the world,
          continents, or individual countries. However, it’s worth noting that this package might
          not be the most suitable choice for more <strong>intricate</strong> or{" "}
          <strong>specific</strong> mapping objectives.
        </p>

        <p>Below you can find an example of the process of working with maps in R.</p>

        <figure>
          <img
            width={1920}
            height={1080}
            src="/img/backgroundMapExplanationNew.png"
            alt="Background Map – chart example"
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="what-for" title="What for">
        <p>
          Background maps are usually just the starting point for a visualization. They provide the
          foundation for displaying data in a spatial context.
        </p>

        <p>
          Then, one will generally <strong>transform it</strong> into one of the following types of
          visualizations:
        </p>
        <ul>
          {" "}
          <li>
            <a href="/graph/choropleth.html">Choropleth maps</a>: where regions are colored
            according to a variable.
          </li>{" "}
          <li>
            <a href="/graph/bubblemap.html">Bubble map</a>: where bubbles are placed on the map to
            represent data points at specific locations.
          </li>{" "}
          <li>
            <a href="/graph/hexbinmap.html">Hexbin map</a>: where hexagons are used to represent
            data density.
          </li>{" "}
          <li>
            <a href="/story/MapConnection.html">Connection map</a>: where lines are used to show
            connections between locations.
          </li>{" "}
        </ul>
      </Section>

      <Section id="code" title="Build your own">
        <p>
          The <a href="https://www.r-graph-gallery.com/map.html">R</a>,{" "}
          <a href="https://www.python-graph-gallery.com/map/">Python</a>,{" "}
          <a href="https://www.react-graph-gallery.com/map">React</a> and{" "}
          <a href="https://d3-graph-gallery.com/backgroundmap.html">D3</a> graph galleries are 4
          websites providing hundreds of chart example, always providing the reproducible code.
          Click the button below to see how to build the chart you need with your favorite
          programing language.
        </p>

        <p>
          <ButtonLink href="https://www.r-graph-gallery.com/map.html">R graph gallery</ButtonLink>{" "}
          <ButtonLink href="https://python-graph-gallery.com/map/">Python gallery</ButtonLink>{" "}
          <ButtonLink href="https://www.react-graph-gallery.com/map">React gallery</ButtonLink>{" "}
          <ButtonLink href="https://d3-graph-gallery.com/backgroundmap.html">D3 gallery</ButtonLink>
        </p>
      </Section>
    </GraphLayout>
  );
}
