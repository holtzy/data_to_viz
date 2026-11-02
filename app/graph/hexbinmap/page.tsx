import { GraphLayout } from "@/components/layouts";
import { ButtonLink, Code, RelatedCard, RelatedGrid, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/graph/hexbinmap.html",
  title: "Hexbin map – from Data to Viz",
  description:
    "Note on the first map: You can learn more about this story here. Data comes from here. Code has been inspired from this post and that one.",
  image: "/img/section/MapHexbinSmall.png",
});

export default function Page() {
  return (
    <GraphLayout title="Hexbin map" images={["/img/section/MapHexbinSmall.png"]}>
      <h2 id="definition">Definition</h2>

      <hr />

      <p>
        The term <code>hexbin map</code> refers to two different concepts:
      </p>
      <ul>
        {" "}
        <li>
          The first definition is based on an unusual geospatial object where all regions of the map
          are represented as hexagons. Here is an example representing the US states, each
          represented as an hexagon. Note that here the data input provides{" "}
          <code>one value per state</code> and a <code>specific shape file</code> with hexagone
          boundaries.
        </li>{" "}
      </ul>
      <Code lang="r">{`# library
library(tidyverse)
library(sf)
library(RColorBrewer)

# Download the Hexagon boundaries at geojson format here: https://team.carto.com/u/andrew/tables/andrew.us_states_hexgrid/public/map.

# Load this file. (Note: I stored in a folder called DATA)
my_sf <- read_sf("us_states_hexgrid.geojson.json")

# Bit of reformatting
my_sf <- my_sf %>%
  mutate(google_name = gsub(" \\\\(United States\\\\)", "", google_name))

data <- read.table("https://raw.githubusercontent.com/holtzy/R-graph-gallery/master/DATA/State_mariage_rate.csv",
  header = T, sep = ",", na.strings = "---"
)

# Show it
my_sf_wed <- my_sf %>%
  left_join(data, by = c("google_name" = "state"))

# Prepare binning
my_sf_wed$bin <- cut(my_sf_wed$y_2015,
  breaks = c(seq(5, 10), Inf),
  labels = c("5-6", "6-7", "7-8", "8-9", "9-10", "10+"),
  include.lowest = TRUE
)

# Prepare a color scale coming from the viridis color palette
library(viridis)
my_palette <- rev(magma(8))[c(-1, -8)]

# plot
ggplot(my_sf_wed) +
  geom_sf(aes(fill = bin), linewidth = 0, alpha = 0.9) +
  geom_sf_text(aes(label = iso3166_2), color = "white", size = 3, alpha = 0.6) +
  theme_void() +
  scale_fill_manual(
    values = my_palette,
    name = "Wedding per 1000 people in 2015",
    guide = guide_legend(
      keyheight = unit(3, units = "mm"),
      keywidth = unit(12, units = "mm"),
      label.position = "bottom", title.position = "top", nrow = 1
    )
  ) +
  ggtitle("A map of marriage rates, state by state") +
  theme(
    legend.position = c(0.5, 0.9),
    text = element_text(color = "#22211d"),
    plot.background = element_rect(fill = "#f5f5f2", color = NA),
    panel.background = element_rect(fill = "#f5f5f2", color = NA),
    legend.background = element_rect(fill = "#f5f5f2", color = NA),
    plot.title = element_text(
      size = 22, hjust = 0.5, color = "#4e4d47",
      margin = margin(b = -0.1, t = 0.4, l = 2, unit = "cm")
    )
  )`}</Code>

      <figure>
        <img
          src="/figures/graph/hexbinmap/1.webp"
          alt="Hexbin map – chart example"
          width={768}
          height={576}
          loading="lazy"
        />
      </figure>
      <ul>
        {" "}
        <li>
          The second definition refers to the utilisation of{" "}
          <a href="/graph/density2d.html">2D density</a> techniques. Think of a scatterplot where
          the X axis is the longitude and the Y axis is the latitude. The graphic area is divided in
          a multitude of hexagones and the number of data point in each is counted and represented
          using a color gradient. Note that here <code>no map boundaries is needed</code>. It
          requires only a <code>list of latitude and longitude</code>.
        </li>{" "}
      </ul>
      <div className="grid gap-6 md:grid-cols-12">
        <Code lang="r">{`# Libraries
library(tidyverse)
library(viridis)
library(hrbrthemes)
library(kableExtra)
options(knitr.table.format = "html")
library(mapdata)

# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/17_ListGPSCoordinates.csv", sep=",", header=T)

# plot
data %>%
  filter(homecontinent=='Europe') %>%
  ggplot( aes(x=homelon, y=homelat)) +
    geom_hex(bins=59) +
    ggplot2::annotate("text", x = -27, y = 72, label="Where people tweet about #Surf", colour = "black", size=5, alpha=1, hjust=0) +
    ggplot2::annotate("segment", x = -27, xend = 10, y = 70, yend = 70, colour = "black", size=0.2, alpha=1) +
    theme_void() +
    xlim(-30, 70) +
    ylim(24, 72) +
    scale_fill_viridis(
      trans = "log",
      breaks = c(1,7,54,403,3000),
      name="Tweet # recorded in 8 months",
      guide = guide_legend( keyheight = unit(2.5, units = "mm"), keywidth=unit(10, units = "mm"), label.position = "bottom", title.position = 'top', nrow=1)
    )  +
    ggtitle( "" ) +
    theme(
      legend.position = c(0.8, 0.09),
      legend.title=element_text(color="black", size=8),
      text = element_text(color = "#22211d"),
      plot.background = element_rect(fill = "#f5f5f2", color = NA),
      panel.background = element_rect(fill = "#f5f5f2", color = NA),
      legend.background = element_rect(fill = "#f5f5f2", color = NA),
      plot.title = element_text(size= 13, hjust=0.1, color = "#4e4d47", margin = margin(b = -0.1, t = 0.4, l = 2, unit = "cm")),
    )`}</Code>

        <figure>
          <img
            src="/figures/graph/hexbinmap/2.webp"
            alt="Hexbin map – chart example"
            width={864}
            height={576}
            loading="lazy"
          />
        </figure>
      </div>

      <p>
        <em>Note on the first map</em>: You can learn more about this story{" "}
        <a href="/story/RegionWithValue.html">here</a>. Data comes from{" "}
        <a href="https://team.carto.com/u/andrew/tables/andrew.us_states_hexgrid/public/map">
          here
        </a>
        . Code has been inspired from{" "}
        <a href="https://timogrossenbacher.ch/2016/12/beautiful-thematic-maps-with-ggplot2-only/">
          this post
        </a>{" "}
        and{" "}
        <a href="https://rud.is/b/2015/05/15/u-s-drought-monitoring-with-hexbin-state-maps-in-r/">
          that one
        </a>
        .
      </p>

      <p>
        <em>Note on the second map</em>: This map shows the geographic position of about 200k tweets
        containing the hashtags <code>#surf</code>, <code>#windsurf</code> or <code>#kitesurf</code>
        . Read more about it <a href="/story/GPSCoordWithoutValue.html">here</a>.
      </p>

      <Section id="what-for" title="What for">
        <p>
          Hexbin or grid map has an <code>advantage</code> over usual{" "}
          <a href="/graph/choropleth.html">choropleth maps</a>. In choropleths, a large polygon’s
          data looks more emphasized just because of its size, what introduces a bias. Here with
          hexbin, each region is represented equally dismissing the bias.
        </p>

        <p>
          There’s a <code>drawback</code> to this format though. Map readers generally recognize a
          geographic area by it’s shape and orientation to other areas. For instance, the geography
          of the US is well known and people easily identify different regions. In hexbin maps,
          these landmarks do not exist anymore what can confuse the audience. One solution for this
          is to choose a basemap that uses labels on top of your data layer.
        </p>
      </Section>

      <Section id="variation" title="Variation">
        <p>
          Hexbin map uses hexagons to split the area in several parts and attribute a color to it.
          Note that it is possible to use square instead of hexagones, resulting in a{" "}
          <a href="/graph/density2d.html">2D histogram map</a>.
        </p>
      </Section>

      <Section id="mistake" title="Common mistakes">
        <ul>
          {" "}
          <li>
            Normalize your variable: you cannot compare raw numbers between regions of distinct size
            or population.
          </li>{" "}
          <li>Take a huge care when choosing the continuous color palette.</li>{" "}
          <li>Don’t forget the legend.</li>{" "}
        </ul>
      </Section>

      <Section id="related" title="Related">
        <RelatedGrid>
          <RelatedCard
            href="/graph/choropleth.html"
            image="/img/section/ChoroplethSmall.png"
            title="Choropleth"
          >
            Display a aggregated value for each region of the map using color gradients.
          </RelatedCard>
          <RelatedCard
            href="/graph/cartogram.html"
            image="/img/section/CartogramSmall.png"
            title="Cartogram"
          >
            A circular version of a Treemap to visualize a hierarchical organization
          </RelatedCard>
          <RelatedCard
            href="/graph/bubblemap.html"
            image="/img/section/BubbleMapSmall.png"
            title="Bubble map"
          >
            Display bubble on a map background to represent the value of a numeric variable.
          </RelatedCard>
          <RelatedCard
            href="/graph/map.html"
            image="/img/section/MapSmall.png"
            title="Background Map"
          >
            The basis for any geographic data visualization is to build a good background map.
          </RelatedCard>
        </RelatedGrid>
      </Section>

      <Section id="code" title="Build your own">
        <p>
          The <a href="https://r-graph-gallery.com/hexbin-map.html">R</a>,{" "}
          <a href="https:/python-graph-gallery.com/hexbin-map/">Python</a>,{" "}
          <a href="https://www.react-graph-gallery.com/hexbin-map">React</a> and{" "}
          <a href="https://d3-graph-gallery.com/hexbinmap.html">D3</a> graph galleries are 4
          websites providing hundreds of chart example, always providing the reproducible code.
          Click the button below to see how to build the chart you need with your favorite
          programing language.
        </p>

        <p>
          <ButtonLink href="https://r-graph-gallery.com/hexbin-map.html">
            R graph gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://python-graph-gallery.com/hexbin-map/">
            Python gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://www.react-graph-gallery.com/hexbin-map">
            React gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://d3-graph-gallery.com/hexbinmap.html">D3 gallery</ButtonLink>
        </p>
      </Section>
    </GraphLayout>
  );
}
