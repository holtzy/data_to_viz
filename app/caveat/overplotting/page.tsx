import { CaveatLayout } from "@/components/layouts";
import { Code, Section, Widget } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/caveat/overplotting.html",
  title: "How to avoid overplotting | Dataviz pitfall gallery",
  description:
    "Overplotting is a common issue in dataviz. When your dataset is large, the dots of your scatterplot will tend to overlap, making the graphic unreadable.…",
  image: "/img/mistake/overplotting.png",
});

export default function Page() {
  return (
    <CaveatLayout title="How to avoid overplotting" images={["/img/mistake/overplotting.png"]}>
      <div className="grid gap-6 md:grid-cols-12">
        {" "}
        <div className="md:col-span-6">
          <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(viridis)
library(patchwork)

# Dataset:
a <- data.frame( x=rnorm(20000, 10, 1.2), y=rnorm(20000, 10, 1.2), group=rep("A",20000))
b <- data.frame( x=rnorm(20000, 14.5, 1.2), y=rnorm(20000, 14.5, 1.2), group=rep("B",20000))
c <- data.frame( x=rnorm(20000, 9.5, 1.5), y=rnorm(20000, 15.5, 1.5), group=rep("C",20000))
data <- do.call(rbind, list(a,b,c))

data %>%
  ggplot( aes(x=x, y=y)) +
    geom_point(color="#69b3a2", size=2) +
    theme_ipsum() +
    theme(
      legend.position="none"
    )`}</Code>

          <figure>
            <img
              src="/figures/caveat/overplotting/1.webp"
              alt="How to avoid overplotting – chart example"
              width={576}
              loading="lazy"
            />
          </figure>
        </div>{" "}
        <div className="md:col-span-6">
          <p>
            Overplotting is a common issue in dataviz. When your dataset is large, the dots of your{" "}
            <a href="/graph/scatter.html">scatterplot</a> will tend to overlap, making the graphic
            unreadable. <br />
            <br /> This issue is illustrated in the scatterplot below. A first look might lead to
            the conclusion that there is no obvious relationship between X and Y. We will see below
            how wrong this conclusion would be. <br />
            <br /> In this post, I suggest 10 workarounds to avoid overplotting.
          </p>
        </div>{" "}
      </div>

      <Section id="decreasing-dot-size" title="Decreasing dot size">
        <p>
          The easiest workaround is probably to <code>reduce dot size</code>. Depending on the
          quantity of overlap you have, it can give a really satisfying result. Here it appears
          clearly that 3 clusters are present, which was hidden in the previous figure.
        </p>

        <Code lang="r">{`# Plot with small dot size
data %>%
  ggplot( aes(x=x, y=y)) +
    geom_point(color="#69b3a2", size=0.02) +
    theme_ipsum() +
    theme(
      legend.position="none"
    )`}</Code>

        <figure>
          <img
            src="/figures/caveat/overplotting/2.webp"
            alt="How to avoid overplotting – chart example"
            width={576}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="transparency" title="Transparency">
        <p>
          In combination with decreasing dot size, using transparency also allows you to reveal
          patterns encountering overplotting issues:
        </p>

        <Code lang="r">{`# Plot with small dot size
data %>%
  ggplot( aes(x=x, y=y)) +
    geom_point(color="#69b3a2", size=2, alpha=0.01) +
    theme_ipsum() +
    theme(
      legend.position="none"
    )`}</Code>

        <figure>
          <img
            src="/figures/caveat/overplotting/3.webp"
            alt="How to avoid overplotting – chart example"
            width={576}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="d-density" title="2D density">
        <p>
          The 2D density chart basically counts the number of observations within a particular area
          of the 2D space and represents this count by a color. If you divide the space into several
          squares, you get a 2D histogram. If you use hexagons instead of squares, you get a hexbin
          plot. You can also calculate a density estimate and represent 2D density plots or Contour
          plots. You can read more about this on the{" "}
          <a href="/graph/density2d.html">dedicated page</a> of data-to-viz.com.
        </p>

        <Code lang="r">{`ggplot(data, aes(x=x, y=y) ) +
  stat_density_2d(aes(fill = ..density..), geom = "raster", contour = FALSE) +
  scale_x_continuous(expand = c(0, 0)) +
  scale_y_continuous(expand = c(0, 0)) +
  scale_fill_viridis() +
  theme(
    legend.position='none'
  )`}</Code>

        <figure>
          <img
            src="/figures/caveat/overplotting/4.webp"
            alt="How to avoid overplotting – chart example"
            width={576}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="sampling" title="Sampling">
        <p>
          Sometimes less is more. Plotting only a fraction of your data (5% here) can greatly reduce
          the computing time and can help to avoid overplotting:
        </p>

        <Code lang="r">{`# Plot with small dot size
data %>%
  sample_frac(0.05) %>%
  ggplot( aes(x=x, y=y)) +
    geom_point(color="#69b3a2", size=2) +
    theme_ipsum() +
    theme(
      legend.position="none"
    )`}</Code>

        <figure>
          <img
            src="/figures/caveat/overplotting/5.webp"
            alt="How to avoid overplotting – chart example"
            width={576}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="highlighting-a-group" title="Highlighting a group">
        <p>
          Another way to reduce the complexity of a graphic is to highlight a specific group. (This
          suggests that you have a grouping variable in your dataset).
        </p>

        <Code lang="r">{`# Plot with small dot size
data %>%
  ggplot( aes(x=x, y=y)) +
    geom_point(color="grey", size=2) +
    geom_point(data = data %>% filter(group=="B"), color="#69b3a2", size=2) +
    theme_ipsum() +
    theme(
      legend.position="none",
      plot.title = element_text(size=12)
    ) +
    ggtitle('Behavior of the group B')`}</Code>

        <figure>
          <img
            src="/figures/caveat/overplotting/6.webp"
            alt="How to avoid overplotting – chart example"
            width={576}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="grouping" title="Grouping">
        <p>
          If you have a grouping variable, it is highly recommended to make it appear on the
          graphic. In the case of overplotting, it can also help to reveal patterns.
        </p>

        <Code lang="r">{`# Plot with small dot size
data %>%
  ggplot( aes(x=x, y=y, color=group)) +
    geom_point( size=2, alpha=0.1) +
    scale_color_viridis(discrete=TRUE) +
    theme_ipsum()`}</Code>

        <figure>
          <img
            src="/figures/caveat/overplotting/7.webp"
            alt="How to avoid overplotting – chart example"
            width={576}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="faceting" title="Faceting">
        <p>
          As soon as you have several groups in your plot, an alternative is to use faceting: the
          same plot is repeated, each time highlighting another group:
        </p>

        <Code lang="r">{`# Plot with small dot size
data %>%
  ggplot( aes(x=x, y=y)) +
    geom_point( data=data %>% select(-group), size=1, alpha=0.05, color="grey") +
    geom_point( aes( color=group) , size=2, alpha=0.1) +
    scale_color_viridis(discrete=TRUE) +
    theme_ipsum() +
    theme(
      legend.position="none",
    ) +
    facet_wrap(~group)`}</Code>

        <figure>
          <img
            src="/figures/caveat/overplotting/8.webp"
            alt="How to avoid overplotting – chart example"
            width={960}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="jittering" title="Jittering">
        <p>
          <code>Jittering</code> is an option when one of the axis is qualitative (like 1, 2, 3..,
          see left figure). It adds or subtracts a random value to each data point to avoid
          overplotting. Note that other chart types are available in that kind of situation, like{" "}
          <a href="/caveat/boxplot.html">boxplot</a> or <a href="/graph/violin.html">violin plot</a>
          .
        </p>

        <Code lang="r">{`# Create data
don <- data.frame(
  x = rep(seq(1,5), each=1000),
  y = c( rnorm(1000, 4, 2), rnorm(1000, 4, 4), rnorm(500, 2, 1), rnorm(500, 10, 2), rnorm(1000, 8, 4), rnorm(1000, 10, 4))
)

# basic plot
p1 <- don %>%
  ggplot( aes(x=x, y=y)) +
    geom_point( aes( color=x) , size=2, alpha=0.2) +
    scale_color_viridis() +
    theme_ipsum() +
    theme(
      legend.position="none",
    )

# Plot with jitter
p2 <- don %>%
  ggplot( aes(x=x, y=y)) +
    geom_jitter( aes( color=x) , size=2, alpha=0.2, width=0.3) +
    scale_color_viridis() +
    theme_ipsum() +
    theme(
      legend.position="none",
    )

p1 + p2`}</Code>

        <figure>
          <img
            src="/figures/caveat/overplotting/9.webp"
            alt="How to avoid overplotting – chart example"
            width={960}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="d" title="3D">
        <p>
          As for 2d density plots, it is possible to transform the scatter plot information in a
          grid, and count the number of data points on each position of the grid. Then, instead of
          representing this number by a graduating color, the surface plot uses 3d to represent
          density. In this case, the position of the 3 groups become obvious:
        </p>

        <Code lang="r">{`library(plotly)
library(MASS)

# Compute kde2d
kd <- with(data, MASS::kde2d(x, y, n = 50))

# Plot with plotly
plot_ly(x = kd$x, y = kd$y, z = kd$z) %>% add_surface()`}</Code>

        <Widget src="/widgets/caveat/overplotting-1.html" height={576} width={960} />
      </Section>

      <Section id="marginal-distribution" title="Marginal distribution">
        <p>
          Adding marginal distributions allow you to detect the distribution hidden in the
          overplotted parts of the graphic. You can add a boxplot, a histogram or a density plot in
          the margins.
        </p>

        <Code lang="r">{`library(ggExtra)

# create a ggplot2 scatterplot
p <- data %>%
  ggplot( aes(x=x, y=y)) +
    geom_point(color="#69b3a2", size=2, alpha=0.01) +
    theme_ipsum() +
    theme(
      legend.position="none"
    )

# add marginal histograms
ggExtra::ggMarginal(p, type = "histogram")`}</Code>

        <figure>
          <img
            src="/figures/caveat/overplotting/10.webp"
            alt="How to avoid overplotting – chart example"
            width={960}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="going-further" title="Going further">
        <ul>
          {" "}
          <li>
            <em>Too Big Data: Coping with Overplotting</em> by{" "}
            <a href="https://www.infragistics.com/community/blogs/b/tim_brock/posts/too-big-data-coping-with-overplotting">
              Tim Brock
            </a>
          </li>{" "}
          <li>
            Scatterplots in <a href="https://www.r-graph-gallery.com/scatterplot/">R</a> and{" "}
            <a href="https://python-graph-gallery.com/scatter-plot/">Python</a>.
          </li>{" "}
        </ul>
      </Section>
    </CaveatLayout>
  );
}
