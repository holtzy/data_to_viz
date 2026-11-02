import { GraphLayout } from "@/components/layouts";
import { Code, Section, Widget } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/graph/network.html",
  title: "Network diagram – from Data to Viz",
  description:
    "Network diagrams (also called Graphs) show interconnections between a set of entities. Each entity is represented by a Node (or vertice). Connections…",
  image: "/img/section/NetworkSmall.png",
});

export default function Page() {
  return (
    <GraphLayout title="Network diagram" images={["/img/section/NetworkSmall.png"]}>
      <Section id="definition" title="Definition">
        <p>
          <code>Network diagrams</code> (also called Graphs) show interconnections between a set of
          entities. Each entity is represented by a <code>Node</code> (or vertice). Connections
          between nodes are represented through <code>links</code> (or edges).
        </p>

        <p>
          Here is an example showing the co-authors network of{" "}
          <a href="https://sites.google.com/site/ranwez/">Vincent Ranwez</a>, a researcher who’s my
          previous supervisor. Basically, people having published at least one research paper with
          him are represented by a node. If two people have been listed on the same publication at
          least once, they are connected by a link.
        </p>

        <Code lang="r">{`# Libraries
library(tidyverse)
library(viridis)
library(patchwork)
library(hrbrthemes)
library(ggraph)
library(igraph)
library(networkD3)

# Load researcher data
dataUU <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/13_AdjacencyUndirectedUnweighted.csv", header=TRUE)

# Transform the adjacency matrix in a long format
connect <- dataUU %>%
  gather(key="to", value="value", -1) %>%
  na.omit()

# Number of connection per person
c(as.character(connect$from), as.character(connect$to)) %>%
  as_tibble() %>%
  group_by(value) %>%
  summarize(n=n()) -> coauth
colnames(coauth) <- c("name", "n")

# NetworkD3 format
graph <- simpleNetwork(connect)

# Plot
simpleNetwork(connect,
        Source = 1,                 # column number of source
        Target = 2,                 # column number of target
        height = 880,               # height of frame area in pixels
        width = 1980,
        linkDistance = 10,         # distance between node. Increase this value to have more space between nodes
        charge = -4,              # numeric value indicating either the strength of the node repulsion (negative value) or attraction (positive value)
        fontSize = 5,              # size of the node names
        fontFamily = "serif",       # font og node names
        linkColour = "#666",        # colour of edges, MUST be a common colour for the whole graph
        nodeColour = "#69b3a2",     # colour of nodes, MUST be a common colour for the whole graph
        opacity = 0.9,              # opacity of nodes. 0=transparent. 1=no transparency
        zoom = T                    # Can you zoom on the figure?
        )`}</Code>

        <Widget src="/widgets/graph/network-1.html" height={672} width={864} />

        <p>
          <em>Note</em>: This chart is <code>interactive</code>: zoom on a specific cluster to see
          researcher names. Data have been retrieved using the{" "}
          <a href="https://github.com/jkeirstead/scholar">scholar</a> package, the pipeline is
          describe in this{" "}
          <a href="https://github.com/holtzy/Google-Scholar-Network">github repository</a>. You can
          read more about this story <a href="/story/AdjacencyMatrix.html">here</a>.
        </p>
      </Section>
      <Section id="four-types-of-input" title="Four types of input">
        <p>
          Four main types of network diagram exist, according to the features of data inputs. Here
          is a short description.
        </p>
      </Section>
      <div className="grid gap-6 md:grid-cols-12">
        {" "}
        <div className="md:col-span-3">
          <h4 id="undirected-and-unweighted">
            {" "}
            <code>Undirected and Unweighted</code>{" "}
          </h4>

          <p>
            Tom, Cherelle and Melanie live in the same house. They are connected but no direction
            and no weight.
          </p>

          <Code lang="r">{`# Create data
set.seed(2)
data <- matrix(sample(0:1, 25, replace=TRUE), nrow=5)
data[lower.tri(data)] <- NA
rownames(data) <- LETTERS[1:5]
colnames(data) <- LETTERS[1:5]

# Transform it in a graph format
network <- graph_from_adjacency_matrix(data)

# Make the graph
ggraph(network) +
  geom_edge_link(edge_colour="black", edge_alpha=0.3, edge_width=0.2) +
  geom_node_point( color="#69b3a2", size=5) +
  geom_node_text( aes(label=name), repel = TRUE, size=8, color="#69b3a2") +
  theme_void() +
  theme(
    legend.position="none",
    plot.margin=unit(rep(1,4), "cm")
  )`}</Code>

          <figure>
            <img
              src="/figures/graph/network/1.webp"
              alt="Network diagram – chart example"
              width={672}
              height={480}
              loading="lazy"
            />
          </figure>
        </div>{" "}
        <div className="md:col-span-3">
          {" "}
          <br />
          <h4 id="undirected-and-weighted">
            {" "}
            <code>Undirected and Weighted</code>{" "}
          </h4>
          <p>
            In the previous co-authors network, people are connected if they published a scientific
            paper together. The weight is the number of time it happend.
          </p>
          <Code lang="r">{`# Create data
set.seed(1)
data <- matrix(sample(0:3, 25, replace=TRUE), nrow=5)
data[lower.tri(data)] <- NA
rownames(data) <- LETTERS[1:5]
colnames(data) <- LETTERS[1:5]

# Transform it in a graph format
network <- graph_from_adjacency_matrix(data, weighted = TRUE)

# Remove edges with NA weights
network <- delete_edges(network, E(network)[is.na(E(network)$weight)])

# Make the graph
ggraph(network) +
  geom_edge_link(aes(edge_width=E(network)$weight), edge_colour="black", edge_alpha=0.3) +
  geom_node_point(color="#69b3a2", size=5) +
  geom_node_text(aes(label=name), repel = TRUE, size=8, color="#69b3a2") +
  theme_void() +
  theme(
    legend.position="none",
    plot.margin=unit(rep(1,4), "cm")
  )`}</Code>
          <figure>
            <img
              src="/figures/graph/network/2.webp"
              alt="Network diagram – chart example"
              width={672}
              height={480}
              loading="lazy"
            />
          </figure>
        </div>{" "}
        <div className="md:col-span-3">
          {" "}
          <br />
          <h4 id="directed-and-unweighted">
            {" "}
            <code>Directed and Unweighted</code>{" "}
          </h4>
          <p>
            Tom follows Shirley on twitter, but the opposite is not necessarily true. The connection
            is unweighted: just connected or not.
          </p>
          <Code lang="r">{`# Create data
set.seed(10)
data <- matrix(sample(0:1, 25, replace=TRUE), nrow=5)
diag(data) = NA
rownames(data) <- LETTERS[1:5]
colnames(data) <- LETTERS[1:5]

# Transform it in a graph format
network <- graph_from_adjacency_matrix(data)

# Make the graph
ggraph(network) +
  geom_edge_link(edge_colour="black", edge_alpha=0.8, edge_width=0.2, arrow = arrow(angle=20)) +
  geom_node_point( color="#69b3a2", size=3) +
  geom_node_text( aes(label=name), repel = TRUE, size=6, color="#69b3a2") +
  theme_void() +
  theme(
    legend.position="none",
    plot.margin=unit(rep(1,4), "cm")
  )`}</Code>
          <figure>
            <img
              src="/figures/graph/network/3.webp"
              alt="Network diagram – chart example"
              width={672}
              height={480}
              loading="lazy"
            />
          </figure>
        </div>{" "}
        <div className="md:col-span-3">
          <h4 id="directed-and-weighted">
            {" "}
            <code>Directed and Weighted</code>{" "}
          </h4>

          <p>
            People migrate from a country to another: the weight is the number of people, the
            direction is the destination.
          </p>

          <Code lang="r">{`# Create data
set.seed(11)
data <- matrix(sample(0:3, 16, replace=TRUE), nrow=4)
diag(data) <- NA
rownames(data) <- LETTERS[1:4]
colnames(data) <- LETTERS[1:4]

# Transform it in a graph format
network=graph_from_adjacency_matrix(data, weighted=TRUE)

# Remove edges with NA weights
network <- delete_edges(network, E(network)[is.na(E(network)$weight)])

# Make the graph
ggraph(network) +
  geom_edge_link(edge_colour="black", edge_alpha=0.3, aes(edge_width=E(network)$weight) , arrow=arrow()) +
  scale_edge_width(range=c(1,3)) +
  geom_node_point( color="#69b3a2", size=3) +
  geom_node_text( aes(label=name), repel = TRUE, size=6, color="#69b3a2") +
  theme_void() +
  theme(
    legend.position="none",
    plot.margin=unit(rep(1,4), "cm")
  )`}</Code>

          <figure>
            <img
              src="/figures/graph/network/4.webp"
              alt="Network diagram – chart example"
              width={672}
              height={480}
              loading="lazy"
            />
          </figure>
        </div>{" "}
      </div>
      <p>
        <em>Note</em>: as you can observe on the examples above, directed graphs are quite hard to
        represent using this type of visualization. More appropriate techniques exist to represent
        flows, like <a href="/graph/sankey.html">Sankey diagram</a> or{" "}
        <a href="/graph/chord.html">chord diagram</a>.
      </p>
      <Section id="variation" title="Variation">
        <p>
          Many customizations are available for network diagrams. Here are a few features you can
          work on to improve your graphic:
        </p>
        <ul>
          {" "}
          <li>
            <p>
              Adding information to the node: you can add more insight to the graphic by customizing
              the color, the shape or the size of each node according to other variables.
            </p>
          </li>{" "}
          <li>
            <p>
              Different <code>layout algorythm</code>: finding the most optimal position for each
              node is a tricky exercise that highly impacts the output. Several algorithms have been
              developped, and choosing the right one for your data is a crucial step. See{" "}
              <a href="http://igraph.org/r/doc/layout_.html">this page</a> for a list of the most
              common algorithm. Here is an example illustrating the differences between three
              options:
            </p>
          </li>{" "}
        </ul>
      </Section>
      <div className="md:col-span-4">
        {" "}
        <br />
        <h4 id="fruchterman-reingold">
          {" "}
          <code>Fruchterman-Reingold</code>{" "}
        </h4>
        <hr />
        <p>Probably the most widely used algorithm, using a force-directed method.</p>
        <Code lang="r">{`# Load researcher data
dataUU <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/13_AdjacencyUndirectedUnweighted.csv", header=TRUE)

# Transform the adjacency matrix in a long format
connect <- dataUU %>%
  gather(key="to", value="value", -1) %>%
  na.omit()

# Number of connection per person
c( as.character(connect$from), as.character(connect$to)) %>%
  as.tibble() %>%
  group_by(value) %>%
  summarize(n=n()) -> coauth
colnames(coauth) <- c("name", "n")

# Create a graph object with igraph
mygraph <- graph_from_data_frame( connect, vertices = coauth )

# Make the graph
ggraph(mygraph, layout="fr") +
  #geom_edge_density(edge_fill="#69b3a2") +
  geom_edge_link(edge_colour="black", edge_alpha=0.2, edge_width=0.3) +
  geom_node_point(aes(size=n, alpha=n)) +
  theme_void() +
  theme(
    legend.position="none",
    plot.margin=unit(rep(1,4), "cm")
  )`}</Code>
        <img
          src="/figures/graph/network/5.webp"
          alt="Network diagram – chart example"
          width={672}
          height={480}
          loading="lazy"
        />{" "}
      </div>{" "}
      <div className="md:col-span-4">
        {" "}
        <br />
        <h4 id="drl">
          {" "}
          <code>DrL</code>{" "}
        </h4>
        <hr />
        <p>A force-directed graph layout toolbox focused on real-world large-scale graphs</p>
        <Code lang="r">{`# Make the graph
ggraph(mygraph, layout="drl") +
  #geom_edge_density(edge_fill="#69b3a2") +
  geom_edge_link(edge_colour="black", edge_alpha=0.2, edge_width=0.3) +
  geom_node_point(aes(size=n, alpha=n)) +
  theme_void() +
  theme(
    legend.position="none",
    plot.margin=unit(rep(1,4), "cm")
  )`}</Code>
        <img
          src="/figures/graph/network/6.webp"
          alt="Network diagram – chart example"
          width={672}
          height={480}
          loading="lazy"
        />{" "}
      </div>{" "}
      <div className="md:col-span-4">
        {" "}
        <br />
        <h4 id="randomly">
          {" "}
          <code>Randomly</code>{" "}
        </h4>
        <hr />
        <p>This is what happens if node positions is set up randomly</p>
        <Code lang="r">{`ggraph(mygraph, layout="igraph", algorithm="randomly") +
  #geom_edge_density(edge_fill="#69b3a2") +
  geom_edge_link(edge_colour="black", edge_alpha=0.2, edge_width=0.3) +
  geom_node_point(aes(size=n, alpha=n)) +
  theme_void() +
  theme(
    legend.position="none",
    plot.margin=unit(rep(1,4), "cm")
  )`}</Code>
        <figure>
          <img
            src="/figures/graph/network/7.webp"
            alt="Network diagram – chart example"
            width={672}
            height={480}
            loading="lazy"
          />
        </figure>
      </div>
    </GraphLayout>
  );
}
