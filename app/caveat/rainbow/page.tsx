import { CaveatLayout } from "@/components/layouts";
import { Code, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/caveat/rainbow.html",
  title: "Visualizing a unique Numeric variable | Dataviz pitfall gallery",
  description:
    "This document gives a few suggestions to analyse a dataset composed by a unique numeric variable. It considers the night price of about 10,000 Airbnb…",
  image: "/img/mistake/order_data.png",
});

export default function Page() {
  return (
    <CaveatLayout
      title="Visualizing a unique Numeric variable"
      images={["/img/mistake/order_data.png"]}
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

      <Section id="histogram" title="Histogram"></Section>
    </CaveatLayout>
  );
}
