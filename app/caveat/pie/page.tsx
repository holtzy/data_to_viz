import { CaveatLayout } from "@/components/layouts";
import { Code, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/caveat/pie.html",
  title: "The issue with pie chart | Dataviz pitfall gallery",
  description:
    "A pie chart is a circle divided into sectors that each represent a proportion of the whole. It is often used to show percentage, where the sum of the…",
  image: "/img/mistake/pie.png",
});

export default function Page() {
  return (
    <CaveatLayout title="The issue with pie chart" images={["/img/mistake/pie.png"]}>
      <Section id="bad-by-definition" title="Bad by definition">
        <p>
          A pie chart is a circle divided into sectors that each represent a proportion of the
          whole. It is often used to show percentage, where the sum of the sectors equals 100%.
        </p>

        <div className="grid gap-6 md:grid-cols-12">
          {" "}
          <div className="md:col-span-6">
            <p>
              The problem is that humans are pretty bad at reading angles. In the adjacent pie
              chart, try to figure out which group is the biggest one and try to order them by
              value. You will probably struggle to do so and this is why pie charts must be avoided.
            </p>
          </div>{" "}
          <div className="md:col-span-6">
            <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(viridis)
library(patchwork)

# create 3 data frame:
data1 <- data.frame( name=letters[1:5], value=c(17,18,20,22,24) )
data2 <- data.frame( name=letters[1:5], value=c(20,18,21,20,20) )
data3 <- data.frame( name=letters[1:5], value=c(24,23,21,19,18) )

# Plot
plot_pie <- function(data, vec){

ggplot(data, aes(x="name", y=value, fill=name)) +
  geom_bar(width = 1, stat = "identity") +
  coord_polar("y", start=0, direction = -1) +
  scale_fill_viridis(discrete = TRUE,  direction=-1) +
  geom_text(aes(y = vec, label = rev(name), size=4, color=c( "white", rep("black", 4)))) +
  scale_color_manual(values=c("black", "white")) +
  theme_ipsum() +
  theme(
    legend.position="none",
    plot.title = element_text(size=14),
    panel.grid = element_blank(),
    axis.text = element_blank(),
    legend.margin=unit(0, "null")
  ) +
  xlab("") +
  ylab("")

}

plot_pie(data1, c(10,35,55,75,93))`}</Code>

            <figure>
              <img
                src="/figures/caveat/pie/1.webp"
                alt="The issue with pie chart – chart example"
                width={960}
                height={480}
                loading="lazy"
              />
            </figure>
          </div>{" "}
        </div>

        <p>
          If you’re still not convinced, let’s try to compare several pie plots. Once more, try to
          understand which group has the highest value in these 3 graphics. Also, try to figure out
          what is the evolution of the value among groups.
        </p>

        <Code lang="r">{`a <- plot_pie(data1, c(10,35,55,75,93))
b <- plot_pie(data2, c(10,35,53,75,93))
c <- plot_pie(data3, c(10,29,50,75,93))
a + b + c`}</Code>

        <figure>
          <img
            src="/figures/caveat/pie/2.webp"
            alt="The issue with pie chart – chart example"
            width={960}
            height={384}
            loading="lazy"
          />
        </figure>

        <p>
          Now, let’s represent exactly the same data using a{" "}
          <a href="/graph/barplot.html">barplot</a>:
        </p>

        <Code lang="r">{`# A function to make barplots
plot_bar <- function(data){
  ggplot(data, aes(x=name, y=value, fill=name)) +
    geom_bar( stat = "identity") +
    scale_fill_viridis(discrete = TRUE, direction=-1) +
    scale_color_manual(values=c("black", "white")) +
    theme_ipsum() +
    theme(
      legend.position="none",
      plot.title = element_text(size=14),
      panel.grid = element_blank(),
    ) +
    ylim(0,25) +
    xlab("") +
    ylab("")
}

# Make 3 barplots
a <- plot_bar(data1)
b <- plot_bar(data2)
c <- plot_bar(data3)

# Put them together with patchwork
a + b + c`}</Code>

        <figure>
          <img
            src="/figures/caveat/pie/3.webp"
            alt="The issue with pie chart – chart example"
            width={960}
            height={384}
            loading="lazy"
          />
        </figure>

        <p>
          As you can see on this barplot, there is a heavy difference between the three pie plots
          with a hidden pattern that you definitely don’t want to miss when you tell your story.
        </p>
      </Section>

      <Section id="and-often-made-even-worse" title="And often made even worse">
        <p>
          Even if pie charts are bad by definition, it is still possible to make them even worse by
          adding other bad features:
        </p>
        <ul>
          {" "}
          <li>3d</li> <li>legend aside</li> <li>percentages that do not sum to 100</li>{" "}
          <li>too many items</li> <li>exploded pie charts</li>{" "}
        </ul>
      </Section>

      <Section id="alternatives" title="Alternatives">
        <p>
          The <a href="/graph/barplot.html">barplot</a> is the best alternative to pie plots. If you
          have many values to display, you can also consider a{" "}
          <a href="/graph/lollipop.html">lollipop</a> plot that is a bit more elegant in my opinion.
          Here is an example based on the{" "}
          <a href="/story/OneNumOneCat.html">amount of weapons sold</a> by a few countries in the
          world:
        </p>

        <Code lang="r">{`# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum.csv", header=TRUE, sep=",")

# plot
data %>%
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
            src="/figures/caveat/pie/4.webp"
            alt="The issue with pie chart – chart example"
            width={576}
            height={672}
            loading="lazy"
          />
        </figure>

        <p>
          Another possibility would be to create a treemap if your goal is to describe what the
          whole is composed of.
        </p>

        <Code lang="r">{`# Package
library(treemap)

# Plot

data %>%
  drop_na() %>%
  treemap(  # data
            index="Country",
            vSize="Value",
            type="index",

            # Main
            title="",
            palette="Dark2",

            # Borders:
            border.col=c("black"),
            border.lwds=1,

            #Labels
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
            src="/figures/caveat/pie/5.webp"
            alt="The issue with pie chart – chart example"
            width={960}
            height={384}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="going-further" title="Going further">
        <ul>
          {" "}
          <li>
            <a href="/story/OneNumOneCat.html">Who sells more weapons</a>: see this story that gives
            several alternatives to pie plot.
          </li>{" "}
          <li>
            Four problems with Pie Charts (And what to do instead) by{" "}
            <a href="https://icharts.net/blog/data-visualization-guides/4-problems-pie-charts-instead">
              iCharts.net
            </a>
          </li>{" "}
          <li>
            The worst chart in the world by{" "}
            <a href="https://www.businessinsider.com.au/pie-charts-are-the-worst-2013-6?r=US&IR=T">
              Business insider
            </a>
          </li>{" "}
          <li>
            doing pie plots in <a href="https://www.r-graph-gallery.com/pie-plot/">R</a> and{" "}
            <a href="https://python-graph-gallery.com/pie-plot/">Python</a>
          </li>{" "}
        </ul>
      </Section>
    </CaveatLayout>
  );
}
