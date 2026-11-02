import { CaveatLayout } from "@/components/layouts";
import { ButtonLink, Code, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/caveat/order_data.html",
  title: "Why you should order your data | Dataviz pitfall gallery",
  description:
    "By default, most of the data visualization tools will order the groups of your categorical variables using alphabetical order, or using the order of…",
  image: "/img/mistake/order_data.png",
});

export default function Page() {
  return (
    <CaveatLayout title="Why you should order your data" images={["/img/mistake/order_data.png"]}>
      <p>
        By default, most of the data visualization tools will order the groups of your categorical
        variables using alphabetical order, or using the order of appearance in your input table. It
        is good practice to think about this order since changing it can add a lot of insight to
        your graphic.
      </p>

      <Section id="unordered-lollipop-plot" title="Unordered lollipop plot">
        <p>
          Let’s start with a lollipop plot showing the{" "}
          <a href="/story/OneNumOneCat.html">quantity of weapons sold</a> by a few countries. Here
          each row represents a country and the X-axis shows how many weapons have been sold in
          2017. Countries are ordered in alphabetical order by default.
        </p>

        <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(kableExtra)
options(knitr.table.format = "html")

# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum.csv", header=TRUE, sep=",")

# Plot
data %>%
  filter(!is.na(Value)) %>%
  ggplot( aes(x=Country, y=Value) ) +
    geom_segment( aes(x=Country ,xend=Country, y=0, yend=Value), color="grey") +
    geom_point(size=3, color="#69b3a2") +
    coord_flip() +
    theme_ipsum() +
    theme(
      panel.grid.minor.y = element_blank(),
      panel.grid.major.y = element_blank(),
      legend.position="none"
    ) +
    xlab("")`}</Code>

        <figure>
          <img
            src="/figures/caveat/order_data/1.webp"
            alt="Why you should order your data – chart example"
            width={672}
            loading="lazy"
          />
        </figure>

        <p>
          It is quite obvious that the US and Russia sell many more weapons than the other
          countries. However, it is quite hard to see the difference between any other countries,
          and the reader has to go from one to the other to compare them. This is a lot of work and
          will definitely discard attention to your graphic.
        </p>
      </Section>

      <Section id="reorder-it" title="Reorder it">
        <p>Instead, let’s make the exact same chart, but reorder each group using their value:</p>

        <Code lang="r">{`data %>%
  filter(!is.na(Value)) %>%
  arrange(Value) %>%
  mutate(Country=factor(Country, Country)) %>%
  ggplot( aes(x=Country, y=Value) ) +
    geom_segment( aes(x=Country ,xend=Country, y=0, yend=Value), color="grey") +
    geom_point(size=3, color="#69b3a2") +
    coord_flip() +
    theme_ipsum() +
    theme(
      panel.grid.minor.y = element_blank(),
      panel.grid.major.y = element_blank(),
      legend.position="none"
    ) +
    xlab("")`}</Code>

        <figure>
          <img
            src="/figures/caveat/order_data/2.webp"
            alt="Why you should order your data – chart example"
            width={672}
            loading="lazy"
          />
        </figure>

        <p>
          The figure is now way more insightful, with France being the third biggest exporting
          country, followed by Germany, Israel and the UK. Of course, note that it would make sense
          to normalize this graphic by the population of each country to have more comparable data.
        </p>
      </Section>

      <Section id="to-bear-in-mind" title="To bear in mind">
        <p>
          Reordering your data is an easy step you should always consider when building a chart. Of
          course, sometimes the order of groups must be set by their features and not their values,
          like the months of the year, but it’s worth thinking about it. <br /> <em>Read more</em>:
        </p>
        <ul>
          {" "}
          <li>
            Have a look to this{" "}
            <a href="http://www.storytellingwithdata.com/blog/2018/3/9/bring-on-the-bar-charts">
              #SWD challenge
            </a>{" "}
            by storytelling with data: you will see that most of the entry ordered their barplot.
          </li>{" "}
          <li>Read more about barplot and lollipop plot</li>{" "}
          <li>Have a look to the collection of dataviz pitfalls:</li>{" "}
        </ul>
      </Section>
      <br />
      <div className="text-center">
        {" "}
        <ButtonLink href="/caveats.html">See the collection</ButtonLink>{" "}
      </div>
    </CaveatLayout>
  );
}
