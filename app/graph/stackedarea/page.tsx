import { GraphLayout } from "@/components/layouts";
import { ButtonLink, Code, RelatedCard, RelatedGrid, Section, Widget } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/graph/stackedarea.html",
  title: "Stacked Area Graph – from Data to Viz",
  description:
    "A stacked area chart is the extension of a basic area chart. It displays the evolution of the value of several groups on the same graphic. The values of…",
  image: "/img/section/StackedAreaSmall.png",
});

export default function Page() {
  return (
    <GraphLayout title="Stacked Area Graph" images={["/img/section/StackedAreaSmall.png"]}>
      <Section id="definition" title="Definition">
        <p>
          A <code>stacked area chart</code> is the extension of a basic{" "}
          <a href="/graph/area.html">area chart</a>. It displays the evolution of the value of
          several groups on the same graphic. The values of each group are displayed on top of each
          other, what allows to check on the same figure the evolution of both the total of a
          numeric variable, and the importance of each group.
        </p>

        <p>
          The following example shows the evolution of baby name frequencies in the US between 1880
          and 2015.
        </p>

        <div className="text-center">
          <Code lang="r">{`# Libraries
library(tidyverse)
library(babynames)
library(streamgraph)
library(viridis)
library(hrbrthemes)
library(plotly)

# Load dataset from github
data <- babynames %>%
  filter(name %in% c("Ashley", "Amanda", "Jessica",    "Patricia", "Linda", "Deborah",   "Dorothy", "Betty", "Helen")) %>%
  filter(sex=="F")

# Plot
p <- data %>%
  ggplot( aes(x=year, y=n, fill=name, text=name)) +
    geom_area( ) +
    scale_fill_viridis(discrete = TRUE) +
    theme(legend.position="none") +
    ggtitle("Popularity of American names in the previous 30 years") +
    theme_ipsum() +
    theme(legend.position="none")
ggplotly(p, tooltip="text")`}</Code>

          <Widget src="/widgets/graph/stackedarea-1.html" height={480} width={768} />
        </div>

        <p>
          <em>Note</em>: This graphic does not have a legend since it is interactive. Hover a group
          to get its name. The dataset is available through the{" "}
          <a href="https://github.com/hadley/babynames">babynames</a> R library and a{" "}
          <code>.csv</code> version is available on{" "}
          <a href="https://github.com/holtzy/data_to_viz/tree/master/Example_dataset">github</a>.
        </p>
      </Section>

      <Section id="what-for" title="What for">
        <p>
          The efficiency of stacked area graph is <a href="/caveat/stacking.html">discussed</a> and
          it must be used with care. To put it in a nutshell:
        </p>
        <ul>
          {" "}
          <li>
            <p>
              stacked area graph are <code>appropriate</code> to study the evolution of the{" "}
              <code>whole</code> and the <code>relative proportions</code> of each group. Indeed,
              the top of the areas allows to visualize how the whole behaves, like for a classic
              area chart.
            </p>
          </li>{" "}
          <li>
            <p>
              however they are not appropriate to study the evolution of each{" "}
              <code>individual group</code>: it is very hard to substract the height of other groups
              at each time point. For a more accurate but less attractive figure, consider a{" "}
              <a href="/graph/line.html">line chart</a> or <a href="/graph/area.html">area chart</a>{" "}
              using small multiple.
            </p>
          </li>{" "}
        </ul>
        <p>
          This website dedicates a whole <a href="/caveat/stacking.html">page about stacking</a> and
          its potential pitfalls, <a href="/caveat/stacking.html">visit it</a> to go further.
        </p>
      </Section>

      <Section id="variation" title="Variation">
        <p>
          A variation of the stacked area graph is the <code>percent stacked area graph</code>. It
          is the same thing but value of each group are normalized at each time stamp. That allows
          to study the percentage of each group in the whole more efficiently:
        </p>

        <Code lang="r">{`p <- data %>%
  # Compute the proportions:
  group_by(year) %>%
  mutate(freq = n / sum(n)) %>%
  ungroup() %>%

  # Plot
  ggplot( aes(x=year, y=freq, fill=name, color=name, text=name)) +
    geom_area(  ) +
    scale_fill_viridis(discrete = TRUE) +
    scale_color_viridis(discrete = TRUE) +
    theme(legend.position="none") +
    ggtitle("Popularity of American names in the previous 30 years") +
    theme_ipsum() +
    theme(legend.position="none")
ggplotly(p, tooltip="text")`}</Code>

        <Widget src="/widgets/graph/stackedarea-2.html" height={480} width={960} />
      </Section>

      <Section id="mistake" title="Common caveats">
        <ul>
          {" "}
          <li>
            Use it with care, try using small multiple with{" "}
            <a href="/graph/area.html">area chart</a> or <a href="/graph/line.html">line chart</a>{" "}
            instead.
          </li>{" "}
          <li>
            The group order (from bottom to top) can have an influence, try several orders.
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
          The <a href="https://www.r-graph-gallery.com/stacked-area-graph.html">R</a>,{" "}
          <a href="https://www.python-graph-gallery.com/stacked-area-plot/">Python</a>,{" "}
          <a href="https://www.react-graph-gallery.com/stacked-area-plot">React</a> and{" "}
          <a href="https://d3-graph-gallery.com/stackedarea.html">D3</a> graph galleries are 4
          websites providing hundreds of chart example, always providing the reproducible code.
          Click the button below to see how to build the chart you need with your favorite
          programing language.
        </p>

        <p>
          <ButtonLink href="https://www.r-graph-gallery.com/stacked-area-graph.html">
            R graph gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://python-graph-gallery.com/stacked-area-plot/">
            Python gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://www.react-graph-gallery.com/stacked-area-plot">
            React gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://d3-graph-gallery.com/stackedarea.html">D3 gallery</ButtonLink>
        </p>
      </Section>
    </GraphLayout>
  );
}
