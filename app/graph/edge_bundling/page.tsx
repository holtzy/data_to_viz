import { GraphLayout } from "@/components/layouts";
import { ButtonLink, Code, RelatedCard, RelatedGrid, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/graph/edge_bundling.html",
  title: "Hierarchical edge bundling – from Data to Viz",
  description:
    "Hierarchical Edge Bundling allows to visualize adjacency relations between entities organized in a hierarchy. The idea is to bundle the adjacency edges…",
  image: "/img/section/BundleSmall.png",
});

export default function Page() {
  return (
    <GraphLayout title="Hierarchical edge bundling" images={["/img/section/BundleSmall.png"]}>
      <Section id="definition" title="Definition">
        <p>
          <code>Hierarchical Edge Bundling</code> allows to visualize{" "}
          <code>adjacency relations</code> between entities organized in a <code>hierarchy</code>.
          The idea is to bundle the adjacency edges together to decrease the clutter usually
          observed in complex networks.
        </p>

        <p>
          <u>Step 1</u>: Let’s consider the hierarchy of the{" "}
          <a href="http://flare.prefuse.org">Flare</a> ActionScript visualization library. The
          elements of its library are organized in several folder, like query, data, scale… Each
          folder is then subdivided in subfolders and so on. The hierarchy can be visualized as a{" "}
          <a href="/graph/dendrogram.html">dendrogram</a> as follow:
        </p>

        <Code lang="r">{`# Libraries
library(tidyverse)
library(viridis)
library(patchwork)
library(hrbrthemes)
library(ggraph)
library(igraph)

# The flare dataset is provided in ggraph
edges <- flare$edges
vertices <- flare$vertices %>% arrange(name) %>% mutate(name=factor(name, name))
connections <- flare$imports

# Preparation to draw labels properly:
vertices$id=NA
myleaves=which(is.na( match(vertices$name, edges$from) ))
nleaves=length(myleaves)
vertices$id[ myleaves ] = seq(1:nleaves)
vertices$angle= 90 - 360 * vertices$id / nleaves
vertices$hjust<-ifelse( vertices$angle < -90, 1, 0)
vertices$angle<-ifelse(vertices$angle < -90, vertices$angle+180, vertices$angle)

# Build a network object from this dataset:
mygraph <- graph_from_data_frame(edges, vertices = vertices)

# The connection object must refer to the ids of the leaves:
from = match( connections$from, vertices$name)
to = match( connections$to, vertices$name)

# Basic dendrogram
ggraph(mygraph, layout = 'dendrogram', circular = TRUE) +
    geom_edge_link(size=0.4, alpha=0.1) +
    geom_node_text(aes(x = x*1.01, y=y*1.01, filter = leaf, label=shortName, angle = angle, hjust=hjust), size=1.5, alpha=1) +
    coord_fixed() +
    theme_void() +
    theme(
      legend.position="none",
      plot.margin=unit(c(0,0,0,0),"cm"),
    ) +
    expand_limits(x = c(-1.2, 1.2), y = c(-1.2, 1.2))`}</Code>

        <figure>
          <img
            src="/figures/graph/edge_bundling/1.webp"
            alt="Hierarchical edge bundling – chart example"
            width={576}
            height={576}
            loading="lazy"
          />
        </figure>

        <p>
          <u>Step 2</u>: now consider another level of information. Some elements of the library
          have dependencies: basically they call other elements when they are used. A naive approach
          to represent this connection would be to draw a straight line (left). Instead,
          hierarchical edge bundling uses a curve that follows the hierarchy link between the 2
          elements (right).
        </p>

        <Code lang="r">{`# Just one connection:
from_head = match( connections$from, vertices$name) %>% head(1)
to_head = match( connections$to, vertices$name) %>% head(1)

# Basic dendrogram
p1 <- ggraph(mygraph, layout = 'dendrogram', circular = TRUE) +
    geom_edge_link(size=0.4, alpha=0.1) +
    geom_conn_bundle(data = get_con(from = from_head, to = to_head), alpha = 1, colour="#69b3a2", width=2, tension=0) +
    geom_node_text(aes(x = x*1.01, y=y*1.01, filter = leaf, label=shortName, angle = angle, hjust=hjust), size=1.5, alpha=1) +
    coord_fixed() +
    theme_void() +
    theme(
      legend.position="none",
      plot.margin=unit(c(0,0,0,0),"cm"),
    ) +
    expand_limits(x = c(-1.2, 1.2), y = c(-1.2, 1.2))

p2 <- ggraph(mygraph, layout = 'dendrogram', circular = TRUE) +
    geom_edge_link(size=0.4, alpha=0.1) +
    geom_conn_bundle(data = get_con(from = from_head, to = to_head), alpha = 1, colour="#69b3a2", width=2, tension=0.9) +
    geom_node_text(aes(x = x*1.01, y=y*1.01, filter = leaf, label=shortName, angle = angle, hjust=hjust), size=1.5, alpha=1) +
    coord_fixed() +
    theme_void() +
    theme(
      legend.position="none",
      plot.margin=unit(c(0,0,0,0),"cm"),
    ) +
    expand_limits(x = c(-1.2, 1.2), y = c(-1.2, 1.2))

p1 + p2`}</Code>

        <figure>
          <img
            src="/figures/graph/edge_bundling/2.webp"
            alt="Hierarchical edge bundling – chart example"
            width={960}
            height={576}
            loading="lazy"
          />
        </figure>

        <p>
          <u>Step 3</u>: Hierarchical edge bundling apply this technique to every adjacency
          connection of the dataset. Also, it does not show the hierarchy of the dataset to decrease
          the clutter as much as possible. It results in a smooth eye catching figure where
          connection get obvious and the clutter minimal. Here is an analogy suggested by the
          inventor of this technique:
        </p>
        <blockquote>
          <p>
            … as bundling your electrical wires together in order to reduce clutter, while fanning
            them out at their terminus in order to plus them in.
          </p>
        </blockquote>
        <Code lang="r">{`# Make the plot
ggraph(mygraph, layout = 'dendrogram', circular = TRUE) +
    geom_conn_bundle(data = get_con(from = from, to = to), alpha = 0.1, colour="#69b3a2") +
    geom_node_text(aes(x = x*1.01, y=y*1.01, filter = leaf, label=shortName, angle = angle, hjust=hjust), size=1.5, alpha=1) +
    coord_fixed() +
    theme_void() +
    theme(
      legend.position="none",
      plot.margin=unit(c(0,0,0,0),"cm"),
    ) +
    expand_limits(x = c(-1.2, 1.2), y = c(-1.2, 1.2))`}</Code>

        <figure>
          <img
            src="/figures/graph/edge_bundling/3.webp"
            alt="Hierarchical edge bundling – chart example"
            width={672}
            height={672}
            loading="lazy"
          />
        </figure>

        <p>
          <em>Note</em>: This example uses the famous <code>flare</code> example provided in the{" "}
          <a href="https://github.com/thomasp85/ggraph/blob/master/R/data_flare.R">
            ggraph R library
          </a>
          .
        </p>

        <p>
          <em>Reference</em>: Hierarchical edge bundling is a method developped by: D. Holten 2006.{" "}
          <a href="https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=4015425">
            Hierarchical Edge Bundles: Visualization of Adjacency Relations in Hierarchical Data
          </a>
          . <em>IEEE Transactions on Visualization and Computer Graphics 12(5)</em>.
        </p>
      </Section>

      <Section id="what-for" title="What for">
        <p>
          Hierarchical edge bundling reduces visual clutter and also visualizes implicit adjacency
          edges between parent nodes that are the result of explicit adjacency edges between their
          respective child nodes. Furthermore, hierarchical edge bundling is a generic method which
          can be used in conjunction with existing tree visualization techniques.
        </p>

        <p>
          Here is an example showing the same dataset with and without the use of bundling. The use
          of straight line on the left results in a cluttered figure that makes impossible to read
          the connection. The use of bundling on the right makes a neat figure:
        </p>
        <br />
        <br />
        <div className="text-center">
          {" "}
          <img
            src="/figures/graph/edge_bundling/4.webp"
            alt="img"
            width={600}
            height={300}
            loading="lazy"
          />{" "}
        </div>

        <p>
          <em>source</em>:{" "}
          <a href="https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=4015425">
            Holten 2006.
          </a>
        </p>
      </Section>

      <Section id="variation" title="Variation">
        <p>Because I love this kind of graphic so much, I feel like displaying a few examples</p>
        <ul>
          {" "}
          <li>
            Application of edge bundling on maps, with a method that do not even need a hierarchy:
            it uses a self-organizing approach to bundling. <em>Source</em>: Holten et al. 2009.{" "}
            <a href="https://www.win.tue.nl/vis1/home/dholten/papers/forcebundles_eurovis.pdf">
              Force-Directed Edge Bundling for Graph Visualization
            </a>
            .
          </li>{" "}
        </ul>{" "}
        <br />
        <br />
        <div className="text-center">
          {" "}
          <img
            src="/figures/graph/edge_bundling/5.webp"
            alt="img"
            width={800}
            height={340}
            loading="lazy"
          />{" "}
        </div>
        <ul>
          {" "}
          <li>
            The{" "}
            <a href="http://truth-and-beauty.net/projects/well-formed-eigenfactor">
              Eigen factor project
            </a>{" "}
            study citation patterns between scientific journals. <em>Moritz Stefaner</em> used this
            data to build beautiful visuals using the hierarchical edge bundling technique:
          </li>{" "}
        </ul>{" "}
        <br />
        <div className="text-center">
          {" "}
          <img
            src="/figures/graph/edge_bundling/6.webp"
            alt="img"
            width={600}
            height={433}
            loading="lazy"
          />{" "}
        </div>
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
            href="/graph/chord.html"
            image="/img/section/ChordSmall.png"
            title="Chord diagram"
          >
            A circular layout used to display weighted relationships between entities through arcs.
          </RelatedCard>
        </RelatedGrid>
      </Section>

      <Section id="code" title="Build your own">
        <p>
          The <a href="https://r-graph-gallery.com/hierarchical-edge-bundling.html">R</a>,{" "}
          <a href="https:/python-graph-gallery.com/hierarchical-edge-bundling/">Python</a>,{" "}
          <a href="https://www.react-graph-gallery.com/hierarchical-edge-bundling">React</a> and{" "}
          <a href="https://d3-graph-gallery.com/bundle.html">D3</a> graph galleries are 4 websites
          providing hundreds of chart example, always providing the reproducible code. Click the
          button below to see how to build the chart you need with your favorite programing
          language.
        </p>

        <p>
          <ButtonLink href="https://r-graph-gallery.com/hierarchical-edge-bundling.html">
            R graph gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://python-graph-gallery.com/hierarchical-edge-bundling/">
            Python gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://www.react-graph-gallery.com/hierarchical-edge-bundling">
            React gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://d3-graph-gallery.com/bundle.html">D3 gallery</ButtonLink>
        </p>
      </Section>
    </GraphLayout>
  );
}
