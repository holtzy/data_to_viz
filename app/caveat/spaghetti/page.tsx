import { CaveatLayout } from "@/components/layouts";
import { Code, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/caveat/spaghetti.html",
  title: "The Spaghetti plot | Dataviz pitfall gallery",
  description:
    "A Spaghetti plot is a line plot with many lines displayed together. With more than a few (~5?) groups this kind of graphic gets really hard to read, and…",
  image: "/img/mistake/spaghetti.png",
});

export default function Page() {
  return (
    <CaveatLayout title="The Spaghetti plot" images={["/img/mistake/spaghetti.png"]}>
      <p>
        A Spaghetti plot is a <a href="/graph/line.html">line plot</a> with many lines displayed
        together. With more than a few (~5?) groups this kind of graphic gets really hard to read,
        and thus provides little insight about the data. Let’s make an example with the{" "}
        <a href="/story/OneCatSevOrderedNum.html">evolution of baby names</a> in the US from 1880 to
        2015.
      </p>

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
  filter(name %in% c("Mary","Emma", "Ida", "Ashley", "Amanda", "Jessica",    "Patricia", "Linda", "Deborah",   "Dorothy", "Betty", "Helen")) %>%
  filter(sex=="F")

# Plot
data %>%
  ggplot( aes(x=year, y=n, group=name, color=name)) +
    geom_line() +
    scale_color_viridis(discrete = TRUE) +
    theme(
      legend.position="none",
      plot.title = element_text(size=14)
    ) +
    ggtitle("A spaghetti chart of baby names popularity") +
    theme_ipsum()`}</Code>

      <figure>
        <img
          src="/figures/caveat/spaghetti/1.webp"
          alt="The Spaghetti plot – chart example"
          width={960}
          loading="lazy"
        />
      </figure>

      <p>
        It is very hard to follow a line to understand the evolution of a specific name’s
        popularity. Plus, even if you manage to follow a line, you then need to link it with the
        legend which is even harder. Let’s try to find a few workarounds to improve this graphic.
      </p>

      <Section id="target-a-specific-group" title="Target a specific group">
        <p>
          Let’s say you plot many groups, but the actual reason for that is to explain the feature
          of one particular group compared to the others. Then a good workaround is to highlight
          this group: make it appear different, and give it a proper annotation. Here, the evolution
          of Amanda’s popularity is obvious. Leaving the other lines is important since it allows
          you to compare Amanda to all other names.
        </p>

        <Code lang="r">{`data %>%
  mutate( highlight=ifelse(name=="Amanda", "Amanda", "Other")) %>%
  ggplot( aes(x=year, y=n, group=name, color=highlight, size=highlight)) +
    geom_line() +
    scale_color_manual(values = c("#69b3a2", "lightgrey")) +
    scale_size_manual(values=c(1.5,0.2)) +
    theme(legend.position="none") +
    ggtitle("Popularity of American names in the previous 30 years") +
    theme_ipsum() +
    geom_label( x=1990, y=55000, label="Amanda reached 3550\\nbabies in 1970", size=4, color="#69b3a2") +
    theme(
      legend.position="none",
      plot.title = element_text(size=14)
)`}</Code>

        <figure>
          <img
            src="/figures/caveat/spaghetti/2.webp"
            alt="The Spaghetti plot – chart example"
            width={960}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="use-small-multiples" title="Use small multiples">
        <p>
          <a href="/graph/area.html">Area charts</a> can be used to give a more general overview of
          the dataset, especially when used in combination with small multiples. In the following
          chart, it is easy to get a glimpse of the evolution of any name:
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
      strip.text.x = element_text(size = 8),
      plot.title = element_text(size=14)
    ) +
    facet_wrap(~name)`}</Code>

        <p>
          <img
            src="/figures/caveat/spaghetti/3.webp"
            alt="The Spaghetti plot – chart example"
            width={768}
            loading="lazy"
          />{" "}
          For instance, <code>Linda</code> was a really popular name for a really short period of
          time. On another hand, Ida has never been very popular, but was used a little during
          several decades.
        </p>
      </Section>

      <Section id="combine-approaches" title="Combine approaches">
        <p>
          Note that if you want to compare the evolution of each line compared to the others, you
          can combine both approaches:
        </p>

        <Code lang="r">{`tmp <- data %>%
  mutate(name2=name)

tmp %>%
  ggplot( aes(x=year, y=n)) +
    geom_line( data=tmp %>% dplyr::select(-name), aes(group=name2), color="grey", size=0.5, alpha=0.5) +
    geom_line( aes(color=name), color="#69b3a2", size=1.2 )+
    scale_color_viridis(discrete = TRUE) +
    theme_ipsum() +
    theme(
      legend.position="none",
      plot.title = element_text(size=14),
      panel.grid = element_blank()
    ) +
    ggtitle("A spaghetti chart of baby names popularity") +
    facet_wrap(~name)`}</Code>

        <figure>
          <img
            src="/figures/caveat/spaghetti/4.webp"
            alt="The Spaghetti plot – chart example"
            width={768}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="going-further" title="Going further">
        <ul>
          {" "}
          <li>
            strategies for avoiding the spaghetti graph, by{" "}
            <a href="http://www.storytellingwithdata.com/blog/2013/03/avoiding-spaghetti-graph">
              storytelling with data
            </a>
          </li>{" "}
          <li>
            doing line plots in <a href="https://www.r-graph-gallery.com/line-plot/">R</a> and{" "}
            <a href="https://python-graph-gallery.com/line-chart/">Python</a>
          </li>{" "}
        </ul>
      </Section>
    </CaveatLayout>
  );
}
