import { GraphLayout } from "@/components/layouts";
import { ButtonLink, Code, RelatedCard, RelatedGrid, Section, Widget } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/graph/treemap.html",
  title: "Treemap – from Data to Viz",
  description:
    "A Treemap displays hierarchical data as a set of nested rectangles. Each group is represented by a rectangle, which area is proportional to its value.…",
  image: "/img/section/TreeSmall.png",
});

export default function Page() {
  return (
    <GraphLayout title="Treemap" images={["/img/section/TreeSmall.png"]}>
      <Section id="definition" title="Definition">
        <p>
          A <code>Treemap</code> displays <code>hierarchical</code> data as a set of nested
          rectangles. Each group is represented by a rectangle, which area is proportional to its
          value. Using color schemes and or interactivity, it is possible to represent several
          dimensions: groups, subgroups etc.
        </p>

        <p>
          Here is an example describing the{" "}
          <a href="/story/SevCatOneNumNestedOneObsPerGroup.html">world population</a> of 250
          countries. The world is divided in continent (group), continent are divided in regions
          (subgroup), and regions are divided in countries. In this tree structure, countries are
          considered as leaves: they are at the end of the branches.
        </p>

        <Code lang="r">{`# libraries
library(tidyverse)
library(treemap)

# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/11_SevCatOneNumNestedOneObsPerGroup.csv", header=T, sep=";")
data[ which(data$value==-1),"value"] <- 1
colnames(data) <- c("Continent", "Region", "Country", "Pop")

# Plot
p <- treemap(data,

            # data
            index=c("Continent", "Region", "Country"),
            vSize="Pop",
            type="index",

            # Main
            title="",
            palette="Dark2",

            # Borders:
            border.col=c("black", "grey", "grey"),
            border.lwds=c(1,0.5,0.1),

            # Labels
            fontsize.labels=c(0.7, 0.4, 0.3),
            fontcolor.labels=c("white", "white", "black"),
            fontface.labels=1,
            bg.labels=c("transparent"),
            align.labels=list( c("center", "center"), c("left", "top"), c("right", "bottom")),
            overlap.labels=0.5#, inflate.labels=T

)`}</Code>

        <figure>
          <img
            src="/figures/graph/treemap/1.webp"
            alt="Treemap – chart example"
            width={672}
            height={384}
            loading="lazy"
          />
        </figure>

        <p>
          <em>Note</em>: You can read more about this story{" "}
          <a href="/story/SevCatOneNumNestedOneObsPerGroup.html">here</a>, with many more way to
          visualize this dataset. Data source: wikipedia and formating by{" "}
          <a href="https://github.com/mledoze/countries">1</a> and{" "}
          <a href="http://bl.ocks.org/ganeshv/6a8e9ada3ab7f2d88022">2</a>.
        </p>
      </Section>

      <Section id="what-for" title="What for">
        <p>Treemaps are used to show two types of information simultaneously:</p>
        <ul>
          {" "}
          <li>
            <p>
              how the whole is divided: for each level of the hierarchy, it is easy to understand
              which entity is the most important and how the whole is distributed among entities.
              Treemap can even be used without any hierarchy, just to show the value of several
              entities like in a barplot.
            </p>
          </li>{" "}
          <li>
            <p>
              How the hierarchy is organized. Note that it is hard to represent more than 3 levels
              on a static version tough.
            </p>
          </li>{" "}
        </ul>
        <p>
          Treemaps have the advantage to make efficient use of space, what makes them useful to
          represent a big amount of data.
        </p>
      </Section>

      <Section id="variation" title="Variation">
        <p>
          The main variation of treemaps concerns the use of interactivity. It is advised to use it
          if you have more than 2 or 3 levels of organization to display. Indeed, treemap get
          cluttered in this situation otherwise.
        </p>

        <p>
          In the figure below, clicking on a group zooms on it a reveals the underlying structure.
          Hint: click on the title to come back to the previous level of the hierarchy.
        </p>

        <Code lang="r">{`library(d3treeR)
d3tree2(p, rootname = "General" )`}</Code>

        <Widget src="/widgets/graph/treemap-1.html" height={480} width={864} />
      </Section>

      <Section id="mistake" title="Common mistakes">
        <ul>
          {" "}
          <li>
            Don’t annotate more than 3 levels of the hierarchy, it would make the figure unreadable.
          </li>{" "}
          <li>Prioritize the highest level of the hierarchy.</li>{" "}
          <li>Interactive version really makes sense for treemap.</li>{" "}
        </ul>
      </Section>

      <Section id="related" title="Related">
        <RelatedGrid>
          <RelatedCard
            href="/graph/heatmap.html"
            image="/img/section/HeatmapSmall.png"
            title="Heatmap"
          >
            Representation of data where the individual values contained in a matrix are represented
            as colors
          </RelatedCard>
          <RelatedCard
            href="/graph/circularpacking.html"
            image="/img/section/CircularPackingSmall.png"
            title="Circular packing"
          >
            A circular version of a Treemap to visualize a hierarchical organization
          </RelatedCard>
          <RelatedCard
            href="/graph/sunburst.html"
            image="/img/section/SunburstSmall.png"
            title="Sunburst Diagram"
          >
            Display a hierarchy through a set of nested donut plots.
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
          The <a href="https://www.r-graph-gallery.com/treemap.html">R</a>,{" "}
          <a href="https://www.python-graph-gallery.com/treemap/">Python</a>,{" "}
          <a href="https://www.react-graph-gallery.com/treemap">React</a> and{" "}
          <a href="https://d3-graph-gallery.com/treemap.html">D3</a> graph galleries are 4 websites
          providing hundreds of chart example, always providing the reproducible code. Click the
          button below to see how to build the chart you need with your favorite programing
          language.
        </p>

        <p>
          <ButtonLink href="https://www.r-graph-gallery.com/treemap.html">
            R graph gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://python-graph-gallery.com/treemap/">Python gallery</ButtonLink>{" "}
          <ButtonLink href="https://www.react-graph-gallery.com/treemap">React gallery</ButtonLink>{" "}
          <ButtonLink href="https://d3-graph-gallery.com/treemap.html">D3 gallery</ButtonLink>
        </p>
      </Section>
    </GraphLayout>
  );
}
