import { GraphLayout } from "@/components/layouts";
import { ButtonLink, Code, RelatedCard, RelatedGrid, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/graph/donut.html",
  title: "Donut plot – from Data to Viz",
  description:
    "A donut plot is a pie chart with a hole in the center. It’s a way to show the distribution of a categorical variable, but it can be a little bit tricky to…",
  image: "/img/section/DougnutSmall.png",
});

export default function Page() {
  return (
    <GraphLayout title="Donut plot" images={["/img/section/DougnutSmall.png"]}>
      <Section id="definition" title="Definition">
        <p>
          A donut plot is a pie chart with a hole in the center. It’s a way to show the distribution
          of a categorical variable, but it can be a little bit tricky to read. It’s not recommended
          to use it if you have a large number of categories.
        </p>

        <p>
          It’s similar to a pie chart, but it’s easier to compare the size of the slices. It’s also
          possible to add a number inside each slice to show the exact proportion.
        </p>

        <Code lang="r">{`# load library
library(ggplot2)

# Create test data.
data <- data.frame(
  category=c("A", "B", "C"),
  count=c(10, 60, 30)
)

# Compute percentages
data$fraction <- data$count / sum(data$count)

# Compute the cumulative percentages (top of each rectangle)
data$ymax <- cumsum(data$fraction)

# Compute the bottom of each rectangle
data$ymin <- c(0, head(data$ymax, n=-1))

# Compute label position
data$labelPosition <- (data$ymax + data$ymin) / 2

# Compute a good label
data$label <- paste0(data$category, "\\n value: ", data$count)

# Make the plot
ggplot(data, aes(ymax=ymax, ymin=ymin, xmax=4, xmin=3, fill=category)) +
  geom_rect() +
  geom_label( x=3.5, aes(y=labelPosition, label=label), size=6) +
  scale_fill_brewer(palette=4) +
  coord_polar(theta="y") +
  xlim(c(2, 4)) +
  theme_void() +
  theme(legend.position = "none")`}</Code>

        <figure>
          <img
            src="/figures/graph/donut/1.webp"
            alt="Donut plot – chart example"
            width={672}
            height={480}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="what-for" title="What for?">
        <p>
          <strong>Donut plots</strong> are used to visualize the <em>distribution</em> of{" "}
          <strong>categorical data</strong>. They are particularly useful when you want to highlight
          the <em>proportions</em> of different categories within a dataset. The central hole of the
          donut plot can be used to display additional information, such as{" "}
          <code>total values</code> or <code>percentages</code>, making it easier to interpret the
          data at a glance.
        </p>

        <p>
          Compared to <strong>pie charts</strong>, donut plots provide a more effective visual
          comparison of <em>category sizes</em> due to the space in the center, which allows for a
          better understanding of the proportions. However, they are best suited for datasets with a
          limited number of categories, as too many slices can make the plot difficult to read.
        </p>

        <p>
          <strong>Key purposes</strong> of using a <strong>donut plot</strong> include:
        </p>
        <ul>
          {" "}
          <li>Highlighting the proportional distribution of categories within a dataset.</li>{" "}
          <li>Comparing the relative sizes of different categories.</li>{" "}
          <li>
            Displaying <code>additional information</code> in the center of the plot for enhanced
            data interpretation.
          </li>{" "}
          <li>
            Providing a visually appealing alternative to pie charts for presentations and reports.
          </li>{" "}
        </ul>
      </Section>

      <Section id="variation" title="Variation">
        <p>The donut plot is a variation of different charts. Here are some examples:</p>
        <ul>
          {" "}
          <li>
            <a href="/caveat/pie.html">Pie chart</a>: The most basic form of a donut plot. It’s a
            circle divided into slices to illustrate numerical proportions.
          </li>{" "}
          <li>
            <a href="/graph/barplot.html">Bar chart</a>: A bar chart is a chart with rectangular
            bars with lengths proportional to the values they represent.
          </li>{" "}
        </ul>
      </Section>

      <Section id="related" title="Related">
        <RelatedGrid>
          <RelatedCard
            href="/graph/lollipop.html"
            image="/img/section/LollipopSmall.png"
            title="Lollipop plot"
          >
            A fancy barplot where bars are replaced with a dot and a segment. Try it and adopt it.
          </RelatedCard>
          <RelatedCard href="/caveat/pie.html" image="/img/section/PieSmall.png" title="Pie chart">
            A circular statistical graphic, which is divided into slices to illustrate numerical
            proportions.
          </RelatedCard>
          <RelatedCard href="/graph/barplot.html" image="/img/section/BarSmall.png" title="Barplot">
            A chart with rectangular bars with lengths proportional to the values they represent.
            Use it to compare values.
          </RelatedCard>
          <RelatedCard
            href="/caveat/boxplot.html"
            image="/img/section/Box1Small.png"
            title="Boxplot"
          >
            Summarize the distribution of several numeric variables using boxes. Use it if you have
            a limited dataset size.
          </RelatedCard>
        </RelatedGrid>
      </Section>

      <Section id="code" title="Build your own">
        <p>
          The <a href="https://r-graph-gallery.com/doughnut-plot.html">R</a>,{" "}
          <a href="https:/python-graph-gallery.com/donut-plot/">Python</a>,{" "}
          <a href="https://www.react-graph-gallery.com/donut">React</a> and{" "}
          <a href="https://d3-graph-gallery.com/donut.html">D3</a> graph galleries are 4 websites
          providing hundreds of chart example, always providing the reproducible code. Click the
          button below to see how to build the chart you need with your favorite programing
          language.
        </p>

        <p>
          <ButtonLink href="https://r-graph-gallery.com/doughnut-plot.html">
            R graph gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://python-graph-gallery.com/donut-plot/">
            Python gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://www.react-graph-gallery.com/donut">React gallery</ButtonLink>{" "}
          <ButtonLink href="https://d3-graph-gallery.com/donut.html">D3 gallery</ButtonLink>
        </p>
      </Section>
    </GraphLayout>
  );
}
