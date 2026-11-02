import { CaveatLayout } from "@/components/layouts";
import { Code, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/caveat/hard_label.html",
  title: "A note on long labels | Dataviz pitfall gallery",
  description:
    "Most of the time, barplot or lollipop plots are plotted vertically with the Y-axis representing the value of the numeric variable. If your labels on the…",
  image: "/img/mistake/hard_label.png",
});

export default function Page() {
  return (
    <CaveatLayout title="A note on long labels" images={["/img/mistake/hard_label.png"]}>
      <Section id="the-issue" title="The issue">
        <p>
          Most of the time, <a href="https://www.data_to_viz.com/graph/barplot.html">barplot</a> or{" "}
          <a href="https://www.data_to_viz.com/graph/lollipop.html">lollipop</a> plots are plotted
          vertically with the Y-axis representing the value of the numeric variable. If your labels
          on the X-axis are long, they need to be <code>rotated</code> in order not to overlap.
        </p>

        <p>As a result, these labels become hard to read:</p>

        <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(kableExtra)
options(knitr.table.format = "html")

# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum.csv", header=TRUE, sep=",")

# Barplot
data %>%
  filter(!is.na(Value)) %>%
  arrange(Value) %>%
  tail(20) %>%
  mutate(Country=factor(Country, Country)) %>%
  ggplot( aes(x=Country, y=Value) ) +
    geom_bar(stat="identity", fill="#69b3a2") +
    theme_ipsum() +
    theme(
      panel.grid.minor.x = element_blank(),
      panel.grid.major.x = element_blank(),
      legend.position="none",
      axis.text.x = element_text(angle = 80, hjust=1)
    ) +
    xlab("") +
    ylab("Weapon quantity (SIPRI trend-indicator value)")`}</Code>

        <p>
          <img
            src="/figures/caveat/hard_label/1.webp"
            alt="A note on long labels – chart example"
            width={672}
            loading="lazy"
          />{" "}
          <em>Note</em>: this barplot shows the quantity of weapons exported by the top 20 largest
          exporters in 2017, <a href="/story/OneNumOneCat.html">read more</a>.
        </p>
      </Section>

      <Section id="solving-the-issue" title="Solving the issue">
        <p>
          The workaround is pretty simple, why not considering an <code>horizontal version</code> of
          the chart?
        </p>

        <Code lang="r">{`# Barplot
data %>%
  filter(!is.na(Value)) %>%
  arrange(Value) %>%
  tail(20) %>%
  mutate(Country=factor(Country, Country)) %>%
  ggplot( aes(x=Country, y=Value) ) +
    geom_bar(stat="identity", fill="#69b3a2") +
    theme_ipsum() +
    theme(
      panel.grid.minor.y = element_blank(),
      panel.grid.major.y = element_blank(),
      legend.position="none"
    ) +
    xlab("") +
    ylab("Weapon quantity (SIPRI trend-indicator value)") +
    coord_flip()`}</Code>

        <figure>
          <img
            src="/figures/caveat/hard_label/2.webp"
            alt="A note on long labels – chart example"
            width={672}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="warning" title="Warning">
        <p>
          Note that the horizontal version is not always an option though. If you categorical
          variable has a natural order, it is better to stick to the vertical version. It happens
          when:
        </p>
        <ul>
          {" "}
          <li>
            you’re represented <code>time series</code>: time must be represented on the X axis by
            convention. Not doing so could mislead your audience.
          </li>{" "}
          <li>
            you have an <code>ordinal variable</code> like age range.
          </li>{" "}
        </ul>
      </Section>

      <Section id="going-further" title="Going further">
        <ul>
          {" "}
          <li>
            Bar Charts: vertical or horizontal? by{" "}
            <a href="http://annkemery.com/vertical-or-horizontal/">Ann K. Emery</a>
          </li>{" "}
        </ul>
      </Section>
    </CaveatLayout>
  );
}
