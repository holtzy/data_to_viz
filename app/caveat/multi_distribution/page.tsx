import { CaveatLayout } from "@/components/layouts";
import { Code, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/caveat/multi_distribution.html",
  title: "Too many distributions | Dataviz pitfall gallery",
  description:
    "Comparing the distributions of several numeric variables is a common task in dataviz. The distribution of a variable can be represented using a histogram…",
  image: "/img/mistake/multi_distribution.png",
});

export default function Page() {
  return (
    <CaveatLayout title="Too many distributions" images={["/img/mistake/multi_distribution.png"]}>
      <p>
        Comparing the distributions of several numeric variables is a common task in dataviz. The
        distribution of a variable can be represented using a{" "}
        <a href="/graph/histogram.html">histogram</a> or a{" "}
        <a href="/graph/density.html">density chart</a>, and it is very tempting to represent many
        distributions on the same axis.
      </p>

      <p>
        Here is an example showing how people perceive probability vocabulary. On the{" "}
        <a href="https://www.reddit.com/r/SampleSize/">/r/samplesize</a> thread of reddit, questions
        like <em>What probability would you assign to the phrase “Highly likely”</em> were asked.
        Here is the distribution of the score given by people to each question:
      </p>

      <Code lang="r">{`#library
library(tidyverse)
library(hrbrthemes)
library(viridis)
library(patchwork)


# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/zonination/perceptions/master/probly.csv", header=TRUE, sep=",")
data <- data %>%
  gather(key="text", value="value") %>%
  mutate(text = gsub("\\\\.", " ",text)) %>%
  mutate(value = round(as.numeric(value),0))

# A dataframe for annotations
annot <- data.frame(
  text = c("Almost No Chance", "About Even", "Probable", "Almost Certainly"),
  x = c(5, 53, 65, 79),
  y = c(0.15, 0.4, 0.06, 0.1)
)

# Plot
data %>%
  filter(text %in% c("Almost No Chance", "About Even", "Probable", "Almost Certainly")) %>%
  mutate(text = fct_reorder(text, value)) %>%
  ggplot( aes(x=value, color=text, fill=text)) +
    geom_density(alpha=0.6) +
    scale_fill_viridis(discrete=TRUE) +
    scale_color_viridis(discrete=TRUE) +
    geom_text( data=annot, aes(x=x, y=y, label=text, color=text), hjust=0, size=4.5) +
    theme_ipsum() +
    theme(
      legend.position="none",
      panel.spacing = unit(0.1, "lines"),
      strip.text.x = element_text(size = 8)
    ) +
    xlab("") +
    ylab("Assigned Probability (%)")`}</Code>

      <figure>
        <img
          src="/figures/caveat/multi_distribution/1.webp"
          alt="Too many distributions – chart example"
          width={768}
          height={576}
          loading="lazy"
        />
      </figure>

      <p>
        In this case, the figure is quite neat. People give a probability between 0 and 20% for the
        sentence “Almost No chance”, and between 75 and 100% for “Almost Certainly”. Let’s check
        what happens with more groups:
      </p>

      <Code lang="r">{`# Plot
data %>%
  mutate(text = fct_reorder(text, value)) %>%
  ggplot( aes(x=value, color=text, fill=text)) +
    geom_density(alpha=0.6) +
    scale_fill_viridis(discrete=TRUE) +
    scale_color_viridis(discrete=TRUE) +
    theme_ipsum() +
    theme(
      panel.spacing = unit(0.1, "lines"),
      strip.text.x = element_text(size = 8)
    ) +
    xlab("") +
    ylab("Assigned Probability (%)")`}</Code>

      <figure>
        <img
          src="/figures/caveat/multi_distribution/2.webp"
          alt="Too many distributions – chart example"
          width={768}
          height={576}
          loading="lazy"
        />
      </figure>

      <p>
        Now the figure is way too cluttered and it is impossible to distinguish groups: there are
        too many distributions represented on the same graphic. How to avoid that?
      </p>

      <Section id="workaround" title="Workaround">
        <p>
          Several workarounds exist and are presented in detail in this{" "}
          <a href="/story/OneNumOneCatSeveralObs.html">dedicated page</a>. Here is just an overview
          of the possibilities:
        </p>

        <Code lang="r">{`data %>%
  mutate(text = fct_reorder(text, value)) %>%
  ggplot( aes(x=text, y=value, fill=text)) +
    geom_boxplot() +
    geom_jitter(color="grey", alpha=0.3, size=0.9) +
    scale_fill_viridis(discrete=TRUE) +
    theme_ipsum() +
    theme(
      legend.position="none"
    ) +
    coord_flip() +
    xlab("") +
    ylab("Assigned Probability (%)")`}</Code>

        <figure>
          <img
            src="/figures/caveat/multi_distribution/3.webp"
            alt="Too many distributions – chart example"
            width={768}
            height={576}
            loading="lazy"
          />
        </figure>

        <Section id="violin" title="Violin" level={3}>
          <Code lang="r">{`data %>%
  mutate(text = fct_reorder(text, value)) %>%
  ggplot( aes(x=text, y=value, fill=text, color=text)) +
    geom_violin(width=2.1, size=0.2) +
    scale_fill_viridis(discrete=TRUE) +
    scale_color_viridis(discrete=TRUE) +
    theme_ipsum() +
    theme(
      legend.position="none"
    ) +
    coord_flip() +
    xlab("") +
    ylab("Assigned Probability (%)")`}</Code>

          <figure>
            <img
              src="/figures/caveat/multi_distribution/4.webp"
              alt="Too many distributions – chart example"
              width={768}
              height={576}
              loading="lazy"
            />
          </figure>
        </Section>

        <Section id="ridgeline" title="Ridgeline" level={3}>
          <Code lang="r">{`library(ggridges)
data %>%
  mutate(text = fct_reorder(text, value)) %>%
  ggplot( aes(y=text, x=value,  fill=text)) +
    geom_density_ridges(alpha=0.6, bandwidth=4) +
    scale_fill_viridis(discrete=TRUE) +
    scale_color_viridis(discrete=TRUE) +
    theme_ipsum() +
    theme(
      legend.position="none",
      panel.spacing = unit(0.1, "lines"),
      strip.text.x = element_text(size = 8)
    ) +
    xlab("") +
    ylab("Assigned Probability (%)")`}</Code>

          <figure>
            <img
              src="/figures/caveat/multi_distribution/5.webp"
              alt="Too many distributions – chart example"
              width={768}
              height={576}
              loading="lazy"
            />
          </figure>
        </Section>

        <Section id="faceting" title="Faceting" level={3}>
          <Code lang="r">{`data %>%
  mutate(text = fct_reorder(text, value)) %>%
  ggplot( aes(x=value, color=text, fill=text)) +
    geom_density(alpha=0.6) +
    scale_fill_viridis(discrete=TRUE) +
    scale_color_viridis(discrete=TRUE) +
    theme_ipsum() +
    theme(
      legend.position="none",
      panel.spacing = unit(0.1, "lines"),
      strip.text.x = element_text(size = 8)
    ) +
    xlab("") +
    ylab("Assigned Probability (%)") +
    facet_wrap(~text, scale="free_y")`}</Code>

          <figure>
            <img
              src="/figures/caveat/multi_distribution/6.webp"
              alt="Too many distributions – chart example"
              width={768}
              height={672}
              loading="lazy"
            />
          </figure>
        </Section>
      </Section>

      <Section id="going-further" title="Going further">
        <p>
          <strong>Disclaimer</strong>: This idea originally comes from a publication of the{" "}
          <a href="https://www.cia.gov/library/center-for-the-study-of-intelligence/csi-publications/books-and-monographs/psychology-of-intelligence-analysis/art15.html">
            CIA
          </a>{" "}
          which resulted in this{" "}
          <a href="https://www.cia.gov/library/center-for-the-study-of-intelligence/csi-publications/books-and-monographs/psychology-of-intelligence-analysis/fig18.gif/image.gif">
            figure
          </a>
          . Then, <a href="https://github.com/zonination">Zoni Nation</a> cleaned the reddit dataset
          and built <a href="https://github.com/zonination/perceptions">graphics with R</a>. I
          heavily rely on his work in this post.
        </p>

        <p>
          <strong>Other link</strong>:
        </p>
        <ul>
          {" "}
          <li>
            Doing boxplots in <a href="https://www.r-graph-gallery.com/boxplot/">R</a> and{" "}
            <a href="https://python-graph-gallery.com/boxplot/">Python</a>
          </li>{" "}
          <li>
            Doing violin plots in <a href="https://www.r-graph-gallery.com/violin/">R</a> and{" "}
            <a href="https://python-graph-gallery.com/violin/">Python</a>
          </li>{" "}
        </ul>
      </Section>
    </CaveatLayout>
  );
}
