import { CaveatLayout } from "@/components/layouts";
import { Code, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/caveat/error_bar.html",
  title: "The issue with error bars | Dataviz pitfall gallery",
  description:
    "Error bars give a general idea of how precise a measurement is, or conversely, how far from the reported value the true (error free) value might be. If…",
  image: "/img/mistake/error_bar.png",
});

export default function Page() {
  return (
    <CaveatLayout title="The issue with error bars" images={["/img/mistake/error_bar.png"]}>
      <p>
        Error bars give a general idea of how precise a measurement is, or conversely, how far from
        the reported value the true (error free) value might be. If the value displayed on your
        barplot is the result of an aggregation (like the mean value of several data points), you
        may want to display error bars.
      </p>

      <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(viridis)
library(patchwork)

# create dummy data
data <- data.frame(
  name=letters[1:5],
  value=sample(seq(4,15),5),
  sd=c(1,0.2,3,2,4)
)

# Plot
ggplot(data) +
    geom_bar( aes(x=name, y=value), stat="identity", fill="#69b3a2", alpha=0.7, width=0.5) +
    geom_errorbar( aes(x=name, ymin=value-sd, ymax=value+sd), width=0.4, colour="black", alpha=0.9, size=1) +
    theme_ipsum() +
    theme(
      legend.position="none",
      plot.title = element_text(size=11)
    ) +
    ggtitle("A barplot with error bar") +
    xlab("")`}</Code>

      <figure>
        <img
          src="/figures/caveat/error_bar/1.webp"
          alt="The issue with error bars – chart example"
          width={960}
          loading="lazy"
        />
      </figure>

      <p>
        In the graphic above 5 groups are reported. The bar heights represent their mean value. The
        black error bar gives information on how the individual observations are dispersed around
        the average. For instance, it appears that measurements in group <code>B</code> are more
        precise than in group <code>E</code>.
      </p>

      <Section id="error-bars-hide-information" title="Error bars hide information">
        <p>
          The first issue with error bars is that they hide information. Here is a figure from a{" "}
          <a href="http://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.1002128">
            paper in PLOS Biology
          </a>
          . It illustrates that the full data may suggest different conclusions than the summary
          statistics. The same barplot with error bars (left) can represent several situations. Both
          groups can have the same kind of distribution (<code>B</code>), one group can have
          outliers (<code>C</code>), one group can have a bimodal distribution (<code>D</code>), or
          groups can have unequal sample sizes:
        </p>

        <div className="text-center">
          {" "}
          <img src="/figures/caveat/error_bar/2.webp" alt="img" width={600} loading="lazy" />{" "}
        </div>

        <div className="text-center">
          {" "}
          <em>
            <a href="http://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.1002128">
              Weissgerber et al. 2015
            </a>
          </em>{" "}
        </div>

        <p>
          Thus, the same barplot with error bars can in fact tell very different stories, hidden to
          the reader.
        </p>
        <blockquote>
          <p>
            Always show your individual data points if you can{" "}
            <a href="https://twitter.com/search?q=%23showyourdata&src=typd">#showyourdata</a>
          </p>
        </blockquote>
      </Section>

      <Section id="what-is-an-error-bar" title="What is an error bar?">
        <p>
          The second issue with error bars is that they are used to show{" "}
          <code>different metrics</code>, and it is not always clear which one is being shown. Three
          different types of values are commonly used for error bars, sometimes giving very
          different results. Here is an overview of their definitions and how to calculate them on a
          simple vector in R.
        </p>
        <ul>
          {" "}
          <li>
            <a href="https://en.wikipedia.org/wiki/Standard_deviation">Standard Deviation</a> (SD)
            represents the amount of dispersion of the variable. Calculated as the root square of
            the variance
          </li>{" "}
        </ul>
        <Code lang="r">{`sd <- sd(vec)
sd <- sqrt(var(vec))`}</Code>
        <ul>
          {" "}
          <li>
            <a href="https://en.wikipedia.org/wiki/Standard_error">Standard Error</a> (SE) is the
            standard deviation of the <em>mean</em> of the variable, calculated as the SD divided by
            the square root of the sample size. By construction, the SE is smaller than the SD. With
            a very large sample size, the SE tends toward 0.
          </li>{" "}
        </ul>
        <Code lang="r">{`se = sd(vec) / sqrt(length(vec))`}</Code>
        <ul>
          {" "}
          <li>
            A <a href="https://en.wikipedia.org/wiki/Confidence_interval">Confidence Interval</a>{" "}
            (CI) is defined so that there is a specified probability that a value lies within it. It
            is calculated as t * SE where t is the value of the{" "}
            <a href="https://en.wikipedia.org/wiki/Student%27s_t-distribution">
              Student’s t-distribution
            </a>{" "}
            for a specific alpha. Its value is often rounded to 1.96 (its value with a large sample
            size). If the sample size is huge or the distribution not normal, it is better to
            calculate the CI using the bootstrap method, however.
          </li>{" "}
        </ul>
        <Code lang="r">{`alpha=0.05
t=qt((1-alpha)/2 + .5, length(vec)-1)   # tend to 1.96 if sample size is big enough
CI=t*se`}</Code>

        <p>
          Here is an application of these 3 metrics to the famous{" "}
          <a href="https://stat.ethz.ch/R-manual/R-devel/library/datasets/html/iris.html">
            Iris dataset
          </a>
          . It shows the average sepal length of three species of Iris. The variation around the
          average length is represented using error bars.
        </p>

        <Code lang="r">{`# Data
data <- iris %>% select(Species, Sepal.Length)

# Calculates mean, sd, se and ci
my_sum <- data %>%
  group_by(Species) %>%
  summarise(
    n=n(),
    mean=mean(Sepal.Length),
    sd=sd(Sepal.Length)
  ) %>%
  mutate( se=sd/sqrt(n))  %>%
  mutate( ic=se * qt((1-0.05)/2 + .5, n-1))

# Standard deviation
p1 <- ggplot(my_sum) +
  geom_bar( aes(x=Species, y=mean), stat="identity", fill="#69b3a2", alpha=0.7, width=0.6) +
  geom_errorbar( aes(x=Species, ymin=mean-sd, ymax=mean+sd), width=0.4, colour="black", alpha=0.9, size=1) +
  ggtitle("standard deviation") +
  theme(
    plot.title = element_text(size=6)
  ) +
  theme_ipsum() +
  xlab("") +
  ylab("Sepal Length")

# Standard Error
p2 <- ggplot(my_sum) +
  geom_bar( aes(x=Species, y=mean), stat="identity", fill="#69b3a2", alpha=0.7, width=0.6) +
  geom_errorbar( aes(x=Species, ymin=mean-se, ymax=mean+se),width=0.4, colour="black", alpha=0.9, size=1) +
  ggtitle("standard error") +
  theme(
    plot.title = element_text(size=6)
  ) +
  theme_ipsum() +
  xlab("") +
  ylab("Sepal Length")

# Confidence Interval
p3 <- ggplot(my_sum) +
  geom_bar( aes(x=Species, y=mean), stat="identity", fill="#69b3a2", alpha=0.7, width=0.6) +
  geom_errorbar( aes(x=Species, ymin=mean-ic, ymax=mean+ic), width=0.4, colour="black", alpha=0.9, size=1) +
  ggtitle("confidence interval") +
  theme(
    plot.title = element_text(size=6)
  ) +
  theme_ipsum() +
  xlab("") +
  ylab("Sepal Length")

p1 + p2 + p3`}</Code>

        <figure>
          <img
            src="/figures/caveat/error_bar/3.webp"
            alt="The issue with error bars – chart example"
            width={960}
            loading="lazy"
          />
        </figure>

        <p>
          It is quite obvious that the 3 metrics report very different visualizations and
          conclusions.
        </p>
        <blockquote>
          <p>Always specify which metrics you used for the error bars</p>
        </blockquote>
      </Section>

      <Section id="workaround" title="Workaround">
        <p>
          It is better to avoid error bars as much as you can. Of course it is not possible if you
          only have summary statistics. But if you know the individual data points, show them.
          Several workarounds are possible. The{" "}
          <a href="/caveat/boxplot.html">boxplot with jitter</a> is a good one for a relatively
          small amount of data. The <a href="/graph/violin.html">violin plot</a> is another
          possibility if you have a large sample size to display.
        </p>

        <Code lang="r">{`data %>%
  ggplot( aes(x=Species, y=Sepal.Length)) +
    geom_boxplot( fill="#69b3a2", notch=TRUE) +
    geom_jitter( size=0.9, color="orange", width=0.1) +
    ggtitle("confidence interval") +
    theme(
      plot.title = element_text(size=6)
    ) +
    theme_ipsum() +
    xlab("") +
    ylab("Sepal Length")`}</Code>

        <figure>
          <img
            src="/figures/caveat/error_bar/4.webp"
            alt="The issue with error bars – chart example"
            width={960}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="going-further" title="Going further">
        <ul>
          {" "}
          <li>
            Weissgerber et al. 2015,{" "}
            <em>Beyond Bar and Line Graphs: Time for a New Data Presentation Paradigm</em>.{" "}
            <a href="http://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.1002128">
              link
            </a>
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
