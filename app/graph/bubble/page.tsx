import { GraphLayout } from "@/components/layouts";
import { ButtonLink, Code, RelatedCard, RelatedGrid, Section, Widget } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/graph/bubble.html",
  title: "Bubble plot – from Data to Viz",
  description:
    "A bubble plot is a scatterplot where a third dimension is added: the value of an additional numeric variable is represented through the size of the dots.",
  image: "/img/section/BubblePlotSmall.png",
});

export default function Page() {
  return (
    <GraphLayout title="Bubble plot" images={["/img/section/BubblePlotSmall.png"]}>
      <Section id="definition" title="Definition">
        <p>
          A <code>bubble plot</code> is a <a href="/graph/scatter.html">scatterplot</a> where a{" "}
          <code>third dimension</code> is added: the value of an additional numeric variable is
          represented through the <code>size</code> of the dots.
        </p>

        <p>
          You need 3 numerical variables as input: one is represented by the X axis, one by the Y
          axis, and one by the dot size.
        </p>

        <p>
          Here is an example using an abstract of the{" "}
          <a href="https://www.gapminder.org/data/">Gapminder dataset</a> made famous through the{" "}
          <a href="https://www.ted.com/talks/hans_rosling_shows_the_best_stats_you_ve_ever_seen">
            Hans Rosling Ted Talk
          </a>
          . It provides the average life expectancy, gdp per capita and population size for more
          than 100 countries. This dataset is available through the gapminder{" "}
          <a href="https://github.com/jennybc/gapminder">R package</a>.
        </p>

        <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(viridis)
library(gridExtra)
library(ggrepel)
library(plotly)

# The dataset is provided in the gapminder library
library(gapminder)
data <- gapminder %>% filter(year=="2007") %>% dplyr::select(-year)

# Show a bubbleplot
data %>%
  mutate(pop=pop/1000000) %>%
  arrange(desc(pop)) %>%
  mutate(country = factor(country, country)) %>%
  ggplot( aes(x=gdpPercap, y=lifeExp, size = pop, color = continent)) +
    geom_point(alpha=0.7) +
    scale_size(range = c(1.4, 19), name="Population (M)") +
    scale_color_viridis(discrete=TRUE, guide=FALSE) +
    theme_ipsum() +
    theme(legend.position="bottom")`}</Code>

        <figure>
          <img
            src="/figures/graph/bubble/1.webp"
            alt="Bubble plot – chart example"
            width={768}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="what-for" title="What for">
        <p>
          In this chart, the relationship between gdp per capita and life Expectancy is quite
          obvious: rich countries tend to live longuer, with a threshold effect when gdp per capita
          reaches ~10,000. This relationship could have been detected using a classic{" "}
          <a href="/graph/scatter.html">scatterplot</a>, but the bubble size allows to nuance this
          result with a third level of information: the country population.
        </p>

        <p>
          This last variable is much more difficult to interpret than the one on the X and Y axis.
          Indeed, area is <a href="/caveat/area_hard.html">hardly interpreted by the human eye</a>.
          But the information is here, and if a clear relationship between population and gdp per
          capita or life expectancy existed, we would spot it.
        </p>
      </Section>

      <Section id="variation" title="Variation">
        <p>
          The previous graphic is quite interesting since it allows to understand the relationship
          between gdp per capita and life expectancy. However it can be frustrating not to know what
          are the countries in the extreme part of the graphic, or what are the one out of the
          general trend. As usual <code>annotating</code> the graphic is a crucial step to make it
          insightful:
        </p>

        <Code lang="r">{`# Prepare data
tmp <- data %>%
 mutate(
   annotation = case_when(
    gdpPercap > 5000 & lifeExp < 60 ~ "yes",
    lifeExp < 30 ~ "yes",
     gdpPercap > 40000 ~ "yes"
    )
) %>%
mutate(pop=pop/1000000) %>%
  arrange(desc(pop)) %>%
  mutate(country = factor(country, country))

# Plot
ggplot( tmp, aes(x=gdpPercap, y=lifeExp, size = pop, color = continent)) +
    geom_point(alpha=0.7) +
    scale_size(range = c(1.4, 19), name="Population (M)") +
    scale_color_viridis(discrete=TRUE) +
    theme_ipsum() +
    theme(legend.position="none") +
    geom_text_repel(data=tmp %>% filter(annotation=="yes"), aes(label=country), size=4 )`}</Code>

        <figure>
          <img
            src="/figures/graph/bubble/2.webp"
            alt="Bubble plot – chart example"
            width={768}
            loading="lazy"
          />
        </figure>

        <p>
          Following the same idea, bubble plot is probably the type of chart where using{" "}
          <code>interactivity</code> makes the more sense. In the following plot you can hover
          bubbles to get conutry name and zoom on a specific part of the graphic.
        </p>

        <Code lang="r">{`# Interactive version
p <- data %>%
  mutate(gdpPercap=round(gdpPercap,0)) %>%
  mutate(pop=round(pop/1000000,2)) %>%
  mutate(lifeExp=round(lifeExp,1)) %>%
  arrange(desc(pop)) %>%
  mutate(country = factor(country, country)) %>%
  mutate(text = paste("Country: ", country, "\\nPopulation (M): ", pop, "\\nLife Expectancy: ", lifeExp, "\\nGdp per capita: ", gdpPercap, sep="")) %>%
  ggplot( aes(x=gdpPercap, y=lifeExp, size = pop, color = continent, text=text)) +
    geom_point(alpha=0.7) +
    scale_size(range = c(1.4, 19), name="Population (M)") +
    scale_color_viridis(discrete=TRUE, guide=FALSE) +
    theme_ipsum() +
    theme(legend.position="none")

ggplotly(p, tooltip="text")`}</Code>

        <Widget src="/widgets/graph/bubble-1.html" height={672} width={768} />
      </Section>

      <Section id="mistake" title="Common mistakes">
        <ul>
          {" "}
          <li>
            The problem with bubble plot is that the relationship between the variable of the X and
            Y axis is much more obvious than the relationship with the third variable. Thus you must{" "}
            <code>prioritize</code> your variables and be sure of what you want to show. Before
            doing that kind of chart, I believe it is a good practice to try other combinations:
          </li>{" "}
        </ul>
        <Code lang="r">{`p2 <- data %>%
  mutate(pop=pop/1000000) %>%
  arrange(desc(pop)) %>%
  mutate(country = factor(country, country)) %>%
  ggplot( aes(x=gdpPercap, y=pop, size = lifeExp, color = continent)) +
    geom_point(alpha=0.7) +
    scale_color_viridis(discrete=TRUE) +
    scale_y_log10() +
    theme_ipsum() +
    theme(legend.position="none") 

p3 <- data %>%
  mutate(pop=pop/1000000) %>%
  arrange(desc(pop)) %>%
  mutate(country = factor(country, country)) %>%
  ggplot( aes(x=lifeExp, y=pop, size = gdpPercap, color = continent)) +
    geom_point(alpha=0.7) +
    scale_color_viridis(discrete=TRUE) +
    scale_y_log10() +
    theme_ipsum() +
    theme(legend.position="none") 

grid.arrange(p2,p3, ncol=2)`}</Code>

        <figure>
          <img
            src="/figures/graph/bubble/3.webp"
            alt="Bubble plot – chart example"
            width={768}
            loading="lazy"
          />
        </figure>
        <ul>
          {" "}
          <li>
            Use bubble <code>area</code> as metrics,{" "}
            <a href="/caveat/radius_or_area.html">not diameter</a>.
          </li>{" "}
          <li>
            As for scatter, bubble plot suffers <a href="/caveat/overplotting.html">overplotting</a>{" "}
            if sample size is too big.
          </li>{" "}
          <li>Show a legend for bubble size.</li>{" "}
        </ul>
      </Section>

      <Section id="related" title="Related">
        <RelatedGrid>
          <RelatedCard
            href="/graph/scatter.html"
            image="/img/section/ScatterPlotSmall.png"
            title="Scatter plot"
          >
            Display the relationship between 2 numeric variables
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
          The <a href="https://r-graph-gallery.com/bubble-chart.html">R</a>,{" "}
          <a href="https://python-graph-gallery.com/bubble-plot/">Python</a>,{" "}
          <a href="https://www.react-graph-gallery.com/bubble-plot">React</a> and{" "}
          <a href="https://d3-graph-gallery.com/bubble.html">D3</a> graph galleries are 4 websites
          providing hundreds of chart example, always providing the reproducible code. Click the
          button below to see how to build the chart you need with your favorite programing
          language.
        </p>

        <p>
          <ButtonLink href="https://r-graph-gallery.com/bubble-chart.html/">
            R graph gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://python-graph-gallery.com//bubble-plot/">
            Python gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://www.react-graph-gallery.com/bubble-plot">
            React gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://d3-graph-gallery.com/bubble.html">D3 gallery</ButtonLink>
        </p>
      </Section>
    </GraphLayout>
  );
}
