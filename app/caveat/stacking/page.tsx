import { CaveatLayout } from "@/components/layouts";
import { Code, Section, Widget } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/caveat/stacking.html",
  title: "The issue with stacking | Dataviz pitfall gallery",
  description:
    "Stacking is a process where a chart is broken up across more than one categoric variables which make up the whole. Each item of the categoric variable is…",
  image: "/img/mistake/stacking.png",
});

export default function Page() {
  return (
    <CaveatLayout title="The issue with stacking" images={["/img/mistake/stacking.png"]}>
      <Section id="what-is-stacking" title="What is stacking">
        <p>
          <code>Stacking</code> is a process where a chart is broken up across more than one
          categoric variables which make up the whole. Each item of the categoric variable is
          represented by a shaded area. These areas are stacked on top of one another.
        </p>

        <p>
          Here is an example with a <a href="/graph/stackedarea.html">stacked area chart</a>. It
          shows the evolution of baby name occurence in the US between 1880 and 2015. Six first
          names are represented on top of one another.
        </p>

        <Code lang="r">{`# Libraries
library(tidyverse)
library(babynames)
library(streamgraph)
library(viridis)
library(hrbrthemes)
library(plotly)

# Load dataset from github
data <- babynames %>%
  filter(name %in% c("Amanda", "Jessica",    "Patricia", "Deborah",   "Dorothy",  "Helen")) %>%
  filter(sex=="F")

# Plot
p <- data %>%
  ggplot( aes(x=year, y=n, fill=name, text=name)) +
    geom_area( ) +
    scale_fill_viridis(discrete = TRUE) +
    theme(legend.position="none") +
    ggtitle("Popularity of American names in the previous 30 years") +
    theme_ipsum() +
    theme(legend.position="none")
ggplotly(p, tooltip="text")`}</Code>

        <Widget src="/widgets/caveat/stacking-1.html" height={480} width={768} />

        <p>
          <u>
            <em>Note</em>
          </u>
          : This graphic is interactive: hover an area to know the underlying name.
        </p>

        <p>
          <code>Stacking</code> is a common practice in dataviz. It occurs on three main types of
          graphic that are highly related: area charts, barplots and streamcharts:
        </p>

        <div className="grid gap-6 md:grid-cols-12">
          {" "}
          <div className="md:col-span-6">
            {" "}
            <a href="/graph/stackedarea.html">
              {" "}
              <img
                width={114}
                height={114}
                src="/figures/caveat/stacking/1.webp"
                alt="The issue with stacking – chart example"
                loading="lazy"
              />{" "}
            </a>{" "}
          </div>{" "}
          <div className="md:col-span-6">
            {" "}
            <a href="/graph/streamgraph.html">
              {" "}
              <img
                width={114}
                height={114}
                src="/figures/caveat/stacking/2.webp"
                alt="The issue with stacking – chart example"
                loading="lazy"
              />{" "}
            </a>{" "}
          </div>{" "}
          <div className="md:col-span-6">
            {" "}
            <a href="/graph/barplot.html">
              {" "}
              <img
                width={114}
                height={114}
                src="/figures/caveat/stacking/3.webp"
                alt="The issue with stacking – chart example"
                loading="lazy"
              />{" "}
            </a>{" "}
          </div>{" "}
        </div>
      </Section>

      <Section id="heaven-or-hell" title="Heaven or Hell?">
        <p>
          The efficiency of stacked area graph is discussed and it must be used with care. To put it
          in a nutshell:
        </p>
        <ul>
          {" "}
          <li>
            <p>
              stacked graphs are <code>appropriate</code> to study the{" "}
              <code>evolution of the whole</code> and the <code>relative proportions</code> of each
              group. Indeed, the top of the areas allows to visualize how the whole behaves, like
              for a classic area chart. In the previous graphic, it is easy to see that in 1920,
              Helen and Dorothy were common names but the 4 other names barely existed.
            </p>
          </li>{" "}
          <li>
            <p>
              however they are <code>not appropriate</code> to study the{" "}
              <code>evolution of each</code> individual group. This is due to 2 main reasons. First,
              all except the since they do not have a flat <code>baseline</code>, it is very hard to
              read their values at each tile stamp.
            </p>
          </li>{" "}
        </ul>
      </Section>

      <Section id="example-mental-arithmetic" title="Example: mental arithmetic">
        <p>
          In the previous graphic, try to find out how many times the name Dorothy was given in
          1920.
        </p>

        <p>
          It is not trivial to find it out using the previous chart. You have to mentally do 75000 -
          37000 which is hard. If you want to convey a message efficiently, you don’t want the
          audience to perform mental arithmetic.
        </p>
      </Section>

      <Section id="example-optical-illusion." title="Example: optical illusion.">
        <blockquote>
          <p>
            Important note: this section is inspired from{" "}
            <a href="http://www.leancrew.com/all-this/2011/11/i-hate-stacked-area-charts/">
              this post
            </a>{" "}
            by Dr. Drang.
          </p>
        </blockquote>
        <p>
          Dr Drang gives this nice example. Consider the graphic below, and try to visualize how the
          3 categories evolved on the period:
        </p>

        <Code lang="r">{`# create dummy data
don <- data.frame(
  x = rep(seq(2000,2005), 3),
  value = c(  75, 73, 68, 57, 36, 0, 15, 16, 17, 18, 19, 20, 10, 11, 15, 25, 45, 80),
  group = rep(c("A", "B", "C"), each=6)
)

#plot
don %>%
  ggplot( aes(x=x, y=value, fill=group)) +
    geom_area( ) +
    scale_fill_viridis(discrete = TRUE) +
    theme(legend.position="none") +
    theme_ipsum() +
    theme(legend.position="none")`}</Code>

        <figure>
          <img
            src="/figures/caveat/stacking/4.webp"
            alt="The issue with stacking – chart example"
            width={576}
            height={480}
            loading="lazy"
          />
        </figure>

        <p>
          It looks obvious that the yellow category increased, the purple decreased, and the green…
          is harder to read. At a first glance it looks like it is slightly decreasing I would say.
        </p>

        <p>Now let’s plot just the green group to find out:</p>

        <Code lang="r">{`#plot
don %>%
  filter(group=="B") %>%
  ggplot( aes(x=x, y=value, fill=group)) +
    geom_area( fill="#22908C") +
    theme(legend.position="none") +
    theme_ipsum() +
    theme(legend.position="none")`}</Code>

        <p>
          <img
            src="/figures/caveat/stacking/5.webp"
            alt="The issue with stacking – chart example"
            width={576}
            height={480}
            loading="lazy"
          />{" "}
          It looks like we were quite <code>wrong</code>. This is due to an optical illusion. The
          human eye is not performant to assess that kind a visual patterns, and this is why it must
          be avoided.
        </p>
      </Section>

      <Section id="workaround" title="Workaround">
        <p>
          If you have just a <code>few categories</code>, I would suggest to build a line chart.
          Here it is easy to follow a category and understand how it evolved accurately.
        </p>

        <Code lang="r">{`data %>%
  ggplot( aes(x=year, y=n, group=name, color=name)) +
    geom_line() +
    scale_color_viridis(discrete = TRUE) +
    theme(legend.position="none") +
    ggtitle("Popularity of American names in the previous 30 years") +
    theme_ipsum()`}</Code>

        <figure>
          <img
            src="/figures/caveat/stacking/6.webp"
            alt="The issue with stacking – chart example"
            width={768}
            height={480}
            loading="lazy"
          />
        </figure>

        <p>
          However, this solution is not suitable if you have <code>many categories</code>. Indeed,
          it would result in a spaghetti chart that is very hard to read. You can read more about
          this here.
        </p>

        <p>
          Instead I would suggest to use `small multiple: here each category has its own section in
          the graphic. It makes easy to understand the pattern of each category.
        </p>

        <Code lang="r">{`data %>%
  ggplot( aes(x=year, y=n, group=name, fill=name)) +
    geom_area() +
    scale_fill_viridis(discrete = TRUE) +
    theme(legend.position="none") +
    ggtitle("Popularity of American names in the previous 30 years") +
    theme_ipsum() +
    theme(
      legend.position="none",
      panel.spacing = unit(0.1, "lines"),
      strip.text.x = element_text(size = 8)
    ) +
    facet_wrap(~name, scale="free_y")`}</Code>

        <figure>
          <img
            src="/figures/caveat/stacking/7.webp"
            alt="The issue with stacking – chart example"
            width={768}
            height={480}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="going-further" title="Going further">
        <ul>
          {" "}
          <li>
            Stacked Area Graphs Are Not Your Friend by{" "}
            <a href="http://www.everydayanalytics.ca/2014/08/stacked-area-graphs-are-not-your-friend.html">
              Everyday analytics
            </a>
          </li>{" "}
          <li>
            Quantitative Displays for Combining Time-Series and Part-to-Whole Relationships by{" "}
            <a href="http://www.perceptualedge.com/articles/visual_business_intelligence/displays_for_combining_time-series_and_part-to-whole.pdf">
              Stephen Few
            </a>
          </li>{" "}
          <li>
            I hate stacked area charts by{" "}
            <a href="http://www.leancrew.com/all-this/2011/11/i-hate-stacked-area-charts/">
              Dr Drang
            </a>
          </li>{" "}
        </ul>
      </Section>
    </CaveatLayout>
  );
}
