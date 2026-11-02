import { StoryLayout } from "@/components/layouts";
import { Code } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/story/RegionWithValue.html",
  title: "Visualizing a unique Numeric variable – from Data to Viz",
  description:
    "This document gives a few suggestions to analyse a dataset composed by a unique numeric variable. It considers the night price of about 10,000 Airbnb…",
  image: "/img/section/DensitySmall.png",
});

export default function Page() {
  return (
    <StoryLayout
      title="Visualizing a unique Numeric variable"
      images={["/img/section/DensitySmall.png", "/img/section/Box1Small.png"]}
    >
      <div className="grid gap-6 md:grid-cols-12">
        {" "}
        <div className="md:col-span-8">
          <p>
            This document gives a few suggestions to analyse a dataset composed by a unique numeric
            variable.
            <br /> It considers the night price of about 10,000{" "}
            <a href="https://www.airbnb.fr">Airbnb</a> appartements on the French Riviera in France.
            <br />
            This example dataset has been downloaded from the{" "}
            <a href="http://insideairbnb.com/get-the-data.html">Airbnb website</a> and is available
            on this{" "}
            <a href="https://github.com/holtzy/data_to_viz/tree/master/Example_dataset">
              Github repository
            </a>
            . Basically it looks like the table beside.
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
              {" "}
              <thead>
                <tr>
                  <th className="text-right">price</th>
                </tr>
              </thead>{" "}
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
              </tbody>{" "}
            </table>
          </div>
        </div>{" "}
      </div>
      <p>#Histogram ***</p>
      <p>The mos</p>
      <h2>Going further</h2>
      <hr />
      <p>
        You can learn more about each type of graphic presented in this story in the dedicated
        sections. Click the icon below:
      </p>
      <a href="/#portfolio">
        {" "}
        <img
          src="/img/section/DensitySmall.png"
          alt="Visualizing a unique Numeric variable – chart example"
          loading="lazy"
        />
      </a>{" "}
      <a href="/#portfolio">
        {" "}
        <img
          src="/img/section/Box1Small.png"
          alt="Visualizing a unique Numeric variable – chart example"
          loading="lazy"
        />
      </a>
    </StoryLayout>
  );
}
