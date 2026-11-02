import { GraphLayout } from "@/components/layouts";
import { ButtonLink, Code, RelatedCard, RelatedGrid, Section, Widget } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/graph/circularpacking.html",
  title: "Circular Packing – from Data to Viz",
  description:
    "Circular packing or circular treemap allows to visualize a hierarchic organization. It is an equivalent of a treemap or a dendrogram, where each node of…",
  image: "/img/section/CircularPackingSmall.png",
});

export default function Page() {
  return (
    <GraphLayout title="Circular Packing" images={["/img/section/CircularPackingSmall.png"]}>
      <Section id="definition" title="Definition">
        <p>
          <code>Circular packing</code> or circular treemap allows to visualize a hierarchic
          organization. It is an equivalent of a <a href="/graph/treemap.html">treemap</a> or a{" "}
          <a href="/graph/dendrogram.html">dendrogram</a>, where each node of the tree is
          represented as a circle and its sub-nodes are represented as circles inside of it. The
          size of each circle can be proportional to a specific value, what gives more insight to
          the plot.
        </p>

        <p>
          Here is an example showing the{" "}
          <a href="/story/SevCatOneNumNestedOneObsPerGroup.html">
            repartition of the world population
          </a>{" "}
          of 250 countries. The world is divided in continent (group), regions (subgroup), and
          countries. Countries are considered as leaves: they are at the end of the branches.
        </p>

        <div className="text-center">
          <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(circlepackeR)

# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/11_SevCatOneNumNestedOneObsPerGroup.csv", header=T, sep=";")
data[ which(data$value==-1),"value"] <- 1
colnames(data) <- c("Continent", "Region", "Country", "Pop")

# Remove a few problematic lines
data <- data %>% filter(Continent!="") %>% droplevels()

# Change the format. This use the data.tree library. This library needs a column that looks like root/group/subgroup/..., so I build it
library(data.tree)
data$pathString <- paste("world", data$Continent, data$Region, data$Country, sep = "/")
population <- as.Node(data)
 
# You can custom the minimum and maximum value of the color range.
circlepackeR(population, size = "Pop", color_min = "hsl(56,80%,80%)", color_max = "hsl(341,30%,40%)")`}</Code>

          <Widget src="/widgets/graph/circularpacking-1.html" height={576} width={672} />
        </div>

        <p>
          <em>Note</em>: this figure is <code>interactive</code>, click on a continent to explore
          its regions and so on. Learn more on this world distribution story{" "}
          <a href="/story/SevCatOneNumNestedOneObsPerGroup.html">here</a>.
        </p>
      </Section>

      <Section id="what-for" title="What for">
        <p>
          Circle packing is not recommended if you need to precisely compare values of group.
          Indeed, it is hard for the human eye to{" "}
          <a href="/caveat/area_hard.html">translate an area into an accurate number</a>. If you
          need accuracy, use a <a href="/graph/barplot.html">barplot</a> or a{" "}
          <a href="/graph/lollipop.html">lollipop</a> plot instead.
        </p>

        <p>
          However, circular packing shows very well how groups are organised in subgroups. It uses
          the space a bit less efficiently than a <a href="/graph/treemap.html">treemap</a>, but the
          hierarchy gets very neat.
        </p>
      </Section>

      <Section id="variation" title="Variation">
        <p>
          When using circular packing I really like to remove the first or two first levels of the
          hierarchy on the plot. I believe it improves the appearance of the graphic but this is
          purely an aesthetic point of view:
        </p>

        <Code lang="r">{`# Libraries
library(ggraph)
library(igraph)
library(viridis)
 
# We need a data frame giving a hierarchical structure. Let's consider the flare dataset:
edges=flare$edges
vertices = flare$vertices
mygraph <- graph_from_data_frame( edges, vertices=vertices )
 
# Second one: add 2 first levels
ggraph(mygraph, layout = 'circlepack', weight=size) + 
  geom_node_circle(aes(fill = as.factor(depth), color = as.factor(depth) )) +
  scale_fill_manual(values=c("0" = "white", "1" = "white", "2" = magma(4)[2], "3" = magma(4)[3], "4"=magma(4)[4])) +
  scale_color_manual( values=c("0" = "white", "1" = "white", "2" = "black", "3" = "black", "4"="black") ) +
  theme_void() + 
  theme(legend.position="FALSE")`}</Code>

        <figure>
          <img
            src="/figures/graph/circularpacking/1.webp"
            alt="Circular Packing – chart example"
            width={576}
            loading="lazy"
          />
        </figure>

        <p>
          Note that if only one level of hierarchy is displayed (no encapsulation), it becomes
          equivalent to a barplot. Instead of showing the value of each individual as a bar, it uses
          a circle.
        </p>
      </Section>

      <Section id="mistake" title="Common mistakes">
        <ul>
          {" "}
          <li>
            If many levels in the hierarchy, using an interactive version is advised. Indeed adding
            to many labels could make the graphic unreadable.
          </li>{" "}
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
            href="/graph/treemap.html"
            image="/img/section/TreeSmall.png"
            title="Treemap"
          >
            Displays hierarchical data as a set of nested rectangles. Perfect to show how the whole
            is divided.
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
          The <a href="https://r-graph-gallery.com/circle-packing.html">R</a>,{" "}
          <a href="https:/python-graph-gallery.com/circular-packing/">Python</a>,{" "}
          <a href="https://www.react-graph-gallery.com/circular-packing">React</a> and{" "}
          <a href="https://d3-graph-gallery.com/circularpacking.html">D3</a> graph galleries are 4
          websites providing hundreds of chart example, always providing the reproducible code.
          Click the button below to see how to build the chart you need with your favorite
          programing language.
        </p>

        <p>
          <ButtonLink href="https://r-graph-gallery.com/circle-packing.html">
            R graph gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://python-graph-gallery.com/circular-packing/">
            Python gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://www.react-graph-gallery.com/circular-packing">
            React gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://d3-graph-gallery.com/circularpacking.html">
            D3 gallery
          </ButtonLink>
        </p>
      </Section>
    </GraphLayout>
  );
}
