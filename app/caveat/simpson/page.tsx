import { CaveatLayout } from "@/components/layouts";
import { Code, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/caveat/simpson.html",
  title: "The simpson's paradox | Dataviz pitfall gallery",
  description:
    "Simpson’s paradox, or the Yule–Simpson effect, is a phenomenon in probability and statistics, in which a trend appears in several different groups of data…",
  image: "/img/mistake/simpson.png",
});

export default function Page() {
  return (
    <CaveatLayout title="The simpson's paradox" images={["/img/mistake/simpson.png"]}>
      <Section id="definition" title="Definition">
        <blockquote>
          <p>
            Simpson’s paradox, or the Yule–Simpson effect, is a phenomenon in probability and
            statistics, in which a trend appears in several different groups of data but disappears
            or reverses when these groups are combined. It is sometimes given the descriptive title
            reversal paradox or amalgamation paradox.
          </p>
        </blockquote>
        <p>
          <a href="https://en.wikipedia.org/wiki/Simpson%27s_paradox">Wikipedia</a>
        </p>
      </Section>

      <Section id="example" title="Example">
        <p>
          Let’s consider the following <a href="/graph/scatter.html">scatterplot</a> built from
          dummy data.
        </p>

        <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(babynames)
library(viridis)

# Create data
a <- data.frame( x = rnorm(100), y = rnorm(100)) %>% mutate(y = y-x/2)
b <- a %>% mutate(x=x+2) %>% mutate(y=y+2)
c <- a %>% mutate(x=x+4) %>% mutate(y=y+4)
data <- do.call(rbind, list(a,b,c))
data <- data %>% mutate(group=rep(c("A", "B", "C"), each=100))

ggplot(data, aes(x=x, y=y)) +
  geom_point( size=2) +
  theme_ipsum()`}</Code>

        <figure>
          <img
            src="/figures/caveat/simpson/1.webp"
            alt="The simpson's paradox – chart example"
            width={672}
            loading="lazy"
          />
        </figure>

        <p>
          Here, it totally makes sense to state that there is a <code>positive correlation</code>{" "}
          between the X and the Y axis. Actually, the <code>Pearson</code> correlation coefficient
          is 0.55.
        </p>

        <p>
          However, let’s check what happens if we consider the <code>groups</code> present in the
          dataset (3 groups):
        </p>

        <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(babynames)
library(viridis)

# Create data
a <- data.frame( x = rnorm(100), y = rnorm(100)) %>% mutate(y = y-x/2)
b <- a %>% mutate(x=x+2) %>% mutate(y=y+2)
c <- a %>% mutate(x=x+4) %>% mutate(y=y+4)
data <- do.call(rbind, list(a,b,c))
data <- data %>% mutate(group=rep(c("A", "B", "C"), each=100))

ggplot(data, aes(x=x, y=y, color=group)) +
  geom_point( size=3) +
  scale_color_viridis(discrete=TRUE) +
  theme_ipsum()`}</Code>

        <figure>
          <img
            src="/figures/caveat/simpson/2.webp"
            alt="The simpson's paradox – chart example"
            width={672}
            loading="lazy"
          />
        </figure>

        <p>
          Here, we understand that the positive correlation was due to a difference{" "}
          <code>between groups</code>. Actually, the correlation coefficient is even negative if
          each group is considered separately.
        </p>

        <p>
          This is the Sympson’s paradox: the trend between two different variables reverses when a
          third variable is included.
        </p>
      </Section>

      <Section id="impact-on-dataviz" title="Impact on dataviz">
        <p>
          The impact is strong for data analytics and dataviz. The Simpson’s paradox can lead to a
          wrong conclusions with spurious correlation. Always double check the potential effect of
          confounding variables available in your dataset.
        </p>
      </Section>

      <Section id="going-further" title="Going further">
        <ul>
          {" "}
          <li>
            Simpson’s Paradox - Correlations and Slopes. By{" "}
            <a href="http://rstudio-pubs-static.s3.amazonaws.com/155188_cc8b400f7d134a3e9de6cbfb8320e1e0.html">
              Prof. Eric A. Suess
            </a>
            . It gives a nice real life example based on book price and number of pages in books.
          </li>{" "}
          <li>
            The <a href="https://en.wikipedia.org/wiki/Simpson%27s_paradox">Wikipedia</a> page
          </li>{" "}
        </ul>
      </Section>
    </CaveatLayout>
  );
}
