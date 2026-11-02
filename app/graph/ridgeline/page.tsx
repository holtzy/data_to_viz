import { GraphLayout } from "@/components/layouts";
import { ButtonLink, Code, RelatedCard, RelatedGrid, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/graph/ridgeline.html",
  title: "Ridgeline plot – from Data to Viz",
  description:
    "A Ridgeline plot (sometimes called Joyplot) shows the distribution of a numeric value for several groups. Distribution can be represented using histograms…",
  image: "/img/section/Joyplot150.png",
});

export default function Page() {
  return (
    <GraphLayout title="Ridgeline plot" images={["/img/section/Joyplot150.png"]}>
      <Section id="definition" title="Definition">
        <p>
          A Ridgeline plot (sometimes called Joyplot) shows the distribution of a numeric value for
          several groups. Distribution can be represented using{" "}
          <a href="/graph/histogram.html">histograms</a> or{" "}
          <a href="/graph/density.html">density plots</a>, all aligned to the same horizontal scale
          and presented with a slight overlap.
        </p>

        <p>
          Here is an example showing how people{" "}
          <a href="/story/OneNumOneCatSeveralObs.html">perceive probability</a>. On the{" "}
          <a href="https://www.reddit.com/r/SampleSize/">/r/samplesize</a> thread of reddit,
          questions like <em>What probability would you assign to the phrase “Highly likely”</em>{" "}
          were asked. Answers between 0 and 100 were recorded, and here is the distribution for each
          question:
        </p>

        <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(viridis)

# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/zonination/perceptions/master/probly.csv", header=TRUE, sep=",")
data <- data %>%
  gather(key="text", value="value") %>%
  mutate(text = gsub("\\\\.", " ",text)) %>%
  mutate(value = round(as.numeric(value),0)) %>%
  filter(text %in% c("Almost Certainly","Very Good Chance","We Believe","Likely","About Even", "Little Chance", "Chances Are Slight", "Almost No Chance"))

library(ggridges)

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
            src="/figures/graph/ridgeline/1.webp"
            alt="Ridgeline plot – chart example"
            width={768}
            loading="lazy"
          />
        </figure>

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
          and built <a href="https://github.com/zonination/perceptions">graphics with R</a>.
        </p>
      </Section>

      <Section id="what-for" title="What for">
        <ul>
          {" "}
          <li>
            <p>
              Ridgeline plots make sense when the number of group to represent is{" "}
              <code>medium to high</code>, and thus a classic window separation would take to much
              space. Indeed, the fact that groups overlap each other allows to use space more
              efficiently. If you have less than ~6 groups, dealing with other{" "}
              <a href="/#portfolio">distribution plots</a> is probably better.
            </p>
          </li>{" "}
          <li>
            <p>
              It works well when there is a clear pattern in the result, like if there is an obvious
              ranking in groups. Otherwise group will tend to overlap each other, leading to a messy
              plot not providing any insight.
            </p>
          </li>{" "}
        </ul>
      </Section>

      <Section id="variation" title="Variation">
        <ul>
          {" "}
          <li>
            The above example is a ridgeline plot using a set of density plots. It is possible to
            use histograms as well:
          </li>{" "}
        </ul>
        <Code lang="r">{`data %>%
  mutate(text = fct_reorder(text, value)) %>%
  ggplot( aes(y=text, x=value,  fill=text)) +
    geom_density_ridges(alpha=0.6, stat="binline", bins=20) +
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
            src="/figures/graph/ridgeline/2.webp"
            alt="Ridgeline plot – chart example"
            width={672}
            loading="lazy"
          />
        </figure>
        <ul>
          {" "}
          <li>
            It is possible to color depending on the numeric variable instead of the categoric one.
            (code from the{" "}
            <a href="https://cran.r-project.org/web/packages/ggridges/vignettes/introduction.html">
              ridgeline R package
            </a>{" "}
            by <a href="https://github.com/clauswilke">Claus O. Wilke</a> )
          </li>{" "}
        </ul>
        <Code lang="r">{`ggplot(lincoln_weather, aes(x = \`Mean Temperature [F]\`, y = \`Month\`, fill = ..x..)) +
  geom_density_ridges_gradient(scale = 3, rel_min_height = 0.01) +
  scale_fill_viridis(name = "Temp. [F]", option = "C") +
  labs(title = 'Temperatures in Lincoln NE in 2016') +
  theme_ipsum() +
    theme(
      legend.position="none",
      panel.spacing = unit(0.1, "lines"),
      strip.text.x = element_text(size = 8)
    )`}</Code>

        <figure>
          <img
            src="/figures/graph/ridgeline/3.webp"
            alt="Ridgeline plot – chart example"
            width={672}
            loading="lazy"
          />
        </figure>
        <ul>
          {" "}
          <li>
            See more variations in the{" "}
            <a href="https://www.r-graph-gallery.com/ridgeline-plot/">R graph gallery</a>.
          </li>{" "}
        </ul>
      </Section>

      <Section id="mistake" title="Common mistakes">
        <ul>
          {" "}
          <li>
            As with histogram or density plot,{" "}
            <a href="/caveat/bin_size.html">play with bin size / bandwidth argument</a>.
          </li>{" "}
          <li>
            Think about <a href="/caveat/order_data.html">ordering groups</a> in a smart way.
          </li>{" "}
          <li>
            Ridgeline plot works well when there is a <code>clear pattern</code> to discover since
            it hides a part of the data where the overlap takes place.
          </li>{" "}
        </ul>
      </Section>

      <Section id="related" title="Related">
        <RelatedGrid>
          <RelatedCard
            href="/graph/density.html"
            image="/img/section/DensitySmall.png"
            title="Density"
          >
            Very close from an histogram. Show a density of distribution instead of bars
          </RelatedCard>
          <RelatedCard
            href="/graph/histogram.html"
            image="/img/section/HistogramSmall.png"
            title="Histogram"
          >
            Represent the value of entities using bars of various length. Use it if you have a large
            dataset.
          </RelatedCard>
          <RelatedCard
            href="/caveat/boxplot.html"
            image="/img/section/Box1Small.png"
            title="Boxplot"
          >
            Summarize the distribution of several numeric variables using boxes. Use it if you have
            a limited dataset size.
          </RelatedCard>
          <RelatedCard
            href="/graph/violin.html"
            image="/img/section/ViolinSmall.png"
            title="Violin"
          >
            Show the density of several numeric variables. Use it with a large amount of data
          </RelatedCard>
        </RelatedGrid>
      </Section>

      <Section id="code" title="Build your own">
        <p>
          The <a href="https://www.r-graph-gallery.com/ridgeline-plot.html">R</a>,{" "}
          <a href="https://www.python-graph-gallery.com/ridgeline/">Python</a>,{" "}
          <a href="https://www.react-graph-gallery.com/ridgeline">React</a> and{" "}
          <a href="https://d3-graph-gallery.com/ridgeline.html">D3</a> graph galleries are 4
          websites providing hundreds of chart example, always providing the reproducible code.
          Click the button below to see how to build the chart you need with your favorite
          programing language.
        </p>

        <p>
          <ButtonLink href="https://www.r-graph-gallery.com/ridgeline-plot.html">
            R graph gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://python-graph-gallery.com/ridgeline/">Python gallery</ButtonLink>{" "}
          <ButtonLink href="https://www.react-graph-gallery.com/ridgeline">
            React gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://d3-graph-gallery.com/ridgeline.html">D3 gallery</ButtonLink>
        </p>
      </Section>
    </GraphLayout>
  );
}
