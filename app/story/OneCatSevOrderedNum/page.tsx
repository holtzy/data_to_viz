import { StoryLayout } from "@/components/layouts";
import { Code, Section, Widget } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/story/OneCatSevOrderedNum.html",
  title: "Evolution of baby names in the US – from Data to Viz",
  description:
    "This document aims to describe a few dataviz that can be applied to a dataset containing an ordered numeric variable, a categoric variable and another…",
  image: "/img/section/Line150.png",
});

export default function Page() {
  return (
    <StoryLayout
      title="Evolution of baby names in the US"
      images={[
        "/img/section/Line150.png",
        "/img/section/Area150.png",
        "/img/section/StackedArea150.png",
        "/img/section/Stream150.png",
      ]}
    >
      <div className="grid gap-6 md:grid-cols-12">
        {" "}
        <div className="md:col-span-8">
          <p>
            This document aims to describe a few dataviz that can be applied to a dataset containing
            an ordered numeric variable, a categoric variable and another numeric variable. An an
            example we will consider the evolution of baby name frequencies in the US between 1880
            and 2015. This dataset is available through the{" "}
            <a href="https://github.com/hadley/babynames">babynames</a> R library and a{" "}
            <code>.csv</code> version is available on{" "}
            <a href="https://github.com/holtzy/data_to_viz/tree/master/Example_dataset">github</a>.
            It looks as follow:
          </p>
        </div>{" "}
        <div className="md:col-span-4">
          <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(kableExtra)
options(knitr.table.format = "html")
library(babynames)
library(streamgraph)
library(viridis)
library(DT)
library(plotly)

# Load dataset from github
data <- babynames %>%
  filter(name %in% c("Ashley", "Amanda", "Jessica",    "Patricia", "Linda", "Deborah",   "Dorothy", "Betty", "Helen")) %>%
  filter(sex=="F")

# Show long format
data %>%
  select(year, name, n) %>%
  head(5) %>%
  arrange(name) %>%
  kable() %>%
  kable_styling(bootstrap_options = "striped", full_width = F)`}</Code>

          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th className="text-right">year</th>
                  <th>name</th>
                  <th className="text-right">n</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-right">1880</td>
                  <td>Amanda</td>
                  <td className="text-right">241</td>
                </tr>
                <tr>
                  <td className="text-right">1880</td>
                  <td>Betty</td>
                  <td className="text-right">117</td>
                </tr>
                <tr>
                  <td className="text-right">1880</td>
                  <td>Dorothy</td>
                  <td className="text-right">112</td>
                </tr>
                <tr>
                  <td className="text-right">1880</td>
                  <td>Helen</td>
                  <td className="text-right">636</td>
                </tr>
                <tr>
                  <td className="text-right">1880</td>
                  <td>Linda</td>
                  <td className="text-right">27</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>{" "}
      </div>
      <Section id="a-note-on-data-format" title="A note on data format">
        <p>
          It is of importance to note that the following table provides exactly the same
          information, but in a different format. We call it ‘long’ and ‘wide’ format and most tools
          provide function to go from one to the other. In any case, we will apply the same kind of
          visualization to both format.
        </p>

        <Code lang="r">{`wide <- data %>%
  select(year, name, n) %>%
  spread(name, n)

wide %>%
  head(3) %>%
  select(1:5) %>%
  kable() %>%
  kable_styling(bootstrap_options = "striped", full_width = F)`}</Code>

        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th className="text-right">year</th>
                <th className="text-right">Amanda</th>
                <th className="text-right">Ashley</th>
                <th className="text-right">Betty</th>
                <th className="text-right">Deborah</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-right">1880</td>
                <td className="text-right">241</td>
                <td className="text-right">NA</td>
                <td className="text-right">117</td>
                <td className="text-right">12</td>
              </tr>
              <tr>
                <td className="text-right">1881</td>
                <td className="text-right">263</td>
                <td className="text-right">NA</td>
                <td className="text-right">112</td>
                <td className="text-right">14</td>
              </tr>
              <tr>
                <td className="text-right">1882</td>
                <td className="text-right">288</td>
                <td className="text-right">NA</td>
                <td className="text-right">123</td>
                <td className="text-right">15</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
      <Section id="line-plot" title="Line plot">
        <p>
          The first obvious solution to represent this dataset is to produce a line chart. Each baby
          name is represented by a line. The X axis gives the year and the Y axis shows the number
          of babies.
        </p>

        <Code lang="r">{`data %>%
  ggplot( aes(x=year, y=n, group=name, color=name)) +
    geom_line() +
    scale_color_viridis(discrete = TRUE) +
    theme(legend.position="none") +
    ggtitle("Popularity of American names in the previous 30 years") +
    theme_ipsum()`}</Code>

        <figure>
          <img
            src="/figures/story/OneCatSevOrderedNum/1.webp"
            alt="Evolution of baby names in the US – chart example"
            width={960}
            loading="lazy"
          />
        </figure>

        <p>
          Line charts tend to be too cluttered as soon as more than a few groups are displayed. This
          is a common mistake in dataviz, so common that it has been named spaghetti chart. Thus
          this solution is usually applied if you want to highlight a specific group from the whole
          dataset. For example, let’s highlight the evolution of Amanda compared to the other first
          names:
        </p>

        <Code lang="r">{`data %>%
  mutate(highlight = ifelse(name == "Amanda", "Amanda", "Other")) %>%
  ggplot(aes(x = year, y = n, group = name, color = highlight, size = highlight)) +
  geom_line() +
  scale_color_manual(values = c("#69b3a2", "lightgrey")) +
  scale_size_manual(values = c(1.5, 0.2)) +
  theme(legend.position = "none") +
  ggtitle("Popularity of American names in the previous 30 years") +
  theme_ipsum() +
  geom_label(x = 1990, y = 55000, label = "Amanda reached 3550\\nbabies in 1970", size = 4, color = "#69b3a2") +
  theme(
    legend.position = "none",
    plot.title = element_text(size = 14)
  )`}</Code>

        <figure>
          <img
            src="/figures/story/OneCatSevOrderedNum/2.webp"
            alt="Evolution of baby names in the US – chart example"
            width={960}
            loading="lazy"
          />
        </figure>

        <p>This is a good way to describe the behavior of a specific group in the dataset.</p>
      </Section>
      <Section id="area-chart" title="Area chart">
        <p>
          Area chart can be used to have a more general overview of the dataset, especially when
          used in combination with small multiple. In the following chart it is easy to get a
          glimpse of the evolution of any name:
        </p>

        <Code lang="r">{`data %>%
  ggplot( aes(x=year, y=n, group=name, fill=name)) +
    geom_area() +
    scale_fill_viridis(discrete = TRUE) +
    theme(legend.position="none") +
    ggtitle("Popularity of American names in the previous 30 years") +
    theme_ipsum() +
    theme(
      legend.position="none",
      panel.spacing = unit(0.1, "lines"),
      strip.text.x = element_text(size = 8)
    ) +
    facet_wrap(~name, scale="free_y")`}</Code>

        <figure>
          <img
            src="/figures/story/OneCatSevOrderedNum/3.webp"
            alt="Evolution of baby names in the US – chart example"
            width={768}
            loading="lazy"
          />
        </figure>
      </Section>
      <Section id="stack-area-chart" title="Stack area chart">
        <p>
          Stack area chart can be used to have a more general overview of the dataset: the goal here
          is not to study the evolution of each group individually, but more to understand if any
          group had a huge prevalence at a specific period. Note that the use of interactivity is a
          real plus here. Instead of having a complex legend hardly linked with the areas, hovering
          a specific group reveals its name.
        </p>

        <Code lang="r">{`p <- data %>%
  ggplot( aes(x=year, y=n, fill=name, text=name)) +
    geom_area( ) +
    scale_fill_viridis(discrete = TRUE) +
    theme(legend.position="none") +
    ggtitle("Popularity of American names in the previous 30 years") +
    theme_ipsum() +
    theme(legend.position="none")
ggplotly(p, tooltip="text")`}</Code>

        <Widget src="/widgets/story/OneCatSevOrderedNum-1.html" height={480} width={960} />

        <p>
          A variation of the stacked area graph is the <code>percent</code> stacked area graph. It
          is the same thing but value of each group are normalized at each time stamp. That allows
          to study the percentage of each group in the whole.
        </p>

        <Code lang="r">{`# Compute the proportions:
p <- data %>%
  group_by(year) %>%
  mutate(freq = n / sum(n)) %>%
  ungroup() %>%
  ggplot( aes(x=year, y=freq, fill=name, color=name, text=name)) +
    geom_area(  ) +
    scale_fill_viridis(discrete = TRUE) +
    scale_color_viridis(discrete = TRUE) +
    theme(legend.position="none") +
    ggtitle("Popularity of American names in the previous 30 years") +
    theme_ipsum() +
    theme(legend.position="none")
ggplotly(p, tooltip="text")`}</Code>

        <Widget src="/widgets/story/OneCatSevOrderedNum-2.html" height={480} width={960} />
      </Section>
      <Section id="streamgraph" title="Streamgraph">
        <p>
          The streamgraph is a variation fo the stacked area graph where edges are rounded, what
          gives this nice impression of flow. Moreover, areas are usually displaced around a central
          axis, resulting in a flowing and organic shape.
        </p>

        <Code lang="r">{`data %>%
  streamgraph(key="name", value="n", date="year")`}</Code>

        <Widget src="/widgets/story/OneCatSevOrderedNum-3.html" height={288} width={960} />

        <div>
          <div className="text-center"></div>
        </div>
      </Section>
      <Section id="a-lot-of-groups-pca" title="A lot of groups: PCA">
        <p>
          This probably overtakes the topic of <a href="/">data-to-viz.com</a> but one probably
          wants to clusterise groups based on their evolution. For instance, it would be of interest
          to automatically detect that Patricia and Linda have similar patterns: very frequent
          between 1930 and 1970, and almost no occurence otherwise.
        </p>

        <p>PCA can be used to find that kind of clusters:</p>

        <Code lang="r">{`fit <- wide %>%
  mutate_all(funs(replace(., is.na(.), 0))) %>%
  select(-1) %>%
  t() %>%
  prcomp(scale=T)

# A dataframe with position of individuals on PCs
data <- data.frame(obsnames=row.names(fit$x), fit$x)

# Plot
ggplot(data, aes(x=PC1, y=PC2)) +
  geom_text(alpha=.4, linewidth=3, aes(label=obsnames)) +
  geom_hline(aes(yintercept=0), linewidth=.2) +
  geom_vline(aes(xintercept=0), linewidth=.2) +
  coord_equal() +
  theme_ipsum()`}</Code>

        <figure>
          <img
            src="/figures/story/OneCatSevOrderedNum/4.webp"
            alt="Evolution of baby names in the US – chart example"
            width={672}
            loading="lazy"
          />
        </figure>
      </Section>
      <h2>Going further</h2>
      <p>
        You can learn more about each type of graphic presented in this story in the dedicated
        sections. Click the icon below:
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <a href="/graph/line.html" title="Line chart">
          <img src="/img/section/Line150.png" alt="Line chart" loading="lazy" className="size-24" />
        </a>
        <a href="/graph/area.html" title="Area chart">
          <img src="/img/section/Area150.png" alt="Area chart" loading="lazy" className="size-24" />
        </a>
        <a href="/graph/stackedarea.html" title="Stacked Area">
          <img
            src="/img/section/StackedArea150.png"
            alt="Stacked Area"
            loading="lazy"
            className="size-24"
          />
        </a>
        <a href="/graph/streamgraph.html" title="Streamgraph">
          <img
            src="/img/section/Stream150.png"
            alt="Streamgraph"
            loading="lazy"
            className="size-24"
          />
        </a>
      </div>
    </StoryLayout>
  );
}
