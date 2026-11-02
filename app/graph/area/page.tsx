import { GraphLayout } from "@/components/layouts";
import { ButtonLink, Code, RelatedCard, RelatedGrid, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/graph/area.html",
  title: "Area chart – from Data to Viz",
  description:
    "An area chart is really similar to a line chart and represents the evolution of a numeric variable. Basically, the X axis represents time or an ordered…",
  image: "/img/section/AreaSmall.png",
});

export default function Page() {
  return (
    <GraphLayout title="Area chart" images={["/img/section/AreaSmall.png"]}>
      <Section id="definition" title="Definition">
        <p>
          An <code>area chart</code> is really similar to a{" "}
          <a href="/graph/line.html">line chart</a> and represents the evolution of a numeric
          variable. Basically, the X axis represents time or an ordered variable, and the Y axis
          gives the value of another variable. Data points are connected by straight line segments
          and the area between the x axis and the line is filled in with color or shading.
        </p>

        <p>
          The following example shows the evolution of the{" "}
          <a href="/story/TwoNumOrdered.html">bitcoin price</a> between April 2013 and April 2018.
          Data comes from the <a href="/story/TwoNumOrdered.html">CoinMarketCap</a> website.
        </p>

        <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(plotly)
library(patchwork)
library(babynames)
library(viridis)

# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered.csv", header=T)
data$date <- as.Date(data$date)

# plot
data %>%
  ggplot( aes(x=date, y=value)) +
    geom_area(fill="#69b3a2", alpha=0.5) +
    geom_line(color="#69b3a2") +
    ggtitle("Evolution of Bitcoin price") +
    ylab("bitcoin price ($)") +
    theme_ipsum()`}</Code>

        <figure>
          <img
            src="/figures/graph/area/1.webp"
            alt="Area chart – chart example"
            width={960}
            height={480}
            loading="lazy"
          />
        </figure>

        <p>
          <em>Note</em>: You can read more about this project{" "}
          <a href="/story/TwoNumOrdered.html">here</a>.
        </p>
      </Section>

      <Section id="what-for" title="What for">
        <p>
          Area chart is used to show the evolution of numeric variable. It is sometimes criticized
          for not optimizing the{" "}
          <a href="https://thedoublethink.com/tuftes-principles-for-visualizing-quantitative-information/">
            data-ink ratio
          </a>
          , a data visualization principle that checks that no inks is used for nothing on the
          chart. Indeed, removing the area under the curve would make a{" "}
          <a href="/graph/line.html">line chart</a> that conveys the same information. In my opinion
          area chart make a very good work to show an evolution and the filled area makes the
          pattern even more obvious.
        </p>

        <p>
          Area chart can also be used to show the evolution of <code>several variables</code>. The
          most classic way is through a <a href="/graph/stackedarea.html">stacked area chart</a>{" "}
          that is discussed in another <a href="/graph/stackedarea.html">section</a>, but this can
          also be done using <code>small multiple</code>. Here is an example showing the evolution
          of a few baby name frequencies in the US between 1880 and 2015.
        </p>

        <Code lang="r">{`# Load dataset from github
don <- babynames %>% 
  filter(name %in% c("Ashley", "Amanda", "Mary", "Deborah",   "Dorothy", "Betty", "Helen", "Jennifer", "Shirley")) %>%
  filter(sex=="F")

# Plot
don %>%
  ggplot( aes(x=year, y=n, group=name, fill=name)) +
    geom_area() +
    scale_fill_viridis(discrete = TRUE) +
    theme(legend.position="none") +
    ggtitle("Popularity of American names in the previous 30 years") +
    theme_ipsum() +
    theme(
      legend.position="none",
      panel.spacing = unit(0, "lines"),
      strip.text.x = element_text(size = 8),
      plot.title = element_text(size=13)
    ) +
    facet_wrap(~name, scale="free_y")`}</Code>

        <p>
          <img
            src="/figures/graph/area/2.webp"
            alt="Area chart – chart example"
            width={768}
            height={576}
            loading="lazy"
          />{" "}
          <em>Note</em>: this graphic would deserve a discussion on the Y axis range to use and on
          the number of row &amp; column to set.{" "}
          <a href="/caveat/small_multiple.html">Watch this space</a>.
        </p>
      </Section>

      <Section id="variation" title="Variation">
        <p>
          If the number of data points is low, it is advised to represent each individual
          observation with a dot. It allows to understand when exactly the observation have been
          made:
        </p>

        <Code lang="r">{`data %>%
  tail(10) %>%
  ggplot( aes(x=date, y=value)) +
    geom_line(color="#69b3a2") +
    geom_point(color="#69b3a2", size=4) +
    ggtitle("Cuting") +
    ylab("bitcoin price ($)") +
    theme_ipsum()`}</Code>

        <figure>
          <img
            src="/figures/graph/area/3.webp"
            alt="Area chart – chart example"
            width={960}
            height={288}
            loading="lazy"
          />
        </figure>

        <p>
          Note that lines are also used to show trends in a scatterplot. Here is an example using
          Smoothed conditional means and showing confidence interval around it:
        </p>

        <Code lang="r">{`ggplot(mpg, aes(displ, hwy)) +
  geom_point() +
  geom_smooth(color="#69b3a2") +
  theme_ipsum()`}</Code>

        <figure>
          <img
            src="/figures/graph/area/4.webp"
            alt="Area chart – chart example"
            width={672}
            height={480}
            loading="lazy"
          />
        </figure>

        <p>
          <em>Note</em>: this example comes from the{" "}
          <a href="http://ggplot2.tidyverse.org/reference/geom_smooth.html">ggplot2 documentaion</a>
          .
        </p>
      </Section>

      <Section id="mistake" title="Common caveats">
        <p>
          The line chart is subject to a lot of discussion concerning potential caveats. Here is an
          overview:
        </p>
        <ul>
          {" "}
          <li>
            <a href="/caveat/cut_y_axis.html">To cut or not to cut the Y axis</a>? Wether or not the
            Y axis must start at 0 is a hot topic leading to intense debates. The graphic below
            presents the same data, starting at 0 (left) or not (right). Generally, line plot do not
            need to start at 0 since it allows to observe patterns more efficiently, but you
            probably want to learn more about it <a href="/caveat/cut_y_axis.html">here</a>.
          </li>{" "}
        </ul>
        <Code lang="r">{`p1 <- data %>%
  tail(10) %>%
  ggplot( aes(x=date, y=value)) +
    geom_line(color="#69b3a2") +
    geom_point(color="#69b3a2", size=4) +
    ggtitle("Not cuting") +
    ylab("bitcoin price ($)") +
    theme_ipsum() +
    ylim(0,10000)

p2 <- data %>%
  tail(10) %>%
  ggplot( aes(x=date, y=value)) +
    geom_line(color="#69b3a2") +
    geom_point(color="#69b3a2", size=4) +
    ggtitle("Cuting") +
    ylab("bitcoin price ($)") +
    theme_ipsum()

p1 + p2`}</Code>

        <figure>
          <img
            src="/figures/graph/area/5.webp"
            alt="Area chart – chart example"
            width={960}
            height={288}
            loading="lazy"
          />
        </figure>
        <ul>
          {" "}
          <li>
            If you need to compare the evolution of 2 different variables, do not use{" "}
            <a href="/caveat/dual_axis.html">dual axis</a>. Indeed dual axis can show very different
            results depending on what range you apply to the axis.{" "}
            <a href="/caveat/dual_axis.html">Read more about it</a>.
          </li>{" "}
          <li>
            Mind the <a href="/caveat/spaghetti.html">spaghetti chart</a>: too many lines make the
            chart unreadable.
          </li>{" "}
          <li>
            Think about the <a href="/caveat/aspect_ratio.html">aspect ratio</a> of the graphic,
            extreme ratio make the chart unreadable.
          </li>{" "}
        </ul>
      </Section>

      <Section id="related" title="Related">
        <RelatedGrid>
          <RelatedCard href="/graph/line.html" image="/img/section/LineSmall.png" title="Line plot">
            Displays the evolution of one or several numeric variables.
          </RelatedCard>
          <RelatedCard
            href="/graph/area.html"
            image="/img/section/AreaSmall.png"
            title="Area chart"
          >
            Basically a line graph, filling the area under the curve.
          </RelatedCard>
          <RelatedCard
            href="/graph/stackedarea.html"
            image="/img/section/StackedAreaSmall.png"
            title="Stacked area chart"
          >
            Displays the evolution of the value of several groups on the same graphic
          </RelatedCard>
          <RelatedCard
            href="/graph/streamgraph.html"
            image="/img/section/StreamSmall.png"
            title="Streamgraph"
          >
            A stacked area graph displaced around a central axis, resulting in a flowing, organic
            shape
          </RelatedCard>
        </RelatedGrid>
      </Section>

      <Section id="code" title="Build your own">
        <p>
          The <a href="https://r-graph-gallery.com/area-chart.html">R</a>,{" "}
          <a href="https://python-graph-gallery.com/area-plot/">Python</a>,{" "}
          <a href="https://www.react-graph-gallery.com/area-plot">React</a> and{" "}
          <a href="https://d3-graph-gallery.com/area.html">D3</a> graph galleries are 4 websites
          providing hundreds of chart example, always providing the reproducible code. Click the
          button below to see how to build the chart you need with your favorite programing
          language.
        </p>

        <p>
          <ButtonLink href="https://r-graph-gallery.com/area-chart.html/">
            R graph gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://python-graph-gallery.com/area-plot/">Python gallery</ButtonLink>{" "}
          <ButtonLink href="https://www.react-graph-gallery.com/area-plot">
            React gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://d3-graph-gallery.com/area.html">D3 gallery</ButtonLink>
        </p>
      </Section>
    </GraphLayout>
  );
}
