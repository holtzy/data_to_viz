import { GraphLayout } from "@/components/layouts";
import { ButtonLink, Code, RelatedCard, RelatedGrid, Section, Widget } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/graph/wordcloud.html",
  title: "Wordcloud – from Data to Viz",
  description:
    "A word cloud (also called tag cloud or weighted list) is a visual representation of text data. Words are usually single words, and the importance of each…",
  image: "/img/section/WordCloudSmall.png",
});

export default function Page() {
  return (
    <GraphLayout title="Wordcloud" images={["/img/section/WordCloudSmall.png"]}>
      <Section id="definition" title="Definition">
        <p>
          A <code>word cloud</code> (also called tag cloud or weighted list) is a visual
          representation of text data. Words are usually single words, and the importance of each is
          shown with font size or color.
        </p>

        <p>
          Here is an example showing the most frequent words used by{" "}
          <a href="https://en.wikipedia.org/wiki/Nekfeu">Nekfeu</a>, a famous french raper, in a few
          of his songs. You can read more about this story{" "}
          <a href="/story/SeveralIndepLists.html">here</a>.
        </p>

        <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(tm)
library(proustr)

# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/14_SeveralIndepLists.csv", header=TRUE)
to_remove <- c("_|[0-9]|\\\\.|function|^id|script|var|div|null|typeof|opts|if|^r$|undefined|false|loaded|true|settimeout|eval|else|artist")
data <- data %>% filter(!grepl(to_remove, word)) %>% filter(!word %in% stopwords('fr')) %>% filter(!word %in% proust_stopwords()$word)

# The wordcloud 2 library is the best option for wordcloud in R
library(wordcloud2)

# prepare a list of word (50 most frequent)
mywords <- data %>%
  filter(artist=="nekfeu") %>%
  dplyr::select(word) %>%
  group_by(word) %>%
  summarize(freq=n()) %>%
  arrange(freq) %>%
  tail(30)

# Make the plot
wordcloud2(mywords,  minRotation = -pi/2, maxRotation = -pi/2,
         backgroundColor = "white", color="#69b3a2")`}</Code>

        <Widget src="/widgets/graph/wordcloud-1.html" height={768} width={768} />
      </Section>

      <Section id="what-for" title="What for">
        <p>
          Wordcloud is useful for quickly perceiving the most prominent terms and for locating a
          term alphabetically to determine its relative prominence. It is widely used in media and
          well understood by the public.
        </p>

        <p>
          However, it is a highly criticized way to convey information due to its lack of accuracy.
          This is due to 2 main reasons:
        </p>
        <ul>
          {" "}
          <li>
            <p>
              <a href="/caveat/area_hard.html">Area is a poor metaphor</a> of a numeric value that
              is hardly perceived by human eye. Thus readers struggle to translate word size to an
              accurate frequency. (<a href="/caveat/area_hard.html">read more</a>)
            </p>
          </li>{" "}
          <li>
            <p>
              Longer words appear bigger by construction, since they are composed by more letters.
              It creates a bias that makes wordcloud even less accurate.
            </p>
          </li>{" "}
        </ul>
        <p>
          A good workaround is to use <a href="/graph/barplot.html">barplot</a> or{" "}
          <a href="/graph/lollipop.html">lollipop</a> plot instead. Here is an example using the
          same data as the previous chart:
        </p>

        <Code lang="r">{`# prepare a list of word (30 most frequent)
data %>%
  filter(artist=="nekfeu") %>%
  dplyr::select(word) %>%
  group_by(word) %>%
  summarize(freq=n()) %>%
  arrange(freq) %>%
  tail(30) %>%
  mutate(word=factor(word, word)) %>%
  ggplot( aes(x=word, y=freq) ) +
    geom_segment( aes(x=word ,xend=word, y=0, yend=freq), color="grey") +
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
            src="/figures/graph/wordcloud/1.webp"
            alt="Wordcloud – chart example"
            width={672}
            height={576}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="variation" title="Variation">
        <p>
          Many variations exist for wordclouds. Shapes are often changed, sometimes using the shape
          of an object related to the topic. It is also possible to play with text orientation,
          font, size, colors etc.
        </p>

        <Code lang="r">{`mywords <- data %>%
  filter(artist=="nekfeu") %>%
  dplyr::select(word) %>%
  group_by(word) %>%
  summarize(freq=n()) %>%
  arrange(desc(freq)) %>%
  head(200)

# Make the plot
library(webshot)
#webshot::install_phantomjs()
# Make the graph
my_graph=wordcloud2(mywords,  size=0.6, shape = 'star', backgroundColor = "white", color="#69b3a2")
library("htmlwidgets")
saveWidget(my_graph,"tmp.html", selfcontained = F)
# and in png
webshot("tmp.html","IMG/fig_1.png", delay =5, vwidth = 700, vheight=700)`}</Code>
        <br />
        <br />
        <div className="text-center">
          {" "}
          <img
            src="/figures/graph/wordcloud/2.webp"
            alt="img"
            width={800}
            height={814}
            loading="lazy"
          />{" "}
        </div>
      </Section>

      <Section id="mistake" title="Common mistakes">
        <ul>
          {" "}
          <li>
            Building a wordcloud is a pitfall on its own, except if it is done for aesthetic
            reasons.
          </li>{" "}
        </ul>
      </Section>

      <Section id="related" title="Related">
        <RelatedGrid>
          <RelatedCard
            href="/graph/lollipop.html"
            image="/img/section/LollipopSmall.png"
            title="Lollipop plot"
          >
            A fancy barplot where bars are replaced with a dot and a segment. Try it and adopt it.
          </RelatedCard>
          <RelatedCard href="/graph/barplot.html" image="/img/section/BarSmall.png" title="Barplot">
            Represents the value of entities using bar of various length.
          </RelatedCard>
          <RelatedCard
            href="/graph/wordcloud.html"
            image="/img/section/WordCloudSmall.png"
            title="Wordcloud"
          >
            A visual representation of text data, where word size is relative to their frequency.
          </RelatedCard>
          <RelatedCard
            href="/graph/venn.html"
            image="/img/section/VennSmall.png"
            title="Venn diagram"
          >
            Shows all possible logical relationships between a finite collection of different sets
          </RelatedCard>
        </RelatedGrid>
      </Section>

      <Section id="code" title="Build your own">
        <p>
          The <a href="https://www.r-graph-gallery.com/wordcloud.html">R</a>,{" "}
          <a href="https://www.python-graph-gallery.com/wordcloud/">Python</a>,{" "}
          <a href="https://www.react-graph-gallery.com/wordcloud">React</a> and{" "}
          <a href="https://d3-graph-gallery.com/wordcloud.html">D3</a> graph galleries are 4
          websites providing hundreds of chart example, always providing the reproducible code.
          Click the button below to see how to build the chart you need with your favorite
          programing language.
        </p>

        <p>
          <ButtonLink href="https://www.r-graph-gallery.com/wordcloud.html">
            R graph gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://python-graph-gallery.com/wordcloud/">Python gallery</ButtonLink>{" "}
          <ButtonLink href="https://www.react-graph-gallery.com/wordcloud">
            React gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://d3-graph-gallery.com/wordcloud.html">D3 gallery</ButtonLink>
        </p>
      </Section>
    </GraphLayout>
  );
}
