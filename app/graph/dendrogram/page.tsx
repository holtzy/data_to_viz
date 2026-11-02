import { GraphLayout } from "@/components/layouts";
import { ButtonLink, Code, RelatedCard, RelatedGrid, Section, Widget } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/graph/dendrogram.html",
  title: "Dendrogram – from Data to Viz",
  description:
    "A dendrogram is a network structure. It is constituted of a root node that gives birth to several nodes connected by edges or branches. The last nodes of…",
  image: "/img/section/DendrogramSmall.png",
});

export default function Page() {
  return (
    <GraphLayout title="Dendrogram" images={["/img/section/DendrogramSmall.png"]}>
      <Section id="definition" title="Definition">
        <p>
          A dendrogram is a <code>network structure</code>. It is constituted of a{" "}
          <code>root node</code> that gives birth to several <code>nodes</code> connected by{" "}
          <code>edges</code> or <code>branches</code>. The last nodes of the hierarchy are called{" "}
          <code>leaves</code>. In the following example, the CEO is the root node. He manages 2
          managers that manage 8 employees (the leaves).
        </p>

        <Code lang="r">{`# libraries
library(ggraph)
library(igraph)
library(tidyverse)
library(dplyr)
library(dendextend)
library(colormap)
library(kableExtra)
options(knitr.table.format = "html")

# create a data frame
data=data.frame(
  level1="CEO",
  level2=c( rep("boss1",4), rep("boss2",4)),
  level3=paste0("mister_", letters[1:8])
)

# transform it to a edge list!
edges_level1_2 = data %>% select(level1, level2) %>% unique %>% rename(from=level1, to=level2)
edges_level2_3 = data %>% select(level2, level3) %>% unique %>% rename(from=level2, to=level3)
edge_list=rbind(edges_level1_2, edges_level2_3)

# Now we can plot that
mygraph <- graph_from_data_frame( edge_list )
ggraph(mygraph, layout = 'dendrogram', circular = FALSE) +
  geom_edge_diagonal() +
  geom_node_point(color="#69b3a2", size=3) +
  geom_node_text(
    aes(  label=c("CEO", "Manager", "Manager", LETTERS[8:1]) ),
    hjust=c(1,0.5, 0.5, rep(0,8)),
    nudge_y = c(-.02, 0, 0, rep(.02,8)),
    nudge_x = c(0, .3, .3, rep(0,8))
  ) +
  theme_void() +
  coord_flip() +
  scale_y_reverse()`}</Code>

        <figure>
          <img
            src="/figures/graph/dendrogram/1.webp"
            alt="Dendrogram – chart example"
            width={672}
            height={384}
            loading="lazy"
          />
        </figure>

        <p>Two type of dendrogram exist, resulting from 2 types of dataset:</p>
        <ul>
          {" "}
          <li>
            A <code>hierarchic</code> dataset provides the links between nodes explicitely. Like
            above.
          </li>{" "}
          <li>
            The result of a <code>clustering</code> algorythm can be visualized as a dendrogram.
          </li>{" "}
        </ul>
      </Section>

      <Section id="dendrogram-from-hierarchic-data" title="Dendrogram from hierarchic data">
        <p>
          Hierarchic data is a type of data that provides the <strong>links between nodes</strong>{" "}
          explicitely. It is a common way to represent a hierarchical organization.
        </p>

        <p>
          The following example shows the hierarchy of a company. The CEO is the{" "}
          <strong>root node</strong>. He manages 2 managers that manage 8 employees (the{" "}
          <strong>leaves</strong>).
        </p>

        <Code lang="r">{`# libraries
library(ggraph)
library(igraph)
library(tidyverse)

# create a data frame
data <- data.frame(
  level1="CEO",
  level2=c( rep("boss1",4), rep("boss2",4)),
  level3=paste0("mister_", letters[1:8])
)

# transform it to a edge list!
edges_level1_2 <- data %>% select(level1, level2) %>% unique %>% rename(from=level1, to=level2)
edges_level2_3 <- data %>% select(level2, level3) %>% unique %>% rename(from=level2, to=level3)
edge_list <- rbind(edges_level1_2, edges_level2_3)

# Now we can plot that
mygraph <- graph_from_data_frame( edge_list )
ggraph(mygraph, layout = 'dendrogram', circular = FALSE) +
  geom_edge_diagonal() +
  geom_node_point() +
  theme_void()`}</Code>

        <figure>
          <img
            src="/figures/graph/dendrogram/2.webp"
            alt="Dendrogram – chart example"
            width={672}
            height={480}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="dendrogram-from-clustering" title="Dendrogram from clustering">
        <div className="grid gap-6 md:grid-cols-12">
          {" "}
          <div className="md:col-span-6">
            <p>
              Let’s consider a <code>distance matrix</code> that provides the distance between all
              pairs of 28 major cities. Note that this kind of matrix can be computed from a{" "}
              <code>multivariate dataset</code>, computing distance between each pair of individual
              using <code>correlation</code> or <code>euclidean distance</code>.
            </p>
          </div>{" "}
          <div className="md:col-span-6">
            <Code lang="r">{`# Load the data
data <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/13_AdjacencyUndirecterWeighted.csv", header=T, sep=",") %>% as.matrix
#data <- read.table("../Example_dataset/13_AdjacencyUndirecterWeighted.csv", header=T, sep=",") %>% as.matrix
colnames(data) <- gsub("\\\\.", " ", colnames(data))
data <- data %>%
  as.data.frame() %>%
  mutate_all(~ gsub(" ", "", .)) %>%
  as.matrix()
data <- apply(data, 2, as.numeric)
data <- data[,-1] # remove the first column (city names)

# show data
tmp <- data %>% as.data.frame() %>% select(1,3,6) %>% .[c(1,3,6),]
tmp[is.na(tmp)] <- "-"
tmp %>% kable() %>%
  kable_styling(bootstrap_options = "striped", full_width = F)`}</Code>

            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Berlin</th>
                    <th>Cairo</th>
                    <th>Caracas</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <ul>
                        {" "}
                        <li></li>
                      </ul>
                    </td>
                    <td>1795</td>
                    <td>5247</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>1795</td>
                    <td>
                      <ul>
                        {" "}
                        <li></li>
                      </ul>
                    </td>
                    <td>6338</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>5247</td>
                    <td>6338</td>
                    <td>
                      <ul>
                        {" "}
                        <li></li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>{" "}
        </div>

        <p>
          It is possible to perform{" "}
          <a href="https://en.wikipedia.org/wiki/Hierarchical_clustering">
            hierarchical cluster analysis
          </a>{" "}
          on this set of dissimilarities. Basically, this statistical method seeks to build a{" "}
          <code>hierarchy</code> of clusters: it tries to group sample that are close one from
          another.
        </p>

        <p>The result can be seen as a dendrogram:</p>

        <Code lang="r">{`# Perform hierarchical cluster analysis.
dend <- as.dist(data) %>%
  hclust(method="ward.D") %>%
  as.dendrogram()

# Plot with Color in function of the cluster
leafcolor <- colormap(colormap = colormaps$viridis, nshades = 5, format = "hex", alpha = 1, reverse = FALSE)
par(mar=c(1,1,1,7))
dend %>%
  set("labels_col", value = leafcolor, k=5) %>%
  set("branches_k_color", value = leafcolor, k = 5) %>%
  plot(horiz=TRUE, axes=FALSE)`}</Code>

        <figure>
          <img
            src="/figures/graph/dendrogram/3.webp"
            alt="Dendrogram – chart example"
            width={864}
            height={576}
            loading="lazy"
          />
        </figure>

        <p>
          As expected, cities that are in same geographic area tend to be <code>clusterized</code>{" "}
          together. For example, the yellow cluster is composed by all the Asian cities of the
          dataset. Note that the dendrogram provides even more information. For instance, Sydney
          appears to be a bit further to Calcutta than calcutta is from Tokyo: this can be deduce
          from the branch size that represents the distance.
        </p>

        <p>
          A common task consists to compare the result of a clustering with an expected result. For
          instance, we can check if the countries are indeed grouped in continent using a color bar:
        </p>

        <Code lang="r">{`# Create a color vector with continent
continent <- c("Europe", "South America", "Africa", "Asia", "Africa", "South America", "North America", "Asia", "North America",
               "Europe", "Europe","Europe", "North America", "Asia", "South America", "North America", "Europe", "North America",
               "Europe", "South America", "Europe", "North America", "Asia", "Europe", "Asia", "Asia", "Europe",
               "North America"
               )
barcolor <- colormap(colormap = colormaps$viridis, nshades = 5, format = "hex", alpha = 1, reverse = FALSE)
barcolor <- barcolor[as.numeric(as.factor(continent))]

# Make the dendrogram
par(mar=c(10,2,2,2))
dend %>%
  set("labels_col", value = leafcolor, k=5) %>%
  set("branches_k_color", value = leafcolor, k = 5)  %>%
  plot(axes=FALSE)

colored_bars(colors = barcolor, dend = dend, rowLabels = "continent")`}</Code>

        <figure>
          <img
            src="/figures/graph/dendrogram/4.webp"
            alt="Dendrogram – chart example"
            width={864}
            height={576}
            loading="lazy"
          />
        </figure>

        <p>
          This graphic allows to validate that the clustering indeed grouped cities by continent.
          There are a few discrepencies that are logical. Indeed, Mexico city has been considered as
          a city of South America here, altough it is probably closer from North America as
          suggested by the clustering.
        </p>
      </Section>

      <Section id="variation" title="Variation">
        <p>
          Many variations exist for dendrogram. It can be horizontal or vertical as shown before. It
          can also be linear or circular. The advantage of the circular verion being that it uses
          the graphic space more efficiently:
        </p>

        <Code lang="r">{`# Libraries
library(ggraph)
library(igraph)
library(tidyverse)
library(RColorBrewer)
set.seed(1)

# create a data frame giving the hierarchical structure of your individuals
d1=data.frame(from="origin", to=paste("group", seq(1,10), sep=""))
d2=data.frame(from=rep(d1$to, each=10), to=paste("group", seq(1,100), sep="_"))
edges=rbind(d1, d2)

# create a vertices data.frame. One line per object of our hierarchy
vertices = data.frame(
  name = unique(c(as.character(edges$from), as.character(edges$to))) ,
  value = runif(111)
)
# Let's add a column with the group of each name. It will be useful later to color points
vertices$group = edges$from[ match( vertices$name, edges$to ) ]


#Let's add information concerning the label we are going to add: angle, horizontal adjustement and potential flip
#calculate the ANGLE of the labels
vertices$id=NA
myleaves=which(is.na( match(vertices$name, edges$from) ))
nleaves=length(myleaves)
vertices$id[ myleaves ] = seq(1:nleaves)
vertices$angle= 90 - 360 * vertices$id / nleaves

# calculate the alignment of labels: right or left
# If I am on the left part of the plot, my labels have currently an angle < -90
vertices$hjust<-ifelse( vertices$angle < -90, 1, 0)

# flip angle BY to make them readable
vertices$angle<-ifelse(vertices$angle < -90, vertices$angle+180, vertices$angle)

# Create a graph object
mygraph <- graph_from_data_frame( edges, vertices=vertices )

# prepare color
mycolor <- colormap(colormap = colormaps$viridis, nshades = 6, format = "hex", alpha = 1, reverse = FALSE)[sample(c(1:6), 10, replace=TRUE)]

# Make the plot
ggraph(mygraph, layout = 'dendrogram', circular = TRUE) +
  geom_edge_diagonal(colour="grey") +
  scale_edge_colour_distiller(palette = "RdPu") +
  geom_node_text(aes(x = x*1.15, y=y*1.15, filter = leaf, label=name, angle = angle, hjust=hjust, colour=group), size=2.7, alpha=1) +
  geom_node_point(aes(filter = leaf, x = x*1.07, y=y*1.07, colour=group, size=value, alpha=0.2)) +
  scale_colour_manual(values= mycolor) +
  scale_size_continuous( range = c(0.1,7) ) +
  theme_void() +
  theme(
    legend.position="none",
    plot.margin=unit(c(0,0,0,0),"cm"),
  ) +
  expand_limits(x = c(-1.3, 1.3), y = c(-1.3, 1.3))`}</Code>

        <figure>
          <img
            src="/figures/graph/dendrogram/5.webp"
            alt="Dendrogram – chart example"
            width={576}
            height={576}
            loading="lazy"
          />
        </figure>

        <p>
          Another common variation is to display a heatmap at the bottom of the dendrogram. Indeed,
          it allows to visualize the distance between each sample and thus to understand why the
          clustering algorythm put 2 samples next to each other.
        </p>

        <div className="text-center">
          <Code lang="r">{`library(d3heatmap)
d3heatmap(mtcars, scale = "column", colors = "Blues")`}</Code>

          <Widget src="/widgets/graph/dendrogram-1.html" height={576} width={576} />
        </div>
      </Section>

      <Section id="mistake" title="Common mistakes">
        <ul>
          {" "}
          <li>
            If using a clustering algorythm, be sure you understood which metrics have been used for
            the distance calculation and for the clustering algorythm.
          </li>{" "}
          <li>Horizontal version are appreciated with long labels</li>{" "}
          <li>Showing the heatmap is a good practice if you’re working with clustering.</li>{" "}
        </ul>
      </Section>

      <Section id="related" title="Related">
        <RelatedGrid>
          <RelatedCard
            href="/graph/venn.html"
            image="/img/section/VennSmall.png"
            title="Venn Diagram"
          >
            Show the overlap between sets. Perfect to show how much different groups have in common.
          </RelatedCard>
          <RelatedCard
            href="/graph/circularpacking.html"
            image="/img/section/CircularPackingSmall.png"
            title="Circular packing"
          >
            A circular version of a Treemap to visualize a hierarchical organization
          </RelatedCard>
          <RelatedCard
            href="/graph/treemap.html"
            image="/img/section/TreeSmall.png"
            title="Treemap"
          >
            Displays hierarchical data as a set of nested rectangles. Perfect to show how the whole
            is divided.
          </RelatedCard>
          <RelatedCard
            href="/graph/heatmap.html"
            image="/img/section/HeatmapSmall.png"
            title="Heatmap"
          >
            A graphical representation of data where the individual values contained in a matrix are
            represented as colors.
          </RelatedCard>
        </RelatedGrid>
      </Section>

      <Section id="code" title="Build your own">
        <p>
          The <a href="https://r-graph-gallery.com/dendrogram.html">R</a>,{" "}
          <a href="https:/python-graph-gallery.com/dendrogram/">Python</a>,{" "}
          <a href="https://www.react-graph-gallery.com/dendrogram">React</a> and{" "}
          <a href="https://d3-graph-gallery.com/dendrogram.html">D3</a> graph galleries are 4
          websites providing hundreds of chart example, always providing the reproducible code.
          Click the button below to see how to build the chart you need with your favorite
          programing language.
        </p>

        <p>
          <ButtonLink href="https://r-graph-gallery.com/dendrogram.html">
            R graph gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://python-graph-gallery.com/dendrogram/">
            Python gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://www.react-graph-gallery.com/dendrogram">
            React gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://d3-graph-gallery.com/dendrogram.html">D3 gallery</ButtonLink>
        </p>
      </Section>
    </GraphLayout>
  );
}
