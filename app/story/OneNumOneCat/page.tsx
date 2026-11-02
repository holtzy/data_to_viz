import { StoryLayout } from "@/components/layouts";
import { Code, Section } from "@/components/content";
import { ChartTile, ChartTiles } from "@/components/chart-tile";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/story/OneNumOneCat.html",
  title: "Who sells more weapons? – from Data to Viz",
  description:
    "This document gives a few suggestions to analyse a dataset composed by one numeric and one categoric variable. The dataset used as an example provides the…",
  image: "/img/section/Bar150.png",
});

export default function Page() {
  return (
    <StoryLayout
      title="Who sells more weapons?"
      images={[
        "/img/section/Bar150.png",
        "/img/section/CircularBarplot150.png",
        "/img/section/Lollipop150.png",
        "/img/section/Tree150.png",
        "/img/section/CircularPacking150.png",
      ]}
    >
      <div className="grid gap-6 md:grid-cols-12">
        {" "}
        <div className="md:col-span-8">
          <p>
            This document gives a few suggestions to analyse a dataset composed by{" "}
            <code>one numeric and one categoric</code> variable. <br /> The dataset used as an
            example provides the quantity of weapons exported by the top 50 largest exporters in
            2017. This dataset has been downloaded on the{" "}
            <a href="http://armstrade.sipri.org/armstrade/page/toplist.php">
              Stockholm International Peace Research Institute
            </a>{" "}
            website and more information about it are available{" "}
            <a href="http://www.sipri.org/databases/armstransfers/sources-and-methods/">here</a>.{" "}
            <br /> A clean version at <code>.csv</code> format is available on github, and the table
            beside shows how it looks like.
          </p>
        </div>{" "}
        <div className="md:col-span-4">
          <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(kableExtra)
options(knitr.table.format = "html")

# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum.csv", header=TRUE, sep=",")

# show data
data %>% head(6) %>% kable() %>%
  kable_styling(bootstrap_options = "striped", full_width = F)`}</Code>

          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Country</th>
                  <th className="text-right">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>United States</td>
                  <td className="text-right">12394</td>
                </tr>
                <tr>
                  <td>Russia</td>
                  <td className="text-right">6148</td>
                </tr>
                <tr>
                  <td>Germany (FRG)</td>
                  <td className="text-right">1653</td>
                </tr>
                <tr>
                  <td>France</td>
                  <td className="text-right">2162</td>
                </tr>
                <tr>
                  <td>United Kingdom</td>
                  <td className="text-right">1214</td>
                </tr>
                <tr>
                  <td>China</td>
                  <td className="text-right">1131</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>{" "}
      </div>
      <Section id="lollipop" title="Lollipop">
        <p>
          Even if the most common way to represent this kind of information is probably to use{" "}
          <a href="/graph/barplot.html">barplots</a>, <a href="/graph/lollipop.html">lollipop</a>{" "}
          can be a very good alternative, especially if you have a high number of entities. It is
          basically the same thing, but the bar is replaced by a line and a dot at the end. It
          allows the figure to be less cluttered.
        </p>

        <p>
          Moreover, it is a good practice to plot a horizontal version, to make the labels more
          easily readable. Last, sorting your entities gives much more insight to the plot.
        </p>

        <Code lang="r">{`data %>%
  filter(!is.na(Value)) %>%
  arrange(Value) %>%
  mutate(Country=factor(Country, Country)) %>%
  ggplot( aes(x=Country, y=Value) ) +
    geom_segment( aes(x=Country ,xend=Country, y=0, yend=Value), color="grey") +
    geom_point(size=3, color="#69b3a2") +
    coord_flip() +
    theme_ipsum() +
    theme(
      panel.grid.minor.y = element_blank(),
      panel.grid.major.y = element_blank(),
      legend.position="none"
    ) +
    xlab("")`}</Code>

        <figure>
          <img
            src="/figures/story/OneNumOneCat/1.webp"
            alt="Who sells more weapons? – chart example"
            width={672}
            height={672}
            loading="lazy"
          />
        </figure>
      </Section>
      <Section id="barplot" title="Barplot">
        <p>
          Here is the <a href="/graph/barplot.html">barplot</a> version that looks very similar to
          the <a href="/graph/lollipop.html">lollipop</a>. This version is all right in this case
          where there is a lot of difference from one bar to the other. It would look way to
          cluttered with no or few differences.
        </p>

        <Code lang="r">{`data %>%
  filter(!is.na(Value)) %>%
  arrange(Value) %>%
  mutate(Country=factor(Country, Country)) %>%
  ggplot( aes(x=Country, y=Value) ) +
    geom_bar(stat="identity", fill="#69b3a2") +
    coord_flip() +
    theme_ipsum() +
    theme(
      panel.grid.minor.y = element_blank(),
      panel.grid.major.y = element_blank(),
      legend.position="none"
    ) +
    xlab("")`}</Code>

        <figure>
          <img
            src="/figures/story/OneNumOneCat/2.webp"
            alt="Who sells more weapons? – chart example"
            width={672}
            height={672}
            loading="lazy"
          />
        </figure>
      </Section>
      <Section id="circular-barplot" title="Circular barplot">
        <p>
          The <a href="/graph/circularbarplot.html">circular barplot</a> is an alternative to the{" "}
          <a href="/graph/barplot.html">barplots</a>, where each bar is placed around a circle
          instead of along a line. The benefit is that your figure gets more eye-catching, and that
          it uses space more efficiently. However, differences between groups get harder to read. In
          my opinion, this kind of graphic is worth it if you have a high number of groups and if
          obvious differences exist between group.
        </p>

        <Code lang="r">{`# Order data
tmp <- data %>%
  filter(!is.na(Value)) %>%
  arrange(desc(Value)) %>%
  mutate(Country=factor(Country, Country))

# Set a number of 'empty bar'
empty_bar=10

# Add lines to the initial tmpset
to_add = matrix(NA, empty_bar, ncol(tmp))
colnames(to_add) = colnames(tmp)
tmp=rbind(tmp, to_add)
tmp$id=seq(1, nrow(tmp))

# Get the name and the y position of each label
label_tmp=tmp
number_of_bar=nrow(label_tmp)
angle= 90 - 360 * (label_tmp$id-0.5) /number_of_bar     # I substract 0.5 because the letter must have the angle of the center of the bars. Not extreme right(1) or extreme left (0)
label_tmp$hjust<-ifelse( angle < -90, 1, 0)
label_tmp$angle<-ifelse(angle < -90, angle+180, angle)
label_tmp$Country <- gsub("United States", "US", label_tmp$Country)
label_tmp$Country <- paste(label_tmp$Country, " (", label_tmp$Value,")", sep="")

# Make the plot
ggplot(tmp, aes(x=as.factor(id), y=Value)) +       # Note that id is a factor. If x is numeric, there is some space between the first bar
  geom_bar(stat="identity", fill=alpha("#69b3a2", 0.8)) +
  ylim(-7000,13000) +
  theme_minimal() +
  theme(
    axis.text = element_blank(),
    axis.title = element_blank(),
    panel.grid = element_blank(),
    plot.margin = unit(rep(-1,4), "cm")
  ) +
  coord_polar(start = 0) +
  geom_text(data=label_tmp, aes(x=id, y=Value+200, label=Country ), color="black", fontface="bold",alpha=0.6, size=2.5, angle= label_tmp$angle, hjust=label_tmp$hjust, inherit.aes = FALSE ) +
  geom_text( aes(x=24, y=8000, label="Who sells more weapons?"), color="black", inherit.aes = FALSE)`}</Code>

        <figure>
          <img
            src="/figures/story/OneNumOneCat/3.webp"
            alt="Who sells more weapons? – chart example"
            width={768}
            height={768}
            loading="lazy"
          />
        </figure>

        <p>
          Please note that in this case the{" "}
          <a href="/graph/circularbarplot.html">circular barplot</a> do not look very good due to a
          lot of very small values that are hardly visible on the chart.
        </p>
      </Section>
      <Section id="treemap" title="Treemap">
        <p>
          A <a href="/graph/treemap.html">treemap</a> represents each entity as a rectangle, with an
          area that is proportional to the numeric variable of the dataset. It is a good way to show
          a general overview of the data organization and is probably more eye-catching than the
          previous barplot. However, it is less precise in the sense that it is harder to make
          accurate comparisons between groups.
        </p>

        <Code lang="r">{`# Package
library(treemap)

data <- data %>%
  filter(!is.na(Value))

# Plot
treemap(data,

            # data
            index="Country",
            vSize="Value",
            type="index",

            # Main
            title="",
            palette="Dark2",

            # Borders:
            border.col=c("black"),
            border.lwds=1,

            # Labels
            fontsize.labels=0.5,
            fontcolor.labels="white",
            fontface.labels=1,
            bg.labels=c("transparent"),
            align.labels=c("left", "top"),
            overlap.labels=0.5,
            inflate.labels=T                        # If true, labels are bigger when rectangle is bigger.

            )`}</Code>

        <figure>
          <img
            src="/figures/story/OneNumOneCat/4.webp"
            alt="Who sells more weapons? – chart example"
            width={864}
            height={480}
            loading="lazy"
          />
        </figure>
      </Section>
      <Section id="circle-packing" title="Circle packing">
        <p>
          <a href="/graph/circularpacking.html">Circle packing</a> is the circular version of the{" "}
          <a href="/graph/treemap.html">treemap</a>. Each groupd is represented as a circle instead
          of a rectangle, and its area is proportional to the numeric value.
        </p>

        <Code lang="r">{`# Libraries
library(ggraph)
library(igraph)
library(tidyverse)
library(viridis)

# We need a data frame giving a hierarchical structure. Let's consider the flare dataset:
tmp <- data %>% filter(!is.na(Value))
edges <- data.frame(
  from = "o",
  to = tmp$Country
)
vertices = rbind(tmp, data.frame(Country="o", Value=1)) %>% mutate(name=Country)
mygraph <- graph_from_data_frame( edges, vertices=vertices )

ggraph(mygraph, layout = 'circlepack', weight=Value) +
  geom_node_circle( aes(fill=name)) +
  scale_fill_viridis(discrete=TRUE) +
  geom_node_label(aes(label=name, size=Value)) +
  theme_void() +
  theme(
    legend.position="none"
  )`}</Code>

        <figure>
          <img
            src="/figures/story/OneNumOneCat/5.webp"
            alt="Who sells more weapons? – chart example"
            width={576}
            height={576}
            loading="lazy"
          />
        </figure>
      </Section>
      <h2 id="going-further">Going further</h2>
      <p>
        You can learn more about each type of graphic presented in this story in the dedicated
        sections. Click the icon below:
      </p>
      <ChartTiles>
        <ChartTile href="/graph/barplot.html" image="/img/section/Bar150.png" title="Barplot" />
        <ChartTile
          href="/graph/circularbarplot.html"
          image="/img/section/CircularBarplot150.png"
          title="Circular Barplot"
        />
        <ChartTile
          href="/graph/lollipop.html"
          image="/img/section/Lollipop150.png"
          title="Lollipop"
        />
        <ChartTile href="/graph/treemap.html" image="/img/section/Tree150.png" title="Treemap" />
        <ChartTile
          href="/graph/circularpacking.html"
          image="/img/section/CircularPacking150.png"
          title="Circular Packing"
        />
      </ChartTiles>
    </StoryLayout>
  );
}
