import { GraphLayout } from "@/components/layouts";
import { ButtonLink, Code, RelatedCard, RelatedGrid, Section, Widget } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/graph/sankey.html",
  title: "Sankey diagram – from Data to Viz",
  description:
    "A Sankey Diagram is a visualisation technique that allows to display flows. Several entities (nodes) are represented by rectangles or text. Their links…",
  image: "/img/section/SankeySmall.png",
});

export default function Page() {
  return (
    <GraphLayout title="Sankey diagram" images={["/img/section/SankeySmall.png"]}>
      <Section id="definition" title="Definition">
        <p>
          A <code>Sankey Diagram</code> is a visualisation technique that allows to display flows.
          Several entities (<code>nodes</code>) are represented by rectangles or text. Their links
          are represented with arrow or arcs that have a width proportional to the importance of the
          flow.
        </p>

        <p>
          Here is an example displaying the number of people migrating from one country (left) to
          another (right). Data used comes from this{" "}
          <a href="https://onlinelibrary.wiley.com/doi/abs/10.1111/imre.12327">
            scientific publication
          </a>
          .
        </p>

        <Code lang="r">{`# Libraries
library(tidyverse)
library(viridis)
library(patchwork)
library(hrbrthemes)
library(circlize)

# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/13_AdjacencyDirectedWeighted.csv", header=TRUE)
# Package
library(networkD3)

# I need a long format
data_long <- data %>%
  rownames_to_column %>%
  gather(key = 'key', value = 'value', -rowname) %>%
  filter(value > 0)
colnames(data_long) <- c("source", "target", "value")
data_long$target <- paste(data_long$target, " ", sep="")

# From these flows we need to create a node data frame: it lists every entities involved in the flow
nodes <- data.frame(name=c(as.character(data_long$source), as.character(data_long$target)) %>% unique())

# With networkD3, connection must be provided using id, not using real name like in the links dataframe.. So we need to reformat it.
data_long$IDsource=match(data_long$source, nodes$name)-1
data_long$IDtarget=match(data_long$target, nodes$name)-1

# prepare colour scale
ColourScal ='d3.scaleOrdinal() .range(["#FDE725FF","#B4DE2CFF","#6DCD59FF","#35B779FF","#1F9E89FF","#26828EFF","#31688EFF","#3E4A89FF","#482878FF","#440154FF"])'

# Make the Network
sankeyNetwork(Links = data_long, Nodes = nodes,
                     Source = "IDsource", Target = "IDtarget",
                     Value = "value", NodeID = "name",
                     sinksRight=FALSE, colourScale=ColourScal, nodeWidth=40, fontSize=13, nodePadding=20)`}</Code>

        <Widget src="/widgets/graph/sankey-1.html" height={672} width={960} />

        <p>
          <em>Note</em>: an <em>Alluvial diagram</em> is a sub category of Sankey diagrams where
          nodes are grouped in vertical nodes (sometimes called steps). In many cases, these steps
          represent different time stamp. Note that there are confusions on this topic as
          illustrated in this{" "}
          <a href="https://twitter.com/visualisingdata/status/580742089484439552?lang=fr">
            twitter discussion
          </a>
          . Please reach me out if you have a better definition.
        </p>
      </Section>

      <Section id="what-for" title="What for">
        <p>
          Sankey diagrams are used to show weighted networks, i.e. flows. It can happen with several
          data structure:
        </p>
        <ul>
          {" "}
          <li>
            <p>
              <em>evolution</em>: the nodes are duplicated in 2 or more groups that represent
              stages. Connections show the evolution between two states, like in the migration
              example above. This is more often visualized as a{" "}
              <a href="/graph/chord.html">chord diagram</a>.
            </p>
          </li>{" "}
          <li>
            <p>
              <em>source to end</em>: consider a total amount, the diagram shows where it comes from
              and where it ends up, with possible intermediate steps. Each node is unique. (Example
              coming from the{" "}
              <a href="https://christophergandrud.github.io/networkD3/">networkD3</a> package).
            </p>
          </li>{" "}
        </ul>
        <Code lang="r">{`# Load package
library(networkD3)

# Load energy projection data
URL <- "https://cdn.rawgit.com/christophergandrud/networkD3/master/JSONdata/energy.json"
Energy <- jsonlite::fromJSON(URL)

# Now we have 2 data frames: a 'links' data frame with 3 columns (from, to, value), and a 'nodes' data frame that gives the name of each node.

# Thus we can plot it
sankeyNetwork(Links = Energy$links, Nodes = Energy$nodes, Source = "source",
              Target = "target", Value = "value", NodeID = "name",
              units = "TWh", fontSize = 12, nodeWidth = 30)`}</Code>

        <Widget src="/widgets/graph/sankey-2.html" height={576} width={864} />
      </Section>

      <Section id="variation" title="Variation">
        <p>
          Sankey diagram are prone to many visual variations, even if the underlying idea remain the
          same. Here is an example showing metal recovery and recycling in Australia (
          <a href="http://www.sankey-diagrams.com/tag/australia/">source</a>):
        </p>
        <br />
        <br />
        <div className="text-center">
          {" "}
          <img
            src="/figures/graph/sankey/1.webp"
            alt="img"
            width={600}
            height={291}
            loading="lazy"
          />{" "}
        </div>

        <p>
          If you’re interested to see more examples, there is a{" "}
          <a href="http://www.sankey-diagrams.com">whole website about it</a>.
        </p>
      </Section>

      <Section id="mistake" title="Common mistakes">
        <ul>
          {" "}
          <li>
            The position of nodes is very important: algorythm exist to minimize the number of
            crossing between links.
          </li>{" "}
          <li>
            Mind over-cluttering that makes the figure unreadable. It is advised to dismiss weak
            connections.
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
            href="/graph/chord.html"
            image="/img/section/ChordSmall.png"
            title="Chord diagram"
          >
            A circular layout used to display weighted relationships between entities through arcs.
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
          The <a href="https://www.r-graph-gallery.com/sankey-diagram.html">R</a>,{" "}
          <a href="https://www.python-graph-gallery.com/sankey-diagram/">Python</a>,{" "}
          <a href="https://www.react-graph-gallery.com/sankey-diagram">React</a> and{" "}
          <a href="https://d3-graph-gallery.com/sankey.html">D3</a> graph galleries are 4 websites
          providing hundreds of chart example, always providing the reproducible code. Click the
          button below to see how to build the chart you need with your favorite programing
          language.
        </p>

        <p>
          <ButtonLink href="https://www.r-graph-gallery.com/sankey-diagram.html">
            R graph gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://python-graph-gallery.com/sankey-diagram/">
            Python gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://www.react-graph-gallery.com/sankey-diagram">
            React gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://d3-graph-gallery.com/sankey.html">D3 gallery</ButtonLink>
        </p>
      </Section>
    </GraphLayout>
  );
}
