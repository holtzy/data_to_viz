import { GraphLayout } from "@/components/layouts";
import { ButtonLink, Code, RelatedCard, RelatedGrid, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/graph/arc.html",
  title: "Arc diagram – from Data to Viz",
  description:
    "An arc diagram is a special kind of network graph. It is consituted by nodes that represent entities and by links that show relationships between…",
  image: "/img/section/ArcSmal.png",
});

export default function Page() {
  return (
    <GraphLayout title="Arc diagram" images={["/img/section/ArcSmal.png"]}>
      <Section id="definition" title="Definition">
        <p>
          An <code>arc diagram</code> is a special kind of{" "}
          <a href="/graph/network.html">network graph</a>. It is consituted by <code>nodes</code>{" "}
          that represent entities and by <code>links</code> that show relationships between
          entities. In arc diagrams, nodes are displayed along a <code>single axis</code> and links
          are represented with arcs.
        </p>

        <p>
          Here is a simple example. Five links between 6 nodes are represented using a{" "}
          <a href="/graph/network.html">2d network diagram</a> (left) and an arc diagram (right)
        </p>

        <Code lang="r">{`# Libraries
library(tidyverse)
library(viridis)
library(patchwork)
library(hrbrthemes)
library(igraph)
library(ggraph)
library(colormap)

# A really simple edge list
links=data.frame(
    source=c("A", "A", "A", "A", "B"),
    target=c("B", "C", "D", "F","E")
    )

# Transform to a igraph object
mygraph <- graph_from_data_frame(links)

# Make the usual network diagram
p1 <-  ggraph(mygraph) +
  geom_edge_link(edge_colour="black", edge_alpha=0.3, edge_width=0.2) +
  geom_node_point( color="#69b3a2", size=5) +
  geom_node_text( aes(label=name), repel = TRUE, size=8, color="#69b3a2") +
  theme_void() +
  theme(
    legend.position="none",
    plot.margin=unit(rep(2,4), "cm")
  )

# Make a cord diagram
p2 <-  ggraph(mygraph, layout="linear") +
  geom_edge_arc(edge_colour="black", edge_alpha=0.3, edge_width=0.2) +
  geom_node_point( color="#69b3a2", size=5) +
  geom_node_text( aes(label=name), repel = FALSE, size=8, color="#69b3a2", nudge_y=-0.1) +
  theme_void() +
  theme(
    legend.position="none",
    plot.margin=unit(rep(2,4), "cm")
  )

p1 + p2`}</Code>

        <figure>
          <img
            src="/figures/graph/arc/1.webp"
            alt="Arc diagram – chart example"
            width={960}
            height={384}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="what-for" title="What for">
        <p>
          Arc diagrams are not as good as 2d network charts to convey the overall node structure. It
          has 2 main advantages tough:
        </p>
        <ul>
          {" "}
          <li>
            it can highlight clusters and briges quite well if the node order is optimized
          </li>{" "}
          <li>
            it allows to display the label of each node, which is often impossible in 2d structure.
          </li>{" "}
        </ul>
        <p>
          Here is an example showing the co-authorship network of a researcher.{" "}
          <a href="https://sites.google.com/site/ranwez/">Vincent Ranwez</a> is author of several
          scientific{" "}
          <a href="https://scholar.google.fr/citations?user=WLaQnegAAAAJ&hl=en">publications</a> and
          counts more than 100 co-authors, all represented by a node on the following chart. If two
          people have already been on the same paper, they are linked by an arc.
        </p>
      </Section>

      <div className="grid gap-6 md:grid-cols-12">
        <Code lang="r">{`# Load data
dataUU <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/13_AdjacencyUndirectedUnweighted.csv", header=TRUE)

# Transform the adjacency matrix in a long format
connect <- dataUU %>%
  gather(key="to", value="value", -1) %>%
  mutate(to = gsub("\\\\.", " ",to)) %>%
  na.omit()

# Number of connection per person
c( as.character(connect$from), as.character(connect$to)) %>%
  as.tibble() %>%
  group_by(value) %>%
  summarize(n=n()) -> coauth
colnames(coauth) <- c("name", "n")
#dim(coauth)

# Create a graph object with igraph
mygraph <- graph_from_data_frame( connect, vertices = coauth, directed = FALSE )

# Find community
com <- walktrap.community(mygraph)
#max(com$membership)

#Reorder dataset and make the graph
coauth <- coauth %>%
  mutate( grp = com$membership) %>%
  arrange(grp) %>%
  mutate(name=factor(name, name))

# keep only 10 first communities
coauth <- coauth %>%
  filter(grp<16)

# keep only this people in edges
connect <- connect %>%
  filter(from %in% coauth$name) %>%
  filter(to %in% coauth$name)

# Create a graph object with igraph
mygraph <- graph_from_data_frame( connect, vertices = coauth, directed = FALSE )

# prepare a vector of n color in the viridis scale
mycolor <- colormap(colormap=colormaps$viridis, nshades=max(coauth$grp))
mycolor <- sample(mycolor, length(mycolor))

# Make the graph
ggraph(mygraph, layout="linear") +
  geom_edge_arc(edge_colour="black", edge_alpha=0.2, edge_width=0.3, fold=TRUE) +
  geom_node_point(aes(size=n, color=as.factor(grp), fill=grp), alpha=0.5) +
  scale_size_continuous(range=c(0.5,8)) +
  scale_color_manual(values=mycolor) +
  geom_node_text(aes(label=name), angle=65, hjust=1, nudge_y = -1.1, size=2.3) +
  theme_void() +
  theme(
    legend.position="none",
    plot.margin=unit(c(0,0,0.4,0), "null"),
    panel.spacing=unit(c(0,0,3.4,0), "null")
  ) +
  expand_limits(x = c(-1.2, 1.2), y = c(-5.6, 1.2))`}</Code>

        <figure>
          <img
            src="/figures/graph/arc/2.webp"
            alt="Arc diagram – chart example"
            width={1440}
            height={672}
            loading="lazy"
          />
        </figure>
      </div>

      <p>
        <em>Note</em>: you can read more about this story in the{" "}
        <a href="/story/AdjacencyMatrix.html">dedicated page</a>.
      </p>

      <Section id="variation" title="Variation">
        <p>
          A possible variation in arc diagrams consists to make the links wider when the connection
          is stronger. To do so you need a <code>weighted network</code> where each connection as a
          weight.
        </p>

        <p>
          Since it is not the case in the previous autorship network, here is another one showing
          the character co-occurrence in the chapters of Victor Hugo’s classic novel Les Misérables.
          This example comes from <a href="http://www.gastonsanchez.com/blog">Gaston Sanchez</a> and
          is described more in depth{" "}
          <a href="https://www.r-bloggers.com/arc-diagrams-in-r-les-miserables/">here</a> (with R
          code).
        </p>

        <Code lang="r">{`# see code at https://www.r-bloggers.com/arc-diagrams-in-r-les-miserables/`}</Code>
        <br />
        <br />
        <div className="text-center">
          {" "}
          <img
            src="/figures/graph/arc/3.webp"
            alt="img"
            width={700}
            height={371}
            loading="lazy"
          />{" "}
        </div>
      </Section>

      <Section id="mistake" title="Common mistakes">
        <p>
          The order of nodes is the key for arc diagrams. See the following figure showing the same
          arc diagram than above, but with nodes displayed in a random order. Harder to find any
          insight isn’t it?
        </p>
      </Section>

      <div className="grid gap-6 md:grid-cols-12">
        <Code lang="r">{`#Reorder dataset randomly
coauth <- coauth %>%
  slice( sample(c(1:nrow(coauth)), nrow(coauth)))

# Create a graph object with igraph
mygraph <- graph_from_data_frame( connect, vertices = coauth, directed = FALSE )

# prepare a vector of n color in the viridis scale
mycolor <- colormap(colormap=colormaps$viridis, nshades=max(coauth$grp))
mycolor <- sample(mycolor, length(mycolor))

# Make the graph
ggraph(mygraph, layout="linear") +
  geom_edge_arc(edge_colour="black", edge_alpha=0.2, edge_width=0.3, fold=TRUE) +
  geom_node_point(aes(size=n, color=as.factor(grp), fill=grp), alpha=0.5) +
  scale_size_continuous(range=c(0.5,8)) +
  scale_color_manual(values=mycolor) +
  geom_node_text(aes(label=name), angle=65, hjust=1, nudge_y = -1.1, size=2.3) +
  theme_void() +
  theme(
    legend.position="none",
    plot.margin=unit(c(0,0,0.4,0), "null"),
    panel.spacing=unit(c(0,0,3.4,0), "null")
  ) +
  expand_limits(x = c(-1.2, 1.2), y = c(-5.6, 1.2))`}</Code>

        <figure>
          <img
            src="/figures/graph/arc/4.webp"
            alt="Arc diagram – chart example"
            width={1440}
            height={672}
            loading="lazy"
          />
        </figure>
      </div>

      <Section id="related" title="Related">
        <RelatedGrid>
          <RelatedCard
            href="/graph/chord.html"
            image="/img/section/ChordSmall.png"
            title="Chord diagram"
          >
            A circular layout used to display weighted relationships between entities through arcs.
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
          The <a href="https://www.r-graph-gallery.com">R</a>,{" "}
          <a href="https://python-graph-gallery.com/arc-diagram/">Python</a>,{" "}
          <a href="https://www.react-graph-gallery.com/arc-diagram">React</a> and{" "}
          <a href="https://d3-graph-gallery.com/arc.html">D3</a> graph galleries are 4 websites
          providing hundreds of chart example, always providing the reproducible code. Click the
          button below to see how to build the chart you need with your favorite programing
          language.
        </p>

        <p>
          <ButtonLink href="https://www.r-graph-gallery.com/">R graph gallery</ButtonLink>{" "}
          <ButtonLink href="https://python-graph-gallery.com/arc-diagram/">
            Python gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://www.react-graph-gallery.com/arc-diagram">
            React gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://d3-graph-gallery.com/arc.html">D3 gallery</ButtonLink>
        </p>
      </Section>
    </GraphLayout>
  );
}
