import { CaveatLayout } from "@/components/layouts";
import { Code, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/caveat/boxplot.html",
  title: "The Boxplot and its pitfalls | Dataviz pitfall gallery",
  description:
    "A boxplot provides an effective summary of one or more numeric variables, showcasing key statistical features through its distinct elements:",
  image: "/img/mistake/boxplot.png",
});

export default function Page() {
  return (
    <CaveatLayout title="The Boxplot and its pitfalls" images={["/img/mistake/boxplot.png"]}>
      <Section id="boxplot-definition" title="Boxplot definition" level={3}>
        <p>
          A boxplot provides an effective <strong>summary</strong> of one or more numeric variables,
          showcasing key statistical features through its distinct elements:
        </p>
        <ul>
          {" "}
          <li>
            <p>
              <strong>Median Line</strong>: The line that divides the box represents the{" "}
              <a href="https://en.wikipedia.org/wiki/Median">median</a> of the data. For example, if
              the median is 10, this indicates that half of the data points lie below 10 and half
              above.
            </p>
          </li>{" "}
          <li>
            <p>
              <strong>Quartiles</strong>: The ends of the box indicate the upper (Q3) and lower (Q1){" "}
              <a href="https://en.wikipedia.org/wiki/Quartile">quartiles</a>. If Q3 is 15, this
              means that 75% of the observations fall below this value.
            </p>
          </li>{" "}
          <li>
            <p>
              <strong>Interquartile Range (IQR)</strong>: The difference between Quartiles 1 and 3
              is known as the{" "}
              <a href="https://en.wikipedia.org/wiki/Interquartile_range">interquartile range</a>{" "}
              (IQR), which measures the spread of the middle 50% of the data.
            </p>
          </li>{" "}
          <li>
            <p>
              <strong>Whiskers</strong>: The lines extending from the box show the range of values
              within Q3 + 1.5 × IQR to Q1 - 1.5 × IQR, representing the highest and lowest values,
              excluding outliers.
            </p>
          </li>{" "}
          <li>
            <p>
              <strong>Outliers</strong>: Dots (or other markers) beyond the whiskers indicate
              potential outliers in the dataset.
            </p>
          </li>{" "}
        </ul>
        <p>Here’s a diagram illustrating the anatomy of a boxplot:</p>

        <div className="text-center">
          {" "}
          <img
            src="/figures/caveat/boxplot/1.webp"
            alt="anatomy of a boxplot: a diagram explaining how a boxplot is built"
            width={600}
            height={275}
            loading="lazy"
          />{" "}
        </div>

        <div className="text-center">
          {" "}
          <em>
            <a href="https://www.leansigmacorporation.com/box-plot-with-minitab/">
              Anatomy of a boxplot (image source)
            </a>
          </em>{" "}
        </div>
      </Section>

      <Section id="boxplot-why" title="Boxplot: why?" level={3}>
        <p>
          A boxplot <strong>summarizes</strong> the distribution of a numeric variable across one or
          more groups, making it a convenient tool for quickly grasping differences between those
          groups.
        </p>

        <p>
          However, this summarization can also lead to the{" "}
          <strong>loss of important information</strong>, which can be a potential pitfall.
        </p>

        <p>
          Consider the boxplot below. It may seem evident that group <code>C</code> has higher
          values than the others. Yet, we can’t discern the underlying distribution of individual
          data points within each group or the total number of observations.
        </p>

        <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(viridis)
library(plotly)

# create a dataset
data <- data.frame(
  name=c( rep("A",500), rep("B",500), rep("B",500), rep("C",20), rep('D', 100)  ),
  value=c( rnorm(500, 10, 5), rnorm(500, 13, 1), rnorm(500, 18, 1), rnorm(20, 25, 4), rnorm(100, 12, 1) )
)

# Plot
data %>%
  ggplot( aes(x=name, y=value, fill=name)) +
    geom_boxplot() +
    scale_fill_viridis(discrete = TRUE) +
    theme_ipsum() +
    theme(
      legend.position="none",
      plot.title = element_text(size=11)
    ) +
    ggtitle("A somewhat misleading boxplot") +
    xlab("")`}</Code>

        <figure>
          <img
            src="/figures/caveat/boxplot/2.webp"
            alt="The Boxplot and its pitfalls – chart example"
            width={960}
            height={480}
            loading="lazy"
          />
        </figure>

        <p>Let’s see what happens when the boxplot is improved using additional elements.</p>
      </Section>

      <Section id="boxplotjitter" title="Alternative 1️⃣: Adding jitter">
        <p>
          If the amount of data you are working with is <strong>not too large</strong>, adding{" "}
          <code>jitter</code> on top of your boxplot can make the graphic more insightful.
        </p>

        <Code lang="r">{`# Plot
data %>%
  ggplot( aes(x=name, y=value, fill=name)) +
    geom_boxplot() +
    scale_fill_viridis(discrete = TRUE) +
    geom_jitter(color="grey", size=0.7, alpha=0.5) +
    theme_ipsum() +
    theme(
      legend.position="none",
      plot.title = element_text(size=11)
    ) +
    ggtitle("A boxplot with jitter") +
    xlab("")`}</Code>

        <figure>
          <img
            src="/figures/caveat/boxplot/3.webp"
            alt="The Boxplot and its pitfalls – chart example"
            width={960}
            height={480}
            loading="lazy"
          />
        </figure>

        <p>Here, some new patterns become clear.</p>

        <p>
          Group <code>C</code> has a smaller sample size compared to the other groups. This is
          definitely something to consider before concluding that group <code>C</code> has higher
          values than the others.
        </p>

        <p>
          Additionally, it appears that group <code>B</code> exhibits a{" "}
          <strong>bimodal distribution</strong>: the data points are clustered in two distinct
          groups around <code>y = 18</code> and <code>y = 13</code>.
        </p>
      </Section>

      <Section
        id="alternative-2-switching-to-violin-plot"
        title="Alternative 2️⃣: Switching to violin plot"
      >
        <p>
          If you have a large sample size, using <code>jitter</code> may no longer be effective, as
          the dots can <strong>overlap</strong> and render the figure uninterpretable.
        </p>

        <p>
          An excellent alternative is the <a href="/graph/violin.html">violin plot</a>, which
          effectively illustrates the distribution of the data for each group. Unlike boxplots,
          violin plots provide a full understanding of the group’s distribution.
        </p>

        <Code lang="r">{`# sample size
sample_size = data %>% group_by(name) %>% summarize(num=n())

# Plot
data %>%
  left_join(sample_size) %>%
  mutate(myaxis = paste0(name, "\\n", "n=", num)) %>%
  ggplot( aes(x=myaxis, y=value, fill=name)) +
    geom_violin(width=1.4) +
    geom_boxplot(width=0.1, color="grey", alpha=0.2) +
    scale_fill_viridis(discrete = TRUE) +
    theme_ipsum() +
    theme(
      legend.position="none",
      plot.title = element_text(size=11)
    ) +
    ggtitle("A violin plot") +
    xlab("")`}</Code>

        <figure>
          <img
            src="/figures/caveat/boxplot/4.webp"
            alt="The Boxplot and its pitfalls – chart example"
            width={960}
            height={480}
            loading="lazy"
          />
        </figure>

        <p>
          Here it is very clear that the groups have different distributions. The bimodal
          distribution of group <code>B</code> becomes obvious. Violin plots are a powerful way to
          display information — they are probably under-utilized compared to box plots.
        </p>
      </Section>

      <Section id="alternative-3-raincloud-plot" title="Alternative 3️⃣: Raincloud plot">
        <p>
          In the previous chart, the sample size for each group is indicated on the x-axis, below
          the group names. This is a good practice, as it highlights the under-representation of
          group <code>C</code>.
        </p>

        <p>
          However, displaying the actual data points can often provide more insight. Therefore, a
          half-violin plot that includes the raw data can serve as an effective alternative.
        </p>

        <p>
          It is called a <strong>raincloud plot</strong>!
        </p>

        <Code lang="r">{`library(ggplot2)
library(ggdist)
library(hrbrthemes)
library(dplyr)
library(viridis)

# Plot
data %>%
  ggplot(aes(x = factor(name), y = value, fill = factor(name))) +
  
  # Add half-violin from {ggdist} package
  stat_halfeye(
    adjust = 0.5,
    justification = -0.2,
    .width = 0,
    point_colour = NA
  ) +
  
  geom_boxplot(
    width = 0.12,
    outlier.color = NA,
    alpha = 0.5
  ) +
  
  stat_dots(
    side = "left",
    justification = 1.1,
    binwidth = 0.25
  ) +
  
  scale_fill_viridis(discrete = TRUE) +
  theme_ipsum() +
  theme(
    legend.position = "none",
    plot.title = element_text(size = 11)
  ) +
  ggtitle("A raincloud plot example") +
  xlab("")`}</Code>

        <figure>
          <img
            src="/figures/caveat/boxplot/5.webp"
            alt="The Boxplot and its pitfalls – chart example"
            width={864}
            height={576}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="going-further" title="Going further">
        <ul>
          {" "}
          <li>
            Hintze et al. 1998, <em>Violin Plots: A Box Plot-Density Trace Synergism</em>.{" "}
            <a href="http://www.stat.cmu.edu/~rnugent/PCMI2016/papers/ViolinPlots.pdf">PDF</a>
          </li>{" "}
          <li>
            Making boxplots in <a href="https://www.r-graph-gallery.com/boxplot/">R</a> and{" "}
            <a href="https://python-graph-gallery.com/boxplot/">Python</a>
          </li>{" "}
          <li>
            Making violin plots in <a href="https://www.r-graph-gallery.com/violin/">R</a> and{" "}
            <a href="https://python-graph-gallery.com/violin/">Python</a>
          </li>{" "}
        </ul>
      </Section>
    </CaveatLayout>
  );
}
