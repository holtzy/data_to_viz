import { GraphLayout } from "@/components/layouts";
import { ButtonLink, Code, RelatedCard, RelatedGrid, Section, Widget } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/graph/streamgraph.html",
  title: "Streamgraph – from Data to Viz",
  description:
    "A Stream graph is a type of stacked area chart. It displays the evolution of a numeric value (Y axis) following another numeric value (X axis). This…",
  image: "/img/section/StreamSmall.png",
});

export default function Page() {
  return (
    <GraphLayout title="Streamgraph" images={["/img/section/StreamSmall.png"]}>
      <Section id="definition" title="Definition">
        <p>
          A Stream graph is a type of <a href="/graph/stackedarea.html">stacked area chart</a>. It
          displays the evolution of a numeric value (Y axis) following another numeric value (X
          axis). This evolution is represented for several groups, all with a distinct color.
        </p>

        <p>
          Contrary to a stacked area, there is no corner: edges are rounded what gives this nice
          impression of flow. Moreover, areas are usually displaced around a central axis, resulting
          in a flowing and organic shape.
        </p>

        <p>
          The following example shows the evolution of baby name frequencies in the US between 1880
          and 2015.
        </p>

        <Code lang="r">{`# Libraries
library(tidyverse)
library(babynames)
library(streamgraph)


# Load dataset from github
data <- babynames %>%
  filter(name %in% c("Ashley", "Amanda", "Jessica",    "Patricia", "Linda", "Deborah",   "Dorothy", "Betty", "Helen")) %>%
  filter(sex=="F")

# Plot
data %>%
  streamgraph(key="name", value="n", date="year") %>%
  sg_fill_brewer("BuPu")`}</Code>

        <Widget src="/widgets/graph/streamgraph-1.html" height={288} width={960} />

        <div>
          <div className="text-center"></div>
        </div>

        <p>
          <em>Note</em>: The dataset is available through the{" "}
          <a href="https://github.com/hadley/babynames">babynames</a> R library and a{" "}
          <code>.csv</code> version is available on{" "}
          <a href="https://github.com/holtzy/data_to_viz/tree/master/Example_dataset">github</a>.
        </p>
      </Section>

      <Section id="what-for" title="What for">
        <p>
          Streamchart are good to study the <code>relative proportions</code> of the whole. However
          they are bad to study the evolution of each <code>individual group</code>: it is very hard
          to substract the height of other groups at each time point. For a more accurate but less
          attractive figure, consider a <a href="/graph/line.html">line chart</a> or{" "}
          <a href="/graph/area.html">area chart</a> using small multiple.
        </p>

        <p>
          Stream chart gets really useful when displayed in an interactive mode: highlighting a
          group gives you directly an insight of its evolution.
        </p>
      </Section>

      <Section id="variation" title="Variation">
        <p>
          Even if areas are usually displaced around a central axis, it is possible to display them
          as for most of the chart type: over the 0 axis.
        </p>

        <Code lang="r">{`# Plot
data %>%
  streamgraph(key="name", value="n", date="year", offset="zero") %>%
  sg_fill_brewer("BuPu")`}</Code>

        <Widget src="/widgets/graph/streamgraph-2.html" height={288} width={960} />

        <div>
          <div className="text-center"></div>
        </div>

        <p>
          It also possible to create a percent streamchart where the proportion of each group is
          displayed instead of its absolute value. Here, the total number of baby names is not
          available anymore. However, the most popular names at each period gets more obvious.
        </p>

        <Code lang="r">{`# Plot
data %>%
  streamgraph(key="name", value="n", date="year", offset="expand") %>%
  sg_fill_brewer("BuPu")`}</Code>

        <Widget src="/widgets/graph/streamgraph-3.html" height={288} width={960} />

        <div>
          <div className="text-center"></div>
        </div>
      </Section>

      <Section id="mistake" title="Common caveats">
        <ul>
          {" "}
          <li>
            In my opinion, streamgraph work well when there is a clear pattern in the data. If the
            proportion of each group remain more or less the same all along the time frame, the
            figure won’t be very insightfull since small variations will be hard to read.
          </li>{" "}
        </ul>
      </Section>

      <Section id="related" title="Related">
        <RelatedGrid>
          <RelatedCard href="/graph/line.html" image="/img/section/LineSmall.png" title="Line plot">
            Displays the evolution of one or several numeric variables.
          </RelatedCard>
          <RelatedCard
            href="/graph/area.html"
            image="/img/section/AreaSmall.png"
            title="Area chart"
          >
            Basically a line graph, filling the area under the curve.
          </RelatedCard>
          <RelatedCard
            href="/graph/stackedarea.html"
            image="/img/section/StackedAreaSmall.png"
            title="Stacked area chart"
          >
            Displays the evolution of the value of several groups on the same graphic
          </RelatedCard>
          <RelatedCard
            href="/graph/streamgraph.html"
            image="/img/section/StreamSmall.png"
            title="Streamgraph"
          >
            A stacked area graph displaced around a central axis, resulting in a flowing, organic
            shape
          </RelatedCard>
        </RelatedGrid>
      </Section>

      <Section id="code" title="Build your own">
        <p>
          The <a href="https://www.r-graph-gallery.com/streamgraph.html">R</a>,{" "}
          <a href="https://www.python-graph-gallery.com/streamchart/">Python</a>,{" "}
          <a href="https://www.react-graph-gallery.com/streamchart">React</a> and{" "}
          <a href="https://d3-graph-gallery.com/streamgraph.html">D3</a> graph galleries are 4
          websites providing hundreds of chart example, always providing the reproducible code.
          Click the button below to see how to build the chart you need with your favorite
          programing language.
        </p>

        <p>
          <ButtonLink href="https://www.r-graph-gallery.com/streamgraph.html">
            R graph gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://python-graph-gallery.com/streamchart/">
            Python gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://www.react-graph-gallery.com/streamchart">
            React gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://d3-graph-gallery.com/streamgraph.html">D3 gallery</ButtonLink>
        </p>
      </Section>
    </GraphLayout>
  );
}
