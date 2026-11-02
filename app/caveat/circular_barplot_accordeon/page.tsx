import { CaveatLayout } from "@/components/layouts";
import { Code, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/caveat/circular_barplot_accordeon.html",
  title: "Mind the radial bar charts | Dataviz pitfall gallery",
  description:
    "A radial bar chart is basically a bar chart plotted in polar coordinates instead of a Cartesian plane. Here is one showing the quantity of weapons…",
  image: "/img/mistake/calculation_error.png",
});

export default function Page() {
  return (
    <CaveatLayout
      title="Mind the radial bar charts"
      images={["/img/mistake/calculation_error.png"]}
    >
      <p>
        A radial bar chart is basically a <a href="/graph/barplot">bar chart</a> plotted in polar
        coordinates instead of a Cartesian plane. <br /> Here is one showing the quantity of weapons
        exported by the top 6 largest exporters in 2017. (You can read more about this story{" "}
        <a href="/story/OneNumOneCat.html">here</a>).
      </p>

      <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)

# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum.csv", header=TRUE, sep=",")

# plot
data %>%
  filter(!is.na(Value)) %>%
  arrange(Value) %>%
  tail(6) %>%
  mutate(Country=factor(Country, Country)) %>%
  ggplot( aes(x=Country, y=Value) ) +
    geom_bar(fill="#69b3a2", stat="identity") +
    geom_text(hjust = 1, size = 3, aes( y = 0, label = paste(Country," "))) +
    theme_ipsum() +
    theme(
      panel.grid.minor.y = element_blank(),
      panel.grid.major.y = element_blank(),
      legend.position="none",
      axis.text = element_blank()
    ) +
    xlab("") +
    ylab("") +
    coord_polar(theta = "y") +
    ylim(0,15000)`}</Code>

      <figure>
        <img
          src="/figures/caveat/circular_barplot_accordeon/1.webp"
          alt="Mind the radial bar charts – chart example"
          width={576}
          loading="lazy"
        />
      </figure>

      <p>
        The good thing about this kind of graphic is that it is quite eye-catching. However, because
        the bars are plotted on different radial points of the polar axis, they have different radii
        and cannot be compared by their lengths. A bar on the outside will be longer by construction
        than one on the inside, even with an equal value. <br />
        <br /> <em>note</em>: Other issues exist on this graphic, like the lack of a Y-axis. It is
        made for illustration purposes only. <br />
        <br /> This radial issue is well illustrated on this post from{" "}
        <a href="http://www.visualisingdata.com/2017/09/problems-barc-charts/">
          VisualizingData.com
        </a>
        :
      </p>

      <div className="text-center">
        {" "}
        <img
          src="/figures/caveat/circular_barplot_accordeon/2.webp"
          alt="img"
          width={400}
          loading="lazy"
        />{" "}
      </div>

      <div className="text-center">
        {" "}
        Source:{" "}
        <a href="http://www.visualisingdata.com/2017/09/problems-barc-charts/">
          VisualizingData.com
        </a>{" "}
      </div>

      <Section id="workaround" title="Workaround">
        <p>
          Becauses of these issues, radial bar charts should be avoided. Instead, you can build a
          standard <a href="/graph/barplot">bar chart</a> or{" "}
          <a href="/graph/lollipop">lollipop plot</a> to display the information more accurately:
        </p>

        <Code lang="r">{`data %>%
  filter(!is.na(Value)) %>%
  arrange(Value) %>%
  mutate(Country=factor(Country, Country)) %>%
  ggplot( aes(x=Country, y=Value) ) +
    geom_segment( aes(x=Country ,xend=Country, y=0, yend=Value), color="grey") +
    geom_point(size=3, color="#69b3a2") +
    coord_flip() +
    theme_ipsum() +
    theme(
      panel.grid.minor.y = element_blank(),
      panel.grid.major.y = element_blank(),
      legend.position="none"
    ) +
    xlab("")`}</Code>

        <figure>
          <img
            src="/figures/caveat/circular_barplot_accordeon/3.webp"
            alt="Mind the radial bar charts – chart example"
            width={576}
            loading="lazy"
          />
        </figure>

        <p>
          You can see more ways to represent this dataset{" "}
          <a href="/story/OneNumOneCat.html">here</a>.
        </p>
      </Section>

      <Section id="going-further" title="Going further">
        <ul>
          {" "}
          <li>
            <em>The problems with B’Arc charts</em> by Andy Kirk on his blog{" "}
            <a href="http://www.visualisingdata.com/2017/09/problems-barc-charts/">
              Visualising Data
            </a>
          </li>{" "}
          <li>
            The{" "}
            <a href="https://datavizcatalogue.com/methods/radial_bar_chart.html">dataviz catalog</a>{" "}
            has a page dedicated to radial bar charts.
          </li>{" "}
          <li>
            Making a barchart with <a href="https://www.r-graph-gallery.com/barplot/">R</a> and{" "}
            <a href="https://python-graph-gallery.com/barplot/">Python</a>.
          </li>{" "}
        </ul>
      </Section>
    </CaveatLayout>
  );
}
