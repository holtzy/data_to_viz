import { StoryLayout } from "@/components/layouts";
import { Code, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/story/OneNumSevCatSubgroupSevObsPerGroup.html",
  title: "How much do people tip? – from Data to Viz",
  description:
    "This document gives a few suggestions to analyse a dataset composed by a numeric variable measured on groups and subgroups, with several observations for…",
  image: "/img/section/DensitySmall.png",
});

export default function Page() {
  return (
    <StoryLayout
      title="How much do people tip?"
      images={[
        "/img/section/DensitySmall.png",
        "/img/section/Box1Small.png",
        "/img/section/ViolinSmall.png",
        "/img/section/HistogramSmall.png",
      ]}
    >
      <div className="grid gap-6 md:grid-cols-12">
        {" "}
        <div className="md:col-span-8">
          <p>
            This document gives a few suggestions to analyse a dataset composed by a numeric
            variable measured on groups and subgroups, with several observations for each
            combinations. <br />
            <br /> The dataset used as an example describes the amount that restaurant staff receive
            in tips based on various indicators like the client sex, the day of the week and if the
            client smokes or not. <br />
            <br /> Data come from the <a href="https://github.com/mwaskom/seaborn-data">
              Seaborn
            </a>{" "}
            Python library. A clean <code>.csv</code> version is available in the data-to-viz.com{" "}
            <a href="https://github.com/holtzy/data_to_viz/tree/master/Example_dataset">
              github repository
            </a>
            .
          </p>
        </div>{" "}
        <div className="md:col-span-4">
          <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(kableExtra)
options(knitr.table.format = "html")
library(viridis)
library(ggrepel)
library(plotly)

# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/10_OneNumSevCatSubgroupsSevObs.csv", header=T, sep=",") %>%
  mutate(tip = round(tip/total_bill*100, 1))

# show data
data %>% head(6) %>% select(tip, sex, day, smoker) %>% kable() %>%
  kable_styling(bootstrap_options = "striped", full_width = F)`}</Code>

          <div className="overflow-x-auto">
            <table>
              {" "}
              <thead>
                <tr>
                  <th className="text-right">tip</th>
                  <th>sex</th>
                  <th>day</th>
                  <th>smoker</th>
                </tr>
              </thead>{" "}
              <tbody>
                <tr>
                  <td className="text-right">5.9</td>
                  <td>Female</td>
                  <td>Sun</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td className="text-right">16.1</td>
                  <td>Male</td>
                  <td>Sun</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td className="text-right">16.7</td>
                  <td>Male</td>
                  <td>Sun</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td className="text-right">14.0</td>
                  <td>Male</td>
                  <td>Sun</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td className="text-right">14.7</td>
                  <td>Female</td>
                  <td>Sun</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td className="text-right">18.6</td>
                  <td>Male</td>
                  <td>Sun</td>
                  <td>No</td>
                </tr>
              </tbody>{" "}
            </table>
          </div>
        </div>{" "}
      </div>
      <Section id="grouped-boxplot" title="Grouped boxplot">
        <p>
          The most common way to represent that kind of dataset is probably the grouped{" "}
          <a href="/caveat/boxplot.html">boxplot</a>. Each combination of group is represented by a
          box. This allows to quickly understand what is the distribution of the numeric variable
          for each combination.
        </p>

        <p>
          Here, it looks like there is not much difference in tip values from one day to the other
          in average, except a slight increase on sunday. Moreover, it looks like females tend to
          tip more than males on friday. Note that individual data points are presented using{" "}
          <code>jittering</code>, what allows to detect more particular pattern and assess the
          sample size of each group.
        </p>

        <Code lang="r">{`# Counts the number of value per group and subgroup
counts = data %>%
  group_by(day, sex) %>%
  summarize(
    n=n(),
    median=median(tip)
  )

# Grouped
data %>%
  mutate(day = fct_reorder(day, tip)) %>%
  mutate(day = factor(day, levels=c("Thur", "Fri", "Sat", "Sun"))) %>%
  ggplot(aes(fill=sex, y=tip, x=day)) +
    geom_boxplot(position=position_dodge2(preserve = "total"), alpha=0.5, outlier.colour="transparent", varwidth = TRUE) +
    geom_point(color="grey", size=1, width=0.1, position=position_jitterdodge() , alpha=0.4) +
    scale_fill_viridis(discrete=T, name="") +
    geom_text(data=counts, aes(label=paste0("n: ",n), y=median-2), position=position_dodge(1), hjust=0.5) +
    theme_ipsum()  +
    xlab("") +
    ylab("Tip (%)") +
    ylim(0,35)`}</Code>

        <figure>
          <img
            src="/figures/story/OneNumSevCatSubgroupSevObsPerGroup/1.webp"
            alt="How much do people tip? – chart example"
            width={768}
            loading="lazy"
          />
        </figure>

        <p>
          In the above chart categories are grouped by day. It is possible to build the same kind of
          visualization, grouping by Sex instead. In the first case, it is easy to compare the
          behavior or each sex day by day. On the second one, the idea is more to compare the
          difference by day for each sex.
        </p>

        <Code lang="r">{`# Grouped
data %>%
  mutate(day = fct_reorder(day, tip)) %>%
  mutate(day = factor(day, levels=c("Thur", "Fri", "Sat", "Sun"))) %>%
  ggplot(aes(fill=day, y=tip, x=sex)) +
    geom_boxplot(position="dodge", alpha=0.5, outlier.colour="transparent") +
    geom_point(color="grey", size=1, width=0.1, position=position_jitterdodge() , alpha=0.4) +
    scale_fill_viridis(discrete=T, name="") +
    theme_ipsum()  +
    xlab("") +
    ylab("Tip (%)") +
    ylim(0,40)`}</Code>

        <figure>
          <img
            src="/figures/story/OneNumSevCatSubgroupSevObsPerGroup/2.webp"
            alt="How much do people tip? – chart example"
            width={768}
            loading="lazy"
          />
        </figure>
      </Section>
      <Section id="violin" title="Violin">
        <p>
          The <a href="/graph/violin.html">violin plot</a> can be used exactly in the same situation
          that the <a href="/caveat/boxplot.html">boxplot</a>. Using the same grouping technique, we
          got here a grouped violin plot.
        </p>

        <Code lang="r">{`# Grouped
data %>%
  mutate(day = fct_reorder(day, tip)) %>%
  mutate(day = factor(day, levels=c("Thur", "Fri", "Sat", "Sun"))) %>%
  ggplot(aes(fill=sex, y=tip, x=day)) +
    geom_violin(position="dodge", alpha=0.5, outlier.colour="transparent") +
    scale_fill_viridis(discrete=T, name="") +
    theme_ipsum()  +
    xlab("") +
    ylab("Tip (%)") +
    ylim(0,40)`}</Code>

        <figure>
          <img
            src="/figures/story/OneNumSevCatSubgroupSevObsPerGroup/3.webp"
            alt="How much do people tip? – chart example"
            width={768}
            loading="lazy"
          />
        </figure>
      </Section>
      <Section id="histogram" title="Histogram">
        <p>
          Small multiple is a powerful technique that can be used with that kind of data. Here, each
          combination is represented in a part of the grid, allowing a quick comparison between
          them. <a href="/graph/histogram.html">Histograms</a> are used here, but the same result
          could be obtained with <a href="/graph/density.html">density</a> plot.
        </p>

        <Code lang="r">{`# Grouped
data %>%
  mutate(day = fct_reorder(day, tip)) %>%
  mutate(day = factor(day, levels=c("Thur", "Fri", "Sat", "Sun"))) %>%
  ggplot(aes(x=tip)) +
    geom_histogram(bins=20, fill="#69b3a2", color="white") +
    facet_grid(sex~time) +
    theme_ipsum()  +
    xlab("") +
    ylab("Tip")`}</Code>

        <figure>
          <img
            src="/figures/story/OneNumSevCatSubgroupSevObsPerGroup/4.webp"
            alt="How much do people tip? – chart example"
            width={768}
            loading="lazy"
          />
        </figure>
      </Section>
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
          alt="How much do people tip? – chart example"
          loading="lazy"
        />
      </a>{" "}
      <a href="/#portfolio">
        {" "}
        <img
          src="/img/section/Box1Small.png"
          alt="How much do people tip? – chart example"
          loading="lazy"
        />
      </a>{" "}
      <a href="/#portfolio">
        {" "}
        <img
          src="/img/section/ViolinSmall.png"
          alt="How much do people tip? – chart example"
          loading="lazy"
        />
      </a>{" "}
      <a href="/#portfolio">
        {" "}
        <img
          src="/img/section/HistogramSmall.png"
          alt="How much do people tip? – chart example"
          loading="lazy"
        />
      </a>
    </StoryLayout>
  );
}
