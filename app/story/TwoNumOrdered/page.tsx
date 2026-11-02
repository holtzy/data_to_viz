import { StoryLayout } from "@/components/layouts";
import { Code, Widget } from "@/components/content";
import { ChartTile, ChartTiles } from "@/components/chart-tile";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/story/TwoNumOrdered.html",
  title: "Evolution of the bitcoin price – from Data to Viz",
  description:
    "This document gives a few suggestions to analyse a dataset composed by two ordered numeric variables. It considers the evolution of the bitcoin price…",
  image: "/img/section/Line150.png",
});

export default function Page() {
  return (
    <StoryLayout
      title="Evolution of the bitcoin price"
      images={[
        "/img/section/Line150.png",
        "/img/section/Area150.png",
        "/img/section/ScatterConnected150.png",
      ]}
    >
      <div className="grid gap-6 md:grid-cols-12">
        {" "}
        <div className="md:col-span-8">
          <p>
            This document gives a few suggestions to analyse a dataset composed by two ordered
            numeric variables. It considers the evolution of the{" "}
            <a href="https://en.wikipedia.org/wiki/Bitcoin">bitcoin</a> price between April 2013 and
            April 2018. <br />
            <br /> This dataset has been built using the{" "}
            <a href="https://github.com/JesseVent/crypto">crypto</a> R package that allows to access
            the <a href="https://coinmarketcap.com">CoinMarketCap</a> website. The first column,{" "}
            <code>date</code>, represents an ordered numeric variable. The second,{" "}
            <code>value</code> gives the bitcoin price. This dataset is available on{" "}
            <a href="https://github.com/holtzy/data_to_viz/tree/master/Example_dataset">github</a>.
          </p>
        </div>{" "}
        <div className="md:col-span-4">
          <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(DT)
library(plotly)
library(kableExtra)
options(knitr.table.format = "html")

# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered.csv", header=T)
data$date <- as.Date(data$date)

# Show long format
data %>%
  head(5) %>%
  kable() %>%
  kable_styling(bootstrap_options = "striped", full_width = F)`}</Code>

          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>date</th>
                  <th className="text-right">value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2013-04-28</td>
                  <td className="text-right">135.98</td>
                </tr>
                <tr>
                  <td>2013-04-29</td>
                  <td className="text-right">147.49</td>
                </tr>
                <tr>
                  <td>2013-04-30</td>
                  <td className="text-right">146.93</td>
                </tr>
                <tr>
                  <td>2013-05-01</td>
                  <td className="text-right">139.89</td>
                </tr>
                <tr>
                  <td>2013-05-02</td>
                  <td className="text-right">125.60</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>{" "}
      </div>
      <h2 id="line-plot">Line plot</h2>
      <p>
        The most comon way to represent that kind of dataset is probably to produce a line plot. It
        allows to give a good overview of the bitcoin price on the period, reaching a value of
        20,000 $ in december 2017.
      </p>
      <Code lang="r">{`data %>%
  ggplot( aes(x=date, y=value)) +
    geom_line(color="#69b3a2") +
    ggtitle("Evolution of Bitcoin price") +
    ylab("bitcoin price ($)") +
    theme_ipsum()`}</Code>
      <figure>
        <img
          src="/figures/story/TwoNumOrdered/1.webp"
          alt="Evolution of the bitcoin price – chart example"
          width={960}
          height={480}
          loading="lazy"
        />
      </figure>
      <h2 id="area-chart">Area chart</h2>
      <p>
        Even if the line chart is a very good way to convey the information, when only one variable
        is represented like here, the plot can appear to be slightly empty. Thus, an interesting
        alternative is the area chart. It is basically the same thing, except that the area between
        the X axis and the line is filled.
      </p>
      <Code lang="r">{`data %>%
  ggplot( aes(x=date, y=value)) +
    geom_area(fill="#69b3a2", alpha=0.5) +
    geom_line(color="#69b3a2") +
    ggtitle("Evolution of Bitcoin price") +
    ylab("bitcoin price ($)") +
    theme_ipsum()`}</Code>
      <figure>
        <img
          src="/figures/story/TwoNumOrdered/2.webp"
          alt="Evolution of the bitcoin price – chart example"
          width={960}
          height={480}
          loading="lazy"
        />
      </figure>
      <p>
        Note that using the same color for the filled area and the line is often a good looking
        choice, with a bit more transparency for the filled area.
      </p>
      <h2 id="interactivity">Interactivity</h2>
      <p>
        Using interactivity gives a great added value to your line or area chart. Indeed, it is very
        useful to ba able to zoom on a specific time slot of interest on the graphic. For instance,
        have a look to what happened in 2014: bitcoin already experienced a huge evolution,
        comparable to 2017 in terme of relative evolution, but not mediatised at all.
      </p>
      <Code lang="r">{`p <- data %>%
  ggplot( aes(x=date, y=value)) +
    geom_area(fill="#69b3a2", alpha=0.5) +
    geom_line(color="#69b3a2") +
    ggtitle("Evolution of Bitcoin price") +
    ylab("bitcoin price ($)") +
    theme_ipsum()
ggplotly(p)`}</Code>
      <Widget src="/widgets/story/TwoNumOrdered-1.html" height={480} width={960} />
      <h2 id="few-points-use-connected-scatter">Few points? Use connected scatter</h2>
      <p>
        If you have just a few point in your dataset, you probably want to use a connected
        scatterplot instead. it is basically the same thing where each individual point is
        represented. It greatly helps to understand when observation have been made. Let’s consider
        the last 10 observation of the bitcoin dataset:
      </p>
      <Code lang="r">{`data %>%
  tail(10) %>%
  ggplot( aes(x=date, y=value)) +
    geom_area(fill="#69b3a2", alpha=0.5) +
    geom_line(color="#69b3a2") +
    geom_point() +
    ggtitle("Evolution of Bitcoin price") +
    ylab("bitcoin price ($)") +
    theme_ipsum()`}</Code>
      <figure>
        <img
          src="/figures/story/TwoNumOrdered/3.webp"
          alt="Evolution of the bitcoin price – chart example"
          width={960}
          height={480}
          loading="lazy"
        />
      </figure>
      <h2 id="to-cut-or-not-to-cut">To cut or not to cut?</h2>
      <p>
        The previous chart can be a bit frustrating. It is indeed hard to study the evolution of the
        bitcoin in this graphic since the price ranges between 7,500 and 10,000 dollars in this
        period, when the Y axis ranges between 0 and 10,000. In this case, it is a good practice to
        cut the Y axis to zoom on the variation. This subject is subject to many debates in the
        dataviz community and you can read more about it in the dedicated page.
      </p>
      <Code lang="r">{`data %>%
  tail(10) %>%
  ggplot( aes(x=date, y=value)) +
    geom_ribbon(aes(ymin=8000, ymax=value),  fill="#69b3a2", color="transparent", alpha=0.5) +
    geom_line(color="#69b3a2") +
    geom_point() +
    ggtitle("Evolution of Bitcoin price") +
    ylab("bitcoin price ($)") +
    theme_ipsum()`}</Code>
      <figure>
        <img
          src="/figures/story/TwoNumOrdered/4.webp"
          alt="Evolution of the bitcoin price – chart example"
          width={960}
          height={480}
          loading="lazy"
        />
      </figure>
      <h2 id="comparing-to-a-limit">Comparing to a limit</h2>
      <p>
        Sometimes one can be interested in comparing the value to a specific threshold. In this
        case, you can fill the area depending on this threshold, with 2 different colors depending
        if the value is over or below the threshold:
      </p>
      <Code lang="r">{`data %>%
  tail(300) %>%
  mutate( mycolor=ifelse(value>7500, "yes", "no")) %>%
  ggplot( aes(x=date, y=value)) +
    geom_ribbon(aes(ymin=7500, ymax=value, fill=mycolor), color="black", alpha=0.5) +
    scale_fill_manual(values=c("#69b3a2","#271569")) +
    ggtitle("Evolution of Bitcoin price") +
    ylab("bitcoin price ($)") +
    theme_ipsum() +
    theme(legend.position="none")`}</Code>
      <figure>
        <img
          src="/figures/story/TwoNumOrdered/5.webp"
          alt="Evolution of the bitcoin price – chart example"
          width={960}
          height={480}
          loading="lazy"
        />
      </figure>
      <p>
        <em>Note</em>: this graphic is imperfect and must be improved (don’t understand the behavior
        of <code>geom_ribbon</code>)
      </p>
      <h2 id="going-further">Going further</h2>
      <p>
        You can learn more about each type of graphic presented in this story in the dedicated
        sections. Click the icon below:
      </p>
      <ChartTiles>
        <ChartTile href="/graph/line.html" image="/img/section/Line150.png" title="Line chart" />
        <ChartTile href="/graph/area.html" image="/img/section/Area150.png" title="Area chart" />
        <ChartTile
          href="/graph/connectedscatter.html"
          image="/img/section/ScatterConnected150.png"
          title="Connected Scatter"
        />
      </ChartTiles>
    </StoryLayout>
  );
}
