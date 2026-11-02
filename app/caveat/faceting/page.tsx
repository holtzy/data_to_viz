import { CaveatLayout } from "@/components/layouts";
import { Code, Section, Widget } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/caveat/faceting.html",
  title: "A few thoughts about small multiples | Dataviz pitfall gallery",
  description:
    "One of the most useful techniques in data visualization is rendering groups of data alongside each other, making it easy to compare the groups. With…",
  image: "/img/mistake/small_multiple.png",
});

export default function Page() {
  return (
    <CaveatLayout
      title="A few thoughts about small multiples"
      images={["/img/mistake/small_multiple.png"]}
    >
      <Section id="what-is-small-multiple" title="What is small multiple">
        <p>
          One of the most useful techniques in data visualization is rendering groups of data
          alongside each other, making it easy to compare the groups. With ggplot2, one way to do
          this is by mapping a discrete variable to an aesthetic, like x position, color, or shape.
          Another way of doing this is to create a subplot for each group and draw the subplots side
          by side.
        </p>

        <p>
          These kinds of plots are known as Trellis displays. They’re implemented in the lattice
          package as well as in the ggplot2 package. In ggplot2, they’re called facets. In this
          chapter I’ll explain how to use them.
        </p>

        <p>
          Here is an example with a <a href="/graph/stackedarea.html">stacked area chart</a>. It
          shows the evolution of baby name occurence in the US between 1880 and 2015. Six first
          names are represented on top of one another.
        </p>

        <Code lang="r">{`# Libraries
library(tidyverse)
library(babynames)
library(streamgraph)
library(viridis)
library(hrbrthemes)
library(plotly)

# Load dataset from github
data <- babynames %>%
  filter(name %in% c("Amanda", "Jessica",    "Patricia", "Deborah",   "Dorothy",  "Helen")) %>%
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

        <Widget src="/widgets/caveat/faceting-1.html" height={480} width={768} />

        <p>
          <u>
            <em>Note</em>
          </u>
          : This graphic is interactive: hover an area to know the underlying name.
        </p>
      </Section>

      <Section id="going-further" title="Going further">
        <ul>
          {" "}
          <li>
            Stacked Area Graphs Are Not Your Friend by{" "}
            <a href="https://web.archive.org/web/20181212114247/http://everydayanalytics.ca/2014/08/stacked-area-graphs-are-not-your-friend.html">
              Everyday analytics
            </a>
          </li>{" "}
          <li>
            Quantitative Displays for Combining Time-Series and Part-to-Whole Relationships by{" "}
            <a href="http://www.perceptualedge.com/articles/visual_business_intelligence/displays_for_combining_time-series_and_part-to-whole.pdf">
              Stephen Few
            </a>
          </li>{" "}
          <li>
            I hate stacked area charts by{" "}
            <a href="http://www.leancrew.com/all-this/2011/11/i-hate-stacked-area-charts/">
              Dr Drang
            </a>
          </li>{" "}
        </ul>
      </Section>
    </CaveatLayout>
  );
}
