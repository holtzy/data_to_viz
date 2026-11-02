import { StoryLayout } from "@/components/layouts";
import { Code, Section, Widget } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/story/SeveralIndepLists.html",
  title: "Comparing raper lyrics – from Data to Viz",
  description:
    "This document gives a few suggestions to analyse a dataset composed by a few lists of items.It considers the lyrics of 2 famous french rapers (Nekfeu and…",
  image: "/img/section/VennSmall.png",
});

export default function Page() {
  return (
    <StoryLayout
      title="Comparing raper lyrics"
      images={[
        "/img/section/VennSmall.png",
        "/img/section/LollipopSmall.png",
        "/img/section/WordCloudSmall.png",
      ]}
    >
      <div className="grid gap-6 md:grid-cols-12">
        {" "}
        <div className="md:col-span-6">
          <p>
            This document gives a few suggestions to analyse a dataset composed by a few lists of
            items.
            <br />
            <br />
            It considers the lyrics of 2 famous french rapers (
            <a href="https://en.wikipedia.org/wiki/Nekfeu">Nekfeu</a> and{" "}
            <a href="https://en.wikipedia.org/wiki/Booba">Booba</a>) and a french singer (
            <a href="https://en.wikipedia.org/wiki/Georges_Brassens">Georges Brassens</a>).
            <br />
            <br />
            This example dataset has been downloaded from the{" "}
            <a href="https://www.paroles.net/">Paroles.net website</a> using a custom script and is
            available on this{" "}
            <a href="https://github.com/holtzy/data_to_viz/tree/master/Example_dataset">
              Github repository
            </a>
            . Seventy five songs are considered.
          </p>

          <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(kableExtra)
library(tm)
options(knitr.table.format = "html")
library(proustr)

# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/14_SeveralIndepLists.csv", header=TRUE)
to_remove <- c("_|[0-9]|\\\\.|function|^id|script|var|div|null|typeof|opts|if|^r$|undefined|false|loaded|true|settimeout|eval|else|artist")
data <- data %>% filter(!grepl(to_remove, word)) %>% filter(!word %in% stopwords('fr')) %>% filter(!word %in% proust_stopwords()$word)

# show data
a <- data %>% filter(artist=="booba") %>% select(word) %>% arrange(word) %>% mutate(booba=word) %>% select(booba) %>% sample_n(6)
b <- data %>% filter(artist=="nekfeu") %>% select(word) %>% arrange(word) %>% mutate(nekfeu=word) %>% select(nekfeu) %>% sample_n(6)
c <- data %>% filter(artist=="georges-brassens") %>% select(word) %>% arrange(word) %>% mutate(brassens=word) %>% select(brassens) %>% sample_n(6)`}</Code>
        </div>{" "}
        <div className="md:col-span-2">
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>booba</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>pâtes</td>
                </tr>
                <tr>
                  <td>riche</td>
                </tr>
                <tr>
                  <td>m’éteindre</td>
                </tr>
                <tr>
                  <td>échec</td>
                </tr>
                <tr>
                  <td>noir</td>
                </tr>
                <tr>
                  <td>complete</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>{" "}
        <div className="md:col-span-2">
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>nekfeu</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>temps</td>
                </tr>
                <tr>
                  <td>emprunt</td>
                </tr>
                <tr>
                  <td>corps</td>
                </tr>
                <tr>
                  <td>m’ont</td>
                </tr>
                <tr>
                  <td>nekfeu</td>
                </tr>
                <tr>
                  <td>valeurs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>{" "}
        <div className="md:col-span-2">
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>brassens</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>demande</td>
                </tr>
                <tr>
                  <td>j’ai</td>
                </tr>
                <tr>
                  <td>above</td>
                </tr>
                <tr>
                  <td>posthume</td>
                </tr>
                <tr>
                  <td>valent</td>
                </tr>
                <tr>
                  <td>vague</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>{" "}
      </div>
      <Section id="wordcloud" title="Wordcloud">
        <p>
          If some words are repeated in the dataset, the first thing to do is probably to find out
          what are the most frequent ones. A common way to do so is to build a{" "}
          <a href="/graph/wordcloud.html">wordcloud</a>: each word is written with a size
          proportionnal to its frequency.
        </p>

        <Code lang="r">{`# The wordcloud 2 library is the best option for wordcloud in R
library(wordcloud2)

# prepare a list of word (50 most frequent)
mywords <- data %>%
  filter(artist=="nekfeu") %>%
  select(word) %>%
  group_by(word) %>%
  summarize(freq=n()) %>%
  arrange(freq) %>%
  tail(50)

# Make the plot
wordcloud2(mywords, size = 2, minRotation = -pi/2, maxRotation = -pi/2,
         backgroundColor = "white", color="#69b3a2")`}</Code>

        <Widget src="/widgets/story/SeveralIndepLists-1.html" height={576} width={672} />

        <p>
          However this type of chart can be <a href="/graph/wordcloud.html">criticized</a> since it
          does not reflect frequencies accurately: long words appear bigger and comparing size is
          always complicated. Thus, the techniques seen in{" "}
          <a href="/story/OneNumOneCat.html">this page</a> are strongly advised, and my best choice
          goes to the lollipop chart.
        </p>
      </Section>
      <Section id="lollipop-chart" title="Lollipop chart">
        <p>
          A <a href="/graph/lollipop.html">lollipop</a> chart is like a{" "}
          <a href="/graph/barplot.html">barplot</a>, but the bar is replaced by a segment and a
          circle. It gives a lighter appearance. It is advised to use a horizontal version: words
          are easier to read.
        </p>

        <Code lang="r">{`data %>%
  filter(artist=="nekfeu") %>%
  select(word) %>%
  group_by(word) %>%
  summarize(n=n()) %>%
  arrange(n) %>%
  mutate(word=factor(word, word)) %>%
  tail(10) %>%
  ggplot( aes(word, y=n)) +
    geom_segment( aes(x=word ,xend=word, y=0, yend=n), color="grey") +
    geom_point(size=3, color="#69b3a2") +
    coord_flip() +
    theme_ipsum() +
    ggtitle("10 most frequent words used by Nekfeu") +
    theme(
      panel.grid.minor.y = element_blank(),
      panel.grid.major.y = element_blank(),
      legend.position="none"
    ) +
    xlab("")`}</Code>

        <figure>
          <img
            src="/figures/story/SeveralIndepLists/1.webp"
            alt="Comparing raper lyrics – chart example"
            width={672}
            loading="lazy"
          />
        </figure>
      </Section>
      <Section id="venn-diagram" title="Venn diagram">
        <p>
          Once the most frequent words are known, it is of interest to know how many words are
          common to every lists, and how many are specific to each artist. The best way to represent
          this information is to use a <a href="/graph/venn.html">venn diagram</a>.
        </p>

        <Code lang="r">{`#upload library
library(VennDiagram)

#Make the plot
venn.diagram(
  x = list(
    data %>% filter(artist=="booba") %>% select(word) %>% unlist() ,
    data %>% filter(artist=="nekfeu") %>% select(word) %>% unlist() ,
    data %>% filter(artist=="georges-brassens") %>% select(word) %>% unlist()
    ),
  category.names = c("Booba" , "Nekfeu" , "Brassens"),
  filename = 'venn.png',
  output = TRUE ,
          imagetype="png" ,
          height = 480 ,
          width = 480 ,
          resolution = 300,
          compression = "lzw",
          lwd = 1,
          col=c("#440154ff", '#21908dff', '#fde725ff'),
          fill = c(alpha("#440154ff",0.3), alpha('#21908dff',0.3), alpha('#fde725ff',0.3)),
          cex = 0.5,
          fontfamily = "sans",
          cat.cex = 0.6,
          cat.default.pos = "outer",
          cat.pos = c(-27, 27, 135),
          cat.dist = c(0.055, 0.055, 0.085),
          cat.fontfamily = "sans",
          cat.col = c("#440154ff", '#21908dff', '#fde725ff'),
          rotation = 1
        )`}</Code>

        <div className="text-center">
          {" "}
          <img
            src="/figures/story/SeveralIndepLists/2.webp"
            alt="Comparing raper lyrics – chart example"
            loading="lazy"
          />{" "}
        </div>
      </Section>
      <Section id="note" title="Note">
        <p>This section needs improvements:</p>
        <ul>
          {" "}
          <li>introduction of upset plot</li> <li>same number of word per artist</li>{" "}
          <li>more ideas to come</li>{" "}
        </ul>
      </Section>
      <h2>Going further</h2>
      <p>
        You can learn more about each type of graphic presented in this story in the dedicated
        sections. Click the icon below:
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <a href="/graph/venn.html" title="Venn diagram">
          <img
            src="/img/section/VennSmall.png"
            alt="Venn diagram"
            loading="lazy"
            className="size-24"
          />
        </a>
        <a href="/graph/lollipop.html" title="Lollipop">
          <img
            src="/img/section/LollipopSmall.png"
            alt="Lollipop"
            loading="lazy"
            className="size-24"
          />
        </a>
        <a href="/graph/wordcloud.html" title="Wordcloud">
          <img
            src="/img/section/WordCloudSmall.png"
            alt="Wordcloud"
            loading="lazy"
            className="size-24"
          />
        </a>
      </div>
    </StoryLayout>
  );
}
