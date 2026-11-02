import { CaveatLayout } from "@/components/layouts";
import { Code, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/caveat/area_hard.html",
  title: "Area is a poor metaphor | Dataviz pitfall gallery",
  description:
    "The human eye does not perform well when it has to translate areas to numeric values. Let’s consider the following five bubbles. Try to rank them by…",
  image: "/img/mistake/bubble_hard.png",
});

export default function Page() {
  return (
    <CaveatLayout title="Area is a poor metaphor" images={["/img/mistake/bubble_hard.png"]}>
      <Section id="areas-as-a-measure" title="Areas as a measure">
        <p>
          The human eye does not perform well when it has to translate areas to numeric values.
          Let’s consider the following five bubbles. Try to rank them by decreasing area. You will
          probably agree that this is possible, but takes some time.
        </p>

        <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)

# create 3 data frame:
data <- data.frame( name=letters[1:5], value=c(17,24,20,15,27) )

# Plot
ggplot(data, aes(x=name, y=1, size=value)) +
  geom_point(color="#69b3a2") +
  geom_text(aes(label=name), size=5) +
  scale_size_continuous(range=c(17,24)) +
  theme_void() +
  theme(
    legend.position="none"
  ) +
  ylim(0.9,1.1)`}</Code>

        <figure>
          <img
            src="/figures/caveat/area_hard/1.webp"
            alt="Area is a poor metaphor – chart example"
            width={672}
            height={96}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="same-info-easier-to-read" title="Same info, easier to read">
        <p>Now, let’s represent the exact same values using bars instead:</p>

        <Code lang="r">{`# Plot
ggplot(data, aes(x=name, y=value)) +
  geom_bar(stat="identity", fill="#69b3a2") +
  theme_ipsum()`}</Code>

        <figure>
          <img
            src="/figures/caveat/area_hard/2.webp"
            alt="Area is a poor metaphor – chart example"
            width={672}
            height={480}
            loading="lazy"
          />
        </figure>

        <p>That is much easier, is’nt it?</p>

        <p>
          This does not mean that area must never been used to represent a numeric variable. It
          means that other shapes and techniques must be before using area. For instance, the{" "}
          <a href="/graph/bubble.html">bubble chart</a> does a good job representing the values of 3
          numeric variables.
        </p>
      </Section>

      <Section id="going-further" title="Going further">
        <ul>
          {" "}
          <li>
            Using bubbles: <a href="/caveat/radius_or_area.html">scaling to radius or area</a>?
          </li>{" "}
          <li>
            Data visualization: basic principles.{" "}
            <a href="http://paldhous.github.io/ucb/2016/dataviz/week2.html">link</a>
          </li>{" "}
        </ul>
      </Section>
    </CaveatLayout>
  );
}
