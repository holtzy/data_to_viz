import { GraphLayout } from "@/components/layouts";
import { ButtonLink, Code, RelatedCard, RelatedGrid, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/graph/lollipop.html",
  title: "Lollipop chart – from Data to Viz",
  description:
    "A lollipop plot is basically a barplot, where the bar is transformed in a line and a dot. It shows the relationship between a numeric and a categoric…",
  image: "/img/section/LollipopSmall.png",
});

export default function Page() {
  return (
    <GraphLayout title="Lollipop chart" images={["/img/section/LollipopSmall.png"]}>
      <Section id="definition" title="Definition">
        <p>
          A <code>lollipop plot</code> is basically a <a href="/graph/barplot.html">barplot</a>,
          where the bar is transformed in a <code>line</code> and a <code>dot</code>. It shows the
          relationship between a numeric and a categoric variable.
        </p>

        <p>
          Here is an example showing the quantity of weapons exported by the top 20 largest
          exporters in 2017 (more info <a href="/story/OneNumOneCat.html">here</a>):
        </p>

        <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(kableExtra)
options(knitr.table.format = "html")
library(patchwork)

# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum.csv", header=TRUE, sep=",")

# Plot
data %>%
  filter(!is.na(Value)) %>%
  arrange(Value) %>%
  tail(20) %>%
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
    xlab("") +
    ylab("Weapon quantity (SIPRI trend-indicator value)")`}</Code>

        <figure>
          <img
            src="/figures/graph/lollipop/1.webp"
            alt="Lollipop chart – chart example"
            width={672}
            height={672}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="what-for" title="What for">
        <p>
          The lollipop plot is used exactly in the same situation than a barplot. However it is
          somewhat more appealing and convey as well the information. It is especially useful when
          you have several bars of the same height: it avoids to have a <code>cluttered</code>{" "}
          figure and a <a href="https://en.wikipedia.org/wiki/Moiré_pattern">Moiré effect</a>.
        </p>

        <Code lang="r">{`don <- data.frame(
  group = LETTERS[1:20],
  val = 20 + rnorm(20)
)

p1 <- don %>%
    arrange(val) %>%
    mutate(group=factor(group, group)) %>%
    ggplot( aes(x=group, y=val) ) +
      geom_bar(stat="identity", fill="#69b3a2") +
      coord_flip() +
      theme_ipsum() +
      theme(
        panel.grid.minor.y = element_blank(),
        panel.grid.major.y = element_blank(),
        legend.position="none"
      ) +
      xlab("") +
      ylab("Weapon quantity (SIPRI trend-indicator value)")

p2 <- don %>%
    arrange(val) %>%
    mutate(group=factor(group, group)) %>%
    ggplot( aes(x=group, y=val) ) +
      geom_segment( aes(x=group ,xend=group, y=0, yend=val), color="grey") +
      geom_point(size=3, color="#69b3a2") +
      coord_flip() +
      theme_ipsum() +
      theme(
        panel.grid.minor.y = element_blank(),
        panel.grid.major.y = element_blank(),
        legend.position="none"
      ) +
      xlab("") +
      ylab("Weapon quantity (SIPRI trend-indicator value)")

p1 + p2`}</Code>

        <figure>
          <img
            src="/figures/graph/lollipop/2.webp"
            alt="Lollipop chart – chart example"
            width={864}
            height={576}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="variation" title="Variation">
        <p>
          The <code>Cleveland dotplot</code> is a handy variation, allowing to compare the value of
          2 numeric values for each group. This kind of data could also be visualized using a
          grouped or stack <a href="/graph/barplot.html">barplot</a>. However, this representation
          is less cluttered and way easier to read. Use it if you have 2 subgroups per group.
        </p>

        <Code lang="r">{`# Create data (could be way easier but it's late)
value1 <- abs(rnorm(26))*2
don <- data.frame(
  x=LETTERS[1:26],
  value1=value1,
  value2=value1+1+rnorm(26, sd=1)
  ) %>%
  rowwise() %>%
  mutate( mymean = mean(c(value1,value2) )) %>%
  arrange(mymean) %>%
  mutate(x=factor(x, x))


# With a bit more style
ggplot(don) +
  geom_segment( aes(x=x, xend=x, y=value1, yend=value2), color="grey") +
  geom_point( aes(x=x, y=value1), color=rgb(0.2,0.7,0.1,0.8), size=3 ) +
  geom_point( aes(x=x, y=value2), color=rgb(0.7,0.2,0.1,0.8), size=3 ) +
  coord_flip()+
  theme_ipsum() +
  theme(
    legend.position = "none",
    panel.border = element_blank(),
  ) +
  xlab("") +
  ylab("Value of Y")`}</Code>

        <figure>
          <img
            src="/figures/graph/lollipop/3.webp"
            alt="Lollipop chart – chart example"
            width={672}
            height={672}
            loading="lazy"
          />
        </figure>

        <p>
          <em>Note</em>: The term <code>cleveland dotplot</code> does not look to be very well
          defined as far as I know, and looks to be sometimes used for{" "}
          <a href="http://www.joyce-robbins.com/blog/2016/06/02/datavis-with-rdrawing-a-cleveland-dot-plot-with-ggplot2/">
            dotplots
          </a>{" "}
          or{" "}
          <a href="https://link.springer.com/chapter/10.1007/978-3-319-53019-2_11">
            classic lollipop
          </a>{" "}
          plots as well. The previous chart is also called{" "}
          <a href="http://datavizproject.com/data-type/dumbbell-plot/">Dumbbell dot plots</a>.
          Further investigation is needed on this matter and any feedback is more than welcome.
        </p>

        <p>
          Note that with a number of subgroups between 3 and ~7 this type of lollipop plot is nice
          as well:
        </p>

        <Code lang="r">{`# Create data (could be way easier but it's late)
value1 <- abs(rnorm(6))*2
don <- data.frame(
  x=LETTERS[1:24],
  val=c( value1, value1+1+rnorm(6, 14,1) ,value1+1+rnorm(6, sd=1) ,value1+1+rnorm(6, 12, 1) ),
  grp=rep(c("grp1", "grp2", "grp3", "grp4"), each=6)
  ) %>%
  arrange(val) %>%
  mutate(x=factor(x, x))


# With a bit more style
ggplot(don) +
  geom_segment( aes(x=x, xend=x, y=0, yend=val), color="grey") +
  geom_point( aes(x=x, y=val, color=grp), size=3 ) +
  coord_flip()+
  theme_ipsum() +
  theme(
    legend.position = "none",
    panel.border = element_blank(),
    panel.spacing = unit(0.1, "lines"),
    strip.text.x = element_text(size = 8)
  ) +
  xlab("") +
  ylab("Value of Y") +
  facet_wrap(~grp, ncol=1, scale="free_y")`}</Code>

        <figure>
          <img
            src="/figures/graph/lollipop/4.webp"
            alt="Lollipop chart – chart example"
            width={672}
            height={672}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="mistake" title="Common mistakes">
        <ul>
          {" "}
          <li>
            <p>
              <a href="/caveat/order_data.html">Order your groups</a>. If the levels of your
              categoric variable have no obvious order, order the bars following their values.
            </p>
          </li>{" "}
          <li>
            <p>
              If for whatever reason your bars must remain unsorted, it is probably better to use a
              barplot instead. Lollipop would be harder to read.
            </p>
          </li>{" "}
          <li>
            <p>
              Several values per group? <a href="/caveat/error_bar.html">Don’t use a lollipop</a>.
              Even with error bars, it hides information and other type of graphic like{" "}
              <a href="/caveat/boxplot.html">boxplot</a> or <a href="/graph/violin.html">violin</a>{" "}
              are much more appropriate.
            </p>
          </li>{" "}
          <li>
            <p>Think about the horizontal verison, it makes the labels easier to read.</p>
          </li>{" "}
        </ul>
      </Section>

      <Section id="related" title="Related">
        <RelatedGrid>
          <RelatedCard href="/graph/barplot.html" image="/img/section/BarSmall.png" title="Barplot">
            Represents the value of entities using bar of various length.
          </RelatedCard>
          <RelatedCard
            href="/graph/parallel.html"
            image="/img/section/Parallel1Small.png"
            title="Parallel coord."
          >
            Compare samples for several numeric values.
          </RelatedCard>
          <RelatedCard
            href="/graph/wordcloud.html"
            image="/img/section/WordCloudSmall.png"
            title="Wordcloud"
          >
            A visual representation of text data, where word size is relative to their frequency.
          </RelatedCard>
          <RelatedCard
            href="/graph/circularbarplot.html"
            image="/img/section/CircularBarplotSmall.png"
            title="Circular barplot"
          >
            A barplot where the bars are displayed in a circular way. It is useful when you have
            many groups.
          </RelatedCard>
        </RelatedGrid>
      </Section>

      <Section id="code" title="Build your own">
        <p>
          The <a href="https://www.r-graph-gallery.com/lollipop-plot.html">R</a>,{" "}
          <a href="https://www.python-graph-gallery.com/lollipop-plot/">Python</a>,{" "}
          <a href="https://www.react-graph-gallery.com/lollipop-plot">React</a> and{" "}
          <a href="https://d3-graph-gallery.com/lollipop.html">D3</a> graph galleries are 4 websites
          providing hundreds of chart example, always providing the reproducible code. Click the
          button below to see how to build the chart you need with your favorite programing
          language.
        </p>

        <p>
          <ButtonLink href="https://www.r-graph-gallery.com/lollipop-plot.html">
            R graph gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://python-graph-gallery.com/lollipop-plot/">
            Python gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://www.react-graph-gallery.com/lollipop-plot">
            React gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://d3-graph-gallery.com/lollipop.html">D3 gallery</ButtonLink>
        </p>
      </Section>
    </GraphLayout>
  );
}
