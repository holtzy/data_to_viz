import { CaveatLayout } from "@/components/layouts";
import { Code, Section, Widget } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/caveat/aspect_ratio.html",
  title: "Mind the aspect ratio | Dataviz pitfall gallery",
  description:
    "Aspect ratio is defined as the ratio of the width to the height of a graphic. It can have a strong impact on the insights gained from your graphic.",
  image: "/img/mistake/aspect_ratio.png",
});

export default function Page() {
  return (
    <CaveatLayout title="Mind the aspect ratio" images={["/img/mistake/aspect_ratio.png"]}>
      <p>
        <code>Aspect ratio</code> is defined as the ratio of the width to the height of a graphic.
        It can have a strong impact on the insights gained from your graphic.
      </p>

      <p>
        Here is an example with a line plot showing yearly sunspot numbers from 1749 to 1983. (
        <a href="https://en.wikipedia.org/wiki/Sunspot">Sunspots</a> are temporary phenomena on the
        Sun’s photosphere that appear as spots darker than the surrounding areas.). The dataset
        comes from this{" "}
        <a href="https://onlinelibrary.wiley.com/doi/abs/10.1002/asna.19622860613">
          scientific publication
        </a>{" "}
        originally, related by{" "}
        <a href="https://www.springer.com/gp/book/9781461295631">Andrews et al.</a>.
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
  ggplot( aes(x=Year, y=Sunspots)) +
    geom_line() +
    ggtitle("Number of sunspots per year") +
    theme_ipsum() +
    theme(
      plot.title = element_text(size=12)
    )`}</Code>

      <figure>
        <img
          src="/figures/caveat/aspect_ratio/1.webp"
          alt="Mind the aspect ratio – chart example"
          width={672}
          loading="lazy"
        />
      </figure>

      <p>
        The <a href="https://en.wikipedia.org/wiki/Solar_cycle">solar cycle</a> is quite obvious on
        this figure. The sunspot numbers follow this periodic 11-year change in the sun’s activity,
        making the line go up and down quite regularly. It is also clear that some spikes are higher
        than others, with maximum smoothed sunspot numbers ranging from 50 to 180.
      </p>

      <Section id="playing-with-the-aspect-ratio" title="Playing with the aspect ratio">
        <p>
          Now let’s change the aspect ratio of this figure, making it wider and less high. To
          exaggerate the effect, the graphic is zoomed to the 1800 to 1900 period:
        </p>

        <Code lang="r">{`# Plot
data %>%
  filter(Year>1800 & Year<1900) %>%
  ggplot( aes(x=Year, y=Sunspots)) +
    geom_line() +
    ggtitle("Number of sunspots per year") +
    theme_ipsum() +
    theme(
      plot.title = element_text(size=12)
    )`}</Code>

        <figure>
          <img
            src="/figures/caveat/aspect_ratio/2.webp"
            alt="Mind the aspect ratio – chart example"
            width={1152}
            loading="lazy"
          />
        </figure>

        <p>
          The conclusions found using the first graphic are still true, but here a new pattern is
          visible. The sunspot number increases quicker than it decreases (
          <a href="http://adsabs.harvard.edu/full/1992SoPh..137...51H">ref</a>). This is due to the
          fact that the sunspot decay rate is lower than the formation rate (
          <a href="http://www2.mps.mpg.de/dokumente/publikationen/solanki/r45.pdf">ref</a>).
        </p>

        <p>
          On the first chart this pattern was not visible since the lines were almost vertical from
          the bottom to the top of the axis. Here, with the slope being less steep, this pattern
          becomes visible.
        </p>
      </Section>

      <Section id="target-45-degrees" title="Target 45 degrees">
        <p>
          Here is a figure from{" "}
          <a href="https://www.amazon.com/Visualizing-Data-William-S-Cleveland/dp/0963488406">
            W.S. Cleveland
          </a>{" "}
          explaining that the aspect ratio of a graphic should target a 45 degree angle on this kind
          of figure. It shows what happens when angles are too big or too small:
        </p>

        <div className="text-center">
          {" "}
          <img
            src="/figures/caveat/aspect_ratio/3.webp"
            alt="img"
            width={600}
            loading="lazy"
          />{" "}
        </div>

        <div className="text-center">
          {" "}
          <a href="https://www.amazon.com/Visualizing-Data-William-S-Cleveland/dp/0963488406">
            W.S. Cleveland. 1993. Visualizing Data.
          </a>{" "}
        </div>
      </Section>

      <Section id="interactivity" title="Interactivity">
        <p>
          In this type of situation, producing an interactive graphic allows the user to{" "}
          <code>zoom</code> to a specific part and thus to try several different aspect ratio.
          Allowing this kind of exploration greatly improves the value of your graphic:
        </p>

        <Code lang="r">{`library(plotly)

# Plot
p <- data %>%
  ggplot( aes(x=Year, y=Sunspots)) +
    geom_line() +
    ggtitle("# of sunspots (select a zone to zoom in)") +
    theme_ipsum() +
    theme(
      plot.title = element_text(size=12)
    )

ggplotly(p)`}</Code>

        <Widget src="/widgets/caveat/aspect_ratio-1.html" height={576} width={864} />

        <p>#Going further ***</p>
        <ul>
          {" "}
          <li>
            About the 45° rule:{" "}
            <a href="https://www.amazon.com/Visualizing-Data-William-S-Cleveland/dp/0963488406">
              W.S. Cleveland. 1993. Visualizing Data.
            </a>
          </li>{" "}
          <li>
            Making line plots in <a href="https://www.r-graph-gallery.com/line-plot/">R</a> and{" "}
            <a href="https://python-graph-gallery.com/line-chart/">Python</a>
          </li>{" "}
        </ul>
      </Section>
    </CaveatLayout>
  );
}
