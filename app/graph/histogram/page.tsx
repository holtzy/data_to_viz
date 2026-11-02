import { GraphLayout } from "@/components/layouts";
import { ButtonLink, Code, RelatedCard, RelatedGrid, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/graph/histogram.html",
  title: "Histogram – from Data to Viz",
  description:
    "A histogram is an accurate graphical representation of the distribution of a numeric variable. It takes as input numeric variables only. The variable is…",
  image: "/img/section/HistogramSmall.png",
});

export default function Page() {
  return (
    <GraphLayout title="Histogram" images={["/img/section/HistogramSmall.png"]}>
      <Section id="definition" title="Definition">
        <p>
          A histogram is an accurate graphical representation of the distribution of a numeric
          variable. It takes as input numeric variables only. The variable is cut into several bins,
          and the number of observation per bin is represented by the height of the bar.
        </p>

        <p>
          Here is an example showing the distribution of the night price of Rbnb appartements in the
          south of France. Price range is divided per 10 euros interval. For example, there are
          slightly less than 750 appartements with a night price between 100 and 110 euros:
        </p>

        <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(viridis)

# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/1_OneNum.csv", header=TRUE)

# Make the histogram
data %>%
  filter( price<300 ) %>%
  ggplot( aes(x=price)) +
    stat_bin(breaks=seq(0,300,10), fill="#69b3a2", color="#e9ecef", alpha=0.9) +
    ggtitle("Night price distribution of Airbnb appartements") +
    theme_ipsum()`}</Code>

        <figure>
          <img
            src="/figures/graph/histogram/1.webp"
            alt="Histogram – chart example"
            width={672}
            height={480}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="what-for" title="What for">
        <p>
          Histogram are used to study the distribution of one or a few variables. Checking the
          distribution of your variables one by one is probably the first task you should do when
          you get a new dataset. It delivers a good quantity of information. Several distribution
          shapes exist, here is an illustration of the 6 most common ones:
        </p>

        <Code lang="r">{`# Build dataset with different distributions
data <- data.frame(
  type = c( rep("edge peak", 1000), rep("comb", 1000), rep("normal", 1000), rep("uniform", 1000), rep("bimodal", 1000), rep("skewed", 1000) ),
  value = c( rnorm(900), rep(3, 100), rnorm(360, sd=0.5), rep(c(-1,-0.75,-0.5,-0.25,0,0.25,0.5,0.75), 80), rnorm(1000), runif(1000), rnorm(500, mean=-2), rnorm(500, mean=2), abs(log(rnorm(1000))) )
)

# Represent it
data %>%
  ggplot( aes(x=value)) +
    geom_histogram(fill="#69b3a2", color="#e9ecef", alpha=0.9) +
    facet_wrap(~type, scale="free_x") +
    theme_ipsum() +
    theme(
      panel.spacing = unit(0.1, "lines"),
      axis.title.x=element_blank(),
      axis.text.x=element_blank(),
      axis.ticks.x=element_blank()
    )`}</Code>

        <figure>
          <img
            src="/figures/graph/histogram/2.webp"
            alt="Histogram – chart example"
            width={960}
            height={480}
            loading="lazy"
          />
        </figure>

        <p>
          Checking this distribution also helps you discovering mistakes in the data. For example,
          the <code>comb</code> distribution can often denote a rounding that has been applied to
          the variable or another mistake.
        </p>

        <p>
          As a second step, histogram allow to compare the distribution of <strong>a few</strong>{" "}
          variables. Don’t compare more than 3 or 4, it would make the figure cluttered and
          unreadable. This comparison can be done showing the 2 variables on the same graphic and
          using transparency.
        </p>

        <Code lang="r">{`# Build dataset with different distributions
data <- data.frame(
  type = c( rep("variable 1", 1000), rep("variable 2", 1000) ),
  value = c( rnorm(1000), rnorm(1000, mean=4) )
)

# Represent it
data %>%
  ggplot( aes(x=value, fill=type)) +
    geom_histogram( color="#e9ecef", alpha=0.6) +
    scale_fill_manual(values=c("#69b3a2", "#404080")) +
    theme_ipsum() +
    labs(fill="")`}</Code>

        <figure>
          <img
            src="/figures/graph/histogram/3.webp"
            alt="Histogram – chart example"
            width={672}
            height={480}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="variation" title="Variation">
        <p>
          A common variation of the histogram is the mirror histogram: it puts face to face 2
          histograms to compare their distribution.
        </p>

        <Code lang="r">{`data <- data.frame(
  x = rnorm(1000),
  y = rnorm(1000, mean=2)
)

data %>%
  ggplot( aes(x) ) +
    geom_histogram( aes(x = x, y = ..density..), binwidth = diff(range(data$x))/30, fill="#69b3a2" ) +
    geom_label( aes(x=4.8, y=0.25, label="variable1"), color="#69b3a2") +
    geom_histogram( aes(x = y, y = -..density..), binwidth = diff(range(data$x))/30, fill= "#404080") +
    geom_label( aes(x=4.8, y=-0.25, label="variable2"), color="#404080") +
    theme_ipsum() +
    xlab("value of x")`}</Code>

        <figure>
          <img
            src="/figures/graph/histogram/4.webp"
            alt="Histogram – chart example"
            width={672}
            height={480}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="mistake" title="Common mistakes">
        <ul>
          {" "}
          <li>Try several bin size, it can lead to very different conclusions.</li>{" "}
          <li>Don’t use weird color sheme. It does not give any more insight.</li>{" "}
          <li>
            Don’t confound it with a barplot. A barplot gives a value for each group of a categoric
            variable. Here, we have only a numeric variable and we chack its distribution.
          </li>{" "}
          <li>
            Don’t compare more than ~3 groups in the same histogram. The graphic gets cluttered and
            hardly understandable. Instead use a violin plot, a boxplot, a ridgeline plot or use
            small multiple.
          </li>{" "}
          <li>Using unequal bin widths</li>{" "}
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
            href="/graph/ridgeline.html"
            image="/img/section/JoyplotSmall.png"
            title="Ridgeline"
          >
            Allows to compare the distribution of a few variables. Usefull if there is a pattern to
            observe
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
          The <a href="https://r-graph-gallery.com/histogram.html">R</a>,{" "}
          <a href="https:/python-graph-gallery.com/histogram/">Python</a>,{" "}
          <a href="https://www.react-graph-gallery.com/histogram">React</a> and{" "}
          <a href="https://d3-graph-gallery.com/histogram.html">D3</a> graph galleries are 4
          websites providing hundreds of chart example, always providing the reproducible code.
          Click the button below to see how to build the chart you need with your favorite
          programing language.
        </p>

        <p>
          <ButtonLink href="https://r-graph-gallery.com/histogram.html">R graph gallery</ButtonLink>{" "}
          <ButtonLink href="https://python-graph-gallery.com/histogram/">Python gallery</ButtonLink>{" "}
          <ButtonLink href="https://www.react-graph-gallery.com/histogram">
            React gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://d3-graph-gallery.com/histogram.html">D3 gallery</ButtonLink>
        </p>
      </Section>
    </GraphLayout>
  );
}
