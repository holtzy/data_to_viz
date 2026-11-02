import { GraphLayout } from "@/components/layouts";
import { ButtonLink, Code, RelatedCard, RelatedGrid, Section, Widget } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/graph/scatter.html",
  title: "Scatter plot – from Data to Viz",
  description:
    "A scatterplot displays the relationship between 2 numeric variables. For each data point, the value of its first variable is represented on the X axis,…",
  image: "/img/section/ScatterPlotSmall.png",
});

export default function Page() {
  return (
    <GraphLayout title="Scatter plot" images={["/img/section/ScatterPlotSmall.png"]}>
      <Section id="definition" title="Definition">
        <p>
          A scatterplot displays the relationship between 2 numeric variables. For each data point,
          the value of its first variable is represented on the X axis, the second on the Y axis.
        </p>

        <p>
          Here is an example considering the price of 1460 apartements and their ground living area.
          This dataset comes from a{" "}
          <a href="https://www.kaggle.com/c/house-prices-advanced-regression-techniques/data">
            kaggle
          </a>{" "}
          machine learning competition. You can read more about this example{" "}
          <a href="/story/TwoNum.html">here</a>.
        </p>

        <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(viridis)

# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv", header=T, sep=",") %>% dplyr::select(GrLivArea, SalePrice)

# plot
data %>%
  ggplot( aes(x=GrLivArea, y=SalePrice/1000)) +
    geom_point(color="#69b3a2", alpha=0.6) +
    ggtitle("Ground living area partially explains sale price of apartments") +
    theme_ipsum() +
    theme(
      plot.title = element_text(size=12)
    ) +
    ylab('Sale price (k$)') +
    xlab('Ground living area')`}</Code>

        <figure>
          <img
            src="/figures/graph/scatter/1.webp"
            alt="Scatter plot – chart example"
            width={768}
            height={480}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="what-for" title="What for">
        <p>
          A scatterplot is made to study the relationship between 2 variables. Thus it is often
          accompanied by a{" "}
          <a href="https://en.wikipedia.org/wiki/Correlation_coefficient">
            correlation coefficient
          </a>{" "}
          calculation, that usually tries to measure the <code>linear relationship</code>.
        </p>

        <p>
          However other types of relationship can be detected using scatterplots, and a common task
          consists to fit a model explaining Y in function of X. Here is a few pattern you can
          detect doing a scatterplot.
        </p>

        <Code lang="r">{`# Create data
d1 <- data.frame(x=seq(1,100), y=rnorm(100), name="No trend")
d2 <- d1 %>% mutate(y=x*10 + rnorm(100,sd=60)) %>% mutate(name="Linear relationship")
d3 <- d1 %>% mutate(y=x^2 + rnorm(100,sd=140)) %>% mutate(name="Square")
d4 <- data.frame( x=seq(1,10,0.1), y=sin(seq(1,10,0.1)) + rnorm(91,sd=0.6)) %>% mutate(name="Sin")
don <- do.call(rbind, list(d1, d2, d3, d4))

# Plot
don %>%
  ggplot(aes(x=x, y=y)) +
    geom_point(color="#69b3a2", alpha=0.8) +
    theme_ipsum() +
    facet_wrap(~name, scale="free")`}</Code>

        <figure>
          <img
            src="/figures/graph/scatter/2.webp"
            alt="Scatter plot – chart example"
            width={960}
            height={480}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="variation" title="Variation">
        <p>
          Interactivity is a real plus for scatterplot. It allows to <code>zoom</code> on a specific
          part of the graphic to detect more precise pattern. It also allows to <code>hover</code>{" "}
          dots to get more information about them, like below:
        </p>

        <Code lang="r">{`# Plotly allows to turn any ggplot2 graphic interactive
library(plotly)

p <- data %>%
  mutate(text=paste("Apartment Number: ", seq(1:nrow(data)), "\\nLocation: New York\\nAny other information you need..", sep="")) %>%
  ggplot( aes(x=GrLivArea, y=SalePrice/1000, text=text)) +
    geom_point(color="#69b3a2", alpha=0.8) +
    ggtitle("Ground living area partially explains sale price of apartments") +
    theme_ipsum() +
    theme(
      plot.title = element_text(size=12)
    ) +
    ylab('Sale price (k$)') +
    xlab('Ground living area')

ggplotly(p, tooltip="text")`}</Code>

        <Widget src="/widgets/graph/scatter-1.html" height={480} width={768} />

        <p>
          Scatterplot are sometimes supported by marginal distributions. It indeed adds insight to
          the graphic, revealing the distribution of both variables:
        </p>

        <Code lang="r">{`library(ggExtra)

# create a ggplot2 scatterplot
p <- data %>%
  ggplot( aes(x=GrLivArea, y=SalePrice/1000)) +
    geom_point(color="#69b3a2", alpha=0.8) +
    theme_ipsum() +
    theme(
      legend.position="none"
    )

# add marginal histograms
ggExtra::ggMarginal(p, type = "histogram", color="grey")`}</Code>

        <figure>
          <img
            src="/figures/graph/scatter/3.webp"
            alt="Scatter plot – chart example"
            width={768}
            height={480}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="mistake" title="Common mistakes">
        <ul>
          {" "}
          <li>
            <p>
              <a href="/caveat/overplotting.html">Overplotting</a> is the most common mistake when
              sample size is high. <a href="/caveat/overplotting.html">This post</a> describes about
              10 different workarounds to fix this issue.
            </p>
          </li>{" "}
          <li>
            <p>
              Don’t forget to show subgroups if you have some. Indeed it can reveal important hidden
              patterns in your data, like in the case of the Simpson paradox.
            </p>
          </li>{" "}
        </ul>
      </Section>

      <Section id="related" title="Related">
        <RelatedGrid>
          <RelatedCard
            href="/graph/bubble.html"
            image="/img/section/BubblePlotSmall.png"
            title="Bubble plot"
          >
            Add a third dimension to your scatter: the circle size
          </RelatedCard>
          <RelatedCard
            href="/graph/correlogram.html"
            image="/img/section/CorrelogramSmall.png"
            title="Correlogram"
          >
            Shows the relationship between each pair of numeric variables
          </RelatedCard>
          <RelatedCard
            href="/graph/connectedscatter.html"
            image="/img/section/ScatterConnectedSmall.png"
            title="Connected Scatterplot"
          >
            Very close from a scatterplot, but link data points with segments
          </RelatedCard>
          <RelatedCard
            href="/graph/density2d.html"
            image="/img/section/2dDensitySmall.png"
            title="Density 2d"
          >
            One of the best way to avoid overplotting for big sample size
          </RelatedCard>
        </RelatedGrid>
      </Section>

      <Section id="code" title="Build your own">
        <p>
          The <a href="https://www.r-graph-gallery.com/scatterplot.html">R</a>,{" "}
          <a href="https://www.python-graph-gallery.com/scatter-plot/">Python</a>,{" "}
          <a href="https://www.react-graph-gallery.com/scatter-plot">React</a> and{" "}
          <a href="https://d3-graph-gallery.com/scatter.html">D3</a> graph galleries are 4 websites
          providing hundreds of chart example, always providing the reproducible code. Click the
          button below to see how to build the chart you need with your favorite programing
          language.
        </p>

        <p>
          <ButtonLink href="https://www.r-graph-gallery.com/scatterplot.html">
            R graph gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://python-graph-gallery.com/scatter-plot/">
            Python gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://www.react-graph-gallery.com/scatter-plot">
            React gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://d3-graph-gallery.com/scatter.html">D3 gallery</ButtonLink>
        </p>
      </Section>
    </GraphLayout>
  );
}
