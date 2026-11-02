import { StoryLayout } from "@/components/layouts";
import { Code, Section, Widget } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/story/ThreeNum.html",
  title: "Life expectancy, gdp per capita and population size – from Data to Viz",
  description:
    "This document gives a few suggestions to analyse a dataset composed by three numeric variables. It considers an abstract of the Gapminder dataset made…",
  image: "/img/section/Density150.png",
});

export default function Page() {
  return (
    <StoryLayout
      title="Life expectancy, gdp per capita and population size"
      images={[
        "/img/section/Density150.png",
        "/img/section/Box1150.png",
        "/img/section/BubblePlot150.png",
        "/img/section/3d150.png",
      ]}
    >
      <p>
        This document gives a few suggestions to analyse a dataset composed by{" "}
        <code>three numeric variables</code>. It considers an abstract of the{" "}
        <a href="https://www.gapminder.org/data/">Gapminder</a> dataset made famous through the{" "}
        <a href="https://www.ted.com/talks/hans_rosling_shows_the_best_stats_you_ve_ever_seen">
          Hans Rosling Ted Talk
        </a>
        . It provides the average life expectancy, gdp per capita and population size for more than
        100 countries. This dataset is available through the <code>gapminder</code> R package and
        you can download it{" "}
        <a href="https://github.com/holtzy/data_to_viz/tree/master/Example_dataset">here</a>. The
        table beside shows a glimpse of it.
      </p>
      <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(viridis)
library(kableExtra)
options(knitr.table.format = "html")
library(plotly)
library(gridExtra)
library(ggrepel)

# The dataset is provided in the gapminder library
library(gapminder)
data <- gapminder %>% filter(year=="2007") %>% select(-year)

# show data
data %>% head(6) %>%
  mutate(gdpPercap=round(gdpPercap,0)) %>%
  mutate(pop=round(pop/1000000,2)) %>%
  mutate(lifeExp=round(lifeExp,1)) %>%
  kable() %>%
  kable_styling(bootstrap_options = "striped", full_width = F)`}</Code>
      <div className="overflow-x-auto">
        <table>
          {" "}
          <thead>
            <tr>
              <th>country</th>
              <th>continent</th>
              <th className="text-right">lifeExp</th>
              <th className="text-right">pop</th>
              <th className="text-right">gdpPercap</th>
            </tr>
          </thead>{" "}
          <tbody>
            <tr>
              <td>Afghanistan</td>
              <td>Asia</td>
              <td className="text-right">43.8</td>
              <td className="text-right">31.89</td>
              <td className="text-right">975</td>
            </tr>
            <tr>
              <td>Albania</td>
              <td>Europe</td>
              <td className="text-right">76.4</td>
              <td className="text-right">3.60</td>
              <td className="text-right">5937</td>
            </tr>
            <tr>
              <td>Algeria</td>
              <td>Africa</td>
              <td className="text-right">72.3</td>
              <td className="text-right">33.33</td>
              <td className="text-right">6223</td>
            </tr>
            <tr>
              <td>Angola</td>
              <td>Africa</td>
              <td className="text-right">42.7</td>
              <td className="text-right">12.42</td>
              <td className="text-right">4797</td>
            </tr>
            <tr>
              <td>Argentina</td>
              <td>Americas</td>
              <td className="text-right">75.3</td>
              <td className="text-right">40.30</td>
              <td className="text-right">12779</td>
            </tr>
            <tr>
              <td>Australia</td>
              <td>Oceania</td>
              <td className="text-right">81.2</td>
              <td className="text-right">20.43</td>
              <td className="text-right">34435</td>
            </tr>
          </tbody>{" "}
        </table>
      </div>
      <Section id="bubble-plot" title="Bubble plot">
        <p>
          The go to graph in that kind of situation is probably the bubble plot. The bubble plot is
          really close to a scatterplot since it shows the value of two numeric variables on the X
          and Y axis. However, it allows to study the value of a third variable using different
          sizes for the dots (that are thus called bubbles).
        </p>

        <Code lang="r">{`# Show a bubbleplot
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
            src="/figures/story/ThreeNum/1.webp"
            alt="Life expectancy, gdp per capita and population size – chart example"
            width={960}
            loading="lazy"
          />
        </figure>

        <p>
          The problem with bubble plot is that the relationship between the variable of the X and Y
          axis is much more obvious than the relationship with the third variable. Thus you must
          prioritize your variables and be sure of what you want to show. Before doing that kind of
          chart, I believe it is a good practice to try other combinations:
        </p>

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
            src="/figures/story/ThreeNum/2.webp"
            alt="Life expectancy, gdp per capita and population size – chart example"
            width={960}
            loading="lazy"
          />
        </figure>

        <p>
          In this case there is no obvious relationship between opulation and other metrics so it
          makes sense to use population for the bubble size.
        </p>

        <p>
          If you just want to highlight the relationship between gbp per capita and life Expectancy
          you’ve probably done most of the work now. However, it is a good practice to highlight a
          few interesting dots in this chart to give more insight to the plot:
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
            src="/figures/story/ThreeNum/3.webp"
            alt="Life expectancy, gdp per capita and population size – chart example"
            width={960}
            loading="lazy"
          />
        </figure>

        <p>
          Last but not least, note that bubble plot is probably the type of chart where using
          interactivity makes the more sense. In the following plot you can hover bubbles to get
          more information and zoom on a specific part of the graphic.
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

        <Widget src="/widgets/story/ThreeNum-1.html" height={576} width={960} />
      </Section>
      <Section id="a-note-on-the-grid-scenario" title="A note on the grid scenario">
        <div className="grid gap-6 md:grid-cols-12">
          {" "}
          <div className="md:col-span-8">
            <p>
              A specific use case where three numeric columns are displayed is the grid system. In
              this case, the two first columns gives the grid coordinates, and the third variable
              gives a numeric value for each position of the grid. For example, the volcano data set
              provides that altitude of each point of the grid of a volcano:
            </p>
          </div>{" "}
          <div className="md:col-span-4">
            <Code lang="r">{`# prepare the dataset:
don <- volcano
colnames(don) <- seq(1,ncol(don))
don <- don %>%
  as.tibble() %>%
  mutate(lat=seq(1,nrow(don)) ) %>%
  gather(key="long", value="altitude", -lat)

# show data
don %>% head(6) %>% kable() %>%
  kable_styling(bootstrap_options = "striped", full_width = F)`}</Code>

            <div className="overflow-x-auto">
              <table>
                {" "}
                <thead>
                  <tr>
                    <th className="text-right">lat</th>
                    <th>long</th>
                    <th className="text-right">altitude</th>
                  </tr>
                </thead>{" "}
                <tbody>
                  <tr>
                    <td className="text-right">1</td>
                    <td>1</td>
                    <td className="text-right">100</td>
                  </tr>
                  <tr>
                    <td className="text-right">2</td>
                    <td>1</td>
                    <td className="text-right">101</td>
                  </tr>
                  <tr>
                    <td className="text-right">3</td>
                    <td>1</td>
                    <td className="text-right">102</td>
                  </tr>
                  <tr>
                    <td className="text-right">4</td>
                    <td>1</td>
                    <td className="text-right">103</td>
                  </tr>
                  <tr>
                    <td className="text-right">5</td>
                    <td>1</td>
                    <td className="text-right">104</td>
                  </tr>
                  <tr>
                    <td className="text-right">6</td>
                    <td>1</td>
                    <td className="text-right">105</td>
                  </tr>
                </tbody>{" "}
              </table>
            </div>
          </div>{" "}
        </div>

        <p>This kind of data can be represented using a heatmap (2d):</p>

        <Code lang="r">{`don %>%
  na.omit() %>%
  ggplot(aes(x=as.numeric(long), y=lat, fill=altitude)) +
    geom_tile() +
    scale_fill_viridis() +
    theme_ipsum() +
    xlab("longitude") +
    ylab("latitude")`}</Code>

        <figure>
          <img
            src="/figures/story/ThreeNum/4.webp"
            alt="Life expectancy, gdp per capita and population size – chart example"
            width={672}
            loading="lazy"
          />
        </figure>

        <p>
          Another way is to build a surface plot. It really makes sense to use 3D in this special
          case since it allows to visualize the real shape of the volcano:
        </p>

        <Code lang="r">{`plot_ly(z = volcano, type = "surface")`}</Code>

        <Widget src="/widgets/story/ThreeNum-2.html" height={480} width={672} />
      </Section>
      <h2>Going further</h2>
      <hr />
      <p>
        You can learn more about each type of graphic presented in this story in the dedicated
        sections. Click the icon below:
      </p>
      <a href="/#portfolio">
        {" "}
        <img
          src="/img/section/Density150.png"
          alt="Life expectancy, gdp per capita and population size – chart example"
          loading="lazy"
        />
      </a>{" "}
      <a href="/#portfolio">
        {" "}
        <img
          src="/img/section/Box1150.png"
          alt="Life expectancy, gdp per capita and population size – chart example"
          loading="lazy"
        />
      </a>{" "}
      <a href="/#portfolio">
        {" "}
        <img
          src="/img/section/BubblePlot150.png"
          alt="Life expectancy, gdp per capita and population size – chart example"
          loading="lazy"
        />
      </a>{" "}
      <a href="/#portfolio">
        {" "}
        <img
          src="/img/section/3d150.png"
          alt="Life expectancy, gdp per capita and population size – chart example"
          loading="lazy"
        />
      </a>
    </StoryLayout>
  );
}
