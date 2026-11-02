import { StoryLayout } from "@/components/layouts";
import { Code, Section, Widget } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/story/OneNumSevCatSubgroupOneObsPerGroup.html",
  title: "The gender wage gap – from Data to Viz",
  description:
    "This document gives a few suggestions to analyse a dataset composed by a numeric variable measured on groups and subgroups. The dataset used as an example…",
  image: "/img/section/BarSmall.png",
});

export default function Page() {
  return (
    <StoryLayout
      title="The gender wage gap"
      images={[
        "/img/section/BarSmall.png",
        "/img/section/Parallel1Small.png",
        "/img/section/SpiderSmall.png",
        "/img/section/ScatterPlotSmall.png",
      ]}
    >
      <div className="grid gap-6 md:grid-cols-12">
        {" "}
        <div className="md:col-span-8">
          <p>
            This document gives a few suggestions to analyse a dataset composed by a numeric
            variable measured on groups and subgroups. <br />
            <br /> The dataset used as an example quantifies the gender wage gap in 39 countries at
            three different time stamp. The gender wage gap is defined as the difference between
            male and female median wages divided by the male median wages. <br />
            <br /> Data have been gathered on the{" "}
            <a href="https://stats.oecd.org/index.aspx?queryid=54751">OECD website</a>. A clean
            version is available at <code>csv</code>format on{" "}
            <a href="https://github.com/holtzy/data_to_viz/tree/master/Example_dataset">github</a>.
          </p>
        </div>{" "}
        <div className="md:col-span-4">
          <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(kableExtra)
options(knitr.table.format = "html")
library(viridis)
library(ggrepel)
library(plotly)

# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/9_OneNumSevCatSubgroupOneObs.csv", header=T, sep=",")

# show data
data %>% head(6) %>% kable() %>%
  kable_styling(bootstrap_options = "striped", full_width = F)`}</Code>

          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Country</th>
                  <th className="text-right">TIME</th>
                  <th className="text-right">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Australia</td>
                  <td className="text-right">2000</td>
                  <td className="text-right">17.2</td>
                </tr>
                <tr>
                  <td>Australia</td>
                  <td className="text-right">2005</td>
                  <td className="text-right">15.8</td>
                </tr>
                <tr>
                  <td>Australia</td>
                  <td className="text-right">2010</td>
                  <td className="text-right">14.0</td>
                </tr>
                <tr>
                  <td>Australia</td>
                  <td className="text-right">2015</td>
                  <td className="text-right">13.0</td>
                </tr>
                <tr>
                  <td>Austria</td>
                  <td className="text-right">2000</td>
                  <td className="text-right">23.1</td>
                </tr>
                <tr>
                  <td>Austria</td>
                  <td className="text-right">2005</td>
                  <td className="text-right">22.0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>{" "}
      </div>
      <Section id="grouped-barplot" title="Grouped barplot">
        <p>
          The most common way to represent this kind of dataset is probably to build a grouped
          barplot. In this example, each bar represents a gender wage gap. Bars can be grouped by
          year or by country depending on what you want to focus on.
        </p>

        <p>This works well if your groups have no logical orders</p>

        <Code lang="r">{`# List of country with 4 values
with4 <- data %>%
  group_by(Country) %>%
  summarize(n=n()) %>%
  filter(n==4)

# Grouped
data %>%
  filter(Country %in% with4$Country) %>%
  mutate(Country = fct_reorder(Country, Value)) %>%
  mutate(TIME=factor(TIME, levels = c("2000", "2005", "2010", "2015"))) %>%
  ggplot(aes(fill=as.factor(TIME), y=Value, x=Country)) +
    geom_bar(position="dodge", stat="identity") +
    scale_fill_viridis(discrete=T, name="") +
    coord_flip() +
    theme_ipsum()  +
    ylab("gender wage gap (%)")`}</Code>

        <figure>
          <img
            src="/figures/story/OneNumSevCatSubgroupOneObsPerGroup/1.webp"
            alt="The gender wage gap – chart example"
            width={768}
            loading="lazy"
          />
        </figure>

        <p>
          On this graphic, bars are grouped per country. Since country are ordered, it is easy to
          notice that Korea is the country with the biggest wage gap, followed by Japan and the UK.
          It is also possible to observe that the gender wage gap globally decreased between 2000
          and 2015, but there are clearly better way to represent this idea. <br />
          <br /> Note that choosing the appropriate grouping variable is important. Let’s check what
          happens when grouping using the other categoric variable, the year:
        </p>

        <Code lang="r">{`# Grouped
data %>%
  filter(Country %in% with4$Country) %>%
  mutate(Country = fct_reorder(Country, Value)) %>%
  mutate(TIME=factor(TIME, levels = c("2000", "2005", "2010", "2015"))) %>%
  ggplot(aes(fill=Country, y=Value, x=as.factor(TIME))) +
    geom_bar(position="dodge", stat="identity") +
    scale_fill_viridis(discrete=T, name="") +
    coord_flip() +
    theme_ipsum() +
    xlab("") +
    ylab("gender wage gap (%)")`}</Code>

        <figure>
          <img
            src="/figures/story/OneNumSevCatSubgroupOneObsPerGroup/2.webp"
            alt="The gender wage gap – chart example"
            width={768}
            loading="lazy"
          />
        </figure>

        <p>
          The result of this grouped barplot is quite disapointing compared to the previous one.
          This is mainly due to the fact that too many bars are displayed for each year. It gets
          very hard to make a link with the legend, and the comparison from a year to the other is
          very complicated as well. Globally, it is better to group bars in a way that minimize the
          number of bar per group. Moreover, remember that having a legend with more than ~7 groups
          probably means that there is a better way to represent the information.
        </p>
      </Section>
      <Section id="parallel-coordinates-plot" title="Parallel coordinates plot">
        <Code lang="r">{`# Groups
all <- unique(data$Country)
grp1 <- sample( all, 20)
grp2 <- all[ ! all%in%grp1]

# Grouped
data %>%
  filter(Country %in% with4$Country) %>%
  filter(Country != "OECD - Average") %>%
  mutate(label = if_else(TIME == max(TIME) & Country %in% grp1, as.character(Country), NA_character_)) %>%
  mutate(label2 = if_else(TIME == min(TIME) & Country %in% grp2, as.character(Country), NA_character_)) %>%
  ggplot( aes(x=as.factor(TIME), y=Value, color=Country, group=Country)) +
    geom_point() +
    geom_line() +
    geom_label_repel( aes(label=label), nudge_x = 0.3, hjust=0, na.rm = TRUE, segment.colour="grey") +
    geom_label_repel( aes(label=label2), nudge_x = -0.3, hjust=1, na.rm = TRUE, segment.colour="grey") +
    scale_color_viridis(discrete=T, name="") +
    theme_ipsum() +
    theme(
      legend.position ="none"
    ) +
    xlab("") +
    ylab("gender wage gap (%)")`}</Code>

        <figure>
          <img
            src="/figures/story/OneNumSevCatSubgroupOneObsPerGroup/3.webp"
            alt="The gender wage gap – chart example"
            width={768}
            loading="lazy"
          />
        </figure>
      </Section>
      <Section id="spider-plot" title="Spider plot">
        <p>
          The spider chart is a circular version of the parallel coordinates plot where vertical
          axis are joint in the center of the figure. It is sometimes criticized [
          <a href="http://blog.minitab.com/blog/fun-with-statistics/beware-the-radar-chart">1</a>,{" "}
          <a href="https://blog.scottlogic.com/2011/09/23/a-critique-of-radar-charts.html">2</a>],
          but I believe in their effectiveness in certain cases, as explained here.
        </p>
      </Section>
      <Section id="slope-chart" title="Slope chart">
        <p>
          If one of the categoric variable has only two levels, it is possible to build a slope
          chart that is a specific use case of the parallel coordinates plot. It is very powerful
          since it describes efficiently both the ranking and the evolution of every country.
        </p>

        <Code lang="r">{`# Groups
all <- unique(data$Country)
grp1 <- sample( all, 20)
grp2 <- all[ ! all%in%grp1]

# Grouped
data %>%
  filter(Country %in% with4$Country) %>%
  filter(Country != "OECD - Average") %>%
  filter(TIME %in% c(2000, 2015)) %>%
  mutate(label = if_else(TIME == max(TIME) & Country %in% grp1, as.character(Country), NA_character_)) %>%
  mutate(label2 = if_else(TIME == min(TIME) & Country %in% grp2, as.character(Country), NA_character_)) %>%
  ggplot( aes(x=as.factor(TIME), y=Value, color=Country, group=Country)) +
    geom_point() +
    geom_line() +
    geom_label_repel( aes(label=label), nudge_x = 0.3, hjust=0, na.rm = TRUE, segment.colour="grey") +
    geom_label_repel( aes(label=label2), nudge_x = -0.3, hjust=1, na.rm = TRUE, segment.colour="grey") +
    scale_color_viridis(discrete=T, name="") +
    theme_ipsum() +
    theme(
      legend.position ="none"
    ) +
    xlab("") +
    ylab("gender wage gap (%)")`}</Code>

        <figure>
          <img
            src="/figures/story/OneNumSevCatSubgroupOneObsPerGroup/4.webp"
            alt="The gender wage gap – chart example"
            width={768}
            loading="lazy"
          />
        </figure>
      </Section>
      <Section id="scatter-plot" title="Scatter plot">
        <p>
          If one of the grouping variable has 2 levels, it is also possible to build a scatterplot.
          One level will be on the X axis, the other on the Y axis. Let’s make an example showing
          the value in the 20’ compared to the 2015’. In this case it is useful to use
          interactivity: it avoids to have a legend with too many levels.
        </p>

        <Code lang="r">{`p <- data %>%
  filter(TIME %in% c(2000, 2015)) %>%
  spread(key=TIME, value=Value, -1) %>%
  filter(\`2000\`!=-1) %>%
  filter(\`2015\`!=-1) %>%
  mutate(text=paste("Country: ",Country, "\\n", "Wage gap in 2000: ", \`2000\`, "%\\nWage gap in 2015: ", \`2015\`, sep="")) %>%
  ggplot(aes(x=\`2000\`, y=\`2015\`, text=text)) +
    geom_point(size=4, alpha=0.6, color="#69b3a2") +
    theme_ipsum() +
    theme(legend.position="none") +
    xlab("Gender wage gap in 2000 (%)") +
    ylab("Gender wage gap in 2015 (%)")


ggplotly(p, tooltip="text")`}</Code>

        <Widget
          src="/widgets/story/OneNumSevCatSubgroupOneObsPerGroup-1.html"
          height={576}
          width={768}
        />
      </Section>
      <h2>Going further</h2>
      <p>
        You can learn more about each type of graphic presented in this story in the dedicated
        sections. Click the icon below:
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <a href="/graph/barplot.html" title="Barplot">
          <img src="/img/section/BarSmall.png" alt="Barplot" loading="lazy" className="size-24" />
        </a>
        <a href="/graph/parallel.html" title="Parallel coordinates">
          <img
            src="/img/section/Parallel1Small.png"
            alt="Parallel coordinates"
            loading="lazy"
            className="size-24"
          />
        </a>
        <a href="/caveat/spider.html" title="Spider Chart">
          <img
            src="/img/section/SpiderSmall.png"
            alt="Spider Chart"
            loading="lazy"
            className="size-24"
          />
        </a>
        <a href="/graph/scatter.html" title="Scatter plot">
          <img
            src="/img/section/ScatterPlotSmall.png"
            alt="Scatter plot"
            loading="lazy"
            className="size-24"
          />
        </a>
      </div>
    </StoryLayout>
  );
}
