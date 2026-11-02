import { CaveatLayout } from "@/components/layouts";
import { Code, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/caveat/bin_size.html",
  title: "Play with your histogram bin size | Dataviz pitfall gallery",
  description:
    "A histogram takes as input a numeric variable and cuts it into several bins. The number of observations in each bin is represented by the height of the…",
  image: "/img/mistake/bin_size.png",
});

export default function Page() {
  return (
    <CaveatLayout title="Play with your histogram bin size" images={["/img/mistake/bin_size.png"]}>
      <p>
        A <a href="/graph/histogram.html">histogram</a> takes as input a numeric variable and cuts
        it into several bins. The number of observations in each bin is represented by the height of
        the bar. It is a very common type of graphic and most tools select a bin size value by
        default. <br />
        <br /> However, this bin size choice can have a strong impact on the chart insight. Let’s
        look at the distribution of{" "}
        <a href="/story/OneNum.html">Airbnb night prices on the French Riviera</a>:
      </p>

      <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(kableExtra)
options(knitr.table.format = "html")

# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/1_OneNum.csv", header=TRUE)


data %>%
  filter( price<300 ) %>%
  ggplot( aes(x=price)) +
    stat_bin(breaks=seq(0,300,10), fill="#69b3a2", color="#e9ecef", alpha=0.9) +
    ggtitle("Night price distribution of Airbnb appartements") +
    theme_ipsum() +
    theme(
      plot.title = element_text(size=12)
    )`}</Code>

      <figure>
        <img
          src="/figures/caveat/bin_size/1.webp"
          alt="Play with your histogram bin size – chart example"
          width={672}
          height={480}
          loading="lazy"
        />
      </figure>

      <p>
        The price ranges between 10 and 300 euros, with most of the apartments ranging between 60
        and 150 euros per night. In this chart, prices are cut in several 10 euro bins: between 0
        and 10 euros a night, between 10 and 20, and so on. This is represented on the X-axis. Then,
        the number of apartments per bin is counted and represented by the Y-axis.
      </p>

      <p>Let’s check what happens when prices are split into bins of 2 euros instead of 10:</p>

      <Code lang="r">{`data %>%
  filter( price<300 ) %>%
  ggplot( aes(x=price)) +
    stat_bin(breaks=seq(0,300,3), fill="#69b3a2", color="#e9ecef", alpha=0.9) +
    ggtitle("Night price distribution of Airbnb appartements") +
    theme_ipsum() +
    theme(
      plot.title = element_text(size=12)
    )`}</Code>

      <figure>
        <img
          src="/figures/caveat/bin_size/2.webp"
          alt="Play with your histogram bin size – chart example"
          width={672}
          height={480}
          loading="lazy"
        />
      </figure>

      <p>
        There is a huge difference between these two histograms. A few values are over-represented
        in the dataset (like 58, 64, 69, 75, 80…). This is definitely a signal you want to
        understand when analyzing your data.
      </p>

      <Section id="going-further" title="Going further">
        <ul>
          {" "}
          <li>
            <a href="/story/OneNum.html">Airbnb prices on the French Riviera</a>: see the story that
            describes that kind of dataset.
          </li>{" "}
          <li>
            Another example of differences by{" "}
            <a href="http://docs.astropy.org/en/stable/visualization/histogram.html">AstroPy</a>
          </li>{" "}
          <li>
            About histogram{" "}
            <a href="http://176.32.89.45/~hideaki/res/histogram.html">bin width optimization</a>
          </li>{" "}
          <li>
            Doing histograms in <a href="https://www.r-graph-gallery.com/histogram/">R</a> and{" "}
            <a href="https://python-graph-gallery.com/histogram/">Python</a>
          </li>{" "}
        </ul>
      </Section>
    </CaveatLayout>
  );
}
