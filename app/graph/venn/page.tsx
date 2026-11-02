import { GraphLayout } from "@/components/layouts";
import { ButtonLink, Code, RelatedCard, RelatedGrid, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/graph/venn.html",
  title: "Venn Diagram – from Data to Viz",
  description:
    "A Venn diagram (also called primary diagram, set diagram or logic diagram) is a diagram that shows all possible logical relationships between a finite…",
  image: "/img/section/VennSmall.png",
});

export default function Page() {
  return (
    <GraphLayout title="Venn Diagram" images={["/img/section/VennSmall.png"]}>
      <Section id="definition" title="Definition">
        <p>
          A <code>Venn diagram</code> (also called primary diagram, set diagram or logic diagram) is
          a diagram that shows all possible logical relationships between a finite collection of
          different sets.
        </p>

        <p>
          Each set is represented by a circle. The circle size sometimes represents the importance
          of the group but not always. The groups are usually overlapping: the size of the overlap
          represents the intersection between both groups.
        </p>

        <p>
          Here is an example showing the number of shared words in the lyrics of 3 famous french
          singers: (<a href="https://en.wikipedia.org/wiki/Nekfeu">Nekfeu</a>,{" "}
          <a href="https://en.wikipedia.org/wiki/Booba">Booba</a>) and{" "}
          <a href="https://en.wikipedia.org/wiki/Georges_Brassens">Georges Brassens</a>. You can
          read more about this story <a href="/story/SeveralIndepLists.html">here</a>.
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

# library
library(VennDiagram)

#cMake the plot
venn.diagram(
  x = list(
    data %>% filter(artist=="booba") %>% select(word) %>% unlist() ,
    data %>% filter(artist=="nekfeu") %>% select(word) %>% unlist() ,
    data %>% filter(artist=="georges-brassens") %>% select(word) %>% unlist()
    ),
  category.names = c("Booba (1995)" , "Nekfeu (663)" , "Brassens (471)"),
  filename = 'IMG/venn.png',
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
          cat.cex = 0.3,
          cat.default.pos = "outer",
          cat.pos = c(-27, 27, 135),
          cat.dist = c(0.055, 0.055, 0.085),
          cat.fontfamily = "sans",
          cat.col = c("#440154ff", '#21908dff', '#fde725ff'),
          rotation = 1
        )`}</Code>

        <div className="text-center">
          {" "}
          <img src="/figures/graph/venn/1.webp" alt="img" width={600} loading="lazy" />{" "}
        </div>

        <p>
          Here, it is easy to understand that Booba used 1995 unique words in the dataset. 44 of
          them were also used by Brassens <em>and</em> Nekfeu, 126 only shared with Nekfeu only.
        </p>
      </Section>

      <Section id="what-for" title="What for">
        <p>
          A venn diagram makes a really good work to study the intersection between 2 or 3 sets. It
          becomes very hard to read with more groups than that and thus must be avoided.
        </p>

        <p>
          Here is a famous example: a six-set venn diagram published in{" "}
          <a href="https://www.nature.com/articles/nature11241">Nature</a> that shows the
          relationship between the banana’s genome and the genome of five other species.
        </p>

        <div className="text-center">
          {" "}
          <img src="/figures/graph/venn/2.webp" alt="img" width={600} loading="lazy" />{" "}
        </div>

        <p>
          Even if this figure is quite attractive, it is really hard to extract any information from
          it. Here is a workaround.
        </p>
      </Section>

      <Section id="variation" title="Variation">
        <p>
          To visualize the intersection between more than 3 sets, the best option is to use a{" "}
          <a href="http://caleydo.org/tools/upset/">UpSet plot</a>.
        </p>

        <p>
          Here is an example provided by the <a href="https://github.com/hms-dbmi/UpSetR">UpsetR</a>{" "}
          R library that displays the banana genome information seen before. The total size of each
          set is represented on the left barplot. Every possible intersection is represented by the
          bottom plot, and their occurence is shown on the top barplot.
        </p>

        <Code lang="r">{`# Specific library
library(UpSetR)

# Dataset
input <- c(
  M.acuminata = 759,
  P.dactylifera = 769,
  A.thaliana = 1187,
  O.sativa = 1246,
  S.bicolor = 827,
  B.distachyon = 387,
  "P.dactylifera&M.acuminata" = 467,
  "O.sativa&M.acuminata" = 29,
  "A.thaliana&O.sativa" = 6,
  "S.bicolor&A.thaliana" = 9,
  "O.sativa&P.dactylifera" = 32,
  "S.bicolor&P.dactylifera" = 49,
  "S.bicolor&M.acuminata" = 49,
  "B.distachyon&O.sativa" = 547,
  "S.bicolor&O.sativa" = 1151,
  "B.distachyon&A.thaliana" = 10,
  "B.distachyon&M.acuminata" = 9,
  "B.distachyon&S.bicolor" = 402,
  "M.acuminata&A.thaliana" = 155,
  "A.thaliana&P.dactylifera" = 105,
  "B.distachyon&P.dactylifera" = 25,
  "S.bicolor&O.sativa&P.dactylifera" = 42,
  "B.distachyon&O.sativa&P.dactylifera" = 12,
  "S.bicolor&O.sativa&B.distachyon" = 2809,
  "B.distachyon&O.sativa&A.thaliana" = 18,
  "S.bicolor&O.sativa&A.thaliana" = 40,
  "S.bicolor&B.distachyon&A.thaliana" = 14,
  "O.sativa&B.distachyon&M.acuminata" = 28,
  "S.bicolor&B.distachyon&M.acuminata" = 13,
  "O.sativa&M.acuminata&P.dactylifera" = 35,
  "M.acuminata&S.bicolor&A.thaliana" = 21,
  "B.distachyon&M.acuminata&A.thaliana" = 7,
  "O.sativa&M.acuminata&A.thaliana" = 13,
  "M.acuminata&P.dactylifera&A.thaliana" = 206,
  "P.dactylifera&A.thaliana&S.bicolor" = 4,
  "O.sativa&A.thaliana&P.dactylifera" = 6,
  "S.bicolor&O.sativa&M.acuminata" = 64,
  "S.bicolor&M.acuminata&P.dactylifera" = 19,
  "B.distachyon&A.thaliana&P.dactylifera" = 3,
  "B.distachyon&M.acuminata&P.dactylifera" = 12,
  "B.distachyon&S.bicolor&P.dactylifera" = 23,
  "M.acuminata&B.distachyon&S.bicolor&A.thaliana" = 54,
  "P.dactylifera&S.bicolor&O.sativa&M.acuminata" = 62,
  "B.distachyon&O.sativa&M.acuminata&P.dactylifera" = 18,
  "S.bicolor&B.distachyon&O.sativa&A.thaliana" = 206,
  "B.distachyon&M.acuminata&O.sativa&A.thaliana" = 29,
  "O.sativa&M.acuminata&A.thaliana&S.bicolor" = 71,
  "M.acuminata&O.sativa&P.dactylifera&A.thaliana" = 28,
  "B.distachyon&M.acuminata&O.sativa&A.thaliana" = 7,
  "B.distachyon&S.bicolor&P.dactylifera&A.thaliana" = 11,
  "B.distachyon&O.sativa&P.dactylifera&A.thaliana" = 5,
  "A.thaliana&P.dactylifera&S.bicolor&O.sativa" = 21,
  "M.acuminata&S.bicolor&P.dactylifera&A.thaliana" = 23,
  "M.acuminata&B.distachyon&S.bicolor&P.dactylifera" = 24,
  "M.acuminata&O.sativa&S.bicolor&B.distachyon" = 368,
  "P.dactylifera&B.distachyon&S.bicolor&O.sativa" = 190,
  "P.dactylifera&B.distachyon&S.bicolor&O.sativa&A.thaliana" = 258,
  "P.dactylifera&M.acuminata&S.bicolor&B.distachyon&O.sativa" = 685,
  "M.acuminata&S.bicolor&B.distachyon&O.sativa&A.thaliana" = 1458,
  "S.bicolor&M.acuminata&P.dactylifera&O.sativa&A.thaliana" = 149,
  "B.distachyon&M.acuminata&P.dactylifera&O.sativa&A.thaliana" = 80,
  "M.acuminata&S.bicolor&B.distachyon&P.dactylifera&A.thaliana" = 113,
  "M.acuminata&S.bicolor&B.distachyon&P.dactylifera&O.sativa&A.thaliana" = 7674
)

# Plot
upset(fromExpression(input), nintersects = 40, nsets = 6, order.by = "freq", decreasing = T, mb.ratio = c(0.6, 0.4),
      number.angles = 0, text.scale = 1.1, point.size = 2.8, line.size = 1)`}</Code>

        <figure>
          <img
            src="/figures/graph/venn/3.webp"
            alt="Venn Diagram – chart example"
            width={960}
            loading="lazy"
          />
        </figure>

        <p>
          Here, it gets easy to understand that the vast majority of genes is shared between all
          plants, and which intersection are the biggest.
        </p>
      </Section>

      <Section id="mistake" title="Common mistakes">
        <ul>
          {" "}
          <li>
            Don’t display more than 3 groups in a classic venn diagram. Over this limit the figure
            gets very hard to read and it is better to use a upset plot.
          </li>{" "}
          <li>
            If working with 2 groups, make the circle areas proportional to the represented values.
          </li>{" "}
          <li>Write the numbers into each areas.</li>{" "}
        </ul>
      </Section>

      <Section id="related" title="Related">
        <RelatedGrid>
          <RelatedCard href="/graph/barplot.html" image="/img/section/BarSmall.png" title="Barplot">
            Represents the value of entities using bar of various length.
          </RelatedCard>
          <RelatedCard
            href="/graph/lollipop.html"
            image="/img/section/LollipopSmall.png"
            title="Lollipop plot"
          >
            A fancy barplot where bars are replaced with a dot and a segment. Allows even more
            options when it comes to stacking.
          </RelatedCard>
          <RelatedCard
            href="/graph/circularpacking.html"
            image="/img/section/CircularPackingSmall.png"
            title="Circular packing"
          >
            A circular version of a Treemap to visualize a hierarchical organization
          </RelatedCard>
          <RelatedCard
            href="/graph/dendrogram.html"
            image="/img/section/DendrogramSmall.png"
            title="Dendrogram"
          >
            A network structure used to show a hierarchical organization.
          </RelatedCard>
        </RelatedGrid>
      </Section>

      <Section id="code" title="Build your own">
        <p>
          The <a href="https://www.r-graph-gallery.com/venn-diagram.html">R</a>,{" "}
          <a href="https://www.python-graph-gallery.com/venn-diagram/">Python</a>,{" "}
          <a href="https://www.react-graph-gallery.com">React</a> and{" "}
          <a href="https://d3-graph-gallery.com">D3</a> graph galleries are 4 websites providing
          hundreds of chart example, always providing the reproducible code. Click the button below
          to see how to build the chart you need with your favorite programing language.
        </p>

        <p>
          <ButtonLink href="https://www.r-graph-gallery.com/venn-diagram.html">
            R graph gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://python-graph-gallery.com/venn-diagram/">
            Python gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://www.react-graph-gallery.com">React gallery</ButtonLink>{" "}
          <ButtonLink href="https://d3-graph-gallery.com">D3 gallery</ButtonLink>
        </p>
      </Section>
    </GraphLayout>
  );
}
