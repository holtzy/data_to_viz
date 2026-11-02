import { StoryLayout } from "@/components/layouts";
import { Code, Output, Widget } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/story/TwoNum.html",
  title: "Apartment price vs ground living area. – from Data to Viz",
  description:
    "This document gives a few suggestions to analyse a dataset composed by two numeric variables. It considers the price of 1460 apartements (SalePrice) and…",
  image: "/img/section/DensitySmall.png",
});

export default function Page() {
  return (
    <StoryLayout
      title="Apartment price vs ground living area."
      images={[
        "/img/section/DensitySmall.png",
        "/img/section/Box1Small.png",
        "/img/section/ScatterPlotSmall.png",
        "/img/section/2dDensitySmall.png",
      ]}
    >
      <div className="grid gap-6 md:grid-cols-12">
        {" "}
        <div className="md:col-span-8">
          <p>
            This document gives a few suggestions to analyse a dataset composed by two numeric
            variables. It considers the price of 1460 apartements (<code>SalePrice</code>) and their
            ground living area (<code>GrLivArea</code>). <br />
            <br /> This dataset comes from a{" "}
            <a href="https://www.kaggle.com/c/house-prices-advanced-regression-techniques/data">
              kaggle
            </a>{" "}
            machine learning competition. The two variables studied here are available on{" "}
            <a href="https://github.com/holtzy/data_to_viz/tree/master/Example_dataset">
              Github repository
            </a>
            . Basically it looks like the table beside.
          </p>
        </div>{" "}
        <div className="md:col-span-4">
          <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(kableExtra)
options(knitr.table.format = "html")
library(viridis)
library(ggExtra)
library(patchwork)

# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv", header=T, sep=",") %>% select(GrLivArea, SalePrice)

# show data
data %>% head(6) %>% kable() %>%
  kable_styling(bootstrap_options = "striped", full_width = F)`}</Code>

          <div className="overflow-x-auto">
            <table>
              {" "}
              <thead>
                <tr>
                  <th className="text-right">GrLivArea</th>
                  <th className="text-right">SalePrice</th>
                </tr>
              </thead>{" "}
              <tbody>
                <tr>
                  <td className="text-right">1710</td>
                  <td className="text-right">208500</td>
                </tr>
                <tr>
                  <td className="text-right">1262</td>
                  <td className="text-right">181500</td>
                </tr>
                <tr>
                  <td className="text-right">1786</td>
                  <td className="text-right">223500</td>
                </tr>
                <tr>
                  <td className="text-right">1717</td>
                  <td className="text-right">140000</td>
                </tr>
                <tr>
                  <td className="text-right">2198</td>
                  <td className="text-right">250000</td>
                </tr>
                <tr>
                  <td className="text-right">1362</td>
                  <td className="text-right">143000</td>
                </tr>
              </tbody>{" "}
            </table>
          </div>
        </div>{" "}
      </div>
      <p>
        #Distribution *** As usual when working with numeric variables, it is always a good practice
        to check their distributions. Here Prices and Ground living areas are on two different
        scales so it makes sense to study them in two different graphics. This can be done using a
        histogram or a density plot.
      </p>
      <Code lang="r">{`p1 <- data %>%
  ggplot( aes(x=GrLivArea)) +
    geom_histogram(fill="#69b3a2", color="#e9ecef", alpha=0.9, bins=50) +
    ggtitle("Ground living area distribution") +
    theme_ipsum() +
    theme(
      plot.title = element_text(size=12)
    ) +
    xlab('area')

p2 <- data %>%
  ggplot( aes(x=SalePrice/1000)) +
    geom_histogram(fill="#69b3a2", color="#e9ecef", alpha=0.9, bins=50) +
    ggtitle("Sale price distribution") +
    theme_ipsum() +
    theme(
      plot.title = element_text(size=12)
    )+
    xlab('Sale price (k$)')

p1 + p2`}</Code>
      <figure>
        <img
          src="/figures/story/TwoNum/1.webp"
          alt="Apartment price vs ground living area. – chart example"
          loading="lazy"
        />
      </figure>
      <p>
        This allows to understand that most of the prices range between 100 and 300 k$ with extreme
        values reaching 750 k$.
      </p>
      <p>
        #Scatterplot *** The next step is to study the relationship between the 2 variables.
        Basically to explore if there is a correlation between sale price and living area. The first
        chart type to try in this case is the scatterplot.
      </p>
      <Code lang="r">{`data %>%
  ggplot( aes(x=GrLivArea, y=SalePrice/1000)) +
    geom_point(color="#69b3a2", alpha=0.8) +
    ggtitle("Ground living area partially explains sale price of apartments") +
    theme_ipsum() +
    theme(
      plot.title = element_text(size=12)
    ) +
    ylab('Sale price (k$)') +
    xlab('Ground living area')`}</Code>
      <p>
        <img
          src="/figures/story/TwoNum/2.webp"
          alt="Apartment price vs ground living area. – chart example"
          width={672}
          loading="lazy"
        />{" "}
        It is quite obvious that there is a relationship between prices and ground living area.
      </p>
      <p>
        #Improving the scatter plot {"{"}.tabset{"}"} *** The previous graphic convey most of the
        information efficiently. Still, there are a few customizations that can be done to make the
        chart even more insightful:
      </p>
      <ul>
        {" "}
        <li>
          Adding a <code>trend line</code> with confidence interval to illustrate and clarify the
          relationship
        </li>{" "}
        <li>
          Using an <code>interactive</code> version to get more information concerning each data
          point.
        </li>{" "}
        <li>
          Add <code>marginal distribution</code>
        </li>{" "}
      </ul>
      <p>
        ##Trend Help the reader seing the trend on the chart by showing it explicitely. Several
        models exist to show a trend. A{" "}
        <a href="https://en.wikipedia.org/wiki/Linear_regression">linear regression</a> is used on
        the left plot, and a{" "}
        <a href="https://en.wikipedia.org/wiki/Local_regression">local regression</a> is used on the
        right. Showing the confindence interval is a good practice as well.
      </p>
      <Code lang="r">{`p <- data %>%
  ggplot( aes(x=GrLivArea, y=SalePrice/1000)) +
    geom_point(color="#69b3a2", alpha=0.8) +
    theme_ipsum() +
    theme(
      plot.title = element_text(size=12)
    ) +
    ylab('Sale price (k$)') +
    xlab('Ground living area')

p1 <- p + ggtitle("Linear regression") +
    geom_smooth(method='lm', color="black", alpha=0.8, size=0.5, fill="skyblue", se=FALSE)`}</Code>
      <Output>{`## Warning: Using \`size\` aesthetic for lines was deprecated in ggplot2 3.4.0.
## ℹ Please use \`linewidth\` instead.
## This warning is displayed once every 8 hours.
## Call \`lifecycle::last_lifecycle_warnings()\` to see where this warning was
## generated.`}</Output>
      <Code lang="r">{`p2 <- p + ggtitle("Loess") +
    geom_smooth(method='loess', color="black", alpha=0.8, size=0.5, fill="skyblue")

p1 + p2`}</Code>
      <Output>{`## \`geom_smooth()\` using formula = 'y ~ x'
## \`geom_smooth()\` using formula = 'y ~ x'`}</Output>
      <figure>
        <img
          src="/figures/story/TwoNum/3.webp"
          alt="Apartment price vs ground living area. – chart example"
          loading="lazy"
        />
      </figure>
      <p>
        ##Interactivity Scatter plot is probably the chart type for which it makes the most sense to
        use interactivity. For instance, it allows to hover a dot to have more information about it.
        It allows to zoom on a specific part of the chart as well.
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
      <Widget src="/widgets/story/TwoNum-1.html" height={480} width={672} />
      <p>
        ##Marginal distribution If the number of data points on the scatterplot is high, it is a
        good practice to display the marginal distributions arount the graphic.
      </p>
      <Code lang="r">{`data %>%
  ggplot( aes(x=GrLivArea, y=SalePrice)) +
    geom_point() #%>%`}</Code>
      <figure>
        <img
          src="/figures/story/TwoNum/4.webp"
          alt="Apartment price vs ground living area. – chart example"
          width={672}
          loading="lazy"
        />
      </figure>
      <Code lang="r">{`    #ggMarginal(type="histogram")`}</Code>
      <p>
        #Overplotting *** The most common pitfall with scatterplot is overplotting: when the sample
        size gets big, dots are plotted on top of each other what makes the chart unreadable. There
        are several work around to avoid this issue as describe in this specific post. Here is a
        summary of the different offered techniques:
      </p>
      <Code lang="r">{`# code for all graphics:
p <- data %>%
  ggplot( aes(x=GrLivArea, y=SalePrice/1000)) +
    theme_ipsum() +
    theme(
      plot.title = element_text(size=12)
    ) +
    ylab('Sale price (k$)') +
    xlab('Ground living area')

# Reduce dot size
p1 <- p + geom_point(color="#69b3a2", alpha=0.8, size=0.2) + ggtitle("Dot size")

# Use density estimate
p2 <- p + geom_density2d(color="#69b3a2") + ggtitle("Density 2d: contour")

# Use density estimate (area)
p3 <- p + stat_density_2d(aes(fill = ..level..), geom = "polygon") + ggtitle("Density 2d: area") + theme(legend.position="none")

# With raster
p4 <- p +
  stat_density_2d(aes(fill = ..density..), geom = "raster", contour = FALSE) +
  scale_fill_distiller(palette=4, direction=1) +
  scale_x_continuous(expand = c(0, 0)) +
  scale_y_continuous(expand = c(0, 0)) +
  theme(
    legend.position='none'
  ) +
  ggtitle("Density 2d: raster") +
  xlim(0,2500) +
  ylim(0,400)

# Hexbin
p5 <- p + geom_hex() +
    scale_fill_viridis() +
    theme(legend.position="none") +
    ggtitle("Hexbin")

# 2d histogram
p6 <- p + geom_bin2d( ) +
    scale_fill_viridis( ) +
    theme(legend.position="none")  +
    ggtitle("2d histogram")

p1 + p2 + p3 + p4 + p5 + p6 + plot_layout(ncol = 2)`}</Code>
      <figure>
        <img
          src="/figures/story/TwoNum/5.webp"
          alt="Apartment price vs ground living area. – chart example"
          width={768}
          loading="lazy"
        />
      </figure>
      <h2>Going further</h2>
      <hr />
      <p>
        You can learn more about each type of graphic presented in this story in the dedicated
        sections. Click the icon below:
      </p>
      <a href="/#portfolio">
        {" "}
        <img
          src="/img/section/DensitySmall.png"
          alt="Apartment price vs ground living area. – chart example"
          loading="lazy"
        />
      </a>{" "}
      <a href="/#portfolio">
        {" "}
        <img
          src="/img/section/Box1Small.png"
          alt="Apartment price vs ground living area. – chart example"
          loading="lazy"
        />
      </a>{" "}
      <a href="/#portfolio">
        {" "}
        <img
          src="/img/section/ScatterPlotSmall.png"
          alt="Apartment price vs ground living area. – chart example"
          loading="lazy"
        />
      </a>{" "}
      <a href="/#portfolio">
        {" "}
        <img
          src="/img/section/2dDensitySmall.png"
          alt="Apartment price vs ground living area. – chart example"
          loading="lazy"
        />
      </a>
    </StoryLayout>
  );
}
