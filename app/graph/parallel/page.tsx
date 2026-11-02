import { GraphLayout } from "@/components/layouts";
import { ButtonLink, Code, RelatedCard, RelatedGrid, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/graph/parallel.html",
  title: "Parallel coordinates plot – from Data to Viz",
  description:
    "Parallel plot or parallel coordinates plot allows to compare the feature of several individual observations (series) on a set of numeric variables. Each…",
  image: "/img/section/Parallel1Small.png",
});

export default function Page() {
  return (
    <GraphLayout title="Parallel coordinates plot" images={["/img/section/Parallel1Small.png"]}>
      <Section id="definition" title="Definition">
        <p>
          <code>Parallel plot</code> or parallel coordinates plot allows to compare the feature of
          several individual observations (<code>series</code>) on a set of numeric variables. Each
          vertical bar represents a variable and often has its own scale. (The units can even be
          different). Values are then plotted as series of lines connected across each axis.
        </p>

        <p>
          The <code>ìris</code> dataset provides four features (each represented with a vertical
          line) for 150 flower samples (each represented with a color line). Samples are grouped in
          three species. The chart below highlights efficiently that setosa has smaller Petals, but
          its sepal tends to be wider.
        </p>

        <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(patchwork)
library(GGally)
library(viridis)

# Data set is provided by R natively
data <- iris

# Plot
data %>%
  ggparcoord(
    columns = 1:4, groupColumn = 5, order = "anyClass",
    showPoints = TRUE,
    title = "Parallel Coordinate Plot for the Iris Data",
    alphaLines = 0.3
    ) +
  scale_color_viridis(discrete=TRUE) +
  theme_ipsum()+
  theme(
    plot.title = element_text(size=10)
  )`}</Code>

        <figure>
          <img
            src="/figures/graph/parallel/1.webp"
            alt="Parallel coordinates plot – chart example"
            width={960}
            height={480}
            loading="lazy"
          />
        </figure>

        <p>
          <em>Note</em>: Parallel plot is the equivalent of a{" "}
          <a href="/caveat/spider.html">spider chart</a>, but with cartesian coordinates. Thus, it
          is often prefered.
        </p>
      </Section>

      <Section id="what-for" title="What for">
        <p>
          A parallel plot allows to study the features of samples for{" "}
          <code>several quantitative</code> variables. Its strength is that the variables can even
          be completely different: different <code>ranges</code> and even different{" "}
          <code>units</code>.
        </p>

        <p>
          In the graphic above flower features were grouped in species, and all variables were
          normalized and sharing the same unit (cm). Here is another example where diamonds are
          compared for 4 variables that share different units, like the price in $ or depth in %.
          Note the use of scaling to be able to compare them.
        </p>

        <Code lang="r">{`diamonds %>%
  sample_n(10) %>%
    ggparcoord(
      columns = c(1,5:7),
      groupColumn = 2,
      #order = "anyClass",
      showPoints = TRUE,
      title = "Diamonds features",
      alphaLines = 0.3
      ) +
    scale_color_viridis(discrete=TRUE) +
    theme_ipsum()+
    theme(
      plot.title = element_text(size=10)
    )`}</Code>

        <figure>
          <img
            src="/figures/graph/parallel/2.webp"
            alt="Parallel coordinates plot – chart example"
            width={864}
            height={576}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="variation" title="Variation">
        <p>Here is an overview of the parallel coordinates features you can play with:</p>
        <ul>
          {" "}
          <li>
            <em>Scaling</em> - scaling transforms the raw data to a new scale that is common with
            other variables. It is a crucial step to compare variables that do not have the same
            unit, but can also help otherwise as shown in the example below:
          </li>{" "}
        </ul>
        <Code lang="r">{`# Plot
p1 <- data %>%
  ggparcoord(
    columns = 1:4, groupColumn = 5, order = "anyClass",
    scale="globalminmax",
    showPoints = TRUE,
    title = "No scaling",
    alphaLines = 0.3
    ) +
  scale_color_viridis(discrete=TRUE) +
  theme_ipsum()+
  theme(
    legend.position="none",
    plot.title = element_text(size=10)
  ) +
  xlab("")

p2 <- data %>%
  ggparcoord(
    columns = 1:4, groupColumn = 5, order = "anyClass",
    scale="uniminmax",
    showPoints = TRUE,
    title = "Standardize to Min = 0 and Max = 1",
    alphaLines = 0.3
    ) +
  scale_color_viridis(discrete=TRUE) +
  theme_ipsum()+
  theme(
    legend.position="none",
    plot.title = element_text(size=10)
  ) +
  xlab("")


p3 <- data %>%
  ggparcoord(
    columns = 1:4, groupColumn = 5, order = "anyClass",
    scale="std",
    showPoints = TRUE,
    title = "Normalize univariately (substract mean & divide by sd)",
    alphaLines = 0.3
    ) +
  scale_color_viridis(discrete=TRUE) +
  theme_ipsum()+
  theme(
    legend.position="none",
    plot.title = element_text(size=10)
  ) +
  xlab("")


p4 <- data %>%
  ggparcoord(
    columns = 1:4, groupColumn = 5, order = "anyClass",
    scale="center",
    showPoints = TRUE,
    title = "Standardize and center variables",
    alphaLines = 0.3
    ) +
  scale_color_viridis(discrete=TRUE) +
  theme_ipsum()+
  theme(
    legend.position="none",
    plot.title = element_text(size=10)
  ) +
  xlab("")


p1 + p2 + p3 + p4 + plot_layout(ncol = 2)`}</Code>

        <figure>
          <img
            src="/figures/graph/parallel/3.webp"
            alt="Parallel coordinates plot – chart example"
            width={960}
            height={672}
            loading="lazy"
          />
        </figure>
        <ul>
          {" "}
          <li>
            <em>Axis order</em> - optimizing the order of vertical axis can decrease the{" "}
            <code>clutter</code> of your parallel plot. Basically, the goal is to minimize the
            number of cross between series. On the next figure, the left plot is much harder to
            understand the the right one. Only variable order is different.
          </li>{" "}
        </ul>
        <Code lang="r">{`# Plot
p1 <- data %>%
  ggparcoord(
    columns = 1:4, groupColumn = 5, order = c(1:4),
    showPoints = TRUE,
    title = "Original",
    alphaLines = 0.3
    ) +
  scale_color_viridis(discrete=TRUE) +
  theme_ipsum()+
  theme(
    legend.position="Default",
    plot.title = element_text(size=10)
  ) +
  xlab("")

p2 <- data %>%
  ggparcoord(
    columns = 1:4, groupColumn = 5, order = "anyClass",
    showPoints = TRUE,
    title = "Re-ordered",
    alphaLines = 0.3
    ) +
  scale_color_viridis(discrete=TRUE) +
  theme_ipsum()+
  theme(
    legend.position="none",
    plot.title = element_text(size=10)
  ) +
  xlab("")

p1 + p2`}</Code>

        <figure>
          <img
            src="/figures/graph/parallel/4.webp"
            alt="Parallel coordinates plot – chart example"
            width={864}
            height={384}
            loading="lazy"
          />
        </figure>
        <ul>
          {" "}
          <li>
            <em>Highlighting</em> - a parallel plot being a <a href="/graph/line.html">line plot</a>
            , the main caveat is the <a href="/caveat/spaghetti.html">spaghetti chart</a> where too
            many lines overlap, making the chart unreadable. Several workaround exist as described
            in <a href="/caveat/spaghetti.html">this page</a>. A solution is to highlight a specific
            sample or a specific group of interest:
          </li>{" "}
        </ul>
        <Code lang="r">{`# Plot
data %>%
  ggparcoord(
    columns = 1:4, groupColumn = 5, order = "anyClass",
    showPoints = TRUE,
    title = "Original",
    alphaLines = 0.3
    ) +
  scale_color_manual(values=c( "#69b3a2", "grey", "grey") ) +
  theme_ipsum()+
  theme(
    legend.position="Default",
    plot.title = element_text(size=10)
  ) +
  xlab("")`}</Code>

        <figure>
          <img
            src="/figures/graph/parallel/5.webp"
            alt="Parallel coordinates plot – chart example"
            width={672}
            height={384}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="mistake" title="Common mistakes">
        <ul>
          {" "}
          <li>
            Like for <a href="/graph/line.html">line plot</a>, displaying too many samples result in
            a cluttered and unreadable <a href="/caveat/spaghetti.html">spaghetti chart</a>.
          </li>{" "}
          <li>
            Sort the variables on the X axis, it makes sense to avoid crosses in sample lines.
          </li>{" "}
          <li>Try different scalings to find the one fitting your data best.</li>{" "}
        </ul>
      </Section>

      <Section id="related" title="Related">
        <RelatedGrid>
          <RelatedCard href="/graph/barplot.html" image="/img/section/BarSmall.png" title="Barplot">
            Represents the value of entities using bar of various length.
          </RelatedCard>
          <RelatedCard
            href="/caveat/spider.html"
            image="/img/section/SpiderSmall.png"
            title="Spider / Radar"
          >
            One or more series of values over multiple common quantitative variables. Axis are joint
            on the middle of the figure.
          </RelatedCard>
          <RelatedCard
            href="/graph/wordcloud.html"
            image="/img/section/WordCloudSmall.png"
            title="Wordcloud"
          >
            A visual representation of text data, where word size is relative to their frequency.
          </RelatedCard>
          <RelatedCard
            href="/caveat/boxplot.html"
            image="/img/section/Box1Small.png"
            title="Boxplot"
          >
            Summarize the distribution of several numeric variables using boxes. Use it if you have
            a limited dataset size.
          </RelatedCard>
        </RelatedGrid>
      </Section>

      <Section id="code" title="Build your own">
        <p>
          The <a href="https://www.r-graph-gallery.com/parallel-plot.html">R</a>,{" "}
          <a href="https://www.python-graph-gallery.com/parallel-plot/">Python</a>,{" "}
          <a href="https://www.react-graph-gallery.com/parallel-plot">React</a> and{" "}
          <a href="https://d3-graph-gallery.com/parallel.html">D3</a> graph galleries are 4 websites
          providing hundreds of chart example, always providing the reproducible code. Click the
          button below to see how to build the chart you need with your favorite programing
          language.
        </p>

        <p>
          <ButtonLink href="https://www.r-graph-gallery.com/parallel-plot.html">
            R graph gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://python-graph-gallery.com/parallel-plot/">
            Python gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://www.react-graph-gallery.com/parallel-plot">
            React gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://d3-graph-gallery.com/parallel.html">D3 gallery</ButtonLink>
        </p>
      </Section>
    </GraphLayout>
  );
}
