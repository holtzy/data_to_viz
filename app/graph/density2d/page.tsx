import { GraphLayout } from "@/components/layouts";
import {
  ButtonLink,
  Code,
  Output,
  RelatedCard,
  RelatedGrid,
  Section,
  Widget,
} from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/graph/density2d.html",
  title: "2D density plot – from Data to Viz",
  description:
    "This page is dedicated to a group of graphics allowing to study the combined distribution of two quantitative variables. These graphics are basically…",
  image: "/img/section/2dDensitySmall.png",
});

export default function Page() {
  return (
    <GraphLayout title="2D density plot" images={["/img/section/2dDensitySmall.png"]}>
      <h2>Definition</h2>

      <hr />

      <p>
        This page is dedicated to a group of graphics allowing to study the{" "}
        <code>combined distribution</code> of two quantitative variables. These graphics are
        basically extensions of the well known <a href="/graph/density.html">density plot</a> and{" "}
        <a href="/graph/histogram.html">histogram</a>. <br />
        <br /> The global concept is the same for each variation. One variable is represented on the
        X axis, the other on the Y axis, like for a <a href="/graph/scatter">scatterplot</a> (
        <code>1</code>). Then, the number of observations within a particular area of the 2D space
        is counted and represented by a <code>color gradient</code>. The shape can vary:
      </p>
      <ul>
        {" "}
        <li>
          Hexagones are often used, leading to a hexbin chart (<code>2</code>)
        </li>{" "}
        <li>
          Squares make 2d histograms (<code>3</code>)
        </li>{" "}
        <li>
          It is also possible to compute kernel density estimate to get 2d density plots (
          <code>5</code>) or contour plots (<code>6</code>)
        </li>{" "}
      </ul>
      <p>Here is an overview of these different possibilities</p>

      <Code lang="python">{`# Libraries
import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import gaussian_kde as kde

# Create data: 200 points
data = np.random.multivariate_normal([0, 0], [[1, 0.5], [0.5, 3]], 200)
x, y = data.T

# Create a figure with 6 plot areas
fig, axes = plt.subplots(ncols=6, nrows=1, figsize=(21, 5))

# Everything starts with a Scatterplot
axes[0].set_title('Scatterplot')
axes[0].plot(x, y, 'ko')

# Thus we can cut the plotting window in several hexbins
nbins = 20
axes[1].set_title('Hexbin')
axes[1].hexbin(x, y, gridsize=nbins, cmap=plt.cm.BuGn_r)

# 2D Histogram
axes[2].set_title('2D Histogram')
axes[2].hist2d(x, y, bins=nbins, cmap=plt.cm.BuGn_r)

# Evaluate a gaussian kde on a regular grid of nbins x nbins over data extents
k = kde(data.T)
xi, yi = np.mgrid[x.min():x.max():nbins*1j, y.min():y.max():nbins*1j]
zi = k(np.vstack([xi.flatten(), yi.flatten()]))

# plot a density
axes[3].set_title('Calculate Gaussian KDE')
axes[3].pcolormesh(xi, yi, zi.reshape(xi.shape), cmap=plt.cm.BuGn_r)

# add shading
axes[4].set_title('2D Density with shading')
axes[4].pcolormesh(xi, yi, zi.reshape(xi.shape), shading='gouraud', cmap=plt.cm.BuGn_r)

# contour
axes[5].set_title('Contour')
axes[5].pcolormesh(xi, yi, zi.reshape(xi.shape), shading='gouraud', cmap=plt.cm.BuGn_r)
axes[5].contour(xi, yi, zi.reshape(xi.shape) )`}</Code>

      <Output>{`## <matplotlib.contour.QuadContourSet object at 0x16502df10>`}</Output>

      <Code lang="python">{`# save
plt.savefig("IMG/density2d.png")
plt.show()`}</Code>

      <figure>
        <img
          src="/figures/graph/density2d/1.webp"
          alt="2D density plot – chart example"
          width={2016}
          loading="lazy"
        />
      </figure>

      <Section id="what-for" title="What for">
        <p>
          2d distribution are very useful to avoid{" "}
          <a href="/caveat/overplotting.html">overplotting</a> in a{" "}
          <a href="/graph/scatter">scatterplot</a>. Here is an example showing the difference
          between an overplotted scatterplot and a 2d density plot. In the second case, a very
          obvious hidden pattern appears:
        </p>

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

p1 <- data %>%
  ggplot( aes(x=x, y=y)) +
    geom_point(color="#69b3a2", size=2) +
    theme_ipsum() +
    theme(
      legend.position="none"
    )

p2 <- ggplot(data, aes(x=x, y=y) ) +
  stat_density_2d(aes(fill = ..density..), geom = "raster", contour = FALSE) +
  scale_x_continuous(expand = c(0, 0)) +
  scale_y_continuous(expand = c(0, 0)) +
  scale_fill_viridis() +
  theme(
    legend.position='none'
  )

p1 + p2`}</Code>

        <figure>
          <img
            src="/figures/graph/density2d/2.webp"
            alt="2D density plot – chart example"
            width={960}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="variation" title="Variation">
        <p>2d distribution is one of the rare cases where using 3d can be worth it.</p>

        <p>
          It is possible to transform the <a href="/graph/scatter">scatterplot</a> information in a
          grid, and count the number of data points on each position of the grid. Then, instead of
          representing this number by a graduating color, the <code>surface plot</code> use 3d to
          represent dense are higher than others.
        </p>

        <p>In this case, the position of the 3 groups become obvious:</p>

        <Code lang="r">{`library(plotly)
library(MASS)

# Compute kde2d
kd <- with(data, MASS::kde2d(x, y, n = 50))

# Plot with plotly
plot_ly(x = kd$x, y = kd$y, z = kd$z) %>% add_surface()`}</Code>

        <Widget src="/widgets/graph/density2d-1.html" height={576} width={960} />
      </Section>

      <Section id="mistake" title="Common mistakes">
        <ul>
          {" "}
          <li>
            Play with <a href="/caveat/bin_size.html">bin size / bandwidth</a>. As for 2d, density
            and histograms are really sensitive to this parameter and can lead to different
            conclusions.
          </li>{" "}
          <li>
            Useful only if sample size is huge. Use <a href="/graph/scatter">scatterplot</a> if
            there is no overplotting.
          </li>{" "}
          <li>
            Pick up a good <a href="/caveat/rainbow.html">color palette</a>.
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
          The <a href="https://r-graph-gallery.com/2d-density-chart.html">R</a>,{" "}
          <a href="https:/python-graph-gallery.com/2d-density-plot/">Python</a>,{" "}
          <a href="https://www.react-graph-gallery.com/2d-density-plot">React</a> and{" "}
          <a href="https://d3-graph-gallery.com/density2d.html">D3</a> graph galleries are 4
          websites providing hundreds of chart example, always providing the reproducible code.
          Click the button below to see how to build the chart you need with your favorite
          programing language.
        </p>

        <p>
          <ButtonLink href="https://r-graph-gallery.com/2d-density-chart.html">
            R graph gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://python-graph-gallery.com/2d-density-plot/">
            Python gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://www.react-graph-gallery.com/2d-density-plot">
            React gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://d3-graph-gallery.com/density2d.html">D3 gallery</ButtonLink>
        </p>
      </Section>
    </GraphLayout>
  );
}
