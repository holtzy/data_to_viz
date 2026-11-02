import { CaveatLayout } from "@/components/layouts";
import { Code, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/caveat/color_com_nothing.html",
  title: "Don't use color if they communicate nothing | Dataviz pitfall gallery",
  description:
    "Colors are one of the main mediums used to convey information in a dataviz. They allow us to highlight groups or variation when used appropriately, but…",
  image: "/img/mistake/color_com_nothing.png",
});

export default function Page() {
  return (
    <CaveatLayout
      title="Don't use color if they communicate nothing"
      images={["/img/mistake/color_com_nothing.png"]}
    >
      <p>
        <code>Colors</code> are one of the main mediums used to convey information in a dataviz.
        They allow us to highlight groups or variation when used appropriately, but can be confusing
        or misleading otherwise.
      </p>

      <p>
        Here is an example showing the quantity of weapons exported by the top 20 largest exporters
        in 2017 (more info <a href="/story/OneNumOneCat.html">here</a>):
      </p>

      <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(viridis)

# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum.csv", header=TRUE, sep=",")

# create random color palette
mycolors <- colors()[sample(1:400, nrow(data))]

# Barplot
data %>%
  filter(!is.na(Value)) %>%
  arrange(Value) %>%
  tail(20) %>%
  mutate(Country=factor(Country, Country)) %>%
  ggplot( aes(x=Country, y=Value, fill=Country) ) +
    geom_bar(stat="identity") +
    scale_fill_manual( values = mycolors ) +
    coord_flip() +
    theme_ipsum() +
    theme(
      panel.grid.minor.y = element_blank(),
      panel.grid.major.y = element_blank(),
      legend.position="none"
    ) +
    xlab("") +
    ylab("Weapon quantity (SIPRI trend-indicator value)")`}</Code>

      <figure>
        <img
          src="/figures/caveat/color_com_nothing/1.webp"
          alt="Don't use color if they communicate nothing – chart example"
          width={960}
          loading="lazy"
        />
      </figure>

      <p>
        Here, each country is represented using a random color. When looking at it, your audience
        may try to understand what the color means. They are thus <code>less focused</code> on the
        main point: the bar length.
      </p>

      <Section
        id="color-if-additionnal-information-only"
        title="Color: if additionnal information only"
      >
        <p>
          Here is the same graphic using a single color for all countries. In my opinion, it conveys
          the information better:
        </p>

        <Code lang="r">{`# Barplot
data %>%
  filter(!is.na(Value)) %>%
  arrange(Value) %>%
  tail(20) %>%
  mutate(Country=factor(Country, Country)) %>%
  ggplot( aes(x=Country, y=Value) ) +
    geom_bar(stat="identity", fill="#69b3a2") +
    coord_flip() +
    theme_ipsum() +
    theme(
      panel.grid.minor.y = element_blank(),
      panel.grid.major.y = element_blank(),
      legend.position="none"
    ) +
    xlab("") +
    ylab("Weapon quantity (SIPRI trend-indicator value)")`}</Code>

        <figure>
          <img
            src="/figures/caveat/color_com_nothing/2.webp"
            alt="Don't use color if they communicate nothing – chart example"
            width={960}
            loading="lazy"
          />
        </figure>

        <p>
          Note that you can use color to highlight specific variation in selected bars. I’m
          personally not a big fan of it, but it is a common practice;
        </p>

        <Code lang="r">{`# Barplot
data %>%
  filter(!is.na(Value)) %>%
  arrange(Value) %>%
  tail(20) %>%
  mutate(Country=factor(Country, Country)) %>%
  ggplot( aes(x=Country, y=Value, fill=Value) ) +
    geom_bar(stat="identity") +
    scale_fill_viridis() +
    coord_flip() +
    theme_ipsum() +
    theme(
      panel.grid.minor.y = element_blank(),
      panel.grid.major.y = element_blank(),
      legend.position="none"
    ) +
    xlab("") +
    ylab("Weapon quantity (SIPRI trend-indicator value)")`}</Code>

        <figure>
          <img
            src="/figures/caveat/color_com_nothing/3.webp"
            alt="Don't use color if they communicate nothing – chart example"
            width={960}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="to-bear-in-mind" title="To bear in mind">
        <p>
          When adding color to your chart, double check that the colors add insight. Colors are
          often useful to:
        </p>
        <ul>
          {" "}
          <li>Show groups</li> <li>Highlight an item</li> <li>Show gradient</li>{" "}
        </ul>
      </Section>

      <Section id="going-further" title="Going further">
        <ul>
          {" "}
          <li>
            What to consider when using choosing colors for data visualization, by Lisa Charlotte
            Rost on the <a href="https://blog.datawrapper.de/colors/">Data Wrapper blog</a>.
          </li>{" "}
        </ul>
      </Section>
    </CaveatLayout>
  );
}
