import { GraphLayout } from "@/components/layouts";
import { ButtonLink, Code, RelatedCard, RelatedGrid, Section, Widget } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/graph/sunburst.html",
  title: "Sunburst – from Data to Viz",
  description:
    "A sunburst diagram displays a hierarchical structure. The origin of the organization is represented by the center of the circle, and each level of the…",
  image: "/img/section/SunburstSmall.png",
});

export default function Page() {
  return (
    <GraphLayout title="Sunburst" images={["/img/section/SunburstSmall.png"]}>
      <Section id="definition" title="Definition">
        <p>
          A <code>sunburst diagram</code> displays a hierarchical structure. The origin of the
          organization is represented by the center of the circle, and each level of the
          organization by an aditional ring. The last level (leaves) are located at the extreme
          outer part of the circle. It is very similar to a{" "}
          <a href="/graph/treemap.html">treemap</a>, except it uses a <code>radial layout</code>.
        </p>

        <p>A sunburst diagram can be used in 2 situations:</p>
        <ul>
          {" "}
          <li>
            <em>Part of a whole</em> - the sunburst diagram can be used to represent a part of a
            whole. In this case, the center of the circle represents the whole, and the outer part
            represents the parts. The following example shows the{" "}
            <a href="/story/SevCatOneNumNestedOneObsPerGroup.html">world population</a> of 250
            countries.
          </li>{" "}
          <li>
            <em>Flows</em> - the sunburst diagram can also be used to represent flows. In this case,
            the center of the circle represents the origin of the flow, and the outer part
            represents the destination. The following example shows the professional state evolution
            of a set of people.
          </li>{" "}
        </ul>
      </Section>

      <Section id="part-of-a-whole" title="Part of a whole">
        <p>
          Here is an example describing the{" "}
          <a href="/story/SevCatOneNumNestedOneObsPerGroup.html">world population</a> of 250
          countries. The world is divided in continent (group), continent are divided in regions
          (subgroup), and regions are divided in countries. In this tree structure, countries are
          considered as leaves: they are at the end of the branches. They are thus represented at
          the outer part of the circle.
        </p>

        <Code lang="r">{`# libraries
library(tidyverse)
library(treemap)
library(sunburstR)

# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/11_SevCatOneNumNestedOneObsPerGroup.csv", header=T, sep=";")
data[ which(data$value==-1),"value"] <- 1
colnames(data) <- c("Continent", "Region", "Country", "Pop")

# Reformat data for the sunburstR package
data <- data %>%
  filter(Continent != "") %>%
  mutate(path = paste(Continent, Region, Country, sep="-")) %>%
  dplyr::select(path, Pop)

# Plot
p <- sunburst(data, legend=FALSE)`}</Code>

        <div className="text-center">
          <Widget src="/widgets/graph/sunburst-1.html" height={480} width={768} />
        </div>

        <p>
          <em>Note</em>: This figure is interactive: hover a region to show the country and its
          architecture.
        </p>
      </Section>

      <Section id="flows" title="Flows">
        <p>
          Sunburst diagrams can also be used to represent flows. In this case they are more
          comparable to a <a href="/graph/sankey.html">Sankey diagram</a>. The following example
          describe the professional state evolution of a set of people:
        </p>

        <Code lang="r">{`library(TraMineR)
library(sunburstR)
library(pipeR)

# use example from TraMineR vignette
data("mvad")
mvad.alphab <- c(
  "employment", "FE", "HE", "joblessness",
  "school", "training"
)
mvad.seq <- seqdef(mvad, 17:86, xtstep = 6, alphabet = mvad.alphab)

# to make this work, we'll compress the sequences with seqdss
#   could also aggregate with dply later
seqtab( seqdss(mvad.seq), tlim = 0, format = "SPS" ) %>>%
  attr("freq") %>>%
  (
    data.frame(
      # appending "-end" is necessary for this to work
      sequence = paste0(
        gsub(
          x = names(.$Freq)
          , pattern = "(/[0-9]*)"
          , replacement = ""
          , perl = T
        )
        ,"-end"
      )
      ,freq = as.numeric(.$Freq)
      ,stringsAsFactors = FALSE
    )
  ) %>>%
  sunburst ->p`}</Code>

        <div className="text-center">
          <Widget src="/widgets/graph/sunburst-2.html" height={480} width={768} />
        </div>

        <p>
          <em>Note</em>: This graphic comes from the{" "}
          <a href="http://www.buildingwidgets.com/blog/2015/7/2/week-26-sunburstr">
            sunburstR package
          </a>{" "}
          documentation. Thanks to{" "}
          <a href="https://twitter.com/timelyportfolio?lang=en">timelyportfolio</a> for his work.
        </p>
      </Section>

      <Section id="downsides" title="Downsides">
        <ul>
          {" "}
          <li>
            <em>Labels</em> - It is very hard to represent labels on sunburst charts. This is why
            using <code>interactivity</code> as above is often necessary to make the chart useful.
            This is an important downside though: it is hard to understand the figure in a glimpse.
          </li>{" "}
          <li>
            <em>Angles are hard to read</em> - sunburst suffers the same issue than{" "}
            <a href="https://www.data-to-viz/caveat/pie.html">pie</a> or{" "}
            <a href="https://www.data-to-viz/caveat/pie.html">donut</a> chart. The human eye is bad
            at reading angles. As a consequence, it is hard to deduce values behind items
            accurately.
          </li>{" "}
          <li>
            <em>Deeper slices are exagerated</em> - by construction, outer parts tend to get bigger
            than inner part for a same value. Indeed, the perimeter of the circle gets longer when
            you go further from the center of the circle!
          </li>{" "}
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
          The <a href="https://www.r-graph-gallery.com">R</a>,{" "}
          <a href="https://www.python-graph-gallery.com">Python</a>,{" "}
          <a href="https://www.react-graph-gallery.com">React</a> and{" "}
          <a href="https://d3-graph-gallery.com">D3</a> graph galleries are 4 websites providing
          hundreds of chart example, always providing the reproducible code. Click the button below
          to see how to build the chart you need with your favorite programing language.
        </p>

        <p>
          <ButtonLink href="https://www.r-graph-gallery.com">R graph gallery</ButtonLink>{" "}
          <ButtonLink href="https://python-graph-gallery.com">Python gallery</ButtonLink>{" "}
          <ButtonLink href="https://www.react-graph-gallery.com">React gallery</ButtonLink>{" "}
          <ButtonLink href="https://d3-graph-gallery.com">D3 gallery</ButtonLink>
        </p>
      </Section>
    </GraphLayout>
  );
}
