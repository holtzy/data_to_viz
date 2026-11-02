import { StoryLayout } from "@/components/layouts";
import { Code, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/story/OneNum.html",
  title: "Airbnb prices on the french riviera – from Data to Viz",
  description:
    "This document porvides a few suggestions for analying a dataset composed of a unique numeric variable. It considers the nightly price of about 10,000…",
  image: "/img/section/DensitySmall.png",
});

export default function Page() {
  return (
    <StoryLayout
      title="Airbnb prices on the french riviera"
      images={["/img/section/DensitySmall.png", "/img/section/HistogramSmall.png"]}
    >
      <div className="grid gap-6 md:grid-cols-12">
        {" "}
        <div className="md:col-span-8">
          <p>
            This document porvides a few suggestions for analying a dataset composed of a unique
            numeric variable.
            <br /> It considers the nightly price of about 10,000{" "}
            <a href="https://www.airbnb.fr">Airbnb</a> apartements on the French Riviera in France.
            <br />
            This example dataset has been downloaded from the{" "}
            <a href="http://insideairbnb.com/get-the-data.html">Airbnb website</a> and is available
            on this{" "}
            <a href="https://github.com/holtzy/data_to_viz/tree/master/Example_dataset">
              Github repository
            </a>
            . Basically it looks like the table to the right.
          </p>
        </div>{" "}
        <div className="md:col-span-4">
          <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(kableExtra)
options(knitr.table.format = "html")

# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/1_OneNum.csv", header=TRUE)

# show data
data %>% head(6) %>% kable() %>%
  kable_styling(bootstrap_options = "striped", full_width = F)`}</Code>

          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th className="text-right">price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-right">75</td>
                </tr>
                <tr>
                  <td className="text-right">104</td>
                </tr>
                <tr>
                  <td className="text-right">369</td>
                </tr>
                <tr>
                  <td className="text-right">300</td>
                </tr>
                <tr>
                  <td className="text-right">92</td>
                </tr>
                <tr>
                  <td className="text-right">64</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>{" "}
      </div>
      <Section id="histogram" title="Histogram">
        <p>
          The most common way to represent a unique numeric variable is with a histogram. Basically,
          the numeric variable is cut in several <code>bins</code>: between 0 and 10 euros a night,
          between 10 and 20 and so on. This is represented on the X axis. Then, the number of
          apartments per bin is counted and represented on the Y axis.
        </p>

        <p>
          Here, it appears that about 500 appartments have a price between 80 and 90 euros. A
          histogram is a convenient way to visualize the data: it allows us to understand its{" "}
          <code>distribution</code>.
        </p>

        <Code lang="r">{`data %>%
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
            src="/figures/story/OneNum/1.webp"
            alt="Airbnb prices on the french riviera – chart example"
            width={672}
            loading="lazy"
          />
        </figure>

        <p>
          Note that it is important to play with the <code>bin size</code> during your exploratory
          analysis. Let’s check what happens when spliting prices by bins of 2 euros instead of 10:
        </p>

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
            src="/figures/story/OneNum/2.webp"
            alt="Airbnb prices on the french riviera – chart example"
            width={672}
            loading="lazy"
          />
        </figure>

        <p>
          There is a huge difference between these 2 histograms. Actually a few values are over
          represented in the dataset (like 58, 64, 69, 75, 80..). This is definitely a signal that
          you want to understand when analysing your dataset.
        </p>
      </Section>
      <Section id="density" title="Density">
        <p>
          A variation of the histogram is the density plot, which is basically a smoothed version of
          the histogram. It represents a <code>kernel density estimate</code> of the variable. As
          seen for the bin size of the histogram, it is important to try several values for the{" "}
          <code>bandwidth</code> argument for the same reason:
        </p>

        <div className="grid gap-6 md:grid-cols-12">
          {" "}
          <div className="md:col-span-6">
            <Code lang="r">{`data %>%
  filter( price<300 ) %>%
  ggplot( aes(x=price)) +
    geom_density(fill="#69b3a2", color="#e9ecef", alpha=0.7, bw=10) +
    ggtitle("Bandwidth: 10") +
    theme_ipsum()`}</Code>

            <figure>
              <img
                src="/figures/story/OneNum/3.webp"
                alt="Airbnb prices on the french riviera – chart example"
                width={672}
                loading="lazy"
              />
            </figure>
          </div>{" "}
          <div className="md:col-span-6">
            <Code lang="r">{`data %>%
  filter( price<300 ) %>%
  ggplot( aes(x=price)) +
    geom_density(fill="#69b3a2", color="#e9ecef", alpha=0.7, bw=2) +
    ggtitle("Bandwidth: 2") +
    theme_ipsum()`}</Code>

            <figure>
              <img
                src="/figures/story/OneNum/4.webp"
                alt="Airbnb prices on the french riviera – chart example"
                width={672}
                loading="lazy"
              />
            </figure>
          </div>{" "}
        </div>
      </Section>
      <h2>Going further</h2>
      <p>
        You can learn more about each type of graphic presented in this story in the dedicated
        sections. Click the icon below:
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <a href="/graph/density.html" title="Density">
          <img
            src="/img/section/DensitySmall.png"
            alt="Density"
            loading="lazy"
            className="size-24"
          />
        </a>
        <a href="/graph/histogram.html" title="Histogram">
          <img
            src="/img/section/HistogramSmall.png"
            alt="Histogram"
            loading="lazy"
            className="size-24"
          />
        </a>
      </div>
    </StoryLayout>
  );
}
