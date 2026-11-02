import { StoryLayout } from "@/components/layouts";
import { Code, Section } from "@/components/content";
import { ChartTile, ChartTiles } from "@/components/chart-tile";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/story/OneNumOneCatSeveralObs.html",
  title: "Perception of probability – from Data to Viz",
  description:
    "This document gives a few suggestions to analyse a dataset composed by a numeric and a categoric variable. On the /r/samplesize thread of reddit,…",
  image: "/img/section/DensitySmall.png",
});

export default function Page() {
  return (
    <StoryLayout
      title="Perception of probability"
      images={[
        "/img/section/DensitySmall.png",
        "/img/section/HistogramSmall.png",
        "/img/section/Box1Small.png",
        "/img/section/ViolinSmall.png",
        "/img/section/JoyplotSmall.png",
      ]}
    >
      <div className="grid gap-6 md:grid-cols-12">
        {" "}
        <div className="md:col-span-8">
          <p>
            This document gives a few suggestions to analyse a dataset composed by a numeric and a
            categoric variable. <br />
            <br /> On the <a href="https://www.reddit.com/r/SampleSize/">/r/samplesize</a> thread of
            reddit, questions like{" "}
            <em>What probability would you assign to the phrase “Highly likely”</em> were asked.
            Results allow to understand how people perceive probability vocabulary. <br />
            <br /> <strong>Disclaimer</strong>: This idea originally comes from a publication of the{" "}
            <a href="https://www.cia.gov/library/center-for-the-study-of-intelligence/csi-publications/books-and-monographs/psychology-of-intelligence-analysis/art15.html">
              CIA
            </a>{" "}
            which resulted in this{" "}
            <a href="https://www.cia.gov/library/center-for-the-study-of-intelligence/csi-publications/books-and-monographs/psychology-of-intelligence-analysis/fig18.gif/image.gif">
              figure
            </a>
            . Then, <a href="https://github.com/zonination">Zoni Nation</a> cleaned the reddit
            dataset and built{" "}
            <a href="https://github.com/zonination/perceptions">graphics with R</a>. I heavily rely
            on his work in the folowing.
          </p>
        </div>{" "}
        <div className="md:col-span-4">
          <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(kableExtra)
options(knitr.table.format = "html")
library(viridis)

# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/zonination/perceptions/master/probly.csv", header=TRUE, sep=",")
data <- data %>%
  gather(key="text", value="value") %>%
  mutate(text = gsub("\\\\.", " ",text)) %>%
  mutate(value = round(as.numeric(value),0))


# show data
data %>% sample_n(8) %>% kable(row.names = FALSE) %>%
  kable_styling(bootstrap_options = "striped", full_width = F)`}</Code>

          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>text</th>
                  <th className="text-right">value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>We Doubt</td>
                  <td className="text-right">33</td>
                </tr>
                <tr>
                  <td>About Even</td>
                  <td className="text-right">50</td>
                </tr>
                <tr>
                  <td>Almost No Chance</td>
                  <td className="text-right">1</td>
                </tr>
                <tr>
                  <td>Highly Unlikely</td>
                  <td className="text-right">5</td>
                </tr>
                <tr>
                  <td>Almost No Chance</td>
                  <td className="text-right">2</td>
                </tr>
                <tr>
                  <td>Improbable</td>
                  <td className="text-right">3</td>
                </tr>
                <tr>
                  <td>Chances Are Slight</td>
                  <td className="text-right">40</td>
                </tr>
                <tr>
                  <td>We Doubt</td>
                  <td className="text-right">10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>{" "}
      </div>
      <Section id="boxplot" title="Boxplot">
        <p>
          The most common way to represent that kind of dataset is probably the boxplot. It
          summarizes the main features of each group and thus allow an efficient of distributions.
          Mind a few pitfalls tough. It often makes sense to{" "}
          <a href="/caveat/order_data.html">order groups</a> to make the chart easier to read. If
          the <a href="/caveat/hard_label.html">group labels are long</a>, consider a horizontal
          version that makes the labels readable. Last but not least, note that the boxplot{" "}
          <a href="/caveat/boxplot.html">hides information</a> like the underlying distribution of
          the sample size. <a href="/caveat/boxplot.html">Several workarounds</a> exist, like
          showing the individual data points with unobstrusive dots.
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
            src="/figures/story/OneNumOneCatSeveralObs/1.webp"
            alt="Perception of probability – chart example"
            width={768}
            height={576}
            loading="lazy"
          />
        </figure>
      </Section>
      <Section id="violin" title="Violin">
        <p>
          The violin plot is often a good alternative to boxplot as long as your sample size is big
          enough. It is very close to the boxplot, thus the advices above still apply, except that
          it describes group distributions more accurately by definition. If you have many groups
          (like here), it is probably not the best option since each violin tends to be very slim,
          what makes hard to visualize the distribution. In this case a good alternative is the
          ridgeline plot thatis described a bit further in this post.
        </p>

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
            src="/figures/story/OneNumOneCatSeveralObs/2.webp"
            alt="Perception of probability – chart example"
            width={768}
            height={576}
            loading="lazy"
          />
        </figure>
      </Section>
      <Section id="density" title="Density">
        <p>
          If you have just a few group, you can compare them on the same density plot. Here only
          four groups were selected to illustrate this idea. With more groups, the graphic would get
          cluttered and hard to read. The number of group you can show on the same density plot
          depends of your data: if the group overlap, few, if their distribution is really
          different, a bit more.
        </p>

        <Code lang="r">{`# A dataframe for annotations
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
            src="/figures/story/OneNumOneCatSeveralObs/3.webp"
            alt="Perception of probability – chart example"
            width={768}
            height={576}
            loading="lazy"
          />
        </figure>

        <p>
          However if you have more than ~4 groups this technique does not work: the graphic would
          become too cluttered. Thus it is a better practice to use small multiple:
        </p>

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
            src="/figures/story/OneNumOneCatSeveralObs/4.webp"
            alt="Perception of probability – chart example"
            width={768}
            height={672}
            loading="lazy"
          />
        </figure>

        <p>
          This is a good way to study the distribution of each group separately. However, it makes
          it hard to compare groups together since they do not all share the same Y axis. All
          depends on what is the question you are trying to answer.
        </p>
      </Section>
      <Section id="histogram" title="Histogram">
        <p>
          The histrogram is very close from density plots. Thus, all the remarks above probably
          apply here as well.
        </p>

        <Code lang="r">{`data %>%
  mutate(text = fct_reorder(text, value)) %>%
  ggplot( aes(x=value, color=text, fill=text)) +
    geom_histogram(alpha=0.6, binwidth = 5) +
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
    facet_wrap(~text)`}</Code>

        <p>
          <img
            src="/figures/story/OneNumOneCatSeveralObs/5.webp"
            alt="Perception of probability – chart example"
            width={768}
            height={576}
            loading="lazy"
          />{" "}
          Note that here the Y scale is the same for each group, unlike the precedent example on
          density plot.
        </p>
      </Section>
      <Section id="ridgeline-plot" title="Ridgeline plot">
        <p>
          In this example, the best option is probably the ridgeline plot. It shares all the
          benefits of a violinplot and avoid to loose space since there is an overlap between
          groups. Both individual distribution and comparison between groups are described
          efficiently.
        </p>

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
            src="/figures/story/OneNumOneCatSeveralObs/6.webp"
            alt="Perception of probability – chart example"
            width={768}
            height={576}
            loading="lazy"
          />
        </figure>
      </Section>
      <h2 id="going-further">Going further</h2>
      <p>
        You can learn more about each type of graphic presented in this story in the dedicated
        sections. Click the icon below:
      </p>
      <ChartTiles>
        <ChartTile
          href="/graph/density.html"
          image="/img/section/DensitySmall.png"
          title="Density"
        />
        <ChartTile
          href="/graph/histogram.html"
          image="/img/section/HistogramSmall.png"
          title="Histogram"
        />
        <ChartTile href="/caveat/boxplot.html" image="/img/section/Box1Small.png" title="Boxplot" />
        <ChartTile href="/graph/violin.html" image="/img/section/ViolinSmall.png" title="Violin" />
        <ChartTile
          href="/graph/ridgeline.html"
          image="/img/section/JoyplotSmall.png"
          title="Ridgeline plot"
        />
      </ChartTiles>
    </StoryLayout>
  );
}
