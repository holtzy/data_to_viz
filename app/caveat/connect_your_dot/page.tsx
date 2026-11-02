import { CaveatLayout } from "@/components/layouts";
import { Code, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/caveat/connect_your_dot.html",
  title: "Connect your dots when the X-axis is ordered | Dataviz pitfall gallery",
  description:
    "Let’s consider a dataset composed by two numeric variables. The x-axis represents years, and the y-axis the yearly sunspot numbers from 1749 to 1983.…",
  image: "/img/mistake/connect_your_dot.png",
});

export default function Page() {
  return (
    <CaveatLayout
      title="Connect your dots when the X-axis is ordered"
      images={["/img/mistake/connect_your_dot.png"]}
    >
      <p>
        Let’s consider a dataset composed by two numeric variables. The x-axis represents years, and
        the y-axis the yearly sunspot numbers from 1749 to 1983. (
        <a href="https://en.wikipedia.org/wiki/Sunspot">Sunspots</a> are temporary phenomena on the
        Sun’s photosphere that appear as spots darker than the surrounding areas.). The original
        dataset comes from this{" "}
        <a href="https://onlinelibrary.wiley.com/doi/abs/10.1002/asna.19622860613">
          scientific publication
        </a>
        , related by <a href="https://www.springer.com/gp/book/9781461295631">Andrews et al.</a>.
      </p>

      <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)

# Load dataset: comes with R
data <- data.frame(
  Year = as.numeric(time(sunspot.year)),
  Sunspots = as.numeric(sunspot.year)
)

# Plot
data %>%
  head(100) %>%
  ggplot( aes(x=Year, y=Sunspots)) +
    geom_point() +
    ggtitle("Number of sunspots per year") +
    theme_ipsum() +
    theme(
      plot.title = element_text(size=12)
    )`}</Code>

      <figure>
        <img
          src="/figures/caveat/connect_your_dot/1.webp"
          alt="Connect your dots when the X-axis is ordered – chart example"
          width={960}
          height={480}
          loading="lazy"
        />
      </figure>

      <p>
        Here, it is hard to see any trend. It looks like no relationships exist between time and
        sunspot number.
      </p>

      <Section id="connect-your-lines" title="Connect your lines">
        <p>However, if your x-axis is ordered, like for time, you should connect dots.</p>

        <p>
          Let’s take the exact same graphic, except that we connect dots together with segments. We
          switch from a <a href="/graph/scatter.html">scatter plot</a> to a{" "}
          <a href="/graph/line.html">line plot</a>.
        </p>

        <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)

# Load dataset: comes with R
data <- data.frame(
  Year = as.numeric(time(sunspot.year)),
  Sunspots = as.numeric(sunspot.year)
)

# Plot
data %>%
  head(100) %>%
  ggplot( aes(x=Year, y=Sunspots)) +
    geom_line() +
    ggtitle("Number of sunspots per year") +
    theme_ipsum() +
    theme(
      plot.title = element_text(size=12)
    )`}</Code>

        <figure>
          <img
            src="/figures/caveat/connect_your_dot/2.webp"
            alt="Connect your dots when the X-axis is ordered – chart example"
            width={960}
            height={480}
            loading="lazy"
          />
        </figure>

        <p>
          Now, it is obvious that a pattern exists. The sunspot numbers follow this nearly periodic
          11-year change in the sun’s activity, making the line go up and down quite regularly. It
          is also clear that some spikes are higher than others, with maximum smoothed sunspot
          numbers ranging from approximately 50 to 180.
        </p>
      </Section>

      <Section id="going-further" title="Going further">
        <ul>
          {" "}
          <li>
            Have a look at our page on <a href="/caveat/aspect_ratio.html">aspect ratio</a>; aspect
            ratio can have a strong impact on the{" "}
            <a href="/caveat/aspect_ratio.html">readability</a> of your line plot.
          </li>{" "}
        </ul>
      </Section>
    </CaveatLayout>
  );
}
