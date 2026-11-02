import { CaveatLayout } from "@/components/layouts";
import { Code, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/caveat/annotation.html",
  title: "Annotation is crucial for your dataviz | Dataviz pitfall gallery",
  description:
    "Annotation is a crucial component of a good dataviz. It can turn a boring graphic into an interesting and insightful way to convey information. Dataviz is…",
  image: "/img/mistake/annotate.png",
});

export default function Page() {
  return (
    <CaveatLayout
      title="Annotation is crucial for your dataviz"
      images={["/img/mistake/annotate.png"]}
    >
      <p>
        Annotation is a crucial component of a good dataviz. It can turn a boring graphic into an
        interesting and insightful way to convey information. Dataviz is often separated in two main
        types: <code>exploratory</code> and <code>explanatory</code> analysis. Annotation is used
        for the second type.
      </p>

      <p>
        Our current attention span for looking at things online is, on average, less than five
        seconds. So if you can’t grab someone’s attention within five seconds, you’ve likely lost
        your viewer. Adding accurate annotation can greatly help to grab audience attention. Use
        keywords, shapes, colors and other visuals to help them go straight to the point.
      </p>

      <p>
        Annotation is a general concept, and hundreds of different ways to annotate a chart exist,
        depending on the <code>context</code>. Let’s study a few examples.
      </p>

      <Section id="example-1" title="Example 1">
        <p>
          The main danger when plotting a line chart is to end up with a spaghetti chart: having too
          many groups often results in a confusing figure where it is hard to detect any pattern.
          This topic is well described here.
        </p>

        <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(babynames)
library(viridis)

# Load dataset from github
data <- babynames %>%
  filter(name %in% c("Mary","Emma", "Ida", "Ashley", "Amanda", "Jessica",    "Patricia", "Linda", "Deborah",   "Dorothy", "Betty", "Helen")) %>%
  filter(sex=="F")

# Plot
data %>%
  ggplot( aes(x=year, y=n, group=name, color=name)) +
    geom_line() +
    scale_color_viridis(discrete = TRUE) +
    theme(
      legend.position="none",
      plot.title = element_text(size=14)
    ) +
    ggtitle("A spaghetti chart of baby names popularity") +
    theme_ipsum()`}</Code>

        <figure>
          <img
            src="/figures/caveat/annotation/1.webp"
            alt="Annotation is crucial for your dataviz – chart example"
            width={960}
            loading="lazy"
          />
        </figure>

        <p>
          Instead of presenting this graphic to your audience, you probably want to highlight your
          main point. Let’s say that you’re specifically interested in the evolution of Amanda. Then
          it makes more sense to build something like this:
        </p>

        <Code lang="r">{`data %>%
  mutate( highlight=ifelse(name=="Amanda", "Amanda", "Other")) %>%
  ggplot( aes(x=year, y=n, group=name, color=highlight, size=highlight)) +
    geom_line() +
    scale_color_manual(values = c("#69b3a2", "lightgrey")) +
    scale_size_manual(values=c(1.5,0.2)) +
    theme(legend.position="none") +
    ggtitle("Popularity of American names in the previous 30 years") +
    theme_ipsum() +
    geom_label( x=1990, y=55000, label="Amanda reached 3550\\nbabies in 1970", size=4, color="#69b3a2") +
    theme(
      legend.position="none",
      plot.title = element_text(size=14)
)`}</Code>

        <figure>
          <img
            src="/figures/caveat/annotation/2.webp"
            alt="Annotation is crucial for your dataviz – chart example"
            width={960}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="example-2" title="Example 2">
        <p>
          Here is a second example created by{" "}
          <a href="https://twitter.com/jburnmurdoch">John Burn-Murdoch</a> for the{" "}
          <a href="https://www.ft.com/content/b6dbf34e-c987-11e7-aa33-c63fdc9b8c6c">
            financial time
          </a>
          . I found it on a website that I highly recommand:{" "}
          <a href="http://www.datavizdoneright.com/2017/12/blackpool.html">Dataviz Done Right</a>
        </p>

        <p>Here you can see that annotation plays a key role:</p>
        <ul>
          {" "}
          <li>the Blackpool line is slightly thicker so that it stands out a bit more</li>{" "}
          <li>
            the histograms are interesting because of the annotation. Note that the color is
            consistent between graphics.
          </li>{" "}
          <li>
            the values of the gaps at the start and end of the line are written so that the reader
            doesn’t have to do the math in their head.
          </li>{" "}
        </ul>
        <div className="text-center">
          {" "}
          <img src="/figures/caveat/annotation/3.webp" alt="img" width={500} loading="lazy" />{" "}
        </div>

        <div className="text-center">
          {" "}
          <a href="http://www.datavizdoneright.com/2017/12/blackpool.html">Source</a>{" "}
        </div>
      </Section>

      <Section id="going-further" title="Going further">
        <ul>
          {" "}
          <li>
            Making Annotations First-Class Citizens in Data Visualization. By Elijah Meeks on{" "}
            <a href="https://medium.com/@Elijah_Meeks/making-annotations-first-class-citizens-in-data-visualization-21db6383d3fe">
              Medium
            </a>
          </li>{" "}
          <li>
            About the 5 seconds rule on{" "}
            <a href="https://www.tableau.com/about/blog/2016/5/5-tips-effective-visual-data-communication-54174">
              tableau blog
            </a>
          </li>{" "}
          <li>
            Improving data visualization: Where do I put all those annotations? by{" "}
            <a href="https://www.usaidassist.org/blog/improving-data-visualization-where-do-i-put-all-those-annotations">
              Simon Hiltebeitel
            </a>
          </li>{" "}
          <li>
            How to Improve Your Data Visualizations with Annotations. By Tim Brock on{" "}
            <a href="https://www.infragistics.com/community/blogs/b/tim_brock/posts/annotate-wisely">
              Infragistics
            </a>
          </li>{" "}
        </ul>
      </Section>
    </CaveatLayout>
  );
}
