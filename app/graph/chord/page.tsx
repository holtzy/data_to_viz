import { GraphLayout } from "@/components/layouts";
import { ButtonLink, Code, RelatedCard, RelatedGrid, Section, Widget } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/graph/chord.html",
  title: "Chord diagram – from Data to Viz",
  description:
    "A chord diagram represents flows or connections between several entities (called nodes). Each entity is represented by a fragment on the outer part of the…",
  image: "/img/section/ChordSmall.png",
});

export default function Page() {
  return (
    <GraphLayout title="Chord diagram" images={["/img/section/ChordSmall.png"]}>
      <Section id="definition" title="Definition">
        <p>
          A <code>chord diagram</code> represents flows or connections between several entities
          (called <code>nodes</code>). Each entity is represented by a fragment on the outer part of
          the <code>circular layout</code>. Then, <code>arcs</code> are drawn between each entities.
          The size of the arc is proportional to the importance of the flow.
        </p>

        <p>
          Here is an example displaying the number of people migrating from one country to another.
          Data used comes from this{" "}
          <a href="https://onlinelibrary.wiley.com/doi/abs/10.1111/imre.12327">
            scientific publication
          </a>{" "}
          from <a href="http://guyabel.com">Guy J. Abel</a>.
        </p>

        <Code lang="r">{`# Libraries
library(tidyverse)
library(viridis)
library(patchwork)
library(hrbrthemes)
library(circlize)
library(chorddiag)  #devtools::install_github("mattflor/chorddiag")

# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/13_AdjacencyDirectedWeighted.csv", header=TRUE)

# short names
colnames(data) <- c("Africa", "East Asia", "Europe", "Latin Ame.",   "North Ame.",   "Oceania", "South Asia", "South East Asia", "Soviet Union", "West.Asia")
rownames(data) <- colnames(data)

# I need a long format
data_long <- data %>%
  rownames_to_column %>%
  gather(key = 'key', value = 'value', -rowname)

# parameters
circos.clear()
circos.par(start.degree = 90, gap.degree = 4, track.margin = c(-0.1, 0.1), points.overflow.warning = FALSE)
par(mar = rep(0, 4))

# color palette
mycolor <- viridis(10, alpha = 1, begin = 0, end = 1, option = "D")
mycolor <- mycolor[sample(1:10)]

# Base plot
chordDiagram(
  x = data_long, 
  grid.col = mycolor,
  transparency = 0.25,
  directional = 1,
  direction.type = c("arrows", "diffHeight"), 
  diffHeight  = -0.04,
  annotationTrack = "grid", 
  annotationTrackHeight = c(0.05, 0.1),
  link.arr.type = "big.arrow", 
  link.sort = TRUE, 
  link.largest.ontop = TRUE)

# Add text and axis
circos.trackPlotRegion(
  track.index = 1, 
  bg.border = NA, 
  panel.fun = function(x, y) {
    
    xlim = get.cell.meta.data("xlim")
    sector.index = get.cell.meta.data("sector.index")
    
    # Add names to the sector. 
    circos.text(
      x = mean(xlim), 
      y = 3.2, 
      labels = sector.index, 
      facing = "bending", 
      cex = 0.8
      )

    # Add graduation on axis
    circos.axis(
      h = "top", 
      major.at = seq(from = 0, to = xlim[2], by = ifelse(test = xlim[2]>10, yes = 2, no = 1)), 
      minor.ticks = 1, 
      major.tick.percentage = 0.5,
      labels.niceFacing = FALSE)
  }
)`}</Code>

        <figure>
          <img
            src="/figures/graph/chord/1.webp"
            alt="Chord diagram – chart example"
            width={672}
            loading="lazy"
          />
        </figure>

        <p>
          <em>Note</em>: this plot is made using the circlize library, and very strongly inspired
          from the <a href="https://github.com/cran/migest">Migest package</a> from{" "}
          <a href="http://guyabel.com">Guy J. Abel</a>. Read more about this story{" "}
          <a href="/story/AdjacencyMatrix.html">here</a>.
        </p>
      </Section>

      <Section id="what-for" title="What for">
        <p>
          Chord diagrams are eye catching and quite popular in data visualization. They allow to
          visualize <code>weigthed</code> relationships between several entities. They are adapted
          for several specific situations that slightly modify the output and the way to read them:
        </p>
        <ul>
          {" "}
          <li>
            <p>
              Flow. This is the example decribed in the chord diagram above. But two ways to
              represent it:
            </p>
            <ul>
              {" "}
              <li>One asymetric arc per pair</li> <li>Two arcs per pair</li>{" "}
            </ul>{" "}
          </li>{" "}
          <li>
            <p>
              Bipartite: nodes are grouped in a few categories. Connections go <em>between</em>{" "}
              categories but not <em>within</em> categories. In my opinion{" "}
              <a href="/graph/sankey.html">sankey diagrams</a> are more adapted in this situation.
            </p>
          </li>{" "}
        </ul>
        <p>
          <em>Note</em>: this section is under construction.
        </p>
      </Section>

      <Section id="variation" title="Variation">
        <p>
          Interactivity is a real plus to make the chord diagram understandable. In the example
          below, you can hover a specific group to highlight all its connections.
        </p>

        <div className="text-center">
          <Code lang="r">{`library(chorddiag)
m <- matrix(c(11975,  5871, 8916, 2868,
              1951, 10048, 2060, 6171,
              8010, 16145, 8090, 8045,
              1013,   990,  940, 6907),
            byrow = TRUE,
            nrow = 4, ncol = 4)
haircolors <- c("black", "blonde", "brown", "red")
dimnames(m) <- list(have = haircolors,
                    prefer = haircolors)

groupColors <- c("#000000", "#FFDD89", "#957244", "#F26223")
chorddiag(m, groupColors = groupColors, groupnamePadding = 20)`}</Code>

          <Widget src="/widgets/graph/chord-1.html" height={672} width={672} />
        </div>

        <p>
          <em>Note</em>: this example comes from the{" "}
          <a href="https://github.com/mattflor/chorddiag">chorddiag</a> package documentation.
        </p>
      </Section>

      <Section id="mistake" title="Common mistakes">
        <ul>
          {" "}
          <li>
            {" "}
            The group order around the circle is important. Try to minimize the number of arc
            crossing.{" "}
          </li>{" "}
          <li>
            {" "}
            Mind over-cluttering that makes the figure unreadable. It is advised to dismiss weak
            connections.{" "}
          </li>{" "}
          <li>
            {" "}
            Chord diagrams are not straightforward to understand at all. Give plenty of explanation
            to your audience when you present it. It is advised to break down the graphic,
            presenting its components progressively. See this awesome example of storytelling from{" "}
            <a href="https://www.visualcinnamon.com/2014/12/using-data-storytelling-with-chord">
              Nadieh Bremer
            </a>
            .{" "}
          </li>{" "}
        </ul>
      </Section>

      <Section id="related" title="Related">
        <RelatedGrid>
          <RelatedCard
            href="/graph/network.html"
            image="/img/section/NetworkSmall.png"
            title="Network"
          >
            Represents relationships using nodes and edges.
          </RelatedCard>
          <RelatedCard href="/graph/arc.html" image="/img/section/ArcSmal.png" title="Arc diagram">
            A subset of the network diagram where nodes are aligned and edges are arcs.
          </RelatedCard>
          <RelatedCard
            href="/graph/sankey.html"
            image="/img/section/SankeySmall.png"
            title="Sankey diagram"
          >
            A flow diagram in which the width of the arrows is shown proportionally to the flow
            quantity.
          </RelatedCard>
          <RelatedCard
            href="/graph/edge_bundling.html"
            image="/img/section/BundleSmall.png"
            title="Edge bundling"
          >
            Show connections between entities organized in a hierarchy.
          </RelatedCard>
        </RelatedGrid>
      </Section>

      <Section id="code" title="Build your own">
        <p>
          The <a href="https://r-graph-gallery.com/chord-diagram.html">R</a>,{" "}
          <a href="https:/python-graph-gallery.com/chord-diagram/">Python</a>,{" "}
          <a href="https://www.react-graph-gallery.com/chord-diagram">React</a> and{" "}
          <a href="https://d3-graph-gallery.com/chord.html">D3</a> graph galleries are 4 websites
          providing hundreds of chart example, always providing the reproducible code. Click the
          button below to see how to build the chart you need with your favorite programing
          language.
        </p>

        <p>
          <ButtonLink href="https://r-graph-gallery.com/chord-diagram.html">
            R graph gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://python-graph-gallery.com/chord-diagram/">
            Python gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://www.react-graph-gallery.com/chord-diagram">
            React gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://d3-graph-gallery.com/chord.html">D3 gallery</ButtonLink>
        </p>
      </Section>
    </GraphLayout>
  );
}
